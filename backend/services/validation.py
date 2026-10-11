def validate_confidence(score: float) -> bool:
    return 0.0 <= score <= 1.0

def validate_date_format(date_str: str) -> bool:
    import re
    return bool(re.match(r"^\d{4}-\d{2}-\d{2}$", date_str))
