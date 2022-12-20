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


  membslist = []
  for user in membs:
    currUser = User.query.get(user[0])
    membslist.append(currUser.mem_to_dict(groupId))
  # print('In the backend do wwe have the membs', membslist)
  return jsonify(membslist)

@member_routes.route('/all', methods=["GET"])
@login_required
def get_all_members():
  membs = db.session.query(members).filter(members.c.user_id == current_user.id).all()
  membslist = []
  for user in membs:
    currUser = Group.query.get(user[1])
    membslist.append(currUser.to_dict())
  # print('In the backend do wwe have the membs', membslist)
  return jsonify(membslist)


@member_routes.route('/add/<int:userId>/group/<int:groupId>', methods=["POST"])
@login_required
def add_memb(groupId, userId):
  membsInGroup = db.session.query(members).filter(members.c.group_id==groupId).all()
  newUser = User.query.get(userId)
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
@member_routes.route('/delete/<int:userId>/group/<int:groupId>', methods=["DELETE"])
@login_required
def delete_memb(groupId, userId):
  print('****************************************** Hit The Removal *******************************')
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
