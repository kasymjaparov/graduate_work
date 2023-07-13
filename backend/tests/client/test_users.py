from httpx import AsyncClient


async def test_patch_user(ac: AsyncClient):
    response = await ac.patch('/api/users/', json={
        "first_name": "string",
        "last_name": "string",
        "phone_number": "string",
        "inn": "string",
        "is_have_signature": True
    })
    assert response.status_code == 200
    assert response.json()["first_name"] == 'string'
    assert response.json()["last_name"] == 'string'
    assert response.json()["phone_number"] == 'string'
    assert response.json()["inn"] == 'string'
    assert response.json()["is_have_signature"] is True


async def test_me(ac: AsyncClient):
    response = await ac.get('/api/users/me')
    assert response.status_code == 200
    assert response.json()['type'] == 'client'
    assert response.json()['email'] == 'client@example.com'
    assert response.json()["first_name"] == 'string'
    assert response.json()["last_name"] == 'string'
    assert response.json()["phone_number"] == 'string'
    assert response.json()["inn"] == 'string'
    assert response.json()["is_have_signature"] is True


async def test_get_users_list(ac: AsyncClient):
    response = await ac.get('/api/users/')

    assert response.status_code == 403
    assert response.json() == {'detail': "You don't have manager or manager rights"}
