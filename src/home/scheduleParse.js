export default function ScheduleParse(props){
    return (
    <div className='schedule'>
    <h2 className='header'>{props.children}</h2>
    <ul key = {props.lectures} className='schedule_element'>{props.lectures}</ul>
    </div>
    )
}