import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    app_name: str = "CaseCompass API"
    environment: str = os.getenv("ENVIRONMENT", "development")
    host: str = os.getenv("HOST", "0.0.0.0")
    port: int = int(os.getenv("PORT", 8000))
    cors_origins: str = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000")
    max_upload_size_mb: int = int(os.getenv("MAX_UPLOAD_SIZE_MB", 25))

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

settings = Settings()
