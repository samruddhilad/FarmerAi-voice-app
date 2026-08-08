def test_check_eligibility(client):
    payload = {
        "age": 30,
        "gender": "male",
        "state": "Maharashtra",
        "district": "Jalgaon",
        "land_size": 2.5,
        "farmer_type": "small"
    }
    response = client.post("/api/v1/eligibility/check", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    results = data["data"]["results"]
    assert len(results) >= 1
    assert results[0]["is_eligible"] is True
    assert results[0]["match_percentage"] >= 60


def test_check_eligibility_validation_error(client):
    payload = {
        "age": "invalid-age",
        "gender": "male"
    }
    response = client.post("/api/v1/eligibility/check", json=payload)
    assert response.status_code == 422
    data = response.json()
    assert data["success"] is False
    assert data["error"]["code"] == "VALIDATION_ERROR"
