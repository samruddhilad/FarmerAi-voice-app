def test_get_profile(client):
    response = client.get("/api/v1/profile")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["name"] == "Farmer"


def test_update_profile(client):
    payload = {
        "name": "Updated Farmer Name",
        "preferred_language": "hi",
        "state": "Maharashtra",
        "district": "Jalgaon"
    }
    response = client.put("/api/v1/profile", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["name"] == "Updated Farmer Name"
    assert data["data"]["preferred_language"] == "hi"
