import enum


class Type(str, enum.Enum):
    admin = "admin"
    client = "client"
    meauser = "meauser"
    designer = "designer"
    manager = "manager"
    builder = "builder"
