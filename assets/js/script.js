// Variables used by moment.js
let now = moment().format("H A");
let today = moment().format("MMMM Do YYYY, h:mm:ss a");

// array for the workday times
let workday = [
  { time: "9am", event: "" },
  { time: "10am", event: "" },
  { time: "11am", event: "" },
  { time: "12pm", event: "" },
  { time: "1pm", event: "" },
  { time: "2pm", event: "" },
  { time: "3pm", event: "" },
  { time: "4pm", event: "" },
  { time: "5pm", event: "" },
];

// Current Day Variable
$("#currentDay").text(today);

// Check local storage
let daysEvents = JSON.parse(localStorage.getItem("workToday"));
if (daysEvents) {
  workday = daysEvents;
}

// creates the rows in html and gives layout once on the page
workday.forEach(function (timeBlock, index) {
  let timeDefine = timeBlock.time;
  let timeColor = rowColors(timeDefine);
  let row =
    '<div class="time-block" id="' +
    index +
    '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
    timeDefine +
    '</div><textarea class="form-control ' +
    timeColor +
    '">' +
    timeBlock.event +
    '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';
  $(".container").append(row);
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
  workday[blockID].event = userTask;
  localStorage.setItem("workToday", JSON.stringify(workday));
});

