class Bike {
	constructor(chassi, state, battery, fabric) {
		this.chassi = chassi;
		this.state = state;
		this.battery = battery;
		this.fabric = fabric;
		this.drawer = 'drawer_closed';
		this.batteryInfo = {};
		this.running = false;
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
		this.drawer === 'drawer_closed'
			? (this.running = true)
			: console.log('Please close the drawer before ignition');
		while (this.running === true) {
			console.log('Running');
		}
	}
	changeBattery(battery) {
		this.drawer === 'drawer_open'
			? (this.batteryInfo = battery)
			: console.log(
					'Please close the drawer before changing the battery'
			  );
	}
}
module.exports = Bike;
