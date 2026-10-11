from schemas import DeadlineItem

def detect_deadlines_from_events(events) -> list[DeadlineItem]:
    deadlines = []
    for evt in events:
        if evt.is_deadline and evt.date:
            urgency = "upcoming"
            if evt.date < "2024-05-15":
                urgency = "overdue"
            elif evt.date < "2024-06-15":
                urgency = "urgent"

            deadlines.append(DeadlineItem(
                id=f"dl_{evt.id}",
                title=evt.title,
                due_date=evt.date,
                document_id=evt.document_id,
                document_name=evt.document_name,
                urgency=urgency,
                notes=evt.description
            ))
    return deadlines
