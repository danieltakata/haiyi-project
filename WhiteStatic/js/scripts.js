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

var greVerW = 1, greQuanW = 1, greWriW = 3, gpaW = 25, rankW = 0.1, masW = 15, psW = 20, diverW = 2, recW = 10;
function drawStacked() {
      var data = google.visualization.arrayToDataTable([
        ['Name', 'GRE - verbal',  'GRE - quant',
         'GRE - writing', 'GPA', 'Ranking of Inst', 'Master/Bachelor (1/0)',
          'PS Score',  'Diversity Score',
          'RL1 percentile',  'RL2 percentile',  'RL3 percentile'],
        ['', 160*greVerW, 169*greQuanW, 4*greWriW, 3.51*gpaW, (700-168)*rankW, 0*masW, 3.5*psW, 4*diverW, 8*recW, 8*recW, 8*recW],
      ]);
      var data2 = google.visualization.arrayToDataTable([
        ['Name', 'GRE - verbal',  'GRE - quant',
         'GRE - writing', 'GPA', 'Ranking of Inst', 'Master/Bachelor (1/0)',
          'PS Score',  'Diversity Score',
          'RL1 percentile',  'RL2 percentile',  'RL3 percentile'],
        ['', 144*greVerW, 152*greQuanW,3*greWriW,3.69*gpaW, (700-32)*rankW, 0*masW,1.5*psW,1.5*diverW,2*recW,2*recW,2*recW],
      ]);
      var data3 = google.visualization.arrayToDataTable([
        ['Name', 'GRE - verbal',  'GRE - quant',
         'GRE - writing', 'GPA', 'Ranking of Inst', 'Master/Bachelor (1/0)',
          'PS Score',  'Diversity Score',
          'RL1 percentile',  'RL2 percentile',  'RL3 percentile'],
        ['', 168*greVerW, 166*greQuanW, 5.5*greWriW,3.87*gpaW,(700-650)*rankW,1*masW,5*psW,5*diverW,11*recW,11*recW,11*recW ],
      ]);
      //

      var options = {
        title:'Admission Result',
        chartArea: {width: '80%'},
        isStacked: true,
        hAxis: {
          title: '',
          minValue: 0,
          maxValue: 1200,
          gridlines:{
            color:"black"
          },
          ticks: [{v:600,f:"acceptance threshold"},{v:1200, f:""}]
        },
        // grouped by color of similar shade
        colors: ['#CC0000', '#FF0000', '#FF9999', '#5BE500', '#62D119', '#A8E57F', '#8900E5', '#AD33FF', '#D699FF', '#00F7FF', '#99FBFF'],
        legend: { position: 'none' }
        // vAxis: {
        //   title: 'City'
        // }
      };


      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
      chart.draw(data, options);

      var chart = new google.visualization.BarChart(document.getElementById('chart_div2'));
      chart.draw(data2, options);

      var chart = new google.visualization.BarChart(document.getElementById('chart_div3'));
      chart.draw(data3, options);
    }
