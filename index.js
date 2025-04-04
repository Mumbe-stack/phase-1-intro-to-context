// Your code here
function createEmployeeRecord ([firstName, familyName, title, payPerHour]){
    return{
    firstName : firstName,
    familyName : familyName,
    title : title,
    payPerHour : payPerHour,
    timeInEvents : [],
    timeOutEvents : []
    }
};

function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(createEmployeeRecord)

};

function createTimeInEvent (employeeRecord , dateStamp){
    const [date, hour] = dateStamp.split(' ');
    employeeRecord.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour),
      date: date
    });
    return employeeRecord;

};

function createTimeOutEvent (employeeRecord , dateStamp){
    const [date, hour] = dateStamp.split(' ');
  employeeRecord.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour),
    date: date
  });
  return employeeRecord;

};

function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(e => e.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(e => e.date === date);
  
   
    if (!timeIn || !timeOut) {
      return 0;  
    }
  
    return (timeOut.hour - timeIn.hour) / 100;  
  };

  function wagesEarnedOnDate(employeeRecord, date){

    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour
  };

  function allWagesFor(employeeRecord){
    return employeeRecord.timeInEvents.reduce((total, timeInEvent) => {
        const date = timeInEvent.date;
        return total + wagesEarnedOnDate(employeeRecord, date);
      }, 0);

  };

  function calculatePayroll(employeeRecord){

    return employeeRecord.reduce((total, record) => total + allWagesFor(record), 0);
  }
  