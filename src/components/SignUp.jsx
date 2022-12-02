import React from 'react'
import {Link} from 'react-router-dom'

export default function SignIn() {
    const handleSignUp = ()=>{
        // console.log(`${process.env.SERVER_URL}/auth/google/callback`)
        window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google/callback`,"_self")
    }
    return (
        <div className="authbox">
            <div className="google-btn" onClick={handleSignUp}>
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google logo"/>
                </div>
                <p className="btn-text"><b>Signup with google</b></p>
            </div>
            <p>Already user ?<Link to="/">sign in</Link></p>
        </div>
    )
}
