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

var Battery = {
	Id: 0,
	SOC: '45%',
};

var Bike = {
	state: 'off',
	chassi: '',
	drawer: 'drawer_open',
	battery: true,
	fábrica: 'Romenia',
};

var crypto = require('crypto');
var chassi = crypto.randomBytes(7).toString('hex');
Bike.chassi = chassi;

var idBattery = parseInt(Math.random() * 1000000, 10);
Battery.Id = idBattery;

function RemoveBattery() {
    Bike.drawer === "drawer_open"? Bike.battery = false : null;	
}

function ToggleBikeState(state) {
    Bike.drawer === "drawer_closed"? Bike.state = state : null;
}

function ToggleDrawer(){
    Bike.drawer === "drawer_open"? Bike.drawer = "drawer_closed" : Bike.drawer = "drawer_open";
}

Bike.battery ? (Bike.batteryInfo = Battery) : null;

client.on('message', function (topic, message) {
	//Called each time a message is received
	console.log('Received message:', topic, message.toString());
	if (topic === 'toggleBike') {
		let msg = message.toString();
		msg === 'on' || msg === 'off' ? ToggleBikeState(msg) : null;
		console.log(Bike);
	}
	Bike.state === 'on'
		? client.publish(`bike/telemetry/${chassi}`, JSON.stringify(Bike))
		: null;
});

Bike.state === 'on'
	? client.publish(`bike/telemetry/${chassi}`, JSON.stringify(Bike))
	: null;
