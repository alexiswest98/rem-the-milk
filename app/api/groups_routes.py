from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, Group, db
from ..forms.group_form import GroupForm
groups_routes = Blueprint('groups', __name__, url_prefix="/api/groups")

#get all groups of current user
@groups_routes.route('/all')
@login_required
def get_groups():
  groups = Group.query.filter(Group.owner_id == current_user.id).all()
  return jsonify([group.to_dict() for group in groups])

#delete a current user's group based on id
@groups_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_group(id):
    group = Group.query.get(id)

    if not group:
      return {'errors': ["There is no group"]}, 401
    #may want to change if group  can delete group as well
    if group.owner_id != current_user.id:
      return {'errors': ["You can't delete a group you did not originally create"]}, 401
    else:
      db.session.delete(group)
      db.session.commit()
      return jsonify("Group successfully deleted")

#create a group
@groups_routes.route('/create', methods=['POST'])
@login_required
def create_group():
  form = GroupForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    group = Group(
    name = form.data['name'],
    image_url= form.data['image_url'] if form.data['image_url'] else 'https://moodlehub.ca/pluginfile.php/6842/mod_book/chapter/9131/group2.jpg',
    owner_id=form.data['owner_id']
    )
    db.session.add(group)
    db.session.commit()
    return jsonify(group.to_dict())

  if form.errors:
    return jsonify(form.errors)
