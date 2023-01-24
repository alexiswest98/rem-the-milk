import React from "react";
import { Link, useHistory } from 'react-router-dom'
import LoginForm from "../auth/LoginForm";
import './index.css';
import milk from "../../Images/lilleche.png"

export default function LoginPage() {
    const history = useHistory();

    function signUpHistory() {
        history.push('/sign-up')
    }

    return (
        <div className="loginPageMainDiv">
            <div className="blueDiv">
                <div className="blueOuterDiv">
                    <div className="blueDivQuote">
                        <h3 className="blueDivQuoteH3">“If debugging is the process of removing software bugs, then programming must be the process of putting them in.”</h3>
                        <div className="credentials">
                            <p className="blueDivQuoteP"> ― Edsger W. Dijkstra</p>
                            <img src={milk} className="lilleche"></img>
                        </div>
                        {/* <img src={milk} className="lilleche"></img> */}
                    </div>
                </div>
            </div>
            <div className="whiteDiv">
                <LoginForm />
            </div>
        </div>
    )
}
