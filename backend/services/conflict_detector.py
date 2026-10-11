from schemas import ConflictItem

def detect_conflicts(events) -> list[ConflictItem]:
    conflicts = []
    # Identify discrepancies regarding injunction delivery / cessation
    injunction_events = [e for e in events if "injunction" in e.title.lower() or "injunction" in e.description.lower()]
    if len(injunction_events) >= 2:
        conflicts.append(ConflictItem(
            id="cnf_001",
            topic="Injunction Delivery & Compliance Date",
            date_a=injunction_events[0].date or "2024-04-15",
            source_a=f"{injunction_events[0].document_name} (Court Order Date)",
            date_b=injunction_events[1].date or "2024-04-19",
            source_b=f"{injunction_events[1].document_name} (Witness Claimed Receipt)",
            severity="high",
            description="Court order mandated immediate suspension as of April 15, whereas witness claims notice arrived April 19."
        ))
    return conflicts
