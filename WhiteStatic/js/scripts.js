$(function() {

  $('#nextStepButton').click(function() {
    window.location.replace('https://goo.gl/forms/r6JOaUa1oDpxOrG92');
    // if (confirm("Are you sure you are ready to move on to the next step? You will not be able to go back.")) {
    //   window.location.replace('https://goo.gl/forms/r6JOaUa1oDpxOrG92');
    // } else {}
  });

  $('#landing-page').fadeIn();
  $('.landingcontent').fadeIn();


  $('#startButton').on('click', function() {
    $('.landingcontent').fadeOut();

    setTimeout(function() {
      $('#landing-page').fadeOut();
    }, 500);

    setTimeout(function() {
      $('#main-page').fadeIn();
      $('.maincontent').fadeIn(300);
      initialize();
      drawStacked();
    }, 300);
  });

  $( "#startButton" ).trigger( "click" );

  // Not sure what this does
  $('#myCarousel').on('slid.bs.carousel', function(e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $('.carousel-item').length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
      var it = itemsPerSlide - (totalItems - idx);
      for (var i = 0; i < it; i++) {
        // append slides to end
        if (e.direction == 'left') {
          $('.carousel-item')
          .eq(i)
          .appendTo('.carousel-inner');
        } else {
          $('.carousel-item')
          .eq(0)
          .appendTo($(this).find('.carousel-inner'));
        }
      }
    }
  });

  function initialize() {
    populateCards()
    setColor();
  }

  function setColor() {
    $(".greV-label").css('background-color', barcolors[0]);
    $(".greQ-label").css('background-color', barcolors[1]);
    $(".greW-label").css('background-color', barcolors[2]);
    $(".gpa-label").css('background-color', barcolors[3]);
    $(".major-label").css('background-color', barcolors[5]);
    $(".institution-label").css('background-color', barcolors[4]);
    $(".ctry-label").css('background-color', barcolors[6]);
    $(".ps-label").css('background-color', barcolors[7]);
    $(".diver-label").css('background-color', barcolors[8]);
    $(".rec1-label").css('background-color', barcolors[9]);
    $(".rec2-label").css('background-color', barcolors[10]);
    $(".rec3-label").css('background-color', barcolors[11]);
    $(".mystery1-label").css('background-color', barcolors[12]);
    $(".mystery2-label").css('background-color', barcolors[13]);
    $(".mystery3-label").css('background-color', barcolors[14]);
  }


  function populateCards() {
    // populate the cards
    for (var i = 2; i <= students.length; i++) {
      var clone = $('#studentCard_1').clone();
      clone.attr('id', 'studentCard_' + i);
      clone.find('#chart_div_1').attr('id', 'chart_div_' + i);
      clone.find('#studentName').text('Student ' + i);
      for (var key in students[i - 1]) {
        if (key == 'GRE-verbal' || key == 'GRE-quantitative') {
          clone.find('#' + key).text(students[i - 1][key] + 130);
        } else {
          clone.find('#' + key).text(students[i - 1][key]);
        }
      }

      //append clone on the end
      $('#myCarousel-container').append(clone);
      // var chart = new google.visualization.BarChart(document.getElementById('chart_div_' + i));
      // chart.draw(data, options);
    }
    $('#studentCard_1').addClass('active');

  }

});

google.charts.load('current', {
  packages: ['corechart', 'bar']
});


function drawStacked() {
  var options = {
    title: 'Admission Result',
    chartArea: {
      width: '80%'
    },
    isStacked: true,
    hAxis: {
      title: '',
      minValue: 0,
      maxValue: constant + 420,
      gridlines: {
        color: 'black'
      },
      ticks: [{
        v: constant + 50,
        f: 'weak\nreject'
      }, {
        v: constant + 150,
        f: 'weak\naccept'
      }, {
        v: constant + 250,
        f: 'strong\naccept'
      }, {
        v: constant + 420,
        f: ''
      }]
    },
    // grouped by color of similar shade
    colors: ['#CC0000', '#FF0000', '#FF9999', '#5BE500', '#62D119', '#A8E57F', '#8900E5', '#AD33FF', '#D699FF', '#00F7FF', '#99FBFF'],
    legend: {
      position: 'none'
    }
  };

  // Render charts for all profiles
  for (var i = 1; i <= students.length; i++) {

    var studentData = [
      ['Name', 'GRE-verbal', 'GRE-quantitative',
        'GRE-writing', 'GPA', 'Major', 'Institution-Rank',
        'Country', 'Personal-Statement', 'Diversity-Score',
        'Recommendation Letter 1', 'Recommendation Letter 2', 'Recommendation Letter 3',
		'Additional1', 'Additional2', 'Additional3'
      ],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    for (var j = 1; j < studentData[0].length; j++) {
      switch (studentData[0][j]) {
        case 'Major':
          switch (students[i - 1]['Major']) {
            case 'Computer Science':
              studentData[1][j] = 11.4202;
              break;
            case 'Social Sciences':
              studentData[1][j] = 0.2982;
              break;
            case 'Business':
              studentData[1][j] = 4.9187;
              break;
            default:
              studentData[1][j] = 0;
          }
          break;
        case 'Institution-Rank':
		  switch (students[i - 1]['Institution-Rank']) {
			case 'Tier 1':
			  studentData[1][j] = 9.1883;
			  break;
			case 'Tier 2':
			  studentData[1][j] = 6.757;
			  break;
			case 'Tier 3':
			  studentData[1][j] = 0;
			  break;
			default:
			  studentData[1][j] = 0;
			  break;
	      }
          break;
        case 'Country':
          switch (students[i - 1]['Country']) {
            case 'US':
              studentData[1][j] = 14.1486;
              break;
            case 'Canada':
              studentData[1][j] = 2.2122;
              break;
            case 'Asia':
              studentData[1][j] = 7.5458;
              break;
            default:
              studentData[1][j] = 0;
          }
          break;
        case 'Personal-Statement':
          studentData[1][j] = (students[i - 1]['Personal-Statement'] - 1) * weights[j];
          break;
        case 'Diversity-Score':
          studentData[1][j] = (students[i - 1]['Diversity-Score'] - 1) * weights[j];
          break;
        case 'Recommendation Letter 1':
          switch (students[i - 1]['RL1']) {
            case 'Strong':
              studentData[1][j] = 8.8008;
              break;
            case 'Normal':
              studentData[1][j] = 6.665;
              break;
            case 'Weak':
              studentData[1][j] = 4.5292;
              break;
            default:
			  studentData[1][j] = 0;
              break;
          }
          break;
        case 'Recommendation Letter 2':
          switch (students[i - 1]['RL2']) {
            case 'Strong':
              studentData[1][j] = 8.6641;
              break;
            case 'Normal':
              studentData[1][j] = 6.5283;
              break;
            case 'Weak':
              studentData[1][j] = 4.3925;
              break;
            default:
			  studentData[1][j] = 0;
              break;
          }
          break;
        case 'Recommendation Letter 3':
          switch (students[i - 1]['RL3']) {
            case 'Strong':
              studentData[1][j] = 5.9163;
              break;
            case 'Normal':
              studentData[1][j] = 3.7805;
              break;
            case 'Weak':
              studentData[1][j] = 1.6447;
              break;
            default:
			  studentData[1][j] = 0;
              break;
          }
          break;
        case 'Additional2':
          studentData[1][j] = (students[i - 1]['Additional2'] - 1) * weights[j];
          break;
        case 'Additional3':
          studentData[1][j] = (1000 - students[i - 1]['Additional3']) * weights[j];
          break;
        default:
          studentData[1][j] = students[i - 1][studentData[0][j]] * weights[j];
          break;
      }
    }


    var dataTable = studentData;
    // var dataTable = $.extend(true, [], studentData);
    var numFeatures = dataTable[0].length;
    for (var j = 0; j < numFeatures; j++) {
      dataTable[0].splice(j * 2 + 1, 0, {
        type: 'string',
        role: 'tooltip'
      })
      dataTable[1].splice(j * 2 + 1, 0, dataTable[0][j * 2])
    }
    var data = google.visualization.arrayToDataTable(dataTable);
    var chart = new google.visualization.BarChart(document.getElementById('chart_div_' + i));
    chart.draw(data, options);
  }

}

var barcolors = [
  '#af7ba0' // GRE-verb
  , '#c191b3' // GRE-quant
  , '#d3a7c7' // GRE-write
  , '#f08d39' // GPA
  , '#9D7562' // Inst-Rank
  , '#f7a55d' // Major
  , '#B99483' // Country of origin
  , '#df585c' // Personal Statement
  , '#fd9d9b' // Diversity score
  , '#5ca053' // Recommendation letter 1
  , '#4d9794' // Recommendation letter 2
  , '#5079a5' // Recommendation letter 3
  , '#74b869' // mystery1
  , '#6baaa5' // mystery2
  , '#77a2c6' // mystery3
];


var weights = [
  '' // Name -- NOTHING HERE
  , 0.0783 // GRE-verb
  , 0.9369 // GRE-quant
  , 0.9971 // GRE-write
  , 44.6156 // GPA
  , 1 // Major
  , 1 // Inst-Rank
  , 1 // Country of origin
  , 2.009 // Personal Statement
  , 7.3425 // Diversity score
  , 1 // Recommendation letter 1
  , 1 // Recommendation letter 2
  , 1 // Recommendation letter 3
  , 0
  , 0.1852
  , 0.1454
];

var constant = 139.279;
