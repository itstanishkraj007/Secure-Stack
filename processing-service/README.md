# Secure Stack Document Processing Service

Internal Python FastAPI microservice dedicated to deep PDF forensic analysis, digital signature validation (PAdES-B-LT via PyHanko), QR code payload decryption/verification, and computer vision OCR extraction with confidence scoring.

## Capabilities
1. **PAdES Digital Signature Verification**:
   - Inspects byte-range cryptographic signatures embedded in bank e-FDs.
   - Validates Indian Controller of Certifying Authorities (CCA) certificate chains (eMudhra, Capricorn, IDRBT).
2. **High-Density 2D QR Verification**:
   - Decodes bank QR payloads via ZBar/OpenCV.
   - Cross-references payload schema version and cryptographic hash against the official AICTE Trust Registry.
3. **Multi-Field OCR Extraction**:
   - Extracts 9 primary FDR fields using Tesseract OCR v5 with per-field bounding boxes and confidence metrics.

## Running Locally

```bash
cd processing-service
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Interactive Swagger UI is available at: [http://localhost:8000/docs](http://localhost:8000/docs)
