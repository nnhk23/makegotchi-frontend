import React from 'react';
import FormRender from './FormRender';

const SignUp = ({setUser}) => {

   const createUser = (user) => {
        const configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(user)
        }

        fetch('http://localhost:3000/users', configObj)
        
        .then(res => res.json())
        .then(createdUser => setUser(createdUser))
        .catch(() => {alert("Username has to be unique")})
    }


    return (
        <div>
            <div className="tempDiv">
                <h1>Log in or Sign up</h1>
                <FormRender createUser={createUser}/>
            </div>
        </div>
    );
}

export default SignUp;
