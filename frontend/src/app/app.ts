import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TodoService } from './services/todo.service';
import { Todo } from './models/todo.model';
import { MatButtonModule } from '@angular/material/button';
import { computed } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-root',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  todos = signal<Todo[]>([]);
  isLoading = signal(true);
  isDark = signal(window.matchMedia('(prefers-color-scheme: dark)').matches);

  constructor(private todoService: TodoService) {
    this.loadTodos();

    // Auto dark mode
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', e => this.isDark.set(e.matches));
    effect(() => document.documentElement.dataset['theme'] = this.isDark() ? 'dark' : 'light');
  }

  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (data) => {
        this.todos.set(data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false)
    });
  }

  addTodo(title: string) {
    if (!title.trim()) return;
    this.todoService.addTodo({ title, completed: false }).subscribe(todo => {
      this.todos.update(t => [...t, todo]);
    });
  }

  toggle(todo: Todo) {
    this.todoService.updateTodo({ ...todo, completed: !todo.completed }).subscribe(() => {
      this.todos.update(t => t.map(x => x.id === todo.id ? { ...x, completed: !x.completed } : x));
    });
  }

  delete(id?: number) {
    if (!id) return;
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos.update(t => t.filter(x => x.id !== id));
    });
  }

  toggleTheme() {
    this.isDark.set(!this.isDark());
  }
  
  // Computed properties for task statistics
  
totalTasks = computed(() => this.todos().length);

completedTasks = computed(() =>
  this.todos().filter(t => t.completed).length
);

remainingTasks = computed(() =>
  this.todos().filter(t => !t.completed).length
);
progress = computed(() => {
  const total = this.totalTasks();
  return total === 0 ? 0 : Math.round((this.completedTasks() / total) * 100);
});


}
