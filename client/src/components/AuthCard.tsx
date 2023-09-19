import React, { useState } from 'react'
import LoginForm from './loginForm'
import SignupForm from './signupForm'

export default function AuthCard() {

    const [loginF, setLoginF] = useState(true)

  return loginF
        ?   <div>
                <LoginForm/>
                <p className='lsButton'>Don't have an account?
                    <button onClick={()=>setLoginF(false)}>Signup</button>
                </p>
            </div>
        :   <div>
                <SignupForm/>
                <p className='lsButton'>Already have an account?
                    <button onClick={()=>setLoginF(true)}>Login</button>
                </p>
            </div>
    
}

