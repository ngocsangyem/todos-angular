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
	@Output() editTodo: EventEmitter<TodoModel> = new EventEmitter<TodoModel>();
	@Output() removeTodo: EventEmitter<TodoModel> = new EventEmitter<
		TodoModel
	>();

	isEditing = false;

	constructor() {}

	ngOnInit() {}

	changeTodoStatus() {
		this.changeStatus.emit({
			...this.todo,
			isComplete: !this.todo.isComplete
		});
	}

	submitEdit(event: KeyboardEvent) {
		const { keyCode } = event;
		event.preventDefault();

		if (keyCode === 13) {
			this.editTodo.emit(this.todo);
			this.isEditing = false;
		}
	}

	deleteTodo() {
		this.removeTodo.emit(this.todo);
	}
}
