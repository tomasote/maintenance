import React ,{useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';


function componentDidMount() {
    return "geolocation" in navigator
  }

async function verifyAttendance(code, lat, lon, lectureID){
    const payLoad = {
        code: code,
        lat: lat.toString(),
        lon: lon.toString()
    }
    try{
        const data = await fetch('http://localhost:8000/api/attend/' + lectureID,{
        method: 'post',
        mode: 'cors',
        headers:{
            Authorization: localStorage.getItem('auth-token'),
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payLoad)
        })
        return data
    }
    catch(error){
        console.log(error)
    }
}

export default function MyForm() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [code, setCode] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [lectureID, setLectureID] = useState('')
    useEffect(() =>{
        setLectureID(searchParams.get('lecture_id'))
    }, [])
    
    if(!componentDidMount()){
        alert('Allow locations services')
    }
    else{
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
          });
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        verifyAttendance(code, latitude, longitude, lectureID)
        .then(response => {
            const statusCode = response.status
            const data = response.json()
            return Promise.all([statusCode, data])
        })
        .then(data => {
            if(data[0] === 200){
                alert('Successfully attended')
                navigate('/schedule')
            }
            else{
                alert(data[1]["error"])
            }
        })
    }
    return (
        <form className='forms' onSubmit={handleSubmit}>
            <h2 className='header'>Enter verification code:</h2>
            <input className='field' maxLength="8" onChange={(e) => setCode(e.target.value)}/>
            <button className='buttons' type={"submit"}>Verify</button>
        </form>
    )
    
}
