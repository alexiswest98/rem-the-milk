import React from "react";
import { useHistory, Link } from 'react-router-dom';
import SignUpForm from "../auth/SignUpForm";
import './index.css'
export default function SignUpPage() {

    return (
        <div className="signupPageMainDiv">
            <div className="signupBlueDiv">
                <div className="signupBlueOuterDiv">

                {/* <div className="signupLogoTmDiv">
                    <Link>
                    <img className="signupblueDivLogo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsi4RrdJVGqgipNu4HjfNAP5IjcPbxfjirYYSNUK-bFw&s" alt="site logo" />
                    </Link>
                    <h2 className="signupblueDivH2">Remember The Leches ™</h2>
                </div> */}

                <div className="signupblueDivQuote">
                    <h3 className="signupblueDivQuoteH3">"Always bear in mind that your own resolution to succeed, is more important than any other thing."</h3>
                    <p className="signupblueDivQuoteP"> - Abraham Lincoln</p>
                </div>
            </div>
                </div>


            <div className="signupwhiteDiv">
                <div className="signupinnerWhiteDiv">
                    <SignUpForm />
                </div>

            </div>
        </div>
    )
}