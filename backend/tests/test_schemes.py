def test_get_schemes(client):
    response = client.get("/api/v1/schemes")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "items" in data["data"]
    assert data["data"]["total"] >= 1


def test_get_scheme_categories(client):
    response = client.get("/api/v1/schemes/categories")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    assert data[0]["name"] == "Horticulture"


def test_search_schemes(client):
    response = client.get("/api/v1/schemes/search?q=Test")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert isinstance(data["data"], list)
    assert len(data["data"]) >= 1
    assert "Test" in data["data"][0]["title"]


def test_get_scheme_detail_success(client):
    response = client.get("/api/v1/schemes/test-scheme-1")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    scheme = data["data"]
    assert scheme["id"] == "test-scheme-1"
    assert scheme["title"] == "Test Scheme Title"
    assert len(scheme["documents"]) == 1
    assert len(scheme["faqs"]) == 1
    assert scheme["gr"]["gr_title"] == "GR 2024"
    assert scheme["contact"]["department"] == "Test Dept"


def test_get_scheme_detail_invalid_id(client):
    response = client.get("/api/v1/schemes/non-existent-id-999")
    assert response.status_code == 404
    data = response.json()
    assert data["success"] is False
    assert data["error"]["code"] == "SCHEME_NOT_FOUND"
