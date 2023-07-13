from httpx import AsyncClient
from ..images import image1

async def test_login(ac: AsyncClient):
    response = await ac.post('/api/auth/login', json={
        "email": "designer@example.com",
        "password": "string",
    })
    ac.headers['Cookie'] = 'access_token=' + response.json()['access_token'] + ';' + 'refresh_token=' + response.json()[
        'refresh_token']
    assert response.status_code == 200


async def test_create_design(ac: AsyncClient):
    response = await ac.post('/api/designs/', json={
        'order_id': 2,
        "deadline_date": "2023-03-22T08:18:02.810Z",
    })
    assert response.status_code == 201


async def test_upload_file_to_design(ac: AsyncClient):
    response = await ac.patch('/api/designs/1/upload_file', json={
        "description": "string",
        "sample_image": [
            {
                "image": image1,
                "description": "string"
            },
            {
                "image": image1,
                "description": "string"
            },
            {
                "image": image1,
                "description": "string"
            },
            {
                "image": image1,
                "description": "string"
            }
        ],
        "file": image1
    })
    assert response.status_code == 200
