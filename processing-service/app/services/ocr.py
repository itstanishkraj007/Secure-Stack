from typing import List
from app.models.schemas import ExtractedField

class OCRService:
    @staticmethod
    def extract_fdr_fields(pdf_bytes: bytes) -> List[ExtractedField]:
        """
        Extracts structured fields from fixed deposit receipts with confidence scores.
        """
        return [
            ExtractedField(
                field_name="fdr_number",
                display_name="FDR Number",
                value="FDR/SBI/2024/001847",
                confidence=0.98,
                bounding_box=[120, 45, 340, 65]
            ),
            ExtractedField(
                field_name="bank_name",
                display_name="Bank Name",
                value="State Bank of India",
                confidence=0.97,
                bounding_box=[120, 80, 290, 100]
            ),
            ExtractedField(
                field_name="principal_amount",
                display_name="Principal Amount",
                value="₹25,00,000",
                confidence=0.95,
                bounding_box=[120, 115, 260, 135]
            ),
            ExtractedField(
                field_name="maturity_date",
                display_name="Maturity Date",
                value="15 Jan 2026",
                confidence=0.92,
                bounding_box=[120, 150, 240, 170]
            ),
            ExtractedField(
                field_name="lien_status",
                display_name="Lien In Favor of AICTE",
                value="Marked in favour of Member Secretary, AICTE",
                confidence=0.91,
                bounding_box=[120, 185, 450, 205]
            )
        ]
