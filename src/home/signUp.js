import React  from 'react';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

async function register(firstName, lastName, email, username, password, confirmPassword){
    if(password !== confirmPassword){
        alert("Passwords do not match");
        return
    }
    try{
        const data = await fetch('http://localhost:8000/api/register/', {
            method: 'post',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "email": email,
                "first_name": firstName,
                "last_name": lastName
            })
        })
        return data
    }
    catch (error){
        console.log(error)
    }

}


export default function SignUp() {
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        register(firstName, lastName, email, username, password, confirmPassword)
        .then((response) => {
            const statusCode = response.status
            const data = response.json()
            return Promise.all([statusCode, data])
        })
        .then(data =>{
            if(data[0] === 201){
                navigate('/login')
            }
            else{
                alert('Something went wrong')
            }
        })

        
    }
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');

    return (
        <form className = "forms" align={"center"} onSubmit={handleSubmit}>
            <h2 className='header'>First name *</h2>
            <input className = "field" label="FirstName" required={true} onChange={(e) => setFirstName(e.target.value)}></input>
            <h2 className='header'>Last name *</h2>
            <input className = "field" label="LastName" required={true} onChange={(e) => setLastName(e.target.value)}></input>
            <h2 className='header'>E-mail *</h2>
            <input className = "field" label="Email" type="email" required={true} onChange={(e) => setEmail(e.target.value)}></input>
            <h2 className='header'>Username *</h2>
            <input className = "field" label="Username" required={true} onChange={(e) => setUsername(e.target.value)}>
            </input>
            <h2 className='header'>Password *</h2>
            <input className = "field" label="Password" type="password" required={true} onChange={(e) => setPassword(e.target.value)}></input>
            <h2 className='header'>Re-enter password *</h2>
            <input className = "field" label="Re-enter Password" type="password" required={true} onChange={(e) => setConfirmPassword(e.target.value)}></input>
            <button className = "buttons" variant="contained" type="submit">Sign Up</button>
        </form>
    )
}

