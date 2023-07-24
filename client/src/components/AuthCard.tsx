import React, { useState } from 'react'
import LoginForm from './loginForm'
import SignupForm from './signupForm'

export default function AuthCard() {

    const [login, setLogin] = useState(true)

  return login
        ?   <div>
                <LoginForm/>
                <p>Don't have an account?
                <button onClick={()=>setLogin(false)}>Signup</button>
                </p>
            </div>
        :   <div>
                <SignupForm/>
                <p>Already have an account?
                <button onClick={()=>setLogin(true)}>Login</button>
                </p>
            </div>
    
}

