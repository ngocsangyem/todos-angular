export class TodoModel {
	constructor(
		public id: string,
		public name: string,
		public isComplete: boolean = false
	) {}
}
