from fastapi import Depends, HTTPException, status

from src import oauth2


async def get_admin_user(user=Depends(oauth2.require_user)):
    if user.type == "admin":
        return user
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="You don't have admin rights"
        )


async def get_client_user(user=Depends(oauth2.require_user)):
    if user.type == "client":
        return user
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="You don't have client rights"
        )


async def get_designer_user(user=Depends(oauth2.require_user)):
    if user.type == "designer":
        return user
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="You don't have designer rights"
        )


async def get_meauser_user(user=Depends(oauth2.require_user)):
    if user.type == "meauser":
        return user
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="You don't have meauser rights"
        )


async def get_manager_user(user=Depends(oauth2.require_user)):
    if user.type == "manager":
        return user
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="You don't have manager rights"
        )


async def get_builder_user(user=Depends(oauth2.require_user)):
    if user.type == "builder":
        return user
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="You don't have builder rights"
        )
