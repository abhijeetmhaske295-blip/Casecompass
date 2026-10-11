
import uuid

from sqlalchemy import ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


def generate_id() -> str:
    return str(uuid.uuid4())


class EventEvidence(Base):
    __tablename__ = "event_evidence"

    id: Mapped[str] = mapped_column(
        String(36), primary_key=True, default=generate_id
    )
    event_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("timeline_events.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    document_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey("documents.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    page_number: Mapped[int | None] = mapped_column(Integer, nullable=True)
    quote: Mapped[str] = mapped_column(Text, nullable=False)

    event: Mapped["TimelineEvent"] = relationship(back_populates="evidence")
    document: Mapped["Document"] = relationship()
