// $(function() {

//   var studentData = [
//     ['Total Score', 'GPA', 'GRE', 'Recommendation'],
//     ['Total Score', 34, 320, 100],
//     //['Los Angeles, CA', 3792000, 3694000],
//     //['Chicago, IL', 2695000, 2896000],
//     //['Houston, TX', 2099000, 1953000],
//     //['Philadelphia, PA', 1526000, 1517000]
//   ]

//   $("#gpa-slider").slider({
//     // options
//     range: "min",
//     value: 3.0,
//     min: 0.0,
//     max: 4.0,
//     step: 0.1,
//     start: function(event, ui) {
//       // code
//     },
//     slide: function(event, ui) {
//       $("#amount").val(ui.value) // code
//     },
//     change: function(event, ui) {
//       studentData[1][1] = ui.value;
//       drawStacked();
//     }
//   });

//   $("#gre-slider").slider({
//     // options
//     range: "min",
//       	value: 3.0,
//      		min: 0.0,
//         max: 4.0,
//         step:0.1,
//     start: function(event, ui) {
//       // code
//     },
//     slide: function(event, ui) {
//       // code
//     },
//     change: function(event, ui) {
//       studentData[1][2] = ui.value;
//       drawStacked();
//     }
//   });



//   google.charts.load('current', {
//     packages: ['corechart', 'bar']
//   });
//   google.charts.setOnLoadCallback(drawStacked);


//   function drawStacked() {

//     var donutRangeSlider = new google.visualization.ControlWrapper({
//       'controlType': 'NumberRangeFilter',
//       'containerId': 'filter_div',
//       'options': {
//         'filterColumnLabel': 'GPA'
//       }
//     });

//     var data = google.visualization.arrayToDataTable(studentData);



//     var options = {
//       title: 'Admission Result',
//       chartArea: {
//         width: '50%'
//       },
//       isStacked: true,
//       hAxis: {
//         title: 'total Score',
//         minValue: 0,
//       },
//       vAxis: {
//         title: ''
//       }
//     };
//     var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
//     chart.draw(data, options);
//   }
// });
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawStacked);

function drawStacked() {
      var data = google.visualization.arrayToDataTable([
        ['Name', 'GRE - verbal',  'GRE - quant',
         'GRE - writing', 'GPA', 'Ranking of Inst', 'Master/Bachelor (1/0)',
          'PS Score',  'Diversity Score', 
          'RL1 percentile',  'RL2 percentile',  'RL3 percentile'],
        ['', 160, 169, 4, 3.51, 168, 0, 3.5, 4, 8, 8, 8],
      ]);
      //                         

      var options = {
        // title: 'Population of Largest U.S. Cities',
        chartArea: {width: '80%'},
        isStacked: true,
        hAxis: {
          title: 'Total Population',
          minValue: 0,
          maxValue: 300
        },
        legend: { position: 'none' }
        // vAxis: {
        //   title: 'City'
        // }
      };
      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
