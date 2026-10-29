from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum

class CheckStatus(str, Enum):
    PASS = "PASS"
    FAIL = "FAIL"
    INCONCLUSIVE = "INCONCLUSIVE"
    UNKNOWN = "UNKNOWN"
    HEURISTIC = "HEURISTIC"

class ExtractedField(BaseModel):
    field_name: str
    display_name: str
    value: str
    confidence: float = Field(ge=0.0, le=1.0)
    bounding_box: Optional[List[int]] = None

class SignatureVerificationResult(BaseModel):
    has_digital_signature: bool
    status: CheckStatus
    signer_name: Optional[str] = None
    certificate_issuer: Optional[str] = None
    signing_time: Optional[str] = None
    is_trusted_ca: bool
    details: str

class QRVerificationResult(BaseModel):
    detected: bool
    status: CheckStatus
    payload_version: Optional[str] = None
    decoded_fields: Dict[str, Any] = {}
    is_payload_tampered: bool = False
    details: str

class DocumentProcessingResponse(BaseModel):
    document_id: str
    filename: str
    page_count: int
    signature_check: SignatureVerificationResult
    qr_check: QRVerificationResult
    extracted_fields: List[ExtractedField]
    overall_confidence: float
    processing_time_ms: int
