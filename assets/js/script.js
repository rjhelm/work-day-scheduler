// Workday Scheduler Code
$(function () {});

let now = moment();

let today = moment().format("MMMM Do YYYY, hh:mm A");

$("#currentDay").text(today);

let workHours = [
    { time: "9:00 AM", event: "" },
    { time: "10:00 AM", event: "" },
    { time: "11:00 AM", event: "" },
    { time: "12:00 PM", event: "" },
    { time: "1:00 PM", event: "" },
    { time: "2:00 PM", event: "" },
    { time: "3:00 PM", event: "" },
    { time: "4:00 PM", event: "" },
    { time: "5:00 PM", event: "" },
];

// Check local storage
let daysEvents = JSON.parse(localStorage.getItem("workToday"));
    if (daysEvents) {
    workHours = daysEvents;
}

// creates the rows in html and gives layout once on the page
workHours.forEach(function (timeBlock, index) {
    let taskTime = timeBlock.time;
    let timeColor = rowColors(taskTime);
    let scheduleRow ='<div class="time-block" id="' +
    index +
    '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-center pr-3 pt-3">' +
    taskTime +
    '</div><textarea class="form-control ' +
    timeColor +
    '">' +
    timeBlock.event +
    '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';
    $(".container").append(scheduleRow);
});

// add colors to the rows we created based on the time
function rowColors(time) {
    let currentEvent = moment(now, "H A");
    let userEvent = moment(time, "H A");
    if (currentEvent.isBefore(userEvent) === true) {
     return "future";
    } else if (currentEvent.isAfter(userEvent) === true) {
    return "past";
    } else {
    return "present";
  }
}

// Save the event entered by user
$(".saveBtn").on("click", function () {
  let blockID = parseInt($(this).closest(".time-block").attr("id"));
  let userTask = $.trim($(this).parent().siblings("textarea").val());
  workHours[blockID].event = userTask;
  localStorage.setItem("workToday", JSON.stringify(workHours));
});

