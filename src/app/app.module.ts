import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-list/todo-item/todo-item.component';
import { HeaderComponent } from './components/header/header.component';
import { TodoInputComponent } from './components/header/todo-input/todo-input.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
	declarations: [
		AppComponent,
		TodoListComponent,
		TodoItemComponent,
		HeaderComponent,
		TodoInputComponent,
		FooterComponent
	],
	imports: [BrowserModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
