// Save the event entered by user
$(".saveBtn").on("click", function () {
  let eventID = parseInt($(this).closest(".time-block").attr("id"));
  let userTask = $.trim($(this).parent().siblings("textarea").val());
  workday[blockID].event = userTask;
  localStorage.setItem("workToday", JSON.stringify(workday));
});

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
  { time: "6pm", event: "" },
];

// Current Day Variable
$("#currentDay").text(today);

// Check local storage
let daysEvents = JSON.parse(localStorage.getItem("workToday"));
if (daysEvents) {
  workday = daysEvents;
}



