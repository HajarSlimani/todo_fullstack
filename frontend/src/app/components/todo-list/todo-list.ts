import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList implements OnInit {

  todos: Todo[] = [];
  newTitle = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(data => this.todos = data);
  }

  addTodo() {
    if (this.newTitle.trim()) {
      this.todoService.addTodo({title: this.newTitle, completed: false})
        .subscribe(todo => {
          this.todos.push(todo);
          this.newTitle = '';
        });
    }
  }

  toggle(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe();
  }

  delete(todo: Todo) {
    this.todoService.deleteTodo(todo.id!).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== todo.id);
    });
  }
  
}
