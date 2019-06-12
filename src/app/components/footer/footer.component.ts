import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import {
	FilterButtonsInterface,
	Filter
} from 'src/app/interface/filtering.interface';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit, OnDestroy {
	filterButtons: FilterButtonsInterface[] = [
		{ type: Filter.All, label: 'All', isActive: true },
		{ type: Filter.Active, label: 'Active', isActive: false },
		{ type: Filter.Completed, label: 'Completed', isActive: false }
	];

	length = 0;
	hasComplete$: Observable<boolean>;
	destroy$: Subject<null> = new Subject<null>();

	constructor(private todoService: TodoService) {}

	ngOnInit() {
		this.hasComplete$ = this.todoService.todos$.pipe(
			map(todos => todos.some(todoItem => todoItem.isComplete)),
			takeUntil(this.destroy$)
		);
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
