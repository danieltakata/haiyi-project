$(function() {

  // constant term
  var SVM_constant = -17.08976608

  // weights
  var greVerWt = 0.1376453793,
    greQuanWt = 0.07802271239,
    greWriWt = 0.3124308781,
    gpaWt = 1.456150174,
    rankWt = 0.003788262564,
    // major weights
    csceWt = 1.025214391,
    stemWt = -0.8304791985,
    otherWt = -0.1947351929,
    // country weights
    usaWt = -0.5237106007,
    canadaWt = 0.01552394752,
    asiaWt = 0.5767599123,
    euroWt = -0.0685732591,
    elseWt = 0,
    //
    psWt = 0.8300898821,
    diverWt = 0.4184694261,
    // recommendation weights
    rec1top5Wt = 1.025707346,
    rec1top10Wt = 0.3958125738,
    rec1top20Wt = -0.5793790725,
    rec1top50Wt = -0.8421408468,
    rec2top5Wt = 0.9066696731,
    rec2top10Wt = 0.2192430001,
    rec2top20Wt = -0.8250712596,
    rec2top50Wt = -0.3008414136,
    rec3top5Wt = -0.07554566214,
    rec3top10Wt = 0.6270885095,
    rec3top20Wt = 0.2935430003,
    rec3top50Wt = -0.8450858476,
    rec1instWt = -0.006982607425,
    rec2instWt = -1.58e-03,
    rec3instWt = -1.58e-03
  // default values (for sliders)
  var greVerVal = 170,
    greQuanVal = 170,
    greWriVal = 3,
    gpaVal = 3.6,
    rankVal = 200,
    rec1instVal = 500,
    rec2instVal = 500,
    rec3instVal = 500,
    psVal = 3,
    diverVal = 3;

  var studentData = [
    ['Total Score', 'GRE-verb', 'GRE-quant', 'GRE-write', 'GPA', 'Inst-Rank', 'Major',
    'Country', 'Rec1', 'Rec2', 'Rec3',
    'Rec1-inst', 'Rec2-inst', 'Rec3-inst',
    'PS', 'Diversity'],
    ['', (greVerVal-130) * greVerWt, (greQuanVal-130) * greQuanWt, greWriVal * greWriWt, gpaVal * gpaWt, rankVal * rankWt, csceWt,
      usaWt, rec1top5Wt, rec2top5Wt, rec3top5Wt,
      rec1instVal * rec1instWt, rec2instVal * rec2instWt, rec3instVal * rec3instWt,
      psVal * psWt, diverVal * diverWt
    ]
  ]


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
            updateResult();
        }, 300);
    });


  $("#greV-input").change(function(){
    $("#greV-slider").slider("value",$("#greV-input").val());
    updateResult();
  });


$("#greV-slider").slider({
  // options
  range: "min",
  value: greVerVal,
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
    studentData[1][1] = (ui.value-130) * greVerWt;
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
value: greQuanVal,
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
  studentData[1][2] = (ui.value-130) * greQuanWt;
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
value: greWriVal,
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
studentData[1][3] = ui.value * greWriWt;
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
  value: gpaVal,
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
    studentData[1][4] = ui.value * gpaWt;
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
      value: rankVal,
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
    console.log("Slider Value: "+ui.value);
    console.log("Weight: "+rankWt);
    studentData[1][5] = ui.value * rankWt;
    console.log("Result " + studentData[1][5])
    // drawStacked();
    updateResult();
  }
});

$("#major-dropdown").change(function(){
    switch ($("#major-dropdown").val()){
      case 'csce':
      studentData[1][6] = csceWt;
      break;
      case 'stem':
      studentData[1][6] = stemWt;
      break;
      case 'other':
      studentData[1][6] = otherWt;
      break;
    }
    studentData[1][6] = studentData[1][6];
    updateResult();
});

$("#ctry-dropdown").change(function(){
    switch ($("#ctry-dropdown").val()){
      case 'usa':
      studentData[1][7] = usaWt;
      break;
      case 'canada':
      studentData[1][7] = canadaWt;
      break;
      case 'asia':
      studentData[1][7] = asiaWt;
      break;
      case 'euro':
      studentData[1][7] = euroWt;
      break;
      case 'other':
      studentData[1][7] = elseWt;
      break;
    }
    studentData[1][7] = studentData[1][7];
    updateResult();
});

$("#rec1-dropdown").change(function(){
    switch ($("#rec1-dropdown").val()){
      case 'rec1top5Wt':
      studentData[1][8] = rec1top5Wt;
      break;
      case 'rec1top10Wt':
      studentData[1][8] = rec1top10Wt;
      break;
      case 'rec1top20Wt':
      studentData[1][8] = rec1top20Wt;
      break;
      case 'rec1top50Wt':
      studentData[1][8] = rec1top50Wt;
      break;
    }
    studentData[1][8] = studentData[1][8];
    updateResult();
});

$("#rec2-dropdown").change(function(){
    switch ($("#rec2-dropdown").val()){
      case 'rec2top5Wt':
      studentData[1][9] = rec2top5Wt;
      break;
      case 'rec2top10Wt':
      studentData[1][9] = rec2top10Wt;
      break;
      case 'rec2top20Wt':
      studentData[1][9] = rec2top20Wt;
      break;
      case 'rec2top50Wt':
      studentData[1][9] = rec2top50Wt;
      break;
    }
    studentData[1][9] = studentData[1][9];
    updateResult();
});

$("#rec3-dropdown").change(function(){
    switch ($("#rec3-dropdown").val()){
      case 'rec3top5Wt':
      studentData[1][10] = rec3top5Wt;
      break;
      case 'rec3top10Wt':
      studentData[1][10] = rec3top10Wt;
      break;
      case 'rec3top20Wt':
      studentData[1][10] = rec3top20Wt;
      break;
      case 'rec3top50Wt':
      studentData[1][10] = rec3top50Wt;
      break;
    }
    studentData[1][10] = studentData[1][10];
    updateResult();
});

$("#rec1rank-input").change(function() {
  $("#rec1rank-slider").slider("value", $("#rec1rank-input").val());
  updateResult();
});
$("#rec1rank-input").val(rec1instVal);

$("#rec1rank-slider").slider({
  // options
  start: function(event, ui) {
    // code
  },
  slide: function(event, ui) {
    $("#rec1rank-input").val(1000-ui.value)
  },
  range: "min",
  min: 1,
  max: 1000,
  value: rec1instVal,
  step: 1,
  change: function(event, ui) {
    studentData[1][11] = ui.value * rec1instWt;
    //    adjustedData[6] = (ui.value-studentData[2][7])*recWt
    updateResult();
  }
});

$("#rec2rank-input").change(function() {
  $("#rec2rank-slider").slider("value", $("#rec2rank-input").val());
  updateResult();
});
$("#rec2rank-input").val(rec2instVal)

$("#rec2rank-slider").slider({
  // options
  start: function(event, ui) {
    // code
  },
  slide: function(event, ui) {
    $("#rec2rank-input").val(ui.value)
  },
  range: "min",
  min: 1,
  max: 1000,
  value: rec2instVal,
  step: 1,
  change: function(event, ui) {
    studentData[1][12] = ui.value * rec2instWt;
    //  adjustedData[7] = (ui.value-studentData[2][8])*recWt;
    updateResult();
  }
});

$("#rec3rank-input").change(function() {
  $("#rec3rank-slider").slider("value", $("#rec3rank-input").val());
  updateResult();
});
$("#rec3rank-input").val(rec3instVal);

$("#rec3rank-slider").slider({
  // options
  start: function(event, ui) {
    // code
  },
  slide: function(event, ui) {
    $("#rec3rank-input").val(ui.value)
  },
  range: "min",
  min: 1,
  max: 1000,
  value: rec3instVal,
  step: 1,
  change: function(event, ui) {
    studentData[1][13] = ui.value * rec3instWt;
    //  adjustedData[8] = (ui.value-studentData[2][9])*recWt;
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
value: psVal,
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
studentData[1][14] = ui.value * psWt;
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
value: diverVal,
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
studentData[1][15] = ui.value * diverWt;
// drawStacked();
updateResult();
}
});


function updateResult() {
  var totalScore = studentData[1][1]+studentData[1][2]+studentData[1][3]+studentData[1][4]+studentData[1][5]+studentData[1][6]+studentData[1][7]+studentData[1][8]+studentData[1][9]+studentData[1][10]+studentData[1][11];

  // Loading animation
  $("#result").css('opacity',1).animate({opacity:0}
    , 200, function () {
      $(".loader").css('visibility','visible');
      setTimeout(function() {
        $(".loader").css('visibility','hidden');
        if (totalScore >= 250) {
          $("#result").text("Admission accepted.");
          $("#result").css("color", "green");
        } else {
          $("#result").text("Admission rejected.");
          $("#result").css("color", "red");
        }
        $("#result").css('opacity',0).animate({opacity:1}, 200);
      }, 500);
  });




}

});
