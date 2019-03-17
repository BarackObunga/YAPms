var currentCache = 'v0.11.35';

var states = [];
var lands = [];
var buttons = [];

// data for the chart
var chart;
var chartData = {
	labels:[],
	datasets: [{
		label: "",
		backgroundColor: [],
		borderColor: chartBorderColor,
		borderWidth: chartBorderWidth,
		data:[]
	}, {}, {}, {}]
}
var chartOptions;
var chartType;
var chartPosition;
var chartPieScales;
var chartBarScales;
var chartPolarScales;
var chartRadarScales;

var chartLeans = true;

// pan object
var panobject;

// paint data
var paintIndex = 'Tossup';
var maxColorValue = 2;

var chartBorderWidth = 2;
var chartBorderColor = '#000000';

var mode = 'paintmove';

var mapType = 'presidential';
var mapYear = 'open';

var blockPresets = false;

var legendCounter = true;
var legendLeans = true;

var loadConfig = {
	filename: '', 
	fontsize: 16, 
	strokewidth: 1.5,
	dataid: '', 
	type: '',
	year: ''
};

var strokeMultiplier = 1;

var previousPalette = function() {
	toWinPalette();	
};

var panObject = null;

function share() {
	var svg = document.getElementById('svgdata');
	var mapdiv = document.getElementById('map-div');
	var mapwidth = mapdiv.offsetWidth;
	var mapheight = mapdiv.offsetHeight;
		
	svg.setAttribute('width', mapwidth);
	svg.setAttribute('height', mapheight);

	var svgtext = document.getElementById('text');
	var oldfontsize;
	// set font size and family to something that will render
	if(svgtext !== null) {
		svgtext.style.fontFamily = 'arial';
		oldfontsize = svgtext.style.fontSize;
		svgtext.style.fontSize = '15px';
	}

	var chartdiv = document.getElementById('chart-div');
	//var oldborder = chartdiv.style.border;
	//chartdiv.style.border = 'none';

	var applicationWidth = document.getElementById('application').offsetWidth;
	var applicationHeight = document.getElementById('application').offsetHeight;

	html2canvas(document.getElementById('application'), {async: false, logging: true}).then(function(canvas) {
		notification.appendChild(canvas);
		// set the text back
		if(svgtext !== null) {
			svgtext.style.fontFamily = '';
			svgtext.style.fontSize = oldfontsize;
			svg.removeAttribute('width');
			svg.removeAttribute('height');
		}
		canvas.style.width = 0;
		canvas.style.height = 0;	
		canvas.style.display = 'none';
		var img = canvas.toDataURL('image/png');
		var i = document.getElementById('screenshotimg');
		i.src = img;
		i.style.width = '40vw';
		i.style.height = 'auto';
		saveMap(img);
	});

	displayShare();
}

window.onerror = function(message, source, lineno, colno, error) {
	//alert(message + ' ' + source + ' ' + lineno + ' ' + colno);
	if(typeof gtag !== 'undefined') {
		console.log('Error');
		gtag('event', 'exception', {
			'description': message + ' ' + source + ' ' + lineno + ' ' + colno + ' ' + currentCache
		});
		gtag('event', 'error', {
			'event_category': 'error',
			'event_label': message + ' ' + source + ' ' + lineno + ' ' + colno + ' ' + currentCache
		});
	}
}

// reads through the SVG and sets up states and buttons
function initData(dataid) {
	// clear any previously loaded data
	states = [];
	buttons = [];
	lands = [];

	// get list of all html state elements
	var htmlElements = document.getElementById('outlines').children;

	// iterate over each element
	for(var index = 0, length = htmlElements.length; index < length; ++index) {
		var htmlElement = htmlElements[index];
		htmlElement.setAttribute('style', 'inherit');
		var name = htmlElement.getAttribute('id');
		if(name.includes('*lines*') || name.includes("*ignore*")) {
			// do nothing with it paths that
			// have these ids
		} else if(name.includes('-button')) {
			// don't include buttons as states
			htmlElement.setAttribute('onclick',
				'buttonClick(this)');
			buttons.push(htmlElement);
		} else if(name.includes('-land')) {
			htmlElement.setAttribute('onclick', 'landClick(this)');
			lands.push(htmlElement);
		} else {
			htmlElement.setAttribute('onclick', 'stateClick(this)');
			states.push(new State(name, htmlElement, dataid));
		}
	}

	/* Special Elections for Senate */
	var special = document.getElementById('special');
	var specialChildren;
	if(special != null) {
		specialChildren = special.children;

		for(var index = 0; index < specialChildren.length; ++index) {
			var htmlElement = specialChildren[index];
			htmlElement.setAttribute('onclick',
				'specialClick(this)');
			var name = htmlElement.id;
			var state = new State(name, htmlElement, dataid);
			states.push(state);
		}
	}
}

function initChart() {
	chartOptions = {
		// This basically inserts HTML into the legend-div div
		// it's a WIP
		legendCallback: function(chart) {
			console.log("Generating Legend...");
			var legendDiv = document.getElementById('legend-div');
			legendDiv.innerHTML = '';
			var index = -1;
			for(var key in candidates) {
				var candidate = candidates[key];
				++index;
				var legendElement = document.createElement('div');
				legendElement.setAttribute('id', candidate.name);
				legendElement.setAttribute('class', 'legend-button');
				legendElement.setAttribute(
					'onclick', 'legendClick("' + key + '", this);');
				legendElement.style.background = 'none';
				legendDiv.appendChild(legendElement);
			
				var legendText = document.createElement('div');
				legendText.setAttribute('id', candidate.name + '-text');	
				legendText.setAttribute('class', 'legend-button-text');	
				legendText.style.backgroundColor = candidate.colors[0];
				if(index == 0) {
					var color = candidate.colors[tossupColor];
					legendText.style.backgroundColor = color;
				}
				legendText.style.padding = '0px';
				legendText.innerHTML = candidate.name;
				legendElement.appendChild(legendText);
		
				var legendColorDiv = document.createElement('div');
				legendColorDiv.setAttribute('class', 'legend-color-div');
				legendElement.appendChild(legendColorDiv);

				if(key !== 'Tossup' && legendLeans) {
					var amts = ['solid', 'likely', 'lean', 'tilt'];
					for(var index = 0; index < amts.length; ++index) {
						var legendColor = document.createElement('div');
						legendColor.setAttribute('class', 'legend-color');
						legendColor.setAttribute('id', candidate.name + amts[index]);
						legendColor.style.backgroundColor = candidate.colors[index];
						legendColorDiv.appendChild(legendColor);
					}
				}
				
			}
		},
		// do not display the build in legend for the chart
		legend: {
			display: false
		},
		tooltips: {
			display: true,
			position: 'average',
			titleFontColor: 'black',
			bodyFontColor: 'black',
			backgroundColor: 'white',
			borderColor: 'black',
			borderWidth: 2,
			caretSize: 0,
			cornerRadius: 0
		},
		// turn off animation
		animation: {
			animateRotate: false,
			animateScale: true
		},
		plugins: {
			datalabels: {
				//display: 'auto',
				display: function(context) {
					return context.dataset.data[context.dataIndex] !== 0;
				},
				backgroundColor: 'white',
				borderColor: 'black',
				borderRadius: 5,
				borderWidth: 2,
				color: 'black',
				font: {
					family: 'Roboto',
					size: 15,
					weight: 700
				}
			}
		},
		barStrokeWidth: 0
	}
//Chart.defaults.global.barPercentage = 0;
//Chart.defaults.global.categoryPercentage = 0;

	chartBarScales = {
		yAxes: [{
			stacked: true,
			gridLines: {
				display: false,
				drawBorder: false
			},
			ticks: {
				fontSize: 15,
				fontColor: '#ffffff',
				fontFamily: 'Roboto',
				fontStyle: 500
			}
		}],
		xAxes: [{
			stacked: true,
			gridLines: {
				display: false,
				drawBorder: false
			},
			ticks: {
				beginAtZero: true,
				fontSize: 15,
				fontColor: '#ffffff',
				fontStyle: 500,
				fontFamily: 'Roboto'
			}
		}]
	}

	chartPieScales = {
		yAxes: [{
			display: false
		}],
		xAxes: [{
			display: false
		}]
	}
	
	chartPolarScales = {
		display: false
	}

	chartRadarScales = {
		display: false
	}

	chartOptions.scales = chartPieScales;

	Chart.defaults.global.elements.rectangle.borderWidth = 2;
	
	// get the context
	var ctx = document.getElementById('chart-canvas').getContext('2d');
	ctx.height = 200;

	// create the chart
	chart = new Chart(ctx, {
		type: 'doughnut',
		data: {
			labels:[],
			datasets: [{
				label: "",
				backgroundColor: '#ffffff',
				borderColor: '#ffffff',
				borderWidth: 0,
				data:[]
			}, {}, {}, {}],
		},
		options: chartOptions,
		maintainAspectRatio: true
	});

	chart.generateLegend();

	chartType = 'doughnut';
}

function setDelegates(e) {
	e.parentElement.style.display = '';
	var stateid = document.getElementById('demdel-state-name').value;
	var state = states.find(state => state.name === stateid);
	// keep the total delegates
	var total = state.voteCount;
	for(var key in candidates) {
		if(key === 'Tossup')
			continue;
		var range = document.getElementById('range-' + key);
		state.delegates[key] = parseInt(range.value);
		// subtract the delegates for each candidate
		total -= parseInt(range.value);
	}
	// set the tossup delegates to the remaining
	state.delegates['Tossup'] = total;

	var majorityCandidate = 'Tossup';
	var majorityVoteCount = 0;
	for(var key in state.delegates) {
		if(state.delegates[key] > majorityVoteCount) {
			majorityCandidate = key;
			majorityVoteCount = state.delegates[key];
		} else if(state.delegates[key] === majorityVoteCount) {
			majorityCandidate = 'Tossup';
			console.log('Tossup');
		}
	}
	
	if(majorityCandidate === 'Tossup') {
		state.setColor('Tossup', 2);
	}
	else {
		state.setColor(majorityCandidate, 0);
	}

	countVotes();
	updateChart();
	updateLegend();
}

function clearDelegates() {
	for(var index = 0; index < states.length; ++index) {
		state = states[index];
		state.delegates = {};
	}

	countVotes();
	updateChart();
	updateLegend();
}

function setEC(e) {
	// hide the popup window
	e.parentElement.style.display = 'none';

	// get the stateId and input value
	var stateId = e.parentElement.querySelector('#state-id').value;
	var input = e.parentElement.querySelector('#state-ec').value;

	// get the state and set its new vote count
	states.forEach(function(element) {
		if(element.getName() === stateId) {
			element.setVoteCount(parseInt(input), true);
		}
	});


	// update the html text display
	var stateText = document.getElementById(stateId + '-text');
	// if the id has a dash then remove it
	if(stateId.includes('-')) {
		var split = stateId.split('-');
		stateId = split[0] + split[1];
	}
	var text = stateId + ' ' + input;
	// the text elements in an svg are inside spans
	if(typeof stateText.childNodes[1] !== 'undefined') {
		stateText.childNodes[1].innerHTML = ' ' + input;
	} else {
		stateText.childNodes[0].innerHTML = stateId + ' ' + input;
	}

	// recount the votes
	countVotes();
	updateChart();
	updateLegend();
}

function rebuildChart() {

	var html = document.getElementById('chart-canvas');
	var ctx = html.getContext('2d');
	//var type = chart.config.type;
	chart.destroy();
	chart = new Chart(ctx, {
		type: chart.config.type, 
		data: chartData, 
		options: chartOptions
	});
	
	// dont display the chart if its a battle chart
	if(chartType === 'battle') {	
		var chartcontainer = document.getElementById('chart');
		chartcontainer.style.display = 'none';
	}

	updateChart();

}

function toggleLegendCounter() {
	legendCounter = !legendCounter;
	updateLegend();
}

function toggleLegendLeans() {
	legendLeans = !legendLeans;
	chart.generateLegend();
	updateLegend();
}

function toggleChartLabels() {

	if(chartOptions.plugins.datalabels.display != false) {
		chartOptions.plugins.datalabels.display = false;
	} else {
		chartOptions.plugins.datalabels.display = function(context) {
			return context.dataset.data[context.dataIndex] !== 0;
		}
	}

	rebuildChart();
}

function toggleChartLeans() {
	chartLeans = !chartLeans;
	rebuildChart();
}

function setMode(set) {
	console.log('mode ' +  mode + ' | set ' + set + 
		' | mapType ' + mapType + ' | mapYear ' + mapYear);

	var notification = document.getElementById('notification');
	var message = notification.querySelector('#notification-message');
	var title = notification.querySelector('#notification-title');

	if(mapYear !== 'open') {
		if(set === 'ec' || set === 'candidate' || set === 'delete') {
			title.innerHTML = 'Sorry';
			message.innerHTML = 'This mode is not available while editing a historical ' + mapType + ' map';
			notification.style.display = 'inline';
			console.log('denied');
			return;
		}
	}

	if(mapType === 'gubernatorial') {
		if(set === 'ec') {
			title.innerHTML = 'Sorry';
			message.innerHTML = 'This mode is not available while editing a guberatorial map';
			notification.style.display = 'inline';
			console.log('denied');
			return;
		}
	}

	if(mapType === 'senatorial') {
		if(set === 'delete' || set === 'ec') {
			title.innerHTML = 'Sorry';
			message.innerHTML = 'This mode is not available while editing a senatorial map';
			notification.style.display = 'inline';
			console.log('denied');
			return;

		}
	}

	if(mapType === 'congressional') {
		if(set === 'delete' || set === 'ec') {
			title.innerHTML = 'Sorry';
			message.innerHTML = 'This mode is not available while editing a congressional map';
			notification.style.display = 'inline';
			console.log('denied');
			return;
		}
	}
	
	console.log('allowed');

	mode = set;

	var modeHTML = document.getElementById('modesbutton');
	var modeText;
	var notificationText;

	if(mobile === false) {
		panObject.disablePan();
		panObject.disableZoom();
	}

	if(set === 'paintmove') {
		modeText = '<i class="fas fa-paint-brush"></i> Paint/Move';
		panObject.enablePan();
		panObject.enableZoom();
	} else if(set === 'paint') {
		modeText = '<i class="fas fa-paint-brush"></i> Paint';
	} else if(set === 'move') {
		modeText = '<i class="fas fa-arrows-alt"></i> Move';
		panObject.enablePan();
		panObject.enableZoom();
	} else if(set === 'ec') {
		modeText = '<i class="fas fa-edit"></i> EC Edit';
		notificationText = "Click on a state to set its electoral college";
	} else if(set === 'delete') {
		modeText = '<i class="fas fa-eraser"></i> Delete';
		notificationText = "Click on a state to delete it";
	} else if(set === 'candidate') {
		modeText = '<i class="fas fa-user-edit"></i> Candidate Edit';
		notificationText = "Click on a candidate in the legend to edit its name and color";
	}

	modeHTML.innerHTML = '<i class="fas fa-cog"></i> Modes (' + modeText + ')';

	var notification = document.getElementById('notification');
	if(mode === 'paint' || mode === 'move' || mode === 'paintmove') {
		notification.style.display = 'none';
	} else if(mode !== 'paint') {
		notification.style.display = 'inline';
		var title = notification.querySelector('#notification-title');
		title.innerHTML = modeText;
		var message = notification.querySelector('#notification-message');
		message.innerHTML = notificationText;
	}
}

function closeNotification(e) {
	e.parentElement.style.display = 'none';
}

function closeShare(e) {
	e.parentElement.style.display = 'none';
}


// if paint index is invalid, change it to tossup
// ( WORK IN PROGRESS)
function verifyPaintIndex() {
	if(typeof candidates[paintIndex] === 'undefined') {
		paintIndex = 'Tossup';
	}
}

// make sure states are proper colors
// if states have invalid colors, turn them white
function verifyMap() {
	states.forEach(function(state) {
		//state.verifyDisabledColor();
		state.verifyTossupColor();
		if(typeof candidates[state.candidate] === 'undefined') {
			// if the current color is out of bounds set it to white
			state.setColor('Tossup', tossupColor);
		} else { 
			// the candidate the state thinks its controled by
			var currentCandidate = state.getCandidate();
			// the candidate the state should be controle by
			var shouldCandidate = candidates[state.getCandidate()].name;

			// if these values differ, change the state to tossup
			if(currentCandidate !== shouldCandidate) {
				state.setColor('Tossup', tossupColor);
			} else if(state.getCandidate() === 'Tossup') {
				state.setColor('Tossup', 2);	
			}else {
				state.setColor(state.getCandidate(), state.getColorValue());
			}
		}
	});
	
	if(loadConfig.filename === './res/lte_house.svg') {
		updateLTEHouse();
	}
}

// sets all states to white
function clearMap() {
	loadMap(loadConfig.filename, loadConfig.fontsize, loadConfig.strokewidth, loadConfig.dataid, loadConfig.type, loadConfig.year);
}

// iterate over each state and delegate votes to the candidate
function countVotes() {
	var mid = document.getElementById("battlechartmid");
	if(mid !== null) {
		mid.setAttribute("fill", TOSSUP.colors[2]);
	}

	if(mapType === 'primary') {
		for(var key in candidates) {
			var candidate = candidates[key];
			candidate.voteCount = 0;
			candidate.probVoteCounts = [0,0,0,0];
			for(var stateIndex = 0, length = states.length; stateIndex < length; ++stateIndex) {
				var state = states[stateIndex];
				if(typeof state.delegates === 'undefined') {
					state.delegates = {};
				}
				if(typeof state.delegates[key] === 'undefined') {
					state.delegates[key] = 0;
					if(key === 'Tossup') {
						state.delegates[key] = state.voteCount;	
					}
				}
				if(isNaN(state.delegates[key])) {
					console.log(state);
				}
				candidate.voteCount += state.delegates[key];
				candidate.probVoteCounts[0] += state.delegates[key];
			}
		}
	} else {
		// iterate over every candidate
		//candidates.forEach(function(candidate, candidateIndex) {
		var candidateIndex = -1;
		for(var key in candidates) {
			var candidate = candidates[key];
			++candidateIndex;
			candidate.voteCount = 0;
			candidate.probVoteCounts = [0,0,0,0];
			// iterate over every state
			for(var stateIndex = 0, length = states.length; stateIndex < length; ++stateIndex) {
				var state = states[stateIndex];
				// if the candidate value of the state
				// equals the index value of the candidate
				// add the vote count to the candidate 
				if(state.candidate === key) {
					candidate.voteCount += state.voteCount;
					candidate.probVoteCounts[state.colorValue] += state.voteCount;
				}
			}

			if(mid !== null) {
				if(candidate.voteCount > Math.ceil(totalVotes / 2)) {
					if(key === 'Tossup') {
						mid.setAttribute("fill",candidate.colors[2]);
					} else {
						mid.setAttribute("fill", candidate.colors[0]);
					}
				}
			}
		}
	}
}

// change the colors of the districts so that they are the
// color of the majority
function updateLTEHouse() {
	var outlines = document.getElementById('outlines');

	var children = outlines.children;

	var districts = [];

	for(var index = 0; index < children.length; ++index) {
		var child = children[index];

		if(child.id.includes('-LTEHOUSE')) {
			districts.push(child);	
		}
	}

	districts.forEach(function(element) {
		var districtname = element.id.split('-')[0];
		var count = {};

		// loop through each district seat (because they are states)
		for(var index = 0; index < states.length; ++index) {
			var seat = states[index];
			// if the name of the district isnt in the seat skip it
			if(seat.name.includes(districtname) == false) {
				continue;
			}
			// look at the candidate and count it
			var candidate = seat.getCandidate();
			if(candidate in count) {
				count[candidate] += 1;
			} else {
				count[candidate] = 1;
			}
		}
		
		var majorCandidate = 'Tossup';
		var majorCount = 0;
	
		// find the candidate with the most seats
		for(var key in count) {
			if(count[key] > majorCount) {
				majorCandidate = key;
				majorCount = count[key];
			} else if(count[key] == majorCount) {
				majorCandidate = 'Tossup';
			}
		}
	
		// set the fill of the district
		if(majorCandidate === 'Tossup') {
			element.style.fill = candidates[majorCandidate].colors[2];
		} else {
			element.style.fill = candidates[majorCandidate].colors[0];
		}
	});
}

// updates the information of the chart (so the numbers change)
function updateChart() {
	if(chartType === 'verticalbattle' ||
		chartType === 'horizontalbattle') {
		updateBattleChart();
		return;
	} else if(chartType === 'horizontalBar') {
		updateBarChart();
	} else {
		updateNonRadarChart();	
	}

	chart.config.data = chartData;
	chart.update();
}

function updateBarChart() {
	chartData.labels = [];
	chartData.datasets[0].data = [];
	chartData.datasets[0].backgroundColor = [];
	chartData.datasets[1].data = [];
	chartData.datasets[1].backgroundColor = [];
	chartData.datasets[2].data = [];
	chartData.datasets[2].backgroundColor = [];
	chartData.datasets[3].data = [];
	chartData.datasets[3].backgroundColor = [];
	
	// each label is a candidate
	for(var key in candidates) {
		chartData.labels.push(key);
	}

	if(chartLeans) {
		for(var probIndex = 0; probIndex < 4; ++probIndex) {
			for(var key in candidates) {
				var candidate = candidates[key];
				var name = candidate.name;
				var count = candidate.probVoteCounts[probIndex];
				chartData.datasets[probIndex].data.push(count);

				var color = candidate.colors[probIndex];
				chartData.datasets[probIndex].backgroundColor.push(color);
			}
		}
	} else {
		for(var key in candidates) {
			var candidate = candidates[key];
			var name = candidate.name;
			var count = candidate.voteCount;
			chartData.datasets[0].data.push(count);

			if(key === 'Tossup') {
				var color = candidate.colors[2];
				chartData.datasets[0].backgroundColor.push(color);

			} else {
				var color = candidate.colors[0];
				chartData.datasets[0].backgroundColor.push(color);
			}
		}

	}
}

function updateNonRadarChart() {
	chartData.labels = [];

	chartData.datasets[0].data = [];
	chartData.datasets[0].backgroundColor = [];
	chartData.datasets[0].borderColor = chartBorderColor;
	chartData.datasets[0].borderWidth = chartBorderWidth;

	// loop though candidates
	var candidateIndex = -1;
	for(var key in candidates) {
		++candidateIndex;
		var candidate = candidates[key];
		var name = candidate.name;
		var voteCount = candidate.voteCount;
		var color = candidate.colors[0];
		if(candidateIndex == 0) {
			color = candidates['Tossup'].colors[tossupColor];
			// append the candidate label
			chartData.labels[0] = 'Tossup';
			// append the vote count
			chartData.datasets[0].data[0] = voteCount;
			// change the background color of the visual
			chartData.datasets[0].backgroundColor.push(color);
		} else if(chartLeans) {
			for(var probIndex = 0; probIndex < 4; ++probIndex) {
				var count = candidate.probVoteCounts[probIndex];
				color = candidate.colors[probIndex];
				var index = (probIndex + (candidateIndex * 4)) - 3;
				chartData.labels[index] = name;
				chartData.datasets[0].data[index] = count;
				chartData.datasets[0].backgroundColor.push(color);
			}
		} else {
			var count = candidate.voteCount;
			color = candidate.colors[0];
			chartData.labels[candidateIndex] = name;
			chartData.datasets[0].data[candidateIndex] = count;
			chartData.datasets[0].backgroundColor.push(color);
		}
	}
}

// displays the vote count on the legend
// makes sure that the selected candidate is highlighted
function updateLegend() {
	var index = -1;
	for(var key in candidates) {
		var candidate = candidates[key];
		++index;
		var html = document.getElementById(candidate.name + '-text');

		var newHTML = candidate.name;

		if(legendCounter == true) {
			newHTML += ' ' + candidate.voteCount;
		}

		if(html !== null) {
			html.innerHTML = newHTML;
		}

		if(key === paintIndex) {
			selectCandidateDisplay(html.parentElement);
		}
	}
}

function centerMap() {
	if(panObject === null)
		return;

	panObject.resize();
	panObject.fit();
	panObject.center();
	panObject.zoomBy(0.85);
}

function toggleLTELogo() {
	var lteLogo = document.getElementById('logo-div');
	if(lteLogo.style.display === '') {
		lteLogo.style.display = 'inline';
	} else if(lteLogo.style.display === 'inline') {
		lteLogo.style.display = '';
	}
}

function setColors(palette) {
	var solid = document.getElementById('solid');
	var likely = document.getElementById('likely');
	var leaning =  document.getElementById('leaning');
	var tilting = document.getElementById('tilting');

	if(palette === 'red') {
		solid.value = '#bf1d29';
		likely.value = '#ff5865';
		leaning.value = '#ff8b98';
		tilting.value ='#cf8980';
	} else if(palette === 'blue') {
		solid.value = '#1c408c';
		likely.value = '#577ccc';
		leaning.value = '#8aafff';
		tilting.value = '#949bb3';
	} else if(palette === 'green') {
		solid.value = '#1c8c28';
		likely.value = '#50c85e';
		leaning.value = '#8aff97';
		tilting.value = '#7a997e';
	} else if(palette === 'yellow') {
		solid.value = '#e6b700';
		likely.value = '#e8c84d';
		leaning.value = '#ffe78a';
		tilting.value = '#b8a252';
	}
}

function onResize() {
	centerMap();

	// make sure the height is maxed out if the chart is on the bottom	
	if(chartPosition === 'bottom') {
		var sidebarhtml = document.getElementById('chart-div');
		var charthtml = document.getElementById('chart');
		charthtml.style.height = 'auto';
		charthtml.style.width = '' + (sidebarhtml.offsetHeight - 5) + 'px';
	} else {
		var sidebarhtml = document.getElementById('chart-div');
		var charthtml = document.getElementById('chart');
		charthtml.style.height = 'auto';
		charthtml.style.width = '100%';

	}
}

function start() {
	initCandidates();
	initChart();
	setChart('horizontalbattle');
	if(php_load_map === true) {
		$.ajax({
			url: "./maps/" + php_load_map_id,
			type: "POST",
			processData: false,
			contentType: false,
			success: function(a, b, c) {
				console.log("Found saved map...");
				loadSavedMap(a);
			},
			error: function(a, b, c) {
				console.log("Did not find saved map...");
				loadMap('./res/usa_presidential.svg', 16, 1, 'usa_ec',"presidential", "open");
			}
		});

	} else {
		loadPreset("classic");
		loadMap('./res/usa_presidential.svg', 16, 1, 'usa_ec',"presidential", "open");
	}
}

start();
