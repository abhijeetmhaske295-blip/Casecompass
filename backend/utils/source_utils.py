def create_snippet(full_text: str, target: str, max_len: int = 140) -> str:
    start_pos = full_text.find(target)
    if start_pos == -1:
        return target[:max_len]
    snippet = full_text[start_pos:start_pos + max_len].strip()
    return snippet.replace('\n', ' ')
