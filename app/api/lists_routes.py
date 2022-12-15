from flask import Blueprint, render_template, jsonify, request, json
from flask_login import login_required, current_user
from app.models import List, db, Task
from app.forms.list_form import ListForm


lists_routes = Blueprint('lists', __name__, url_prefix="/api/lists")

#get all lists by user
@lists_routes.route('/all', methods=['GET'])
@login_required
def lists_by_user():
  # print(current_user.id)
  lists = List.query.filter(List.user_id == current_user.id).all()
  list_obj = [list.to_dict() for list in lists]
  return jsonify(list_obj)

#get all lists of a group by group id
@lists_routes.route('/groups/<int:group_id>')
@login_required
def lists_by_group(group_id):
  lists = List.query.filter(List.group_id == group_id and List.user_id == current_user.id).all()
  list_obj = [list.to_dict() for list in lists]
  return jsonify(list_obj)

#get list by id !!!!!! NEED ???
@lists_routes.route('/<int:list_id>')
@login_required
def get_list(list_id):
  list = List.query.get(list_id)
  if list:
    return jsonify(list.to_dict())
  else:
    return {'errors': ['That list does not exist']}, 401

#create new list
@lists_routes.route('/', methods=['POST'])
@login_required
def create_lists():
  form = ListForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  # print("********************", form.data)

  if form.validate_on_submit():
    new_list = List(
      name = data['name'],
      user_id = data['user_id'],
      due = data['due'],
      notes = data['notes'],
      group_id = data['group_id']
    )
    db.session.add(new_list)
    db.session.commit()
    return jsonify(new_list.to_dict())
  return jsonify(form.errors)

#update list by id
@lists_routes.route('/<int:list_id>', methods=['PUT'])
@login_required
def update_list(list_id):
  form = ListForm()
  list = List.query.get(list_id)
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data

  if list and form.validate_on_submit():
    list.name = data['name'] if data['name'] else json.loads(list.name)
    list.user_id = data['user_id'] if data['user_id'] else json.loads(list.user_id)
    list.due = data['due'] if data['due'] else json.loads(list.due)
    list.notes = data['notes'] if data['notes'] else json.loads(list.notes)
    list.group_id = data['group_id'] if data['group_id'] else json.loads(list.group_id)
    # db.session.update()
    db.session.commit()
    return (list.to_dict())
  if not list:
    return {'errors': ['That list does not exist']}, 401
  else:
    return jsonify(form.errors)


#delete list by id
@lists_routes.route('/<int:list_id>', methods=['DELETE'])
@login_required
def delete_list(list_id):
  list = List.query.get(list_id)
  tasks = Task.query.filter(Task.list_id == list_id).all()
  if list:
    for task in tasks:
      db.session.delete(task)
      db.session.commit()
    db.session.delete(list)
    db.session.commit()
    return jsonify('Successfully deleted list and associated tasks')
  return {'errors': ['That list does not exist']}, 401
