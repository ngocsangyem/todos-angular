import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoModel } from 'src/app/model/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.sass']
})
export class TodoListComponent implements OnInit {
	todos$: Observable<TodoModel[]>;

	constructor(private todoService: TodoService) {}

	ngOnInit() {
		this.todos$ = this.todoService.todos$;
	}

	onchangeTodoStatus(todo: TodoModel) {
		this.todoService.changeTodoStatus(todo.id, todo.isComplete);
	}

	onEditTodo(todo: TodoModel) {
		this.todoService.editTodo(todo.id, todo.name);
	}

	onRemoveTodo(todo: TodoModel) {
		this.todoService.removeTodo(todo.id);
	}
}
