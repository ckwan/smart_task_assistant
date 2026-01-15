from sqlalchemy import text
from sqlalchemy.orm import Session


def create_project(
    db: Session,
    name: str,
    description: str | None,
    owner_id: int,
):
    query = text("""
        INSERT INTO projects (name, description, owner_id)
        VALUES (:name, :description, :owner_id)
        RETURNING id, name, description, owner_id, created_at
    """)

    result = db.execute(
        query,
        {
            "name": name,
            "description": description,
            "owner_id": owner_id,
        },
    ).mappings().first()

    db.commit()
    return result


def get_projects_by_owner(db: Session, owner_id: int):
    query = text("""
        SELECT id, name, description, owner_id, created_at
        FROM projects
        WHERE owner_id = :owner_id
        ORDER BY created_at DESC
    """)

    result = db.execute(query, {"owner_id": owner_id}).mappings().all()
    return result
