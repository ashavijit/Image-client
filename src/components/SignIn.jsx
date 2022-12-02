import React from 'react'
import {Link} from 'react-router-dom'

export default function SignIn() {
    const handleSignIn = ()=>{
        window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google/callback`,"_self")
    }
    return (
        <div className="authbox">
            <div className="google-btn" onClick={handleSignIn}>
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google logo"/>
                </div>
                <p className="btn-text"><b>Signin with google</b></p>
            </div>
            <p>New user ?<Link to="/signup">sign up</Link></p>
        </div>
    )
}
