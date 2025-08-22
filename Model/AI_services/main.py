from fastapi import FastAPI, UploadFile, File, Form
from pydantic import BaseModel
from typing import Optional, List
from routers import scan

app = FastAPI(title="Cyber Safety AI Service")

# Include the scan endpoint from router
app.include_router(scan.router, prefix="/scan")

@app.get("/")
def root():
    return {"message": "AI Service is running"}

