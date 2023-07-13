from httpx import AsyncClient


async def test_register(ac: AsyncClient):
    response = await ac.post('/api/auth/register', json={
        "email": "client@example.com",
        "password": "string",
        "type": "client"
    })
    assert response.status_code == 201
    assert response.json()['email'] == 'client@example.com'
    assert response.json()['type'] == 'client'


async def test_login(ac: AsyncClient):
    response = await ac.post('/api/auth/login', json={
        "email": "client@example.com",
        "password": "string",
    })
    ac.headers['Cookie'] = 'access_token=' + response.json()['access_token'] + ';' + 'refresh_token=' + response.json()['refresh_token']
    assert response.status_code == 200
    return response.json()


async def test_refresh_token(ac: AsyncClient):
    response = await ac.get('/api/auth/refresh')
    ac.headers['Cookie'] = 'access_token=' + response.json()['access_token'] + ';'
    assert response.status_code == 200


async def test_logout(ac: AsyncClient):
    response = await ac.get('/api/auth/logout')
    assert response.status_code == 200
    assert response.json()['status'] == 'success'
