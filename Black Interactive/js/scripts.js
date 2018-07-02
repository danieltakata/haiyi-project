$(function() {

  $("#landing-page").fadeIn();
  $(".landingcontent").fadeIn();


  $("#startButton").on("click", function() {
        $(".landingcontent").fadeOut();

        setTimeout(function() {
            $("#landing-page").fadeOut();
        }, 500);

        setTimeout(function() {
        // $("#main-page").animateRotate(0, 0);
        // $("#main-page").css("height", "25px");
        // $("#main-page").css("width", "375px");
            $("#main-page").fadeIn();
            $(".maincontent").fadeIn(300);
            // drawStacked();
        }, 1000);
    });

  // weights
  var greVerWt = 0.5, greQuanWt = 0.5, greWriWt = 3, gpaWt = 10, rankWt = -0.1, degWt = 20, psWt = 10, diverWt = 10, recWt = .5;
  // default values
  var greVerVal = 150, greQuanVal = 150, greWriVal = 3, gpaVal = 2.0, rankVal = 500, degVal = 0, rec1 = 40, rec2 = 50, rec3 = 60, psVal = 3, diverVal = 3;

  var studentData = [
    ['Total Score', 'GRE-verb', 'GRE-quant', 'GRE-write', 'GPA', 'Inst-Rank', 'Deg', 'Rec1', 'Rec2', 'Rec3', 'PS', 'Diversity'],
    ['', (greVerVal-130)*greVerWt, (greQuanVal-130)*greQuanWt, greWriVal*greWriWt, gpaVal*gpaWt, rankVal*rankWt, degVal*degWt,
      rec1*recWt, rec2*recWt, rec3*recWt, psVal*psWt, diverVal*diverWt],

  ]


  $("#greV-input").change(function(){
    $("#greV-slider").slider("value",$("#greV-input").val());
    updateResult();
  });


$("#greV-slider").slider({
  // options
  range: "min",
  value: 150,
  min: 130,
  max: 170,
  step: 1,
  start: function(event, ui) {
    // code
  },
  slide: function(event, ui) {
    $("#greV-input").val(ui.value)
  },
  change: function(event, ui) {
    studentData[1][1] = (ui.value-130)*greVerWt;
    // drawStacked();
    updateResult();
  }
});

$("#greQ-input").change(function(){
  $("#greQ-slider").slider("value",$("#greQ-input").val());
  updateResult();
});


$("#greQ-slider").slider({
// options
range: "min",
value: 150,
min: 130,
max: 170,
step: 1,
start: function(event, ui) {
  // code
},
slide: function(event, ui) {
  $("#greQ-input").val(ui.value)
},
change: function(event, ui) {
  studentData[1][2] = (ui.value-130)*greQuanWt;
  // drawStacked();
  updateResult();
}
});

$("#greW-input").change(function(){
$("#greW-slider").slider("value",$("#greW-input").val());
updateResult();
});


$("#greW-slider").slider({
// options
range: "min",
value: 3,
min: 0,
max: 6,
step: 0.5,
start: function(event, ui) {
// code
},
slide: function(event, ui) {
$("#greW-input").val(ui.value)
},
change: function(event, ui) {
studentData[1][3] = ui.value*greWriWt;
// drawStacked();
updateResult();
}
});

  $("#gpa-input").change(function(){
    $("#gpa-slider").slider("value",$("#gpa-input").val());
    updateResult();
  });


$("#gpa-slider").slider({
  // options
  range: "min",
  value: 2,
  min: 0.0,
  max: 4.0,
  step: 0.1,
  start: function(event, ui) {
    // code
  },
  slide: function(event, ui) {
    $("#gpa-input").val(ui.value)
  },
  change: function(event, ui) {
    studentData[1][4] = ui.value*gpaWt;
    // drawStacked();
    updateResult();
  }
});

$("#rank-input").change(function(){
  $("#rank-slider").slider("value",$("#rank-input").val());
  updateResult();
});

$("#rank-slider").slider({
  // options
  range: "min",
      value: 500,
       min: 1,
      max: 1000,
      step: 5,
  start: function(event, ui) {
    // code
  },
  slide: function(event, ui) {
    $("#rank-input").val(ui.value)
  },
  change: function(event, ui) {
    studentData[1][5] = ui.value*rankWt;
    // drawStacked();
    updateResult();
  }
});

$("#deg-input").change(function(){
  $("#deg-slider").slider("value",$("#deg-input").val());
  updateResult();
});


$("#deg-slider").slider({
// options
range: "min",
value: 0,
min: 0,
max: 1,
step: 1,
start: function(event, ui) {
  // code
},
slide: function(event, ui) {
  $("#deg-input").val(ui.value)
},
change: function(event, ui) {
  studentData[1][6] = ui.value*degWt;
  // drawStacked();
  updateResult();
}
});

$("#rec1-input").change(function(){
$("#rec1-slider").slider("value",$("#rec1-input").val());
updateResult();
});

$("#rec1-slider" ).slider({
// options
start: function (event, ui) {
    // code
},
slide: function( event, ui ) {
  $("#rec1-input").val(ui.value)
},
range:"min",
min: 1,
max: 100,
value: 40,
step: 1,
change: function(event, ui) {
  studentData[1][7] = ui.value*recWt;
  // drawStacked();
  updateResult();
}
});

$("#rec2-input").change(function(){
$("#rec2-slider").slider("value",$("#rec2-input").val());
updateResult();
});

$("#rec2-slider" ).slider({
// options
start: function (event, ui) {
  // code
},
slide: function( event, ui ) {
$("#rec2-input").val(ui.value)
},
range:"min",
min: 1,
max: 100,
value: 50,
step: 1,
change: function(event, ui) {
studentData[1][8] = ui.value*recWt;
// drawStacked();
updateResult();
}
});

$("#rec3-input").change(function(){
$("#rec3-slider").slider("value",$("#rec3-input").val());
updateResult();
});

$("#rec3-slider" ).slider({
// options
start: function (event, ui) {
  // code
},
slide: function( event, ui ) {
$("#rec3-input").val(ui.value)
},
range:"min",
min: 1,
max: 100,
value: 60,
step: 1,
change: function(event, ui) {
studentData[1][9] = ui.value*recWt;
// drawStacked();
updateResult();
}
});

$("#ps-input").change(function(){
$("#ps-slider").slider("value",$("#ps-input").val());
updateResult();
});


$("#ps-slider").slider({
// options
range: "min",
value: 3,
min: 1,
max: 5,
step: 0.5,
start: function(event, ui) {
// code
},
slide: function(event, ui) {
$("#ps-input").val(ui.value)
},
change: function(event, ui) {
studentData[1][10] = ui.value*psWt;
// drawStacked();
updateResult();
}
});

$("#diver-input").change(function(){
$("#diver-slider").slider("value",$("#diver-input").val());
updateResult();
});

$("#diver-slider").slider({
// options
range: "min",
value: 3,
min: 1,
max: 5,
step: 0.5,
start: function(event, ui) {
// code
},
slide: function(event, ui) {
$("#diver-input").val(ui.value)
},
change: function(event, ui) {
studentData[1][11] = ui.value*diverWt;
// drawStacked();
updateResult();
}
});


function updateResult() {
  var totalScore = studentData[1][1]+studentData[1][2]+studentData[1][3]+studentData[1][4]+studentData[1][5]+studentData[1][6]+
  studentData[1][7]+studentData[1][8]+studentData[1][9]+studentData[1][10]+studentData[1][11];
  // console.log('SCORE: ' + totalScore);
  if(totalScore>=250){
    $("#result").text("Yay, accepted!")
    $("#result").css("color","green")
  } else {
    document.getElementById("result").innerHTML = "Sorry, rejected..."
    $("#result").css("color", "red")
  }
}

});
