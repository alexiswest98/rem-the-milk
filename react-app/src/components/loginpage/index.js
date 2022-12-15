import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import LoginForm from "../auth/LoginForm";
import './index.css'
export default function LoginPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    function signUpHistory() {
        history.push('/sign-up')
    }

    return (
        <div className="loginPageMainDiv">
            <div className="blueDiv">
                <div className="logoTmDiv">
                    <h2 className="blueDivH2">Remember The Leches ™</h2>
                </div>

                <div className="blueDivQuote">
                    <h3 className="blueDivQuoteH3">"Always bear in mind that your own resolution to succeed, is more important than any other thing."</h3>
                    <p className="blueDivQuoteP"> - Abraham Lincoln</p>
                </div>
            </div>


            <div className="whiteDiv">
                <button id='signupButtonLoginPage' onClick={() => signUpHistory() }>Sign Up</button>
            <LoginForm />
            </div>
        </div>
    )
}
