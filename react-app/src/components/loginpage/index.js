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
                    <div className="blueDivQuote">
                        <h3 className="blueDivQuoteH3">âIf debugging is the process of removing software bugs, then programming must be the process of putting them in.â</h3>
                        <p className="blueDivQuoteP"> â Edsger W. Dijkstra</p>
                    </div>
                </div>
            </div>
            <div className="whiteDiv">
                <LoginForm />
            </div>
        </div>
    )
}
