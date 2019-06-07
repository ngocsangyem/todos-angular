export class FilterButtonsInterface {
	type: Filter;
	label: string;
	isActive: boolean;
}

export enum Filter {
	All,
	Active,
	Completed
}
