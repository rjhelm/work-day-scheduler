// Workday Scheduler Code
$(function () {});
// moment time variables
let now = moment().format("H A");

let today = moment().format("MMMM Do YYYY, h:mm A");

$("#currentDay").text(today);

// array for the typical work hours 
let workHours = [
    { time: "9 AM", event: "" },
    { time: "10 AM", event: "" },
    { time: "11 AM", event: "" },
    { time: "12 PM", event: "" },
    { time: "1 PM", event: "" },
    { time: "2 PM", event: "" },
    { time: "3 PM", event: "" },
    { time: "4 PM", event: "" },
    { time: "5 PM", event: "" },
];

// creates the rows in html and gives layout once on the page
workHours.forEach(function (timeBlock, index) {
    let taskTime = timeBlock.time;
    let timeColor = rowColors(taskTime);
    // creates the rows for each time in the array along with style 
    let scheduleRow ='<div class="time-block" id="' +
    index + '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-center pr-3 pt-3">' +
    taskTime + '</div><textarea class="form-control ' +
    timeColor + '">' +
    timeBlock.event + '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';
    // places our rows within the html document in the container that is already in html
    $(".container").append(scheduleRow);
});

// add colors to the rows we created based on the time
function rowColors(time) {
    let currentEvent = moment(now, "H A");
    let userEvent = moment(time, "H A");
    // color changes depending on time and if an event has passed--tells user status of the entered task
    if (currentEvent.isBefore(userEvent) === true) {
     return "future";
    } else if (currentEvent.isAfter(userEvent) === true) {
    return "past";
    } else {
    return "present";
  }
}

// local storage check 
let daysEvents = JSON.parse(localStorage.getItem("workToday"));
    if (daysEvents) {
    workHours = daysEvents;
}

// Save the event entered by user
$(".saveBtn").on("click", function () {
  let blockID = parseInt($(this).closest(".time-block").attr("id"));
  let userTask = $.trim($(this).parent().siblings("textarea").val());
  workHours[blockID].event = userTask;
  localStorage.setItem("workToday", JSON.stringify(workHours));
});

