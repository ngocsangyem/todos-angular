import { Injectable } from '@angular/core';
import { TodoModel } from '../model/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../interface/filtering.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
	providedIn: 'root'
})
export class TodoService {
	private static readonly TodoStorageKey = 'todos';
	private todos: TodoModel[];
	private filteredTodos: TodoModel[];
	private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<
		number
	>(0);
	private displayTodosSubject: BehaviorSubject<
		TodoModel[]
	> = new BehaviorSubject<TodoModel[]>([]);
	private currentFilter: Filter = Filter.All;

	todos$: Observable<TodoModel[]> = this.displayTodosSubject.asObservable();
	length$: Observable<number> = this.lengthSubject.asObservable();

	constructor(private storageService: LocalStorageService) {}

	private updateTodosData() {
		this.displayTodosSubject.next(this.filteredTodos);
		this.lengthSubject.next(this.todos.length);
	}

	fetchFromLocalStorage() {
		this.todos =
			this.storageService.getValue<TodoModel[]>(
				TodoService.TodoStorageKey
			) || [];
		// this.filteredTodos = [...this.todos.map(todo => ({ ...todo }))];
		this.filteredTodos = [...this.todos];
		this.updateTodosData();
	}

	updateToLocalStorage() {
		this.storageService.setObject(TodoService.TodoStorageKey, this.todos);
		// TODO: filterTodos
		this.filterTodos(this.currentFilter, false);
		this.updateTodosData();
	}

	addTodo(input: string) {
		const date = new Date(Date.now()).getTime();
		const newTodo = new TodoModel(date, input);
		this.todos.unshift(newTodo);
		this.updateToLocalStorage();
	}

	changeTodoStatus(id: number, isComplete: boolean) {
		const index = this.todos.findIndex(todoItem => todoItem.id === id);
		const todo = this.todos[index];

		todo.isComplete = isComplete;
		this.todos.splice(index, 1, todo);
		this.updateToLocalStorage();
	}

	editTodo(id: number, name: string) {
		const index = this.todos.findIndex(todoItem => todoItem.id === id);
		const todo = this.todos[index];

		todo.name = name;
		this.todos.splice(index, 1, todo);
		this.updateToLocalStorage();
	}

	removeTodo(id: number) {
		const index = this.todos.findIndex(todoItem => todoItem.id === id);
		this.todos.splice(index, 1);
		this.updateToLocalStorage();
	}

	toggleAll() {
		this.todos = this.todos.map(todo => {
			return {
				...todo,
				isComplete: !this.todos.every(todoItem => todoItem.isComplete)
			};
		});
		this.updateToLocalStorage();
	}

	filterTodos(filter: Filter, isFiltering: boolean = true) {
		this.currentFilter = filter;

		switch (filter) {
			case Filter.Active:
				this.filteredTodos = this.todos.filter(
					todo => !todo.isComplete
				);
				break;
			case Filter.Completed:
				this.filteredTodos = this.todos.filter(todo => todo.isComplete);
				break;
			case Filter.All:
				// this.filteredTodos = [...this.todos.map(todo => ({ ...todo }))];
				this.filteredTodos = [...this.todos];
				break;
		}
		if (isFiltering) {
			this.updateTodosData();
		}
	}
}
