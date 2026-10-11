from utils.source_utils import create_snippet

def test_snippet_generator():
    text = "Important court text regarding the party injunction."
    snip = create_snippet(text, "injunction")
    assert "injunction" in snip
