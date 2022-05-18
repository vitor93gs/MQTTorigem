class Battery {
	constructor(soc) {
		this.id = parseInt(Math.random() * 1000000, 10);
		this.soc = soc;
	}
}
module.exports = Battery;
