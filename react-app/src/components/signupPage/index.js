import React from "react";
import { useHistory, Link } from 'react-router-dom';
import SignUpForm from "../auth/SignUpForm";
import './index.css';
import milk from "../../Images/lilleche.png"

export default function SignUpPage() {
    return (
        <div className="signupPageMainDiv">
            <div className="signupBlueDiv">
                <div className="signupBlueOuterDiv">
                <div className="signupblueDivQuote">
                    <h3 className="signupblueDivQuoteH3">"If, at first, you do not succeed, call it version 1.0."</h3>
                    <div className="credentials">
                        <p className="signupblueDivQuoteP"> -Khayri R.R. Woulfe</p>
                        <img src={milk} className="lilleche"></img>
                    </div>
                </div>
            </div>
                </div>
            <div className="signupwhiteDiv">
                    <SignUpForm />
            </div>
        </div>
    )
}
