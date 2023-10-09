export function parseTime(value){
    //2023-03-04T19:00:00
    return value.substr(11, 5) 

}

export function cmpDateToCurrent(referenceTime, timeNow){
    //returns:
    // 1 => referenceTime is before now
    // 0 => exact same time
    // -1 => referenceTime is after now
    let r = referenceTime.split('T')
    let n = timeNow.split(' ')
    let fst = r[0].split('-').concat(r[1].split(':'))
    let snd = n[0].split('-').concat(n[1].split(':'))

    for(let i = 0; i < fst.length; i++){
        if(parseInt(fst[i]) > parseInt(snd[i])){
            return -1
        }
        else if(parseInt(fst[i]) < parseInt(snd[i])){
            return 1
        }
    }
    return 0

}

export function getTime(){
    let today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    return dateTime

}

export function isActive(start, finish, now){
    return (cmpDateToCurrent(start, now) == 1 && cmpDateToCurrent(finish, now) == -1)
}

export function extractDate(value){
    return value.substr(0, 10)
}

export function componentDidMount() {
    if ("geolocation" in navigator) {
      console.log("Available");
    } else {
      console.log("Not Available");
    }
  }
export function tokenSyntax (token) {
    return 'Token ' + token
  }