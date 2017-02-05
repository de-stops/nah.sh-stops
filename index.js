'use strict'
const got = require('got');
const json2csv = require('json2csv');

const endpointBase = "http://nah.sh.hafas.de/bin/query.exe/dny?performLocating=2&tpl=stop2json&look_stopclass=2147483647";
const maxStops = 500;

const queryStops = function(minx, miny, maxx, maxy, callback) {
	const url = endpointBase + "&look_minx=" + minx + "&look_miny=" + miny + "&look_maxx=" + maxx + "&look_maxy=" + maxy;
	got(url).then(response => {
		const body = response.body.split("\\'").join("'").split("\\/").join("/");
		const result = JSON.parse(body);
		// console.log("Got " + result.stops.length + " stops from " + url + ".");
		if (result.stops.length < maxStops) {
			result.stops.forEach(callback);
		}
		else
		{
			const midx = Math.round((minx + maxx) / 2);
			const midy = Math.round((miny + maxy) / 2);
			queryStops(minx, miny, midx, midy, callback);
			queryStops(midx, miny, maxx, midy, callback);
			queryStops(minx, midy, midx, maxy, callback);
			queryStops(midx, midy, maxx, maxy, callback);
		}
	});
};

const exportStops = function(stops) {
	const result = json2csv({ data: stops, fields: ["stop_id", "stop_name", "stop_lon", "stop_lat"] });
	process.stdout.write(result);
}

const retrieveStops = function(minx, miny, maxx, maxy) {
	const stops = [];
	const stopsById = {};
	const callback = s => {
		var stopId = s.extId;
		var stop = {};	
		stop.stop_id = s.extId;
		stop.stop_name = s.name
		stop.stop_lon = Number(s.x)/1000000;
		stop.stop_lat = Number(s.y)/1000000;

		const existingStop = stopsById[stopId]
		if (existingStop) { 
			if (
				stop.stop_id !== existingStop.stop_id ||
				stop.stop_name !== existingStop.stop_name ||
				stop.stop_lon !== existingStop.stop_lon ||
				stop.stop_lat !== existingStop.stop_lat) {
				throw new Error("Found existing stop with id " + stopId);
			}
		}
		else {
			// console.log("Got new stop with extId:" + extId);
			stopsById[stopId] = stop;
			stops.push(stop);
		}
	};
	queryStops(minx, miny, maxx, maxy, callback);
	setTimeout(function () { exportStops(stops); }, 30000);
};

retrieveStops(5000000, 47000000, 15000000, 56000000);