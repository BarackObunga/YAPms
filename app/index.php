<!DOCTYPE html>
<?php echo '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' ?>
<html class="noSelect" lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="description" content="Presidential, Senatorial, Congressional, Guberntorial, and Democratic Primary, political map simulator.">
	<meta name="keywords" content="Map,Election,Political,Interactive,Simulator,Electoral,270,2020">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<meta property="og:title" content="YAPms - Yet Another Political Map Simulator">
	<meta property="og:description" content="Interactive Political Maps">
	<meta property="og:image:type" content="image/jpeg">
	<meta property="og:site_name" content="yapms.com">

	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="yapms.com">
	<meta name="twitter:description" content="Interactive Political Maps">

	<meta name="theme-color" content="#ffffff"/>
	
	<!-- CSSs (1st is Font Awesome) -->
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
	<link rel="icon" href="https://www.yapms.com/favicon.ico" type="image/x-icon"/>
	<link rel="shortcut icon" href="https://www.yapms.com/favicon.ico" type="image/x-icon"/>
	<link rel="manifest" href="./manifest.json">

	<?php
		$mobile = false;
		
		if(strpos($_SERVER['HTTP_USER_AGENT'], 'Mobi')) {
			$mobile = true;	
			echo '<script>var mobile = true</script>';
		} else {
			$mobile = false;	
			echo '<script>var mobile = false</script>';
		};

		if(isset($_GET["m"]) && !empty($_GET["m"]) &&
			is_numeric($_GET["m"])) {
			echo '<script>' .
				'var php_load_map = true;' .
				'var php_load_map_id = '.$_GET["m"].';' .
				'</script>';	

			echo '<meta property="og:image" content="http://www.yapms.com/app/maps/' . $_GET["m"] . '.png">';
			echo '<meta property="og:image:secure_url" content="https://www.yapms.com/app/maps/' . $_GET["m"] . '.png">';
			echo '<meta name="twitter:image" content="https://www.yapms.com/app/maps/' . $_GET["m"] . '.png">';
		} else {
			echo '<script>' .
				'var php_load_map = false;' .
				'var php_load_map_id = 0;' .
			     '</script>';
		}
	?>

	<title>Interactive Maps - YAPms</title>

	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-132710089-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-132710089-1');
	</script>

	<style>
		<?php
			include './style/menu.css';
			include './style/selectmenu.css';
			include './style/popup.css';
			include './style/legend.css';
			include './style/style.css';
			include './style/battlechart.css';
			include './style/yapnews.css';
		?>
	</style>

	<link async rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">

	<!-- google ads -->
	<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<script>
	     (adsbygoogle = window.adsbygoogle || []).push({
		       google_ad_client: "ca-pub-1660456925957249",
					 enable_page_level_ads: true
					      });
	</script>
</head>

<body id="body" onresize="onResize()">

<div id="yapms">

<div id="menu-div">
	<button class="click-button" onclick="clearMap()" style="white-space: nowrap;">
		<i class="fas fa-window-close"></i> Clear
	</button>

	<button class="click-button" onclick="displayMapMenu()" style="white-space: nowrap;">
		<i class="far fa-map"></i> Maps
	</button>

	<button class="click-button" onclick="displayPresetMenu()" style="white-space: nowrap;">
		<i class="fas fa-users"></i> Candidates
	</button>

	<button id="modesbutton" class="click-button" onclick="displayModeMenu()" style="white-space: nowrap;">
		<i class="fas fa-cog"></i> Modes (<i class="fas fa-paint-brush"></i> Paint/Move)
	</button>

	<button class="click-button" onclick="displayChartMenu()" style="white-space: nowrap;">
		<i class="fas fa-chart-pie"></i> Charts
	</button>

	<button class="click-button" onclick="displayThemeMenu()" style="white-space: nowrap;">
		<i class="fas fa-palette"></i> Themes
	</button>

	<button class="click-button" onclick="share()" style="white-space: nowrap;">
		<i class="fas fa-share-alt"></i> Share
	</button>

	<button class="click-button" onclick="enableFullscreen()" style="white-space: nowrap;">
		<i class="fas fa-expand-arrows-alt"></i> Fullscreen	
	</button>

	<button class="click-button" onclick="displayMiscMenu()" style="white-space: nowrap;">
		<i class="far fa-clipboard"></i> Misc
	</button>
</div>


<div id="application">
	<div id="legend-div">

	</div>

	<div id="chart-div">
		<div id="chart">
		<canvas id="chart-canvas" width="100" height="100"></canvas>
		</div>

		<?php
			include 'html/battlechart.html';
		?>

		<div id="logo-div">
		</div>
	</div>

	<div id="map-div">

	</div>

<?php
if($mobile === false) {
	echo '<div id="yapnews-close" onclick="toggleYAPNews()">',
		'<svg class="yapnews-close-svg" width="8" height="24">',
			'<line id="yapnews-close-l1" x1="1" y1="0" x2="8" y2="12" stroke="#333333" stroke-width="2"/>',
			'<line id="yapnews-close-l2" x1="1" y1="24" x2="8" y2="12" stroke="#333333" stroke-width="2"/>',
		'</svg>',
		'</div>';
}
?>
</div>

</div>

<?php
if($mobile === false) {

	echo '<div id="yapnews">' ,
		'<div id="yapnews-header">' ,
		'<a href="https://www.yapms.com/news" target="_blank" ', 
		'style="color:inherit; text-decoration: none;">' ,
			'YAPNews' , 
		'</a>' ,
		'</div>' ,

		'<div id="sidebar-ad1">' ,
		'<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
		<ins class="adsbygoogle"
			style="display:block"
			data-ad-format="fluid"
			data-ad-layout-key="-7b+dg+5d-26-94"
			data-ad-client="ca-pub-1660456925957249"
			data-ad-slot="6532154886">
		</ins>
		<script>
			(adsbygoogle = window.adsbygoogle || []).push({});
		</script>',
		'</div>' ,
		'<div id="yapnews-articles">' ,
		'</div>' ,
	'</div>';
}
?>

<div id="demdel" class="popup">
	<h3 id="demdel-message"></h3>
	<div id="demdel-ranges">
	</div>
	<input id="demdel-state-name" type="hidden">
	<button onclick="setDelegates(this)">set</button>
</div>

<div id="ecedit" class="popup">
	<h3 id="ecedit-message"></h3>
	<input id="state-ec" type="number" name="value" min="1" max="10000" step="1">
	<input id="state-id" type="hidden">
	<button onclick="setEC(this)">set</button>
</div>

<div id="candidateedit" class="popup">
	<h3 id="candidateedit-message"></h3>
	<p> A name change will remove the candidate from the map </p>
	Name:<input id="candidate-name" type="text" name="name"><br>
	Solid:<input id="candidate-solid" type="color"><br>
	Likely:<input id="candidate-likely" type="color"><br>
	Lean:<input id="candidate-lean" type="color"><br>
	Tilt:<input id="candidate-tilt" type="color"><br>
	<input id="candidate-originalName" type="hidden">
	<button onclick="setCandidate(this)">set</button>
</div>

<div id="miscmenu" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>
	<h2>Misc</h2>
	<a class="selectmenu-button" onclick="displayVersionInfo()">Version Info</a>
	<a class="selectmenu-button" onclick="centerMap()">Center Map</a>
	<a class="selectmenu-button" onclick="toggleLTELogo()">LTE Logo</a>
	<a class="selectmenu-button" href="https://commons.wikimedia.org/wiki/File:Blank_US_Map_(states_only).svg" target="_blank" rel="noreferrer">Map Src</a>
</div>

<div id="addcandidatemenu" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>
	
	<h2>Add Candidate</h2>
	<a class="selectmenu-button">Name <input id="name" type="text"></a>
	<a class="selectmenu-button" onclick='setColors("red")'>Red Colors</a>
	<a class="selectmenu-button" onclick='setColors("blue")'>Blue Colors</a>
	<a class="selectmenu-button" onclick='setColors("green")'>Green Colors</a>
	<a class="selectmenu-button" onclick='setColors("yellow")'>Yellow Colors</a>
	<a class="selectmenu-button">Solid <input id="solid" type="color"></a>
	<a class="selectmenu-button">Likely <input id="likely" type="color"></a>
	<a class="selectmenu-button">Leaning <input id="leaning" type="color"></a>
	<a class="selectmenu-button">Tilting<input id="tilting" type="color"></a>
	<a class="selectmenu-button" onclick="addCandidate(); closeNotification(this);">Add</a>
</div>

<div id="modemenu" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>
	
	<h2>Select Mode</h2>
	<a class="selectmenu-button" id="paintmovebutton" onclick='closeNotification(this); setMode("paintmove")'><i class="fas fa-paint-brush"></i> Paint/Move</a>
	<a class="selectmenu-button" onclick='closeNotification(this); setMode("paint")'><i class="fas fa-paint-brush"></i> Paint</a>
	<a class="selectmenu-button" id="movebutton" onclick='closeNotification(this); setMode("move")'><i class="fas fa-arrows-alt"></i> Move</a>
	<a class="selectmenu-button" onclick='closeNotification(this); setMode("delete")'><i class="fas fa-eraser"></i> Delete</a>
	<a class="selectmenu-button" onclick='closeNotification(this); setMode("ec")'><i class="far fa-edit"></i> EC Edit</a>
	<a class="selectmenu-button" onclick='closeNotification(this); setMode("candidate")'><i class="fas fa-user-edit"></i> Candidate Edit</a>
</div>

<div id="thememenu" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>

	<h2>Select Theme</h2>	
	<a class="selectmenu-button" onclick='darkPalette()'>Dark</a>
	<a class="selectmenu-button" onclick='terminalPalette()'>Terminal</a>
	<a class="selectmenu-button" onclick='lightPalette()'>Light</a>
	<a class="selectmenu-button" onclick='contrastPalette()'>Contrast</a>
	<a class="selectmenu-button" onclick='metallicPalette()'>Metallic</a>
	<a class="selectmenu-button" onclick='toWinPalette()'>Default</a>
</div>

<div id="chartmenu" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>

	<h2>Select Chart</h2>	
	<a class="selectmenu-split">Charts</a>
	<a class="selectmenu-button" onclick='setChart("horizontalbattle")'>Horizontal Battle</a>
	<a class="selectmenu-button" onclick='setChart("verticalbattle")'>Vertical Battle</a>
	<a class="selectmenu-button" onclick='setChart("pie")'>Side Pie</a>
	<a class="selectmenu-button" onclick='setChart("pie","bottom")'>Bottom Pie</a>
	<a class="selectmenu-button" onclick='setChart("doughnut")'>Side Doughnut</a>
	<a class="selectmenu-button" onclick='setChart("doughnut", "bottom")'>Bottom Doughnut</a>
	<a class="selectmenu-button" onclick='setChart("horizontalBar")'>Side Bar</a>
	<a class="selectmenu-button" onclick='setChart("none")'>None</a>
	
	<a class="selectmenu-split">Chart Settings</a>
	<a class="selectmenu-button" onclick='toggleLegendCounter()'>Legend Counter</a>
	<a class="selectmenu-button" onclick='toggleChartLabels()'>Chart Labels</a>
	<a class="selectmenu-button" onclick='toggleChartLeans()'>Chart Leans</a>
	<a class="selectmenu-button" onclick='toggleLegendLeans()'>Legend Leans</a>
</div>

<div id="presetmenu" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>

	<h2>Add Candidates</h2>	
	<a class="selectmenu-split">Custom</a>
	<a class="selectmenu-button" onclick='displayAddCandidateMenu();'>Add Custom</a>
	<a class="selectmenu-split">Preset</a>
	<a class="selectmenu-button" onclick='loadPreset("tossup")'>Clear</a>
	<a class="selectmenu-button" onclick='loadPreset("classic")'>R/D</a>
	<a class="selectmenu-button" onclick='loadPreset("libertarian")'>R/D/L</a>
	<a class="selectmenu-button" onclick='loadPreset("green")'>R/D/G</a>
	<a class="selectmenu-button" onclick='loadPreset("majors")'>R/D/G/L</a>
</div>

<!-- UK Maps -->
<div id="mapmenu-uk" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>
	<h2>United Kingdom</h2>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/unitedkingdom.svg", 16, 0.075, "congressional", "congressional", "open");'>United Kingdom</a>
</div>

<!-- Canada Maps -->
<div id="mapmenu-canada" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>
	<h2>Canada</h2>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/canada_states.svg", 38, 3, "canada_ec", "presidential", "open");'>Canada</a>
</div>

<!-- German Maps -->
<div id="mapmenu-germany" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>
	<h2>Germany</h2>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/germany.svg", 16, 1, "congressional", "congressional", "open");'>States</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/germany_constituencies.svg", 16, 1, "congressional", "congressional", "open");'>Constituencies</a>
</div>

<!-- USA Maps -->
<div id="mapmenu-usa" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>
	<h2>USA Maps</h2>
	<a class="selectmenu-split">2020</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/usa_presidential.svg", 16, 1, "usa_ec", "presidential", "open");'>Presidential</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/usa_senate.svg", 16, 1, "usa_senate", "senatorial", "2020")'>Senatorial</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/usa_gubernatorial.svg", 16, 1, "usa_gubernatorial", "gubernatorial", "2020")'>Gubernatorial</a>

	<a class="selectmenu-split">Primaries</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/usa_dem_primary.svg", 16, 1, "dem_primary", "primary", "2020");'>Democratic</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/usa_rep_primary.svg", 16, 1, "rep_primary", "primary", "2020");'>Republican</a>

	<a class="selectmenu-split">Historical</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadCurrentCongress()'>Congress 2018</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadPresetMap("2016_presidential_county");'>Presidential County Results 2016</a>
	

	<a class="selectmenu-split">Open</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/usa_no_districts.svg", 16, 1, "usa_no_districts_ec", "presidential", "open")'>Presidential Take All</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/usa_senate.svg", 16, 1.5, "usa_senate", "senatorial", "open")'>Senatorial</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/usa_gubernatorial.svg", 16, 1.5, "usa_gubernatorial", "gubernatorial", "open")'>Gubernatorial</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/usa_congressional_2018.svg", 16, 0.075, "congressional", "congressional", "open")'>Congressional</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/usa_county.svg", 16, 0.075, "congressional", "congressional", "open")'>County</a>

</div>

<!-- Mock Maps -->
<div id="mapmenu-lte" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>
	<h2>LTE</h2>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/lte_president.svg", 30, 1, "lte_ec", "presidential", "open");'>Presidential</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/lte_senate.svg", 35, 1, "ltesenate", "senatorial", "open")'>Senatorial</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/lte_house.svg", 35, 1, "congressional", "congressional", "open")'>Congressional</a>
</div>


<!-- Maps menu -->
<div id="mapmenu" class="popup selectmenu">
	<svg class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>
	<h2>Select Map</h2>
	<a class="selectmenu-split">Countries</a>
	<a class="selectmenu-button" onclick='closeNotification(this); displayCountryMenu("usa")'; >USA</a>
	<a class="selectmenu-button" onclick='closeNotification(this); displayCountryMenu("germany")'; >Germany</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/canada_states.svg", 38, 3, "canada_ec", "presidential", "open");'>Canada</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/unitedkingdom.svg", 16, 0.075, "congressional", "congressional", "open");'>United Kingdom</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/eu.svg", 16, 0.25, "eu_parliament", "primary", "open");'>EU</a>
	<a class="selectmenu-button" onclick='closeNotification(this); loadMap("./res/world.svg", 38, 0.5, "congressional", "congressional", "open");'>World</a>

	<a class="selectmenu-split">Mock</a>
	<a class="selectmenu-button" onclick='closeNotification(this); displayCountryMenu("lte")'; >LTE</a>
</div> 

<div id="notification" class="popup">
	<svg id="notificationclose" class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>

	<h3 id="notification-title"></h3>
	<p id="notification-message"></p>

</div>

<div id="share" class="popup">
	<svg id="shareclose" class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>

	<h3>Share Link</h3>
	<p>(This feature is still in development, your link might get deleted)</p>
	<div id="shareurl"></div>
	<img id="screenshotimg"/>
</div>

<div id="versioninfo" class="popup">
	<svg id="shareclose" class="closebutton" onclick="closeNotification(this)" width="24" height="24">
		<circle cx="12" cy="12" r="10" stroke="black" stroke-width="2"/>
		<line x1="7" y1="7" x2="17" y2="17" stroke="#dddddd" stroke-width="2"/>
		<line x1="17" y1="7" x2="7" y2="17" stroke="#dddddd" stroke-width="2"/>
	</svg>

	<h2>Version Info</h2>
	<a id="versioninfo-text"></a>
</div>

<script>
/*
	document.getElementById('logo-div').innerHTML =
	'<img id="logo" src="./res/lte.jpg">';
 */

	if('serviceWorker' in navigator) {
		navigator.serviceWorker
		.register('./sw.js')
		.then(function(a) {
			console.log('SW: registered');
		}, function(err) {
			console.log('SW: register error... ', err);
		});
	}
</script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.5.0"></script> 
<script src="https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.5.0/dist/svg-pan-zoom.min.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script>
<script src="./src/Candidate.js"></script>
<script src="./src/loadmap.js"></script>
<script src="./src/savemap.js"></script>
<script src="./src/data.js"></script>
<script src="./src/State.js"></script>
<script src="./src/htmlControl.js"></script>
<script src="./src/battlechart.js"></script>
<script src="./src/presets.js"></script>
<script src="./src/click.js"></script>
<script src="./src/main.js"></script>
<?php 
	if($mobile === true) {
		echo '<script src="./src/mobile.js"></script>';
	} else {
		echo '<script src="./src/yapnews.js"></script>';
	}
?>
<script src="./src/html2canvas.min.js"></script>

</body>
</html>
