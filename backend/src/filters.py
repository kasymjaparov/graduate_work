from sqlalchemy import inspect


def filter_query(model, query, filters):
    for k, v in filters.dict(exclude_none=True).items():
        column = getattr(model, k, None)
        if column is None:
            continue
        column_type = inspect(column).type.python_type
        if column_type is str and v:
            query = query.filter(column.ilike(f"%{v}%"))
        else:
            query = query.filter(column == v)
    return query
