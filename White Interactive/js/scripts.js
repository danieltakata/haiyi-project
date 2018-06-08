$(function() {

  var studentData = [
    ['Total Score', 'GPA', 'GRE', 'Recommendation'],
    ['Total Score', 20, 20, 15], // Base values = 2, 300, 3
    //['Los Angeles, CA', 3792000, 3694000],
    //['Chicago, IL', 2695000, 2896000],
    //['Houston, TX', 2099000, 1953000],
    //['Philadelphia, PA', 1526000, 1517000]
  ]


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
      //$("#gpa-amount").val(ui.value) // code
      $("#gpa-input").val(ui.value)
    },
    change: function(event, ui) {
      studentData[1][1] = ui.value*10;
      drawStacked();
      updateResult();
    }
  });

  $("#gre-input").change(function(){
    // alert($("#gpa-input").val());
    //$("#amount").val($("#gpa-input").val())
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
      //$("#gre-amount").val(ui.value) // code
      $("#gre-input").val(ui.value)
    },
    change: function(event, ui) {
      studentData[1][2] = (ui.value-260)/2;
      drawStacked();
      updateResult();
    }
  });

  $("#rec-input").change(function(){
    // alert($("#gpa-input").val());
    //$("#amount").val($("#gpa-input").val())
    $("#rec-slider").slider("value",$("#rec-input").val());
    updateResult();
  });

  $("#rec-slider" ).slider({
    // options
    start: function (event, ui) {
        // code
    },
    slide: function( event, ui ) {
      //$("#rec-amount").val(ui.value) // code
      $("#rec-input").val(ui.value)
    },
    range:"min",
    min: 1,
    max: 5,
    value: 3,
    step: 1,
    change: function(event, ui) {
      studentData[1][3] = ui.value*5;
      drawStacked();
      updateResult();
    }
});

  google.charts.load('current', {
    packages: ['corechart', 'bar']
  });
  google.charts.setOnLoadCallback(drawStacked);

  function updateResult() {
    if(studentData[1][1]+studentData[1][2]+studentData[1][3]>75){
      document.getElementById("result").innerHTML = "Yay, accepted!"
    } else {
      document.getElementById("result").innerHTML = "Sorry, rejected..."
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
        title: 'total Score',
        minValue: 0,
        maxValue: 100,
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
