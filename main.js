var mqtt = require('mqtt');

var options = {
	host: '4e3fabb95a98476e92aec3ac8c3b22ac.s1.eu.hivemq.cloud',
	port: 8883,
	protocol: 'mqtts',
	username: 'Origem',
	password: 'Senha@Segura01',
};

var Bateria = {
	Identificador: 0,
	SOC: '',
};

var idBateria = Math.random() * 10000;
Bateria.Identificador = idBateria;

var Moto = {
	estado: 'off',
	chassi: '',
	bateria: true,
};

var crypto = require('crypto');
var chassi = crypto.randomBytes(7).toString('hex');
Moto.chassi = chassi;

Moto.bateria ? (Moto.bateriaInfo = Bateria) : null;

console.log(Moto);

//initialize the MQTT client
var client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
	console.log('Connected');
});

client.on('error', function (error) {
	console.log(error);
});

client.on('message', function (topic, message) {
	//Called each time a message is received
	console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
// const newConnection = 'xpd';
// client.subscribe(newConnection);
// console.log(`subscribed to - ${newConnection}`);

// publish message 'Hello' to topic 'my/test/topic'
client.publish(`bike/telemetry/${chassi}`, JSON.stringify(Moto));
