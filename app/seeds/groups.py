from app.models import db, Group, environment, SCHEMA


def seed_groups():
    group1 = Group(
        name='App students', owner_id=1)
    group2 = Group(
        name='Gym Sesh', owner_id=1)
    group3 = Group(
        name='Tree planting', owner_id=2)
    group4 = Group(
        name='Cooking class', owner_id=3)
    group5 = Group(
        name='Clean the house', owner_id=4)
    group6 = Group(
        name='Coding Group Project', owner_id=5)
    group7 = Group(
        name='Potluck dinner', owner_id=6)




    db.session.add(group1)
    db.session.add(group2)
    db.session.add(group3)
    db.session.add(group4)
    db.session.add(group5)
    db.session.add(group6)
    db.session.add(group7)
    db.session.commit()

def undo_groups():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.groups RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM groups")

    db.session.commit()