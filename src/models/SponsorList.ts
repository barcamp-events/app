import Sponsor from './Sponsor';

export class SponsorList {
	public list: Sponsor[];
	constructor(list: Sponsor[] = []) {
		this.list = list;
	}
	get hasPlatinum() { return this.platinum.length !== 0; }
	get hasGold() { return this.gold.length !== 0; }
	get hasSilver() { return this.silver.length !== 0; }
	get hasBronze() { return this.bronze.length !== 0; }
	get hasCarbon() { return this.carbon.length !== 0; }
	get platinum() {
		return this.list.filter((sponsor: Sponsor) => { return sponsor.level.toLowerCase() === "platinum"; });
	}
	get gold() {
		return this.list.filter((sponsor: Sponsor) => { return sponsor.level.toLowerCase() === "gold"; });
	}
	get silver() {
		return this.list.filter((sponsor: Sponsor) => { return sponsor.level.toLowerCase() === "silver"; });
	}
	get bronze() {
		return this.list.filter((sponsor: Sponsor) => { return sponsor.level.toLowerCase() === "bronze"; });
	}
	get carbon() {
		return this.list.filter((sponsor: Sponsor) => { return sponsor.level.toLowerCase() === "carbon"; });
	}
}
