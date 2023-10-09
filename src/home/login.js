import React ,{ useState} from 'react';
import { Link} from "@mui/material";
import { useNavigate, createSearchParams} from 'react-router-dom';
import { tokenSyntax } from './utils';

async function login(username, password){
    const payLoad ={
        "username": username,
        "password": password
    } 
    try{
        const data = await fetch('http://localhost:8000/api/login/', {
            method: 'post',
            mode: 'cors',
            headers: new Headers({
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json; charset=utf-8',
            }),
            body: JSON.stringify(payLoad)
        })
        
        return data
    }
    catch (error){
        alert(error)
    }

}
export default function Login() {
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password)
            .then(response => {
                console.log(response.errors)
                const statusCode = response.status
                const data = response.json()
                return Promise.all([statusCode, data])
            })
            .then(data => {
            console.log(data)
            if(data[0] !== 200){
                alert('Wrong information')
                return
            }
            else{
                localStorage.setItem("auth-token", tokenSyntax(data[1]["token"]))
                console.log(localStorage.getItem("auth-token"))
                navigate({
                    pathname: '/schedule',
                    search: createSearchParams({
                        fn: data[1]["first_name"],
                        ln: data[1]["last_name"],
                    }).toString()
                })
            }
            })
    
    }
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    return (

         <form className = "forms-login" onSubmit={handleSubmit}>
            <h2 className='header'>Username *</h2>
            <input className = "field" label="Username" required={true} onChange={(e) => setUsername(e.target.value)}>
            </input>
            <h2 className='header'>Password *</h2>
            <input className = "field" label="Password" type="password" required={true} onChange={(e) => setPassword(e.target.value)}></input>
            <br/>
            <button className = "buttons" variant="contained" type="submit">Sign In</button>
            <nav>
        <Link href ="/login/signup" className="nav-link">
            <button className = "buttons" variant="contained" type={"button"} >
                Sign Up
            </button>
        </Link>
        </nav>
        </form>

       
    )
}


