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
    }, 300);
  });

  // $("#startButton").trigger("click");

  // $(".carousel_navigate").click(function () {
  //   currentID--;
  //   setTimeout(function() {
  //     drawStacked(currentID);
  //   },100);
  // });
  //
  // $("#nextCarousel").click(function () {
  //   currentID++;
  //   // setTimeout(function() {
  //   //   drawStacked(currentID);
  //   // },100);
  // });

  $('#myCarousel').on('slide.bs.carousel', function (e) {
    var $e = $(e.relatedTarget);
    var studentID = $e.index();
    console.log(studentID);
    setTimeout(function() {
      drawStacked(studentID);
    },100);
    // drawStacked(currentID);
});

  // Not sure what this does
  // $('#myCarousel').on('slid.bs.carousel', function(e) {
  //   var $e = $(e.relatedTarget);
  //   var idx = $e.index();
  //   var itemsPerSlide = 3;
  //   var totalItems = $('.carousel-item').length;
  //
  //   if (idx >= totalItems - (itemsPerSlide - 1)) {
  //     var it = itemsPerSlide - (totalItems - idx);
  //     for (var i = 0; i < it; i++) {
  //       // append slides to end
  //       if (e.direction == 'left') {
  //         $('.carousel-item')
  //           .eq(i)
  //           .appendTo('.carousel-inner');
  //       } else {
  //         $('.carousel-item')
  //           .eq(0)
  //           .appendTo($(this).find('.carousel-inner'));
  //       }
  //     }
  //   }
  // });

  function initialize() {
    populateCards()
    setColor();
    drawStacked(0);
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
    for (var i = 0; i < students.length; i++) {
      if (i == 0) {
        var card = $('#studentCard_1');
      } else {
        var card = $('#studentCard_1').clone();
      }
      card.attr('id', 'studentCard_' + (i + 1));
      card.find('#chart_div_1').attr('id', 'chart_div_' + (i + 1));
      card.find('#card-border').removeClass("border-success border-danger");


      card.find('#studentName').text('Student ' + (i + 1));
      for (var key in students[i]) {
        if (key == 'GRE-verbal' || key == 'GRE-quantitative') {
          card.find('#' + key).text(students[i][key] + 130);
        } else if (key == 'LinearRegression') {
          // Check student accept/ reject
          let totalScore = students[i][key];
          // console.log('student: ' + i + ' scores: ' + totalScore);
          if (totalScore >= high_threshold) {
            card.find('#result').text("Very likely to be accepted");
            card.find('#result').css("color", "green");
            card.find('#studentName').css("color", "green");
            card.find('#card-border').addClass("border-success");
          } else if (totalScore >= mid_threshold && totalScore < high_threshold) {
            card.find('#result').text("Somewhat likely to be accepted");
            card.find('#result').css("color", "LimeGreen ");
            card.find('#studentName').css("color", "LimeGreen");
            card.find('#card-border').addClass("border-success");
          } else if (totalScore >= low_threshold && totalScore < mid_threshold) {
            card.find('#result').text("Somewhat likely to be rejected");
            card.find('#result').css("color", "crimson ");
            card.find('#studentName').css("color", "crimson");
            card.find('#card-border').addClass("border-danger");
          } else {
            card.find('#result').text("Very likely to be rejected");
            card.find('#result').css("color", "red");
            card.find('#studentName').css("color", "red");
            card.find('#card-border').addClass("border-danger");
          }
        } else {
          card.find('#' + key).text(students[i][key]);
        }
      }
      if (i > 0) {
        //append clone on the end
        $('#myCarousel-container').append(card);
      }
    }
    $('#studentCard_1').addClass('active');
  }

});

google.charts.load('current', {
  packages: ['corechart', 'bar']
});


function drawStacked(studentID) {
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
        v: low_threshold,
        f: ""
      }, {
        v: mid_threshold,
        f: "Decision\nboundary"
      }, {
        v: high_threshold,
        f: ""
      }]
    },
    // grouped by color of similar shade
    colors: barcolors,
    legend: {
      position: 'none'
    }
  };



  // Render charts for all profiles
    var studentData = [
      ['Name', 'GRE-verbal', 'GRE-quantitative',
        'GRE-writing', 'GPA', 'Major', 'Institution-Rank',
        'Country', 'Personal-Statement', 'Diversity-Score',
        'Letter of Recommendation #1', 'Letter of Recommendation #2', 'Letter of Recommendation #3',
        'Additional Attribute 1', 'Additional Attribute 2', 'Additional Attribute 3'
      ],
      ['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    for (var j = 1; j < studentData[0].length; j++) {
      // console.log(studentData[0][j]);
      switch (studentData[0][j]) {
        case 'Major':
          switch (students[studentID]['Major']) {
            case 'Engineering':
              studentData[1][j] = engineeringWt;
              break;
            case 'Social Sciences':
              studentData[1][j] = socialscienceWt;
              break;
            case 'Business':
              studentData[1][j] = businessWt;
              break;
            case 'Humanities':
              studentData[1][j] = humanitiesWt;
              break;
            case 'Natural Science':
              studentData[1][j] = naturalscienceWt;
              break;
            default:
              studentData[1][j] = 0;
          }
          break;
        case 'Institution-Rank':
          switch (students[studentID]['Institution-Rank']) {
            case 'Rank 1-100':
              studentData[1][j] = tier1Wt;
              break;
            case 'Rank 101-500':
              studentData[1][j] = tier2Wt;
              break;
            case 'Rank 501-1000':
              studentData[1][j] = tier3Wt;
              break;
            default:
              studentData[1][j] = 0;
              break;
          }
          break;
        case 'Country':
          switch (students[studentID]['Country']) {
            case 'US':
              studentData[1][j] = usaWt;
              break;
            case 'Europe':
              studentData[1][j] = europeWt;
              break;
            case 'China':
              studentData[1][j] = chinaWt;
              break;
            case 'India':
              studentData[1][j] = indiaWt;
              break;
            default:
              studentData[1][j] = 0;
          }
          break;
          // case 'Personal-Statement':
          //   studentData[1][j] = (students[i - 1]['Personal-Statement'] - 1) * weights[j];
          //   break;
          // case 'Diversity-Score':
          //   studentData[1][j] = (students[i - 1]['Diversity-Score'] - 1) * weights[j];
          //   break;
        case 'Letter of Recommendation #1':
          switch (students[studentID]['RL1']) {
            case 'Strong':
              studentData[1][j] = rec1strong;
              break;
            case 'Average':
              studentData[1][j] = rec1average;
              break;
            case 'Weak':
              studentData[1][j] = rec1weak;
              break;
            default:
              studentData[1][j] = 0;
              break;
          }
          break;
        case 'Letter of Recommendation #2':
          switch (students[studentID]['RL2']) {
            case 'Strong':
              studentData[1][j] = rec2strong;
              break;
            case 'Average':
              studentData[1][j] = rec2average;
              break;
            case 'Weak':
              studentData[1][j] = rec2weak;
              break;
            default:
              studentData[1][j] = 0;
              break;
          }
          break;
        case 'Letter of Recommendation #3':
          switch (students[studentID]['RL3']) {
            case 'Strong':
              studentData[1][j] = rec3strong;
              break;
            case 'Average':
              studentData[1][j] = rec3average;
              break;
            case 'Weak':
              studentData[1][j] = rec3weak;
              break;
            default:
              studentData[1][j] = 0;
              break;
          }
          break;
        case 'Additional Attribute 1':
          studentData[1][j] = (100 - students[studentID]['Additional1']) * weights[j-1];
          break;
        case 'Additional Attribute 2':
          studentData[1][j] = (students[studentID]['Additional2']) * weights[j-1];
          break;
        case 'Additional Attribute 3':
          studentData[1][j] = (100 - students[studentID]['Additional3']) * weights[j-1];
          break;
        default:
          if(studentData[0][j] == 'GPA') {
            console.log(students[studentID][studentData[0][j]]);
            console.log(weights[j-1]);
          }
          studentData[1][j] = students[studentID][studentData[0][j]] * weights[j-1];
          break;
      }
    }

    // console.log(studentData);
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
    var chart = new google.visualization.BarChart(document.getElementById('chart_div_' + (studentID+1) ));
    chart.draw(data, options);

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

var
  // Institution Rank weights
  tier1Wt = 7.0613,
  tier2Wt = 2.8189,
  tier3Wt = 0,
  // major weights
  engineeringWt = 3.4903,
  naturalscienceWt = 3.8394,
  humanitiesWt = 6.0665,
  socialscienceWt = 0,
  businessWt = 8.0240,
  // country weights
  usaWt = 15.8596,
  chinaWt = 4.3393,
  indiaWt = 0,
  europeWt = 0.4228,
  // recommendation weights
  rec1strong = 2.2719,
  rec1average = 4.596,
  rec1weak = 6.8679,
  rec2strong = 10.9469,
  rec2average = 5.8508,
  rec2weak = 0,
  rec3strong = 3.4996,
  rec3average = 5.2799,
  rec3weak = 1.7803

var weights = [
  0.1238 // GRE-verb
  , 0.8923 // GRE-quant
  , 0.3635 // GRE-write
  , 39.87 // GPA
  , 1 // Inst-Tier
  , 1 // Major
  , 1 // Country of origin
  , 5.1267 // Personal Statement
  , 1.1396 // Diversity score
  , 1 // Recommendation letter 1
  , 1 // Recommendation letter 2
  , 1 // Recommendation letter 3
  , 0.0382 // Mystery 1
  , 1.6931 // Mystery 2
  , 1.7543 // Mystery 3
];

var constant = -67.3342; //Constant term for linear regression
var negative_offset = 0.4228 + 4.596 + 2.2719 + 1.7803 + 100 * 1.7543 + 100 * 0.0382; // for offsetting the negative value, to be added to decision boundary (negative dummy variables + negative cont. variables)
var low_threshold = 50 + negative_offset - constant; // Threshold + negative offset
var mid_threshold = 150 + negative_offset - constant; // Threshold + negative offset
var high_threshold = 250 + negative_offset - constant; // Threshold + negative offset
