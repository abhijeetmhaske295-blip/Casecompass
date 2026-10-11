from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_list_documents():
    response = client.get("/api/documents")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
