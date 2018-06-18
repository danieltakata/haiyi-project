$(function() {

  // weights
  var greVerWt = 0.5, greQuanWt = 0.5, greWriWt = 3, gpaWt = 10, rankWt = -0.1, degWt = 20, psWt = 10, diverWt = 10, recWt = .5;
  // default values
  var greVerVal = 150, greQuanVal = 150, greWriVal = 3, gpaVal = 2.0, rankVal = 500, degVal = 0, rec1 = 40, rec2 = 50, rec3 = 60, psVal = 3, diverVal = 3;

  var studentData = [
    ['Total Score', 'GRE-verb', 'GRE-quant', 'GRE-write', 'GPA', 'Inst-Rank', 'Deg', 'Rec1', 'Rec2', 'Rec3', 'PS', 'Diversity'],
    ['', (greVerVal-130)*greVerWt, (greQuanVal-130)*greQuanWt, greWriVal*greWriWt, gpaVal*gpaWt, rankVal*rankWt, degVal*degWt,
      rec1*recWt, rec2*recWt, rec3*recWt, psVal*psWt, diverVal*diverWt],

  ]

  var importantIndex = 1
  var dummy = 999
  var adjustedData = [-16, -8.885, -2.975]
  var i

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
      adjustedData[0] = 10*(ui.value-3.63)
      drawStacked();
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
    adjustedData[0] = 10*(ui.value-3.63)
    drawStacked();
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
  adjustedData[0] = 10*(ui.value-3.63)
  drawStacked();
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
      adjustedData[0] = 10*(ui.value-3.63)
      drawStacked();
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
      adjustedData[1] = (ui.value-317.77)/2;
      drawStacked();
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
    adjustedData[0] = 10*(ui.value-3.63)
    drawStacked();
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
  adjustedData[2] = (ui.value - 3.595)*5
    drawStacked();
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
adjustedData[2] = (ui.value - 3.595)*5
  drawStacked();
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
adjustedData[2] = (ui.value - 3.595)*5
  drawStacked();
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
  adjustedData[0] = 10*(ui.value-3.63)
  drawStacked();
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
  adjustedData[0] = 10*(ui.value-3.63)
  drawStacked();
  updateResult();
}
});

  google.charts.load('current', {
    packages: ['corechart', 'bar']
  });
  google.charts.setOnLoadCallback(drawStacked);

  function updateResult() {
	$("#a" + studentData[0][importantIndex]).val( "" );
    if(studentData[1][1]+studentData[1][2]+studentData[1][3]+studentData[1][4]+studentData[1][5]+studentData[1][6]+
      studentData[1][7]+studentData[1][8]+studentData[1][9]+studentData[1][10]+studentData[1][11]>=250){
      $("#result").text("Yay, accepted!")
      $("#result").css("color","green")
    } else {
	  for (i=0; i < adjustedData.length; i++){
			if (dummy > adjustedData[i]) {
				dummy = adjustedData[i];
				importantIndex = i+1;
			}
		}
		dummy = 9999;
		$("#a" + studentData[0][importantIndex]).val( "Most important!" );
        document.getElementById("result").innerHTML = "Sorry, rejected..."
        $("#result").css("color", "red")
    }
  }

  function drawStacked() {

    var donutRangeSlider = new google.visualization.ControlWrapper({
      'controlType': 'NumberRangeFilter',
      'containerId': 'filter_div',
      'options': {
        'filterColumnLabel': 'GPA'
      }
    });

    var data = google.visualization.arrayToDataTable(studentData);



    var options = {
      title: 'Admission Result',
      chartArea: {
        width: '50%'
      },
      isStacked: true,
      hAxis: {
        title: '',
        minValue: -100,
        maxValue: 500,
        gridlines:{
          color:"black",
        },
        ticks: [{v:250, f:"Acceptance Threshold"},{v:500, f:""}]
      },
      vAxis: {
        title: ''
      },
      // grouped by color of similar shade
      colors: ['#CC0000', '#FF0000', '#FF9999', '#5BE500', '#62D119', '#A8E57F', '#8900E5', '#AD33FF', '#D699FF', '#00F7FF', '#99FBFF']
    };
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }
});


//reset

$(document).ready(function()
{
    $('#reset-form').on('click', function()
    {
        $("#my-form").trigger("reset");
    });

    $('#clear-form').on('click', function()
    {
        $('#my-form').find('input:text, input:password, select, textarea').val('');
        $('#my-form').find('input:radio, input:checkbox').prop('checked', false);
    });
});
