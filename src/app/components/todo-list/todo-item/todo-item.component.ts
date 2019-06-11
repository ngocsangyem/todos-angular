import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TodoModel } from 'src/app/model/todo.model';

@Component({
	selector: 'app-todo-item',
	templateUrl: './todo-item.component.html',
	styleUrls: ['./todo-item.component.sass']
})
export class TodoItemComponent implements OnInit {
	@Input() todo: TodoModel;
	@Output() changeStatus: EventEmitter<TodoModel> = new EventEmitter<
		TodoModel
	>();

	constructor() {}

	ngOnInit() {}

	changeTodoStatus() {
		this.changeStatus.emit({
			...this.todo,
			isComplete: !this.todo.isComplete
		});
	}
}
