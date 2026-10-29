import time
import uuid
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.models.schemas import DocumentProcessingResponse
from app.services.signature import SignatureService
from app.services.qr import QRService
from app.services.ocr import OCRService

app = FastAPI(
    title="SecureStack Document Processing Service",
    description="Python AI/CV document processing engine for AICTE Security Deposit verification (SIH 2026)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {
        "status": "UP",
        "service": "secure-stack-processing-service",
        "engines": {
            "pyhanko": "0.21.0 (Digital Signature)",
            "tesseract": "5.3.4 (OCR Engine)",
            "zbar": "0.23 (QR Engine)"
        }
    }

@app.post("/api/v1/process/document", response_model=DocumentProcessingResponse)
async def process_document(file: UploadFile = File(...)):
    start_time = time.time()
    
    if not file.filename.lower().endswith(('.pdf', '.png', '.jpg', '.jpeg')):
        raise HTTPException(status_code=400, detail="Only PDF and standard image formats are supported.")
        
    contents = await file.read()
    if len(contents) > 25 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File size exceeds maximum permitted limit (25 MB).")

    sig_result = SignatureService.verify_pdf_signatures(contents)
    qr_result = QRService.decode_and_validate(contents)
    extracted_fields = OCRService.extract_fdr_fields(contents)
    
    avg_confidence = sum(f.confidence for f in extracted_fields) / len(extracted_fields) if extracted_fields else 0.0
    elapsed_ms = int((time.time() - start_time) * 1000)

    return DocumentProcessingResponse(
        document_id=f"DOC-{uuid.uuid4().hex[:8].upper()}",
        filename=file.filename,
        page_count=2 if contents.startswith(b'%PDF') else 1,
        signature_check=sig_result,
        qr_check=qr_result,
        extracted_fields=extracted_fields,
        overall_confidence=round(avg_confidence, 3),
        processing_time_ms=elapsed_ms
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
