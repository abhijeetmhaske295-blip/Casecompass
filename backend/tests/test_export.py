from services.report_generator import generate_markdown_report, generate_csv_report

def test_exports():
    md = generate_markdown_report()
    assert "CaseCompass" in md
    csv_data = generate_csv_report()
    assert "Title" in csv_data
