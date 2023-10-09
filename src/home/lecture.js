import {getTime, isActive, extractDate, parseTime } from './utils';
import {useNavigate, createSearchParams} from 'react-router-dom';

export default function Lecture(props){
    const navigate = useNavigate()
    const lecture = props.lecture
    let time = getTime()
    const handleLecture = (e) =>{
        e.preventDefault();
        if(!isActive(lecture["starttime"], lecture["endtime"], time)){
            alert("That lecture is not active")
            return
        }
        navigate({
            pathname: '/studentVerification',
            search: createSearchParams({
                lecture_id: e.target.attributes[0].value
            }).toString()
        })
    }
    return (
        <div onClick = {handleLecture} lec_id ={lecture["id"]} className={isActive(lecture["starttime"], lecture["endtime"], time) ? 'lecture-active' : 'lecture'}>
            <li key = {lecture["id"]} className='lecture_element'>
            <p className='lec_cont'>{lecture["room"]}</p>
            <p className='lec_cont'>{extractDate(lecture["starttime"])}</p>
            <p className='lec_cont'>{parseTime(lecture["starttime"])} - {parseTime(lecture["endtime"])}</p>
            <p className='lec_cont'></p>
        </li>
        </div>
    )
}