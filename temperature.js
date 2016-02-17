"use strict";

var arduinoSerialPort = '/dev/ttyACM0';	//Serial port over USB connection between the Raspberry Pi and the Arduino

var fs = require('fs');
function writeFile(text)
{
	fs.writeFile('temperature.json', text, function(err)
	{
		if (err) console.warn(err);
	});
}

var os = require('os');
var serverSignature = 'Node.js / Debian ' + os.type() + ' ' + os.release() + ' ' + os.arch() + ' / BBQ Buddy';

var postOptions =
{
	host: 'posttestserver.com',	//Change to your remote server
	path: '/post.php',
	method: 'POST',
	headers:
	{
		'Content-Type': 'application/x-www-form-urlencoded',
		'Connection': 'close',
		'User-Agent': serverSignature
	}
};

var http = require('http');
function postData(s)
{//Standard HTTP POST request
	var myOptions = postOptions;
	postOptions.headers['Content-Length'] = s.length;

	var requestPost = http.request(myOptions, function(res)
	{
		res.setEncoding('utf8');
		res.on('data', function (chunk)
		{
			console.log(chunk);
		});
	});

	requestPost.on('error', function(e)
	{
		console.warn(e);
	});

	requestPost.write(s);
	requestPost.end();
}

var serialport = require('serialport');
var serialPort = new serialport.SerialPort(arduinoSerialPort,
{//Listening on the serial port for data coming from Arduino over USB
	parser: serialport.parsers.readline('\n')
});

var lastPitTemp = NaN;
var lastProbe1Temp = NaN;
var lastProbe2Temp = NaN;
var lastFanSpeed = NaN;
var lastLidStatus = NaN;
var lastTimerHours = NaN;
var lastTimerMinutes = NaN;

var dateLastInfo = new Date(0);

var querystring = require('querystring');
serialPort.on('data', function (data)
{//When a new line of text is received from Arduino over USB
	try
	{
		var j = JSON.parse(data);
		lastPitTemp = j.pit_temp;
		lastProbe1Temp = j.probe_1;
		lastProbe2Temp = j.probe_2;
		lastFanSpeed = j.fan_speed;
		lastLidStatus = j.lid_status;
		lastTimerHours = j.timer_hours;
		lastTimerMinutes = j.timer_minutes;
		dateLastInfo = new Date();
		writeFile('{"pit_temp":"' + lastPitTemp + '","probe_1":"' + lastProbe1Temp + '"}');
		//Forward the Arduino information to another Web server
		postData(querystring.stringify(j));
	}
	catch (ex)
	{
		console.warn(ex);
	}
});


function colourScale(t)
{//Generate an HTML colour in function of the temperature
	if (t <= -25.5) return '0,0,255';
	if (t <= 0) return Math.round(255 + (t * 10)) + ',' + Math.round(255 + (t * 10)) + ',255';
	if (t <= 12.75) return Math.round(255 - (t * 20)) + ',255,' + Math.round(255 - (t * 20));
	if (t <= 25.5) return Math.round((t - 12.75) * 20) + ',255,0';
	if (t <= 38.25) return '255,' + Math.round(255 - (t - 25.5) * 20) + ',0';
	return '255,0,0';
}

function temperatureResponse()
{
	return {
		'lastPitTemp': lastPitTemp,
		'lastProbe1Temp': lastProbe1Temp,
		'html': '<!DOCTYPE html>\n\
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-GB" lang="en-GB">\n\
<head>\n\
<meta charset="UTF-8" />\n\
<meta http-equiv="refresh" content="300" />\n\
<title>Temperature - Arduino - Raspberry Pi</title>\n\
<meta name="keywords" content="Temperature, Arduino, Raspberry Pi" />\n\
<meta name="viewport" content="initial-scale=1.0,width=device-width" />\n\
<link rel="alternate" type="application/json" href="temperature.json"/>\n\
<meta name="robots" content="noindex" />\n\
<style type="text/css">\n\
html, body {background:black; color:white; font-family:sans-serif; text-align:center}\n\
.out {font-size:48pt}\n\
.in {font-size:36pt}\n\
.r, .sb {bottom:0; color:#AAA; position:absolute}\n\
.r {left:0.5em; margin-right:5em; text-align:left}\n\
.sb {right:0.5em}\n\
a {color:#AAA; text-decoration:none}\n\
a:hover {border-bottom:1px dashed}\n\
</style>\n\
</head>\n\
<body>\n\
<h1>Temperature somewhere</h1>\n\
<p>Pit Temperature<br /><strong class="out" style="color:rgb(' + colourScale(lastPitTemp) + ')">' +
	(Math.round(lastPitTemp * 10) / 10.0) + '°C</strong></p>\n\
<p>Indoor<br /><strong class="in" style="color:rgb(' + colourScale(lastProbe1Temp) + ')">' +
	(Math.round(lastProbe1Temp * 10) / 10.0) + '°C</strong></p>\n\
<p>' + dateLastInfo.toISOString() + '</p>\n\
<p class="r"><a href="https://github.com/skyeperry1/BBQ-Buddy" title="Built on">BBQ Buddy</a></p>\n\
</body>\n\
</html>\n\
',
	dateLastInfo: dateLastInfo
	};
}

module.exports.temperatureResponse = temperatureResponse;
