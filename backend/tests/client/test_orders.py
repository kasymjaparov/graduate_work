from httpx import AsyncClient
from ..images import image1


async def test_create_order(ac: AsyncClient):
    for i in range(3):
        response = await ac.post('/api/orders/', json={
                "address": "string",
                "series": "104",
                "room_amount": 0,
                "square": 0,
                "order_room": [
                    {
                        "name": "string",
                        "description": "string",
                        "square": 0,
                        "order_image": [
                            {
                                "image": image1
                            },
                            {
                                "image": image1
                            }
                        ]
                    },
                    {
                        "name": "string",
                        "description": "string",
                        "square": 0,
                        "order_image": [
                            {
                                "image": image1
                            },
                            {
                                "image": image1
                            }
                        ]
                    }
                ]
        })
        assert response.status_code == 201


async def test_my_orders(ac: AsyncClient):
    response = await ac.get('/api/orders/?page=1&size=50')
    assert response.json()['total'] == 3
    assert response.status_code == 200


async def test_get_order(ac: AsyncClient):
    response = await ac.get('/api/orders/1')
    assert response.status_code == 200


async def test_delete_order(ac: AsyncClient):
    response = await ac.delete('api/orders/1')
    assert response.status_code == 200

