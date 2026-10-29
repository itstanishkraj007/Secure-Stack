from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "UP"

def test_process_mock_pdf():
    pdf_sample = b"%PDF-1.4\n1 0 obj\n<< /ByteRange [0 100 200 300] /Sig >>\nendobj\nFDR/SBI/2024/001847\n%%EOF"
    response = client.post(
        "/api/v1/process/document",
        files={"file": ("test_instrument.pdf", pdf_sample, "application/pdf")}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["signature_check"]["has_digital_signature"] is True
    assert data["qr_check"]["detected"] is True
    assert len(data["extracted_fields"]) > 0
