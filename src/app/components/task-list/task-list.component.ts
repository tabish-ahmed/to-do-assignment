import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  taskList$!: Observable<any>;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskList$ = this.taskService.getTasks();
  }

  markDone(id: number) {
    this.taskService.toggleStatus(id);
  }

  clearAllTasks() {
    this.taskService.clearAll();
  }
}
