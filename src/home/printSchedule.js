import ScheduleParse from './scheduleParse';
import Lecture from './lecture';

export function PrintSchedule(props){
    const data = props.data
    const schedules = []

    for(let schedule in data){
        let lectures = []
        for(let values in data[schedule]){
            lectures.push(<Lecture lecture = {data[schedule][values]}></Lecture>)
        }
        schedules.push(<ScheduleParse lectures = {lectures}>{schedule}</ScheduleParse>)
    }

    
    return <div className='schedules'>{schedules}</div>
}