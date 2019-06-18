var currentCache = 'v0.20.3';

function swLog(message) {
	console.log('SW' + currentCache + ': ' + message);
}

self.skipWaiting();

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(currentCache).then(function(cache) {
			swLog('installing');
			return cache.addAll([
				'./',
				'./index.php',
				'./html/battlechart.html',
				'./html/description.php',
				
				'./manifest.json',

				'./data/gubernatorial_2018',
				'./data/gubernatorial_2020',
				'./data/gubernatorial_current',
				'./data/gubernatorial_open',
				'./data/senatorial_2020',
				'./data/senatorial_current',
				'./data/senatorial_open',

				'./style/battlechart.css',
				'./style/legend.css',
				'./style/selectmenu.css',
				'./style/mobile.css',
				'./style/popup.css',
				'./style/style.css',

				'./res/usa_presidential.svg',
				'./res/usa_1972_presidential.svg',
				'./res/usa_congressional_2008.svg',
				'./res/usa_congressional_2018.svg',
				'./res/usa_dem_primary.svg',
				'./res/usa_rep_primary.svg',
				'./res/usa_gubernatorial.svg',
				'./res/usa_no_districts.svg',
				'./res/usa_senate.svg',
				'./res/usa_county.svg',
				'./res/canada_states.svg',
				'./res/canada_constituencies.svg',
				'./res/germany.svg',
				'./res/germany_constituencies.svg',
				'./res/unitedkingdom.svg',
				'./res/italy.svg',
				//'./res/italy_constituencies.svg',
				'./res/australia_constituencies.svg',
				'./res/australia.svg',
				'./res/eu.svg',
				'./res/world.svg',
				'./res/lte_president.svg',
				'./res/lte_senate.svg',
				'./res/lte_house.svg',

				'./res/presets/current_congress',
				'./res/presets/2016_presidential_county',
				'./res/presets/2016_presidential',
				'./res/presets/2012_presidential',
				'./res/presets/2008_presidential',
				'./res/presets/2004_presidential',
				'./res/presets/2000_presidential',
				'./res/presets/1996_presidential',
				'./res/presets/1992_presidential',
				'./res/presets/1988_presidential',
				'./res/presets/1984_presidential',
				'./res/presets/1980_presidential',
				'./res/presets/1976_presidential',
				'./res/presets/2020_cook',
				'./res/presets/2020_inside',
				'./res/presets/2020_sabatos',
				
				'./res/lte.jpg',
				'./res/redeagletv.png',

				'./src/main.js',
				'./src/mobile.js',
				'./src/presets.js',
				'./src/loadmap.js',
				'./src/savemap.js',
				'./src/htmlControl.js',
				'./src/html2canvas.min.js',
				'./src/data.js',
				'./src/click.js',
				'./src/battlechart.js',
				'./src/State.js',
				'./src/Candidate.js',
				'./src/yapnews.js',

				'https://fonts.googleapis.com/css?family=Roboto',
				'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js',
				'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.5.0',
				'https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.5.0/dist/svg-pan-zoom.min.js',
				'https://code.jquery.com/jquery-3.3.1.min.js',
				'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js',
				'https://use.fontawesome.com/releases/v5.7.2/css/all.css'
			]);
		})
	);
});

// first see if request is in cache, then check web
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
			.then(function(response) {

				if(response) {
					swLog('fetch cache ' + event.request.url);
					return response;
				} else {
					swLog('fetch web ' + event.request.url);
					return fetch(event.request);
				}
			})
			.catch(function(err) {
				swLog('error ' + err + ' ' + event.request.url);
			})
		);
	}
);

// clear old versions of the cache
self.addEventListener('activate', function(event) {
	swLog('activate cache ' + currentCache);
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			cacheNames.forEach(function(cacheName) {
				if(cacheName !== currentCache) {
					swLog('clear cache ' + cacheName);
					return caches.delete(cacheName);
				}
			});
		})
	);
});
