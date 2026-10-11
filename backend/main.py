from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from api.documents import router as documents_router
from api.analysis import router as analysis_router
from api.export import router as export_router

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="CaseCompass Legal Analysis & Timeline Generation API"
)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(documents_router, prefix="/api/documents", tags=["Documents"])
app.include_router(analysis_router, prefix="/api/analysis", tags=["Analysis"])
app.include_router(export_router, prefix="/api/export", tags=["Export"])

@app.get("/api/health")
def health_check():
    return {"status": "ok", "app": settings.app_name, "version": "1.0.0"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=settings.host, port=settings.port, reload=True)
