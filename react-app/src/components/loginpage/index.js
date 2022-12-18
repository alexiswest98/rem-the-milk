import React from "react";
import { Link, useHistory } from 'react-router-dom'
import LoginForm from "../auth/LoginForm";
import './index.css'
export default function LoginPage() {
    const history = useHistory();

    function signUpHistory() {
        history.push('/sign-up')
    }

    return (
        <div className="loginPageMainDiv">
            <div className="blueDiv">
                <div className="blueOuterDiv">

                    {/* <div className="logoTmDiv">
                        <Link>
                            <img className="blueDivLogo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsi4RrdJVGqgipNu4HjfNAP5IjcPbxfjirYYSNUK-bFw&s" alt="site logo" />
                        </Link>
                        <h2 className="blueDivH2">Remember The Leches ™</h2>
                    </div> */}

                    <div className="blueDivQuote">
                        <h3 className="blueDivQuoteH3">"Always bear in mind that your own resolution to succeed, is more important than any other thing."</h3>
                        <p className="blueDivQuoteP"> - Abraham Lincoln</p>
                    </div>
                </div>
            </div>


            <div className="whiteDiv">
                <div className="innerWhiteDiv">
                    <LoginForm />
                </div>

            </div>
        </div>
    )
}
