import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getAllUsersThunk } from '../../store/users';
import { followThunk } from '../../store/follows';
import { unfollowThunk } from '../../store/follows';

function UserDetails({ setShowModal }) {
    // const dispatch = useDispatch();
    // const { id } = useParams();
    // const spot = useSelector(state => state.spots[+id])
    // const user = useSelector(state => state.session.user)
    // // const userId = useSelector(state => state.session.user.id)
    // const reviews = Object.values(useSelector(state => state.reviews))
    // // console.log(spot)
    // let reviewExists = reviews.find(review => review.userId === user?.id);

    // let isOwner = spot?.ownerId === user?.id;

    // useEffect(() => {
    //     dispatch(getOneSpotThunk(+id))
    //     dispatch(getAllReviewsThunk(+id));
    // }, [dispatch, id])

    // if (!spot || !spot.SpotImages) return null;

    //here

    const followers = Object.values(useSelector(state => state.follows));
    const followerIds = followers.map(ele => ele.id);

    const followButton = (userId) => {
        setBoolean(!boolean)
        dispatch(followThunk(userId))
        history.push("/users")
       }

    return (
        <h1>INSERT HERE </h1>
        // {!followerIds.includes(user.id) &&
        //     <>
        //       <button onClick={ () => dispatch(followThunk(user.id))}>follow</button>
        //     </>
        //   }
        //   {followerIds.includes(user.id) &&
        //     <>
        //     <button onClick={ () => dispatch(unfollowThunk(user.id)) }>Unfollow</button>
        //     </>
        //   }
    )

}

export default IndivSpot;
