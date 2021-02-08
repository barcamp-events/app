import LineItem from './LineItem';

export class LineItemList {
	public list: LineItem[];
	constructor(list: LineItem[] = []) {
		this.list = list;
  }
  
  get goal() { return this.list.map(item => item.cost).reduce((previous, item) => previous + item)}
  get raised() { return this.list.map(item => item.raised).reduce((previous, item) => previous + item)}
}
