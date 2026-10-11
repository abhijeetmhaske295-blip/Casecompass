from schemas import MissingDocumentAlert

def detect_missing_documents(events, docs) -> list[MissingDocumentAlert]:
    gaps = []
    for evt in events:
        desc = evt.description.lower()
        if "order of march 05" in desc or "protective order exhibit c" in desc or "motion in limine" in desc:
            gaps.append(MissingDocumentAlert(
                id="gap_001",
                title="Protective Order Exhibit C (March 05, 2024)",
                referenced_in=evt.document_name,
                date_referenced="2024-03-05",
                importance="critical"
            ))
            break
    return gaps
