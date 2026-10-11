from services.review_service import get_all_conflicts

def test_conflicts_detection():
    conflicts = get_all_conflicts()
    assert len(conflicts) >= 1
