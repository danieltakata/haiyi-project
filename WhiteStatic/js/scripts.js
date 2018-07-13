$(function() {


$("#landing-page").fadeIn();
$(".landingcontent").fadeIn();


$("#startButton").on("click", function() {
      $(".landingcontent").fadeOut();

      setTimeout(function() {
          $("#landing-page").fadeOut();
      }, 500);

      setTimeout(function() {
          $("#main-page").fadeIn();
          $(".maincontent").fadeIn(300);
          drawStacked();
      }, 300);
  });

  // populate the cards
  for (var i = 2; i<=10; i++) {
    var clone = $("#studentCard_1").clone();
    clone.attr("id", 'studentCard_'+i);

    clone.find("#chart_div_1").attr("id","chart_div_" + i);
    clone.find("#studentName").text("Student " + i);

    //append clone on the end
    $("#myCarousel-container").append(clone);
    // var chart = new google.visualization.BarChart(document.getElementById('chart_div_' + i));
    // chart.draw(data, options);
  }
  $("#studentCard_1").addClass('active');


// $(document).ready(function() {
  $("#myCarousel").on("slid.bs.carousel", function(e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $(".carousel-item").length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
      var it = itemsPerSlide - (totalItems - idx);
      for (var i = 0; i < it; i++) {
        // append slides to end
        if (e.direction == "left") {
          $(".carousel-item")
            .eq(i)
            .appendTo(".carousel-inner");
        } else {
          $(".carousel-item")
            .eq(0)
            .appendTo($(this).find(".carousel-inner"));
        }
      }
    }
  });
// });

google.charts.load('current', {packages: ['corechart', 'bar']});
// google.charts.setOnLoadCallback(drawStacked);

var greVerW = 0.7, greQuanW = 0.7, greWriW = 3, gpaW = 25, rankW = 0.1, masW = 15, psW = 20, diverW = 2, recW = 10;

function drawStacked() {
      var data = google.visualization.arrayToDataTable([
        ['Name', 'GRE - verbal',  'GRE - quant',
         'GRE - writing', 'GPA', 'Ranking of Inst', 'Master/Bachelor (1/0)',
          'PS Score',  'Diversity Score',
          'Recommendation Letter 1',  'Recommendation Letter 2',  'Recommendation Letter 3'],
        ['', 162*greVerW, 170*greQuanW, 4.7*greWriW, 3.6*gpaW, (1000-193)*rankW, 0*masW, 3.5*psW, 4*diverW, 8*recW, 8*recW, 8*recW],
      ]);
      var data2 = google.visualization.arrayToDataTable([
        ['Name', 'GRE - verbal',  'GRE - quant',
         'GRE - writing', 'GPA', 'Ranking of Inst',
          'PS Score',  'Diversity Score',
          'Recommendation Letter 1',  'Recommendation Letter 2',  'Recommendation Letter 3'],
        ['', 143*greVerW, 159*greQuanW,2.7*greWriW,3.59*gpaW, (1000-190)*rankW, 3*psW,3.5*diverW,2*recW,2*recW,2*recW],
      ]);
      var data3 = google.visualization.arrayToDataTable([
        ['Name', 'GRE - verbal',  'GRE - quant',
         'GRE - writing', 'GPA', 'Ranking of Inst',
          'PS Score',  'Diversity Score',
          'Recommendation Letter 1',  'Recommendation Letter 2',  'Recommendation Letter 3'],
        ['', 152*greVerW, 165*greQuanW, 4*greWriW,3.81*gpaW,(1000-186)*rankW,4*psW,4*diverW,11*recW,11*recW,11*recW ],
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
      };

      // Render charts for all profiles
      for (var i = 1; i<=10; i++) {
        var chart = new google.visualization.BarChart(document.getElementById('chart_div_' + i));
        chart.draw(data, options);
      }

    }


});
