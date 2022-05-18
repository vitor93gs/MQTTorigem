class Bike {
	constructor(chassi, state, battery, fabric) {
		this.chassi = chassi;
		this.state = state;
		this.battery = battery;
		this.fabric = fabric;
		this.drawer = 'drawer_closed';
		this.batteryInfo = {};
		this.running = false;
		this.km = 0;
	}
	displayInfo() {
		console.log(`Chassi: ${this.chassi}
        State: ${this.state}
        Battery: ${this.battery}
        Fabric: ${this.fabric}
        Battery Info: ${this.batteryInfo}`);
	}
	toggleBikeState(state) {
		this.drawer === 'drawer_closed' ? (this.state = state) : null;
	}
	toggleDrawer() {
		this.drawer === 'drawer_open'
			? (this.drawer = 'drawer_closed')
			: (this.drawer = 'drawer_open');
	}
	ignition() {
		if (this.drawer === 'drawer_closed' && this.battery === true) {
			this.running = true;
			console.log('Bike Running');
			var run = setInterval(() => {
				this.batteryInfo.soc -= 5;
				this.km += 1;
				if (this.batteryInfo.soc === 0) {
					clearInterval(run);
					this.running = false;
				}
			}, 5000);
		} else {
			console.log('Please close the drawer before ignition');
		}
	}
	changeBattery(battery) {
		this.drawer === 'drawer_open'
			? (this.batteryInfo = battery)
			: console.log(
					'Please close the drawer before changing the battery'
			  );
	}
	telemetry() {
		Client.publish(
			`bike/telemetry/${this.chassi}`,
			JSON.stringify(globalThis.thisBike)
		);
	}
}
module.exports = Bike;
