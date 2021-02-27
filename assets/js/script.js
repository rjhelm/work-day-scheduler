// Variables used by moment.js
//let now = moment().format("H A");
//let today = moment().format("MMMM Do YYYY, h:mm:ss a");

// Current Day Variable
//$("#currentDay").text(today);

// array for the workday times
//let workday = [
 // { time: "9am", event: "" },
 // { time: "10am", event: "" },
  //{ time: "11am", event: "" },
 // { time: "12pm", event: "" },
 // { time: "1pm", event: "" },
 // { time: "2pm", event: "" },
 //{ time: "3pm", event: "" },
 //{ time: "4pm", event: "" },
  //{ time: "5pm", event: "" },
//];

// Check local storage
//let daysEvents = JSON.parse(localStorage.getItem("workToday"));
//if (daysEvents) {
  //workday = daysEvents;
//}

// creates the rows in html and gives layout once on the page
//workday.forEach(function (timeBlock, index) {
  //let timeDefine = timeBlock.time;
 // let timeColor = rowColors(timeDefine);
 // let row =
 //   '<div class="time-block" id="' +
  //  index +
  //  '"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
  //  timeDefine +
  //  '</div><textarea class="form-control ' +
 //   timeColor +
  //  '">' +
  //  timeBlock.event +
  //  '</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';
 // $(".container").append(row);
//});

// add colors to the rows we created based on the time
//function rowColors(time) {
 // let currentEvent = moment(now, "H A");
 // let userEvent = moment(time, "H A");
 // if (currentEvent.isBefore(userEvent) === true) {
   // return "future";
 // } else if (currentEvent.isAfter(userEvent) === true) {
   // return "past";
 // } else {
  //  return "present";
 // }
//}
// Save the event entered by user
//$(".saveBtn").on("click", function () {
  //let blockID = parseInt($(this).closest(".time-block").attr("id"));
  //let userTask = $.trim($(this).parent().siblings("textarea").val());
 // workday[blockID].event = userTask;
  //localStorage.setItem("workToday", JSON.stringify(workday));
//});


// Display current time and ready document
$(document).ready(function () {
  let setTime = moment().hour();
  let keepTime = function () {
      $('#currentDay').text(moment().format('MMMM Do YYYY'));
      $('#currentHour').text(moment().format('hh:mm A'));
  };
  setTime();
  setInterval(update, 1000);
  // array for scheduler
  let workHours = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    ];
    // for loop in place to create rows based on times in array
  for (var i = 0; i < workHours.length; i++) {
      let useWorkHour = [i + 9];
      let timeRow = $('<tr class="rowColor">');
      let hourRow = $('<td class="align-middle"><h3 class="time" id="${hours[i]}" use-work-hour="${useWorkHour}">${hours[i]}</h3><td>');
      let task = $('<td class="align-middle"><textarea class="form-control taskText" id="${useWorkHour}text" rows="3"></textarea></td>');
      let save = $('<td class="align-middle"><i class="far fa-save fa-3x saveBtn" use-work-hour="${useWorkHour}"></i></td>');
      timeRow.append(hourRow, task, save);
      $('tbody').append(timeRow);  
    }
    // adds data entered by user to the local storage -- as well as indexing in the html file and assigning local storage value
    init();
    function init() {
        for (let k = 9; k < 18; k++) {
            $('#' + k + 'text').val(localStorage.getItem(k));
        }
    }
    // save button event listener
    $('.saveBtn').click(function (e) {
        e.preventDefault();
        let id = $(this).data('hour');
        let task = {
            hour: $(this).data('hour'),
            message: $('#' + id + 'text').val(),
        };
        localStorage.setItem(task.hour, task.message);
    });
        // color the rows based on time of day, using past, present, or future
        for (let j = 9; j < 18; j++) {
            if (currentHour > j) {
                $('.rowColor').eq(j-9).css('background-color', '#d3d3d3');
            }
            if (currentHour === j) {
                $('.rowColor').eq(j-9).css('background-color', '#ff6961');
            }
            if (currentHour < j) {
                $('.rowColor').eq(j-9).css('background-color', '#77dd77');
            }
        }
});