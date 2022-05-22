// Your code here
function createEmployeeRecord(array){
const employee = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],

}
return employee;
}
function createEmployeeRecords(employeeRecords){
    const result = []
    for(const employee of employeeRecords){
        result.push(createEmployeeRecord(employee));

    }
    return result;

}
function createTimeInEvent(record, timeStamp){
    const timeObj = {
        type: "TimeIn",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.slice(-4), 10)
    }
    record.timeInEvents.push(timeObj)
    return record;

}
function createTimeOutEvent(record, timeStamp){
    const timeObj = {
        type: "TimeOut",
        date: timeStamp.split(" ")[0],
        hour: parseInt(timeStamp.slice(-4), 10)
    }
    record.timeOutEvents.push(timeObj)
    return record;

}
function hoursWorkedOnDate(record, date){
    const timeIn = record.timeInEvents.find(e => {
        return e.date === date
    }).hour
    const timeOut = record.timeOutEvents.find(e => {
        return e.date === date
    }).hour
    return (timeOut - timeIn) / 100

}
function wagesEarnedOnDate(record, date){
let pay = 0
const hours = hoursWorkedOnDate(record, date)
pay += hours * record.payPerHour
return pay
}
function allWagesFor(record){
    let pay = 0;

    for (let i = 0; i< record.timeInEvents.length; i++){
        let payday = wagesEarnedOnDate(record, record.timeInEvents[i].date)
        pay += payday
    }
    return pay}

const calculatePayroll = (arr) => {
    const totalPay = arr.reduce((acc,record) =>{
        const totalPayForEmployee = allWagesFor(record)
        return acc + totalPayForEmployee
    }, 0)
    return totalPay
}