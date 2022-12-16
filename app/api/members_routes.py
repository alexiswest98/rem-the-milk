from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Group, User, db
from app.models.members import members

member_routes = Blueprint('members', __name__, url_prefix="/api/members")

# Logged in as current user and get all members based off group.id
@member_routes.route('/group/<int:groupId>', methods=["GET"])
@login_required
def get_members(groupId):
  membs = db.session.query(members).filter(members.c.group_id == groupId and members.c.user_id == current_user.id).all()
  # print("##############", membs)

  membslist = []
  for user in membs:
    currUser = User.query.get(user[0])
    membslist.append(currUser.to_dict())

  # print(membslist)
  return jsonify(membslist)


# #Logged in as current user and add members to a group
@member_routes.route('/group/<int:groupId>/add/<int:userId>', methods=["POST"])
@login_required
def add_memb(groupId, userId):
  membsInGroup = db.session.query(members).filter(members.c.group_id==groupId).all()
  newUser = User.query.get(userId)
  # print("##############", membsInGroup)
  group = Group.query.get(groupId)

  if not group:
    return {'errors': ['This group does not exist']}, 401

  for memb in membsInGroup:
    if memb[0] == userId:
      return {'errors': ['This user is already in the group.']}, 401
  else:
    group.users.append(newUser)
    db.session.commit()
    # print('__________', group.users)

    newMembers = [user.to_dict() for user in group.users]
    # print(newMembers)
    return jsonify(newMembers)
    # return jsonify(memb.to_dict() for memb in membsInGroup)


# #Logged in as current user and delete members to a group
@member_routes.route('/group/<int:groupId>/delete/<int:userId>', methods=["DELETE"])
@login_required
def delete_memb(groupId, userId):
  membsInGroup = db.session.query(members).filter(members.c.group_id==groupId).all()
  delUser = User.query.get(userId)
  # print("##############", membsInGroup)
  group = Group.query.get(groupId)

  if not group:
    return {'errors': ['This group does not exist']}, 401

  for memb in membsInGroup:
    if memb[0] == userId:
      group.users.remove(delUser)
      db.session.commit()

      newMembers = [user.to_dict() for user in group.users]
      # print(newMembers)
      return jsonify(newMembers)
  else:
    return {'errors': ['This user is not in the group.']}, 401
