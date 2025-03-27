import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Task {
  id: number;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  getTasks() {
    return this.tasks$;
  }

  addTask(description: string) {
    const newTask: Task = { id: Date.now(), description, completed: false };
    this.tasks.push(newTask);
    this.tasksSubject.next([...this.tasks]);
  }

  toggleStatus(id: number) {
    this.tasks = this.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.tasksSubject.next([...this.tasks]);
  }

  clearAll() {
    this.tasks = [];
    this.tasksSubject.next([]);
  }
}
