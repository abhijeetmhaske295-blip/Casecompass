
import uuid
from datetime import date, datetime

from sqlalchemy import Date, DateTime, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


def generate_id() -> str:
    return str(uuid.uuid4())


class Deadline(Base):
    __tablename__ = "deadlines"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=generate_id
    )
    case_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("cases.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    document_id: Mapped[str | None] = mapped_column(
        String(36),
        ForeignKey("documents.id", ondelete="SET NULL"),
        nullable=True,
        index=True,
    )
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    date_text: Mapped[str | None] = mapped_column(String(255), nullable=True)
    normalized_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    date_status: Mapped[str] = mapped_column(
        String(30), default="unknown", nullable=False
    )
    review_status: Mapped[str] = mapped_column(
        String(30), default="pending", nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    case: Mapped["Case"] = relationship(back_populates="deadlines")
    document: Mapped["Document | None"] = relationship()
