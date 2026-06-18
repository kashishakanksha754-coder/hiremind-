"""UUID helper utilities."""
from uuid import UUID, uuid4


def new_uuid() -> str:
    """Return a new random UUID as a string."""
    return str(uuid4())


def is_valid_uuid(value: str) -> bool:
    """Return True if the given string is a valid UUID."""
    try:
        UUID(str(value))
        return True
    except (ValueError, AttributeError, TypeError):
        return False
