def test_send_otp(client):
    response = client.post("/api/v1/auth/send-otp", json={"mobile": "9876543210"})
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "OTP sent successfully" in data["data"]["message"]


def test_verify_otp(client):
    response = client.post("/api/v1/auth/verify-otp", json={"mobile": "9876543210", "otp": "123456"})
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "access_token" in data["data"]
    assert "refresh_token" in data["data"]
    assert data["data"]["user"]["mobile"] == "9876543210"


def test_google_auth(client):
    response = client.post("/api/v1/auth/google", json={"id_token": "test-google-id-token"})
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "access_token" in data["data"]
