import asyncio

from fastapi import APIRouter, status, UploadFile, File, Depends, HTTPException, BackgroundTasks
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from src import Order, Status, oauth2
from src.database import get_async_session
from .models import PreWorkDoc, PreWorkDocComment
from .schemas import CommentCreateSchema, CommentResponseSchema
from ..auth.dependencies import get_manager_user, get_client_user
from ..cloud import upload_file, delete_file, upload_file_docx

pre_work_router = APIRouter()


@pre_work_router.post('/{order_id}', status_code=status.HTTP_201_CREATED)
async def create_pre_work_doc(
        order_id: int,
        doc_file: UploadFile = File(...),
        user=Depends(get_manager_user),
        session: AsyncSession = Depends(get_async_session),
):
    order = await Order.get(session, id=order_id)
    if order.status != Status.DESIGN_APPROVED:
        raise HTTPException(detail='Order status is not DESIGN_APPROVED', status_code=status.HTTP_400_BAD_REQUEST)
    doc_file = await upload_file(doc_file)
    pre_work_doc = PreWorkDoc(doc_file=doc_file, order_id=order_id)
    await order.update(session, status=Status.PREWORK_ATTACHED)
    await pre_work_doc.save(session)
    return {"status": 201, "key": "value"}


@pre_work_router.patch('/accept/{order_id}')
async def accept_pre_work_doc(
        order_id: int,
        user=Depends(get_client_user),
        session: AsyncSession = Depends(get_async_session)
):
    order = await Order.get(session, id=order_id)
    if order.status != Status.PREWORK_ATTACHED:
        raise HTTPException(detail='Order status is not PREWORK_ATTACHED', status_code=status.HTTP_400_BAD_REQUEST)
    await order.update(session, status=Status.PREWORK_APPROVED)
    return order


@pre_work_router.patch('/decline/{order_id}')
async def accept_pre_work_doc(
        order_id: int,
        user=Depends(get_client_user),
        session: AsyncSession = Depends(get_async_session)
):
    order = await Order.get(session, id=order_id)
    if order.status != Status.PREWORK_ATTACHED:
        raise HTTPException(detail='Order status is not PREWORK_ATTACHED', status_code=status.HTTP_400_BAD_REQUEST)
    await order.update(session, status=Status.PREWORK_DENIED)
    return order


@pre_work_router.patch('/{order_id}')
async def patch_pre_work_doc(
        order_id: int,
        background_tasks: BackgroundTasks,
        doc_file: UploadFile = File(...),
        user=Depends(get_manager_user),
        session: AsyncSession = Depends(get_async_session),
):
    order = await Order.get(session, id=order_id)
    if order.status not in (Status.PREWORK_DENIED, Status.PREWORK_ATTACHED):
        raise HTTPException(detail='Order status is not PREWORK_DENIED', status_code=status.HTTP_400_BAD_REQUEST)

    pre_work_doc = await PreWorkDoc.get(session, order_id=order_id)
    public_id = pre_work_doc.doc_file.split("/")[-1].split(".")[0]

    # Delete the old file in the background
    background_tasks.add_task(delete_file, public_id)

    # Upload the new file in the background
    new_public_id = await asyncio.to_thread(upload_file_docx, doc_file)

    # Update pre_work_doc and order status in a single transaction
    await pre_work_doc.update(session, doc_file=new_public_id)
    await order.update(session, status=Status.PREWORK_ATTACHED)

    return {"status": 200}


@pre_work_router.post('/comment/{order_id}', status_code=status.HTTP_201_CREATED)
async def create_comment_pre_work_doc(
        order_id: int,
        payload: CommentCreateSchema,
        user=Depends(oauth2.require_user),
        session: AsyncSession = Depends(get_async_session),
):
    query = select(Order).options(selectinload(Order.pre_work_doc))
    order = await Order.get(session, query, id=order_id)
    order_users_id = [order.client_id, order.manager_id, order.meauser_id, order.designer_id]
    if user.id not in order_users_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='It is not your order')
    comment = PreWorkDocComment(user_id=user.id, text=payload.text, pre_work_doc_id=order.pre_work_doc[0].id)
    await comment.save(session)
    return {"status": 201}


@pre_work_router.get('/comment/{order_id}', response_model=list[CommentResponseSchema])
async def get_all_comments_by_order_id(
        order_id: int,
        user=Depends(oauth2.require_user),
        session: AsyncSession = Depends(get_async_session),
):
    query = select(Order).options(selectinload(Order.pre_work_doc))
    order = await Order.get(session, query, id=order_id)
    order_users_id = [order.client_id, order.manager_id, order.meauser_id, order.designer_id]
    if user.id not in order_users_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='It is not your order')
    query = select(PreWorkDocComment).options(selectinload(PreWorkDocComment.user))
    comments = await PreWorkDocComment.get_all(session, query, pre_work_doc_id=order.pre_work_doc[0].id)
    return comments
