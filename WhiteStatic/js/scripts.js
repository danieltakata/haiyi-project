$(function() {


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
          drawStacked();
      }, 300);
  });
  // populate the cards
  for (var i = 2; i<=students.length; i++) {
    var clone = $('#studentCard_1').clone();
    clone.attr('id', 'studentCard_'+i);
    clone.find('#chart_div_1').attr('id','chart_div_' + i);
    clone.find('#studentName').text('Student ' + i);
	for (var key in students[i-1]) {
		if (key == 'GRE-verbal' || key == 'GRE-quantitative'){
			clone.find('#' + key).text(students[i-1][key]+130);
		}
		else if (key != 'admission') {
			clone.find('#' + key).text(students[i-1][key]);
		}
	}

    //append clone on the end
    $('#myCarousel-container').append(clone);
    // var chart = new google.visualization.BarChart(document.getElementById('chart_div_' + i));
    // chart.draw(data, options);
  }
  $('#studentCard_1').addClass('active');


// $(document).ready(function() {
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
});

google.charts.load('current', {packages: ['corechart', 'bar']});
// google.charts.setOnLoadCallback(drawStacked);

var weights = [
	''                // Name -- NOTHING HERE
	,0.114911184251   // GRE-verb
	,0.0880320310069  // GRE-quant
	,0.2926697271     // GRE-write
	,1.584509831      // GPA
	,1                // Major
	,0.00294640714041 // Inst-Rank
	,1                // Country of origin
	,0.756277254266   // Personal Statement
	,0.317935719456   // Diversity score
	,1                // Recommendation letter 1
	,0.00643092126893 // Rec1 inst
	,1                // Recommendation letter 2
	,0.00163152813703 // Rec2 inst
	,1                // Recommendation letter 3
	,0.00109465199226 // Rec3 inst
];

var threshold = 19.0653422959;

function drawStacked() {
	//

	var options = {
		title:'Admission Result',
		chartArea: {width: '80%'},
		isStacked: true,
		hAxis: {
			title: '',
			minValue: 0,
			maxValue: 40.236724062345,
			gridlines:{
				color:'black'
			},
			ticks: [{v:threshold,f:'strong candidate'},{v:40.236724062345, f:''}]
		},
		// grouped by color of similar shade
		colors: ['#CC0000', '#FF0000', '#FF9999', '#5BE500', '#62D119', '#A8E57F', '#8900E5', '#AD33FF', '#D699FF', '#00F7FF', '#99FBFF'],
		legend: { position: 'none' }
	};

	// Render charts for all profiles
	for (var i = 1; i<=students.length; i++) {

		var studentData = [
			['Name', 'GRE-verbal',  'GRE-quantitative',
			'GRE-writing', 'GPA', 'Major', 'Institution-Rank',
			'Country', 'Personal-Statement',  'Diversity-Score',
			'Recommendation Letter 1',  'Recommendation Letter 2',  'Recommendation Letter 3'],
			['', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		];
		for (var j=1; j<studentData[0].length; j++) {
			switch (studentData[0][j]) {
				case 'Major':
					switch (students[i-1]['Major']) {
						case 'Computer Science':
							studentData[1][j] = 1.5594831748;
							break;
						case 'STEM':
							studentData[1][j] = 0.30693782874;
							break;
						default:
							studentData[1][j] = 0;
					}
					break;
				case 'Institution-Rank':
					studentData[1][j] = (1000 - students[i-1]['Institution-Rank'])*weights[j];
					break;
				case 'Country':
					switch (students[i-1]['Major']) {
						case 'US':
							studentData[1][j] = 0;
							break;
						default:
							studentData[1][j] = 0.513354407198;
					}
					break;
				case 'Personal-Statement':
					studentData[1][j] = (students[i-1]['Personal-Statement']-1)*weights[j];
					break;
				case 'Diversity-Score':
					studentData[1][j] = (students[i-1]['Diversity-Score']-1)*weights[j];
					break;
				case 'Recommendation Letter 1':
					studentData[1][j] = (1000 - students[i-1]['RL1inst'])*weights[11];
					switch (students[i-1]['RL1']) {
						case 'Top 5%':
							studentData[1][j] += 2.00627220247;
							break;
						case 'Top 10%':
							studentData[1][j] += 1.11329686474;
							break;
						case 'Top 20%':
							studentData[1][j] += 0.87623872879;
							break;
						default:
							break;
					}
					break;
				case 'Recommendation Letter 2':
					studentData[1][j] = (1000 - students[i-1]['RL2inst'])*weights[13];
					switch (students[i-1]['RL2']) {
						case 'Top 5%':
							studentData[1][j] += 1.52087808051;
							break;
						case 'Top 10%':
							studentData[1][j] += 1.00101344554;
							break;
						case 'Top 20%':
							studentData[1][j] += 0.44907150816;
							break;
						default:
							break;
					}
					break;
				case 'Recommendation Letter 3':
					studentData[1][j] = (1000 - students[i-1]['RL3inst'])*weights[15];
					switch (students[i-1]['RL3']) {
						case 'Top 5%':
							studentData[1][j] += 1.51416715224;
							break;
						case 'Top 10%':
							studentData[1][j] += 0.93864978431;
							break;
						case 'Top 20%':
							studentData[1][j] += 0.27703027917;
							break;
						default:
							break;
					}
					break;
				default:
					studentData[1][j] = students[i-1][studentData[0][j]]*weights[j];
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
var students = [
  {
    'admission': 1,
    'GRE-verbal': 32,
    'GRE-quantitative': 40,
    'GRE-writing': 4.5,
    'GPA': 3.6,
    'Major': 'Computer Science',
    'Institution-Rank': 193,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 192,
    'RL2': 'Top 10%',
    'RL2inst': 192,
    'RL3': 'Top 10%',
    'RL3inst': 179
  },
  {
    'admission': 0,
    'GRE-verbal': 13,
    'GRE-quantitative': 29,
    'GRE-writing': 2.5,
    'GPA': 3.59,
    'Major': 'Computer Science',
    'Institution-Rank': 190,
    'Country': 'US',
    'Personal-Statement': 3,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 167,
    'RL2': 'Top 10%',
    'RL2inst': 203,
    'RL3': 'Top 10%',
    'RL3inst': 193
  },
  {
    'admission': 1,
    'GRE-verbal': 22,
    'GRE-quantitative': 35,
    'GRE-writing': 4,
    'GPA': 3.81,
    'Major': 'Computer Science',
    'Institution-Rank': 186,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 4,
    'RL1': 'Top 10%',
    'RL1inst': 189,
    'RL2': 'Top 10%',
    'RL2inst': 205,
    'RL3': 'Top 10%',
    'RL3inst': 192
  },
  {
    'admission': 1,
    'GRE-verbal': 22,
    'GRE-quantitative': 35,
    'GRE-writing': 3.5,
    'GPA': 3.42,
    'Major': 'Computer Science',
    'Institution-Rank': 190,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 4,
    'RL1': 'Top 10%',
    'RL1inst': 205,
    'RL2': 'Top 10%',
    'RL2inst': 194,
    'RL3': 'Top 10%',
    'RL3inst': 206
  },
  {
    'admission': 0,
    'GRE-verbal': 22,
    'GRE-quantitative': 34,
    'GRE-writing': 4,
    'GPA': 3.56,
    'Major': 'Computer Science',
    'Institution-Rank': 1,
    'Country': 'US',
    'Personal-Statement': 3,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 207,
    'RL2': 'Top 10%',
    'RL2inst': 209,
    'RL3': 'Top 10%',
    'RL3inst': 210
  },
  {
    'admission': 1,
    'GRE-verbal': 22,
    'GRE-quantitative': 35,
    'GRE-writing': 4,
    'GPA': 3.56,
    'Major': 'Computer Science',
    'Institution-Rank': 347,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 216,
    'RL2': 'Top 10%',
    'RL2inst': 203,
    'RL3': 'Top 10%',
    'RL3inst': 183
  },
  {
    'admission': 1,
    'GRE-verbal': 22,
    'GRE-quantitative': 34,
    'GRE-writing': 3.5,
    'GPA': 3.56,
    'Major': 'Computer Science',
    'Institution-Rank': 190,
    'Country': 'US',
    'Personal-Statement': 5,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 178,
    'RL2': 'Top 10%',
    'RL2inst': 193,
    'RL3': 'Top 10%',
    'RL3inst': 200
  },
  {
    'admission': 0,
    'GRE-verbal': 23,
    'GRE-quantitative': 35,
    'GRE-writing': 4,
    'GPA': 3.58,
    'Major': 'STEM',
    'Institution-Rank': 180,
    'Country': 'US',
    'Personal-Statement': 3,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 159,
    'RL2': 'Top 10%',
    'RL2inst': 180,
    'RL3': 'Top 10%',
    'RL3inst': 205
  },
  {
    'admission': 0,
    'GRE-verbal': 23,
    'GRE-quantitative': 35,
    'GRE-writing': 3.5,
    'GPA': 3.6,
    'Major': 'STEM',
    'Institution-Rank': 190,
    'Country': 'US',
    'Personal-Statement': 3,
    'Diversity-Score': 5,
    'RL1': 'Top 10%',
    'RL1inst': 198,
    'RL2': 'Top 10%',
    'RL2inst': 203,
    'RL3': 'Top 10%',
    'RL3inst': 176
  },
  {
    'admission': 0,
    'GRE-verbal': 22,
    'GRE-quantitative': 35,
    'GRE-writing': 4,
    'GPA': 3.6,
    'Major': 'STEM',
    'Institution-Rank': 200,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 2,
    'RL1': 'Top 10%',
    'RL1inst': 203,
    'RL2': 'Top 10%',
    'RL2inst': 196,
    'RL3': 'Top 10%',
    'RL3inst': 206
  },
  {
    'admission': 1,
    'GRE-verbal': 22,
    'GRE-quantitative': 35,
    'GRE-writing': 3.5,
    'GPA': 3.74,
    'Major': 'STEM',
    'Institution-Rank': 194,
    'Country': 'US',
    'Personal-Statement': 3,
    'Diversity-Score': 3.5,
    'RL1': 'Top 5%',
    'RL1inst': 1,
    'RL2': 'Top 10%',
    'RL2inst': 200,
    'RL3': 'Top 10%',
    'RL3inst': 208
  },
  {
    'admission': 0,
    'GRE-verbal': 23,
    'GRE-quantitative': 34,
    'GRE-writing': 3.5,
    'GPA': 3.57,
    'Major': 'STEM',
    'Institution-Rank': 202,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 494,
    'RL2': 'Top 10%',
    'RL2inst': 203,
    'RL3': 'Top 10%',
    'RL3inst': 212
  },
  {
    'admission': 1,
    'GRE-verbal': 22,
    'GRE-quantitative': 35,
    'GRE-writing': 4,
    'GPA': 3.57,
    'Major': 'STEM',
    'Institution-Rank': 196,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 206,
    'RL2': 'Top 5%',
    'RL2inst': 1,
    'RL3': 'Top 10%',
    'RL3inst': 224
  },
  {
    'admission': 0,
    'GRE-verbal': 22,
    'GRE-quantitative': 35,
    'GRE-writing': 4,
    'GPA': 3.6,
    'Major': 'STEM',
    'Institution-Rank': 185,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 4,
    'RL1': 'Top 10%',
    'RL1inst': 189,
    'RL2': 'Top 50%',
    'RL2inst': 482,
    'RL3': 'Top 10%',
    'RL3inst': 213
  },
  {
    'admission': 0,
    'GRE-verbal': 23,
    'GRE-quantitative': 35,
    'GRE-writing': 3.5,
    'GPA': 3.57,
    'Major': 'STEM',
    'Institution-Rank': 190,
    'Country': 'US',
    'Personal-Statement': 3,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 162,
    'RL2': 'Top 10%',
    'RL2inst': 205,
    'RL3': 'Top 5%',
    'RL3inst': 1
  },
  {
    'admission': 0,
    'GRE-verbal': 23,
    'GRE-quantitative': 34,
    'GRE-writing': 4,
    'GPA': 3.71,
    'Major': 'STEM',
    'Institution-Rank': 199,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 4,
    'RL1': 'Top 10%',
    'RL1inst': 198,
    'RL2': 'Top 10%',
    'RL2inst': 193,
    'RL3': 'Top 50%',
    'RL3inst': 464
  },
  {
    'admission': 1,
    'GRE-verbal': 23,
    'GRE-quantitative': 34,
    'GRE-writing': 3.5,
    'GPA': 3.71,
    'Major': 'Computer Science',
    'Institution-Rank': 190,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 3.5,
    'RL1': 'Top 10%',
    'RL1inst': 192,
    'RL2': 'Top 10%',
    'RL2inst': 200,
    'RL3': 'Top 10%',
    'RL3inst': 204
  },
  {
    'admission': 0,
    'GRE-verbal': 23,
    'GRE-quantitative': 35,
    'GRE-writing': 4,
    'GPA': 3.49,
    'Major': 'Other',
    'Institution-Rank': 186,
    'Country': 'US',
    'Personal-Statement': 4,
    'Diversity-Score': 4,
    'RL1': 'Top 10%',
    'RL1inst': 207,
    'RL2': 'Top 10%',
    'RL2inst': 197,
    'RL3': 'Top 10%',
    'RL3inst': 186
  }
];
