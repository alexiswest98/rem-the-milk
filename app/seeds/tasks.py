from app.models import db, Task, environment, SCHEMA
from datetime import date

def seed_tasks():
    task1 = Task(
        name='Buy my starbies', user_id=1, due=date(2023, 10, 9), notes='Grind Coffee', list_id=1 
        )
    task2 = Task(
        name='Buy some cat food', user_id=1, due=date(2023, 10, 9), notes='Must be vegan, fair trade, and from Colombia', list_id=1 
        )
    task3 = Task(
        name='Buy some ice cream', user_id=1, due=date(2023,10,9), notes='Must be Mcconnells', list_id=1 
        )
    task4 = Task(
        name='Fold some clothes', user_id=1, due=date(2023,5,24), notes='Hang them as well', list_id=2 
        )
    task5 = Task(
        name='Do the dishes', user_id=1, due=date(2023, 5, 24), notes='If time allows ', list_id=2
        )
    task6 = Task(
        name='Check in for progress tracker', user_id=1, due=date(2023, 5, 24), notes='REMEMBER PLEASE', list_id=2
        )
    task7 = Task(
    name='Mow the lawn', user_id=1, due=date(2023, 2 , 12), notes="Don't aim grass clippings towards street", list_id=3
    )
    task8 = Task(
    name='Rake leaves', user_id=1, due=date(2023, 3, 20), list_id=3
    )
    task9 = Task(
    name='Edge the grass', user_id=1, due=date(2023, 3, 20), notes='Edge After mowing', list_id=3
    )
    task10 = Task(
    name='Study for coding test', user_id=1, due=date(2023, 3, 20), notes='Research array methods'
    )
    task11 = Task(
    name='Get a oil change for the car', user_id=1, due=date(2023, 4 ,7), notes="Go to Michael's car garage"
    )
    task12 = Task(
        name='Make sure no one is overwriting data on Git', user_id=1, due=date(2023, 5, 3), notes='Remember to push often', list_id=4
    )
    task13 = Task(
    name='Finish all CRUD for Tasks', user_id=1, due=date(2023, 5, 1), notes="Don't forget to style!", list_id=4
    )
    task14 = Task(
    name='Create modals', user_id=1, due=date(2023, 5, 2), notes="redirecting sucks", list_id=4
    )

    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)
    db.session.add(task6)
    db.session.add(task7)
    db.session.add(task8)
    db.session.add(task9)
    db.session.add(task10)
    db.session.add(task11)
    db.session.add(task12)
    db.session.add(task13)
    db.session.add(task14)




    db.session.commit()

def undo_tasks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM tasks")

    db.session.commit()