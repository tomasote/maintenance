import React ,{ useState, useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {PrintSchedule} from './printSchedule';

async function fetchSchedules(){
    try{
        const data = await fetch('http://localhost:8000/api/personalAll/',{
        method: 'get',
        mode: 'cors',
        headers:{
            Authorization: localStorage.getItem('auth-token'),
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json; charset=utf-8',
        }
        })
        return data
    }
    catch(error){
        console.log(error)
    }
}

export default function Schedule() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [data, setData] = useState({})

    useEffect(() =>{
        fetchSchedules().then(response => {
            const statusCode = response.status
            const data = response.json()
            return Promise.all([statusCode, data])
        })
        .then(data => {
        if(data[0] !== 200){
            if(data[0] === 401){
                navigate('/login')
            }
            alert('Wrong information')
            return
        }
        else{
            console.log(data[1])
            setData(data[1])
        }
        })
        
    }, [])
    return (
        <>
        <h1 className='header'>{`Welcome, ${searchParams.get('fn')} ${searchParams.get('ln')}!`}</h1>
        <h2 className='header'>Schedules</h2>
        <PrintSchedule className='schedules' key ={0} data = {data}></PrintSchedule>
        </>
    
    )
    
}