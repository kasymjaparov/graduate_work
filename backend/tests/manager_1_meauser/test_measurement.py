from httpx import AsyncClient


async def test_meauser_login(ac: AsyncClient):
    response = await ac.post('/api/auth/login', json={
        "email": "meauser@example.com",
        "password": "string",
    })
    ac.headers['Cookie'] = 'access_token=' + response.json()['access_token'] + ';' + 'refresh_token=' + \
                           response.json()['refresh_token']
    assert response.status_code == 200


async def test_create_measurement(ac: AsyncClient):
    response = await ac.post('/api/measurements/', json={
        "order_id": 2,
        "come_date": "2023-03-20T17:24:51.589Z"
    })
    assert response.status_code == 201


async def test_add_file_to_measurement(ac: AsyncClient):
    with open('/Users/nursultanestebesov/PycharmProjects/fastapi/graduate_work/tests/manager_1_meauser/image.png', 'rb') as f:
        image = f.read()
    response = await ac.patch('/api/measurements/1', data={
        'comment': '123',
    }, files={
        'file': (f.name, image),

    })
    assert response.status_code == 200
