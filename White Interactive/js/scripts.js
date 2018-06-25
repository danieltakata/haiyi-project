$(function() {

  // weights
  var greVerWt = 0.1149111843, greQuanWt = 0.08803203101, greWriWt = .2926697271, gpaWt = 1.584509831, rankWt = 0.0025, degWt = .8, psWt = .0234, diverWt = .0508, recWt = .012; 
  // default values
  var greVerVal = 150, greQuanVal = 150, greWriVal = 3, gpaVal = 3.6, rankVal = 200, degVal = 0, rec1 = 40, rec2 = 50, rec3 = 60, psVal = 3, diverVal = 3; 

  var studentData = [
    ['Total Score', 'GRE-verb', 'GRE-quant', 'GRE-write', 'GPA', 'Inst-Rank', 'Deg', 'Rec1', 'Rec2', 'Rec3', 'PS', 'Diversity']
    ,['', greVerVal*greVerWt, greQuanVal*greQuanWt, greWriVal*greWriWt, gpaVal*gpaWt, (1000-rankVal)*rankWt, degVal*degWt, 
      rec1*recWt, rec2*recWt, rec3*recWt, psVal*psWt, diverVal*diverWt]
//    ,['', 152.33, 164.75, 3.715, 3.61, 173.08, 0.53, 64.5, 64.5, 64.5, 3.54, 3.58] //average values
  ]
  
/*  var importantIndex = 4
  var dummy = 999
  var adjustedData = [(greVerVal-studentData[2][1])*greVerWt, (greQuanVal-studentData[2][2])*greQuanWt,
                      (greWriVal-studentData[2][3])*greWriWt, (gpaVal-studentData[2][4])*gpaWt,
                      (rankVal-studentData[2][5])*rankWt, (degVal-studentData[2][6])*degWt,
					  (rec1-studentData[2][7])*recWt, (rec2-studentData[2][8])*recWt,
					  (rec3-studentData[2][9])*recWt, (psVal-studentData[2][10])*psWt]
  var i */

    $("#greV-input").change(function(){
      $("#greV-slider").slider("value",$("#greV-input").val());
      updateResult();
    });
	$("#greV-input").val(greVerVal)


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
      studentData[1][1] = ui.value*greVerWt;
//      adjustedData[0] = (ui.value-studentData[2][1])*greVerWt
      drawStacked();
      updateResult();
    }
  });
  $( "#greV-slider .ui-slider-range" ).css('background', '#CC0000');

  $("#greQ-input").change(function(){
    $("#greQ-slider").slider("value",$("#greQ-input").val());
    updateResult();
  });
	$("#greQ-input").val(greQuanVal)


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
    studentData[1][2] = ui.value*greQuanWt;
//    adjustedData[1] = (ui.value-studentData[2][2])*greQuanWt
    drawStacked();
    updateResult();
  }
});
  $( "#greQ-slider .ui-slider-range" ).css('background', '#FF0000');

$("#greW-input").change(function(){
  $("#greW-slider").slider("value",$("#greW-input").val());
  updateResult();
});
	$("#greW-input").val(greWriVal)


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
  studentData[1][3] = ui.value*greWriWt;
//  adjustedData[2] = (ui.value-studentData[2][3])*greWriWt
  drawStacked();
  updateResult();
}
});
  $( "#greW-slider .ui-slider-range" ).css('background', '#FF9999');

    $("#gpa-input").change(function(){
      $("#gpa-slider").slider("value",$("#gpa-input").val());
      updateResult();
    });
	$("#gpa-input").val(gpaVal)


  $("#gpa-slider").slider({
    // options
    range: "min",
    value: gpaVal,
    min: 0.0,
    max: 4.0,
    step: 0.01,
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#gpa-input").val(ui.value)
    },
    change: function(event, ui) {
      studentData[1][4] = ui.value*gpaWt;
//      adjustedData[3] = (ui.value-studentData[2][4])*gpaWt
      drawStacked();
      updateResult();
    }
  });
  $( "#gpa-slider .ui-slider-range" ).css('background', '#5BE500');

  $("#rank-input").change(function(){
    $("#rank-slider").slider("value", 1000 - $("#rank-input").val());
    updateResult();
  });
	$("#rank-input").val(rankVal)

  $("#rank-slider").slider({
    // options
    range: "min",
    value: 1000 - rankVal,
    min: 0,
    max: 999,
    step: 1,
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#rank-input").val(1000 - ui.value)
    },
    change: function(event, ui) {
      studentData[1][5] = ui.value*rankWt;
//      adjustedData[4] = (ui.value-studentData[2][5])*rankWt;
      drawStacked();
      updateResult();
    }
  });
  $( "#rank-slider .ui-slider-range" ).css('background', '#62D119');

$("#deg-dropdown").selectmenu({
  change: function(event, ui) {
    studentData[1][6] = $("#deg-dropdown").val()*degWt;
//    adjustedData[5] = (ui.value-studentData[2][6])*degWt;
    drawStacked();
    updateResult();
  }
});

$("#rec1-input").change(function(){
  $("#rec1-slider").slider("value",$("#rec1-input").val());
  updateResult();
});
	$("#rec1-input").val(rec1)

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
  value: rec1,
  step: 1,
  change: function(event, ui) {
    studentData[1][7] = ui.value*recWt;
//    adjustedData[6] = (ui.value-studentData[2][7])*recWt
    drawStacked();
    updateResult();
  }
});
  $( "#rec1-slider .ui-slider-range" ).css('background', '#8900E5');

$("#rec2-input").change(function(){
$("#rec2-slider").slider("value",$("#rec2-input").val());
updateResult();
});
	$("#rec2-input").val(rec2)

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
value: rec2,
step: 1,
change: function(event, ui) {
  studentData[1][8] = ui.value*recWt;
//  adjustedData[7] = (ui.value-studentData[2][8])*recWt;
  drawStacked();
  updateResult();
}
});
  $( "#rec2-slider .ui-slider-range" ).css('background', '#AD33FF');

$("#rec3-input").change(function(){
$("#rec3-slider").slider("value",$("#rec3-input").val());
updateResult();
});
	$("#rec3-input").val(rec3)

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
value: rec3,
step: 1,
change: function(event, ui) {
  studentData[1][9] = ui.value*recWt;
//  adjustedData[8] = (ui.value-studentData[2][9])*recWt;
  drawStacked();
  updateResult();
}
});
  $( "#rec3-slider .ui-slider-range" ).css('background', '#D699FF');

$("#ps-input").change(function(){
  $("#ps-slider").slider("value",$("#ps-input").val());
  updateResult();
});
	$("#ps-input").val(psVal)


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
  studentData[1][10] = ui.value*psWt;
//  adjustedData[9] = (ui.value-studentData[2][10])*psWt
  drawStacked();
  updateResult();
}
});
  $( "#ps-slider .ui-slider-range" ).css('background', '#00F7FF');

$("#diver-input").change(function(){
  $("#diver-slider").slider("value",$("#diver-input").val());
  updateResult();
});
	$("#diver-input").val(diverVal)

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
  studentData[1][11] = ui.value*diverWt;
  drawStacked();
  updateResult();
}
});
  $( "#diver-slider .ui-slider-range" ).css('background', '#99FBFF');

  google.charts.load('current', {
    packages: ['corechart', 'bar']
  });
  google.charts.setOnLoadCallback(drawStacked);

  function updateResult() {
//	$("#a" + studentData[0][importantIndex]).val( "" );
    if(studentData[1][1]+studentData[1][2]+studentData[1][3]+studentData[1][4]+studentData[1][5]+studentData[1][6]+
      studentData[1][7]+studentData[1][8]+studentData[1][9]+studentData[1][10]+studentData[1][11]>=42.96){
      $("#result").text("Yay, accepted!")
	    document.getElementById("lookat").style.color = "white";
      $("#result").css("color","green")
    } else {
/* 	  for (i=0; i < adjustedData.length; i++){
			if (dummy > adjustedData[i]) {
				dummy = adjustedData[i];
				importantIndex = i+1;
			}
		}
		dummy = 9999;
		$("#a" + studentData[0][importantIndex]).val( "Most important!" ); */
        document.getElementById("result").innerHTML = "Sorry, rejected...";
//	    document.getElementById("lookat").style.color = "black";
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
        width: '70%'
      },
      isStacked: true,
	  legend: {position: 'none'},
      hAxis: {
        title: '',
        minValue: 0,
        maxValue: 50,
        gridlines:{
          color:"black",
        },
        ticks: [{v:42.96, f:"Acceptance Threshold"},{v:50, f:""}]
      },
      vAxis: {
        title: ''
      },
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
