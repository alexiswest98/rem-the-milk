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
  print(user_id)
  follower = User.query.get(user_id)
  current_user.following.append(follower)
  db.session.commit()
  return 'Follower was added'

#Logged in as current user and unfollows selected user
@follow_routes.route('/delete/<int:user_id>', methods=["DELETE"])
@login_required
def unfollow_user(user_id):
  follower = User.query.get(user_id)
  current_user.following.remove(follower)
  db.session.commit()
  return 'Follower was removed'


# #get followers of current user
@follow_routes.route('/followers')
@login_required
def get_followers():
  results = db.session.query(follows).filter(follows.c.followed_id==current_user.id).all()
  list = []
  for result in results:
    list.append(result[0])
  return jsonify(list)


#get following of current user
@follow_routes.route('/following')
@login_required
def get_following():
   results = db.session.query(follows).filter(follows.c.follower_id==current_user.id).all()
   list = []
   for result in results:
    list.append(result[1])
   return jsonify(list)
