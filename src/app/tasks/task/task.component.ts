import { DatePipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';

import { Task } from './task.model';
import { TasksService } from '../tasks.service';
import { CardComponent } from '../../shared/card/card.component';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
  imports: [CardComponent, DatePipe],
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;

  private tasksService = inject(TasksService);

  onCompleteTask() {
    this.tasksService.deleteTask(this.task.id);
  }
}
