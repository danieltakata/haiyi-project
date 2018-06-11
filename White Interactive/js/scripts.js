$(function() {

  var studentData = [
    ['Total Score', 'GPA', 'GRE', 'Recommendation'],
    ['', 20, 20, 15], // Base values = 2, 300, 3
    //['Los Angeles, CA', 3792000, 3694000],
    //['Chicago, IL', 2695000, 2896000],
    //['Houston, TX', 2099000, 1953000],
    //['Philadelphia, PA', 1526000, 1517000]
  ]
  
  var importantIndex = 1
  var dummy = 999
  var adjustedData = [-16, -8.885, -2.975]
  var i

    $("#gpa-input").change(function(){
      // alert($("#gpa-input").val());
      //$("#amount").val($("#gpa-input").val())
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
      studentData[1][1] = ui.value*10;
      adjustedData[0] = 10*(ui.value-3.63)
      drawStacked();
      updateResult();
    }
  });

  $("#gre-input").change(function(){
    $("#gre-slider").slider("value",$("#gre-input").val());
    updateResult();
  });

  $("#gre-slider").slider({
    // options
    range: "min",
      	value: 300,
     		min: 260,
        max: 340,
        step:5,
    start: function(event, ui) {
      // code
    },
    slide: function(event, ui) {
      $("#gre-input").val(ui.value)
    },
    change: function(event, ui) {
      studentData[1][2] = (ui.value-260)/2;
      adjustedData[1] = (ui.value-317.77)/2;
      drawStacked();
      updateResult();
    }
  });

  $("#rec-input").change(function(){
    $("#rec-slider").slider("value",$("#rec-input").val());
    updateResult();
  });

  $("#rec-slider" ).slider({
    // options
    start: function (event, ui) {
        // code
    },
    slide: function( event, ui ) {
      $("#rec-input").val(ui.value)
    },
    range:"min",
    min: 1,
    max: 5,
    value: 3,
    step: 1,
    change: function(event, ui) {
      studentData[1][3] = ui.value*5;
	  adjustedData[2] = (ui.value - 3.595)*5
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
    if(studentData[1][1]+studentData[1][2]+studentData[1][3]>=75){
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
        minValue: 0,
        maxValue: 100,
        gridlines:{
          color:"black",
        },
        ticks: [{v:75, f:"Acceptance Threshold"},{v:100, f:""}]
      },
      vAxis: {
        title: ''
      }
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
