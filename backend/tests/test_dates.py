from services.date_parser import normalize_date_string

def test_normalize_date():
    assert normalize_date_string("April 15, 2024") == "2024-04-15"
    assert normalize_date_string("15th day of April, 2024") == "2024-04-15"
