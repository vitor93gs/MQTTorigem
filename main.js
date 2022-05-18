const Bike = require('./Classes/Bike.js');
const Battery = require('./Classes/Battery');

var mqtt = require('mqtt');

var options = {
	host: '4e3fabb95a98476e92aec3ac8c3b22ac.s1.eu.hivemq.cloud',
	port: 8883,
	protocol: 'mqtts',
	username: 'Origem',
	password: 'Senha@Segura01',
};

//initialize the MQTT client
var client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
	console.log('Connected');
});

client.on('error', function (error) {
	console.log(error);
});

// subscribe to topic 'my/test/topic'
const newConnection = 'toggleBike';
client.subscribe(newConnection);

var crypto = require('crypto');
var chassi = crypto.randomBytes(7).toString('hex');

var thisBike = new Bike(chassi, 'off', true, 'Roraima');

var thisBattery = new Battery(100);

thisBike.battery ? (thisBike.batteryInfo = thisBattery) : null;

client.on('message', function (topic, message) {
	//Called each time a message is received
	console.log('Received message:', topic, message.toString());
	if (topic === 'toggleBike') {
		let msg = message.toString();
		msg === 'on' || msg === 'off' ? thisBike.toggleBikeState(msg) : null;
		console.log(thisBike);
	}
	if (thisBike.state === 'on') {
		client.publish(`bike/telemetry/${chassi}`, JSON.stringify(thisBike));
		thisBike.ignition();
		var running = setInterval(() => {
			client.publish(
				`bike/telemetry/${chassi}`,
				JSON.stringify(thisBike)
			);
			thisBike.batteryInfo.soc === 0 ? clearInterval(running) : null;
		}, 5000);
	}
});

thisBike.state === 'on'
	? client.publish(`bike/telemetry/${chassi}`, JSON.stringify(thisBike))
	: null;
