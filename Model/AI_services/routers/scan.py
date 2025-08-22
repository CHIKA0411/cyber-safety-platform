# ai-service/routers/scan.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict

router = APIRouter()

class ScanRequest(BaseModel):
    url: Optional[str] = None
    imageBase64: Optional[str] = None
    text: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None

class ScanResponse(BaseModel):
    score: int
    label: str
    reasons: List[str]
    artifacts: Dict[str, List[str]]
    reputation: Optional[Dict[str, Optional[str]]] = None

@router.post("/", response_model=ScanResponse)
async def scan(request: ScanRequest):
    # Placeholder logic for demo
    if not any([request.url, request.imageBase64, request.text, request.phone, request.email]):
        raise HTTPException(status_code=400, detail="At least one input must be provided")

    # TODO: Insert your AI / rule-based logic here to generate real results
    response = ScanResponse(
        score=50,
        label="suspicious",
        reasons=["Demo reason: input received"],
        artifacts={"urls": [], "phones": [], "emails": []},
        reputation={"count": 0, "firstSeen": None}
    )
    return response
