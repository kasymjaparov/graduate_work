from httpx import AsyncClient


async def test_register_users(ac: AsyncClient):
    user_types = ['meauser', 'designer', 'builder']
    for user_type in user_types:
        response = await ac.post('/api/auth/register', json={
            "email": f"{user_type}@example.com",
            "password": "string",
            "type": f"{user_type}"
        })
        assert response.status_code == 201
        assert response.json()['email'] == f'{user_type}@example.com'
        assert response.json()['type'] == f'{user_type}'


async def test_my_orders(ac: AsyncClient):
    response = await ac.get('/api/orders/?page=1&size=50')
    assert response.json()['total'] == 2
    assert response.status_code == 200


async def test_order_accept(ac: AsyncClient):
    response = await ac.patch('/api/orders/2/accept', json={
        "meauser_id": 3,
        "designer_id": 4,
        "builder_id": [
            5
        ],
        "repair_type": "Капитальный"
    })
    assert response.status_code == 200
    assert response.json()['status'] == 'approved'


async def test_order_decline(ac: AsyncClient):
    response = await ac.patch('/api/orders/3/decline', json={
        "reason_of_deny": "some reason",
    })
    assert response.status_code == 200
    assert response.json()['status'] == 'denied'
