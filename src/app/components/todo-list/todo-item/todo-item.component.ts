import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
	trigger,
	state,
	style,
	transition,
	animate
} from '@angular/animations';
import { TodoModel } from 'src/app/model/todo.model';

const fadeStrikeThroughAnimation = trigger('fadeStrikeThrough', [
	state(
		'active',
		style({
			fontSize: '1.2rem',
			color: '#3333'
		})
	),
	state(
		'completed',
		style({
			fontSize: '1rem',
			color: '#d9d9d9',
			textDecoration: 'line-through'
		})
	),
	transition('aactive <=> completed', [animate(250)])
]);

@Component({
	selector: 'app-todo-item',
	templateUrl: './todo-item.component.html',
	styleUrls: ['./todo-item.component.sass'],
	animations: [fadeStrikeThroughAnimation]
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
