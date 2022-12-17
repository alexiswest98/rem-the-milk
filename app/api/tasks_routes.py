from flask import Blueprint, jsonify, redirect, request
from flask_login import login_required, current_user
from datetime import date, datetime, timedelta
from app.models import Task, db
from app.forms.task_form import CreateTaskForm

tasks_routes = Blueprint('tasks', __name__, url_prefix="/api/tasks" )

#get all tasks by user
@tasks_routes.route('/all', methods=["GET"])
@login_required
def get_all_tasks():
  tasks = Task.query.filter(Task.user_id == current_user.id).all()
  taskobject = [task.to_dict() for task in tasks]
  # print(task.name for task in tasks)
  return jsonify(taskobject)

#get all tasks by id !!!!!! NEED ???
@tasks_routes.route('/<int:task_id>', methods=["GET"])
@login_required
def get_tasks(task_id):
  task = Task.query.get(task_id)
  if task:
    return jsonify(task.to_dict())
  else:
    return {'errors': ['That task does not exist']}, 401

#get specific list's tasks
@tasks_routes.route('/lists/<int:list_id>', methods=["GET"])
@login_required
def get_list_tasks(list_id):
    listTasks = Task.query.filter(Task.list_id == list_id and Task.user_id == current_user.id).all()
    # print(listTasks)
    taskobject = [task.to_dict() for task in listTasks]
    return jsonify(taskobject)

#get all tasks for day
@tasks_routes.route('/day', methods=["GET"])
@login_required
def get_day_tasks():
  today = date.today()
  # Textual month, day and year
  # d2 = today.strftime("%d/%m/%Y")
  # print("CURRENT TODAY********", today)
  # print("d2 =", d2)

  tasks = Task.query.filter(Task.due == today  and Task.user_id == current_user.id).all()
  taskobject = [task.to_dict() for task in tasks]
  return jsonify(taskobject)

# get all tasks for tomorrow
@tasks_routes.route('/tomorrow', methods=["GET"])
@login_required
def get_tmo_tasks():
  tomorrow = datetime.now() + timedelta(1)
  # strftime = Textual month, day and year
  d2 = tomorrow.strftime("%Y-%m-%d")
  # print("CURRENT TODAY********", d2)

  tasks = Task.query.filter(Task.due == d2 and Task.user_id == current_user.id)
  # print(tasks)
  taskobject = [task.to_dict() for task in tasks]
  return jsonify(taskobject)

# get all tasks for month
@tasks_routes.route('/month', methods=["GET"])
@login_required
def get_month_tasks():
  today = date.today()
  # strftime = Textual month, day and year
  d2 = today.strftime("%Y-%m")
  # print("CURRENT TODAY********", d2)

  tasks = Task.query.filter(Task.user_id == current_user.id).all()
  new_tasks = [task for task in tasks if task.due.strftime("%Y-%m") == d2]

  taskobject = [task.to_dict() for task in new_tasks]
  return jsonify(taskobject)

# #create new simple task
@tasks_routes.route('/new', methods=['POST'])
@login_required
def create_task():
  form = CreateTaskForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  # print('**********************', data, '**********************')
  if form.validate_on_submit():
    new_task = Task(
      name = data['name'],
      user_id = data['user_id'],
      list_id = data['list_id'],
      due = data['due'],
      notes = data['notes']
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict())
  return jsonify(form.errors)


# #update task by id
@tasks_routes.route('/<int:task_id>', methods=['PUT'])
@login_required
def update_task(task_id):
  form = CreateTaskForm()
  task = Task.query.get(task_id)
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  # print('**********************', data)
  if task and form.validate_on_submit():
    task.name = data['name']
    task.user_id = data['user_id']
    task.due = data['due']
    task.notes = data['notes']
    task.completed_by = data['completed_by']
    db.session.commit()
    return (task.to_dict())
  if not task:
    return {'errors': ['That task does not exist']}, 401
  else:
    return jsonify(form.errors)


# #delete task by id
@tasks_routes.route('/<int:task_id>', methods=['DELETE'])
@login_required
def delete_task(task_id):
  task = Task.query.get(task_id)
  if task:
    db.session.delete(task)
    db.session.commit()
    return jsonify('Successfully deleted task')
  return jsonify('This task does not exist')
