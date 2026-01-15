# tests/test_auth.py
import pytest
from app.main import app
from fastapi.testclient import TestClient
from sqlalchemy import text



client = TestClient(app)


#TODO need to truncate after each test
@pytest.mark.skip(reason="Skipping this test for now")
def test_signup_and_login_sync():
    # signup
    signup = client.post("/auth/signup", json={
        "name": "Test User",
        "email": "test@example.com",
        "password": "password123"
    })
    print(signup.json())
    assert signup.status_code == 200
    token = signup.json()["access_token"]

    # login
    login = client.post("/auth/login", json={
        "email": "test@example.com",
        "password": "password123"
    })
    print(signup.json())
    assert login.status_code == 200
    assert "access_token" in login.json()


# @pytest.mark.asyncio
# async def test_signup_and_login():

    #TODO test async
    # transport = ASGITransport(app=app)  # wrap FastAPI app for async httpx
    # async with AsyncClient(app=app, base_url="http://localhost") as client:
    #     signup = await client.post("/auth/signup", json={
    #         "name": "Test User",
    #         "email": "test@example.com",
    #         "password": "password123"
    #     })
    #     assert signup.status_code == 200
    #     token = signup.json()["access_token"]

    #     login = await client.post("/auth/login", json={
    #         "email": "test@example.com",
    #         "password": "password123"
    #     })
    #     assert login.status_code == 200
    #     assert "access_token" in login.json()
