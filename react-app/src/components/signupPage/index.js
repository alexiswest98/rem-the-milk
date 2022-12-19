import React from "react";
import { useHistory, Link } from 'react-router-dom';
import SignUpForm from "../auth/SignUpForm";
import './index.css'
export default function SignUpPage() {

    return (
        <div className="signupPageMainDiv">
            <div className="signupBlueDiv">
                <div className="signupBlueOuterDiv">
                <div className="signupblueDivQuote">
                    <h3 className="signupblueDivQuoteH3">"Do you even lift bro? Cus you shouldn't!"</h3>
                    <p className="signupblueDivQuoteP"> -Tyler Short</p>
                </div>
            </div>
                </div>
            <div className="signupwhiteDiv">
                    <SignUpForm />
            </div>
        </div>
    )
}
