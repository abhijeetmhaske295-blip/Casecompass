def format_source_citation(doc_name: str, snippet: str, line_num: int = 1) -> str:
    return f"[{doc_name}:L{line_num}] \"{snippet}\""
