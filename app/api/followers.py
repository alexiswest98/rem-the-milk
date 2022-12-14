from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db
from app.models.followers import follows

follow_routes = Blueprint('follows', __name__)

#  demo.followers.append(evan_morgan)

#  demo.following.append(marnie)

#Logged in as current user and follow selected user
@follow_routes.route('/add/<int:user_id>', methods=["POST"])
@login_required
def follow_user(user_id):
  # print(user_id)
  follower = User.query.get(user_id)

  checkifFollowing = db.session.query(follows).filter(follows.c.followed_id==current_user.id).all()
  # print("ALLLLL _______", checkifFollowing)

  for combo in checkifFollowing:
    if combo[0] == follower.id:
      # print("********** True")
      return {'errors': ['Woops! You already follow this User']}, 401
  else:
    current_user.following.append(follower)
    db.session.commit()
    return jsonify(follower.to_dict())

#Logged in as current user and unfollows selected user
@follow_routes.route('/delete/<int:user_id>', methods=["DELETE"])
@login_required
def unfollow_user(user_id):
  follower = User.query.get(user_id)

  checkifFollowing = db.session.query(follows).filter(follows.c.followed_id==current_user.id).all()
  print("ALLLLL _______", checkifFollowing)

  for each in checkifFollowing:
    print(each)
    if each[0] == follower.id:
      print("#################", each[0])
      print('they are following them and can be removed')
      current_user.following.remove(follower)
      db.session.commit()
      return jsonify(follower.to_dict())
  else:
    print("********** don't follow this user")
    return {'errors': ["You don't follow this User"]}, 401


# #get followers of current user
@follow_routes.route('/followers')
@login_required
def get_followers():
  results = db.session.query(follows).filter(follows.c.followed_id==current_user.id).all()

  list = []
  dictionary = []

  for result in results:
    list.append(result[0])
  
  print(list)

  for index in list:
    curr = User.query.get(index)
    dictionary.append(curr.to_dict())
    print(dictionary)

  return jsonify(dictionary)


#get following of current user
@follow_routes.route('/following')
@login_required
def get_following():
  results = db.session.query(follows).filter(follows.c.follower_id==current_user.id).all()

  list = []
  dictionary = []

  for result in results:
    list.append(result[1])

  for index in list:
    curr = User.query.get(index)
    dictionary.append(curr.to_dict())
    print(dictionary)

  return jsonify(dictionary)