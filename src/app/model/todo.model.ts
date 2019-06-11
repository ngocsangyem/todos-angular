export class TodoModel {
	constructor(
		public id: number,
		public name: string,
		public isComplete: boolean = false
	) {}
}
