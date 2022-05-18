export class Bike {
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
		Bike.drawer === 'drawer_closed' ? (Bike.state = state) : null;
	}
	toggleDrawer() {
		Bike.drawer === 'drawer_open'
			? (Bike.drawer = 'drawer_closed')
			: (Bike.drawer = 'drawer_open');
	}
	ignition() {
		this.drawer === 'drawer_closed'
			? (this.running = true)
			: console.log('Please close the drawer before ignition');
	}
    changeBattery(battery) {
        this.drawer === 'drawer_open'? this.batteryInfo = battery : console.log('Please close the drawer before changing the battery');
    }
}
