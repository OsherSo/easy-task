import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Input({ required: true }) userId!: string;

  @Output() close = new EventEmitter<void>();

  title = '';
  summary = '';
  dueDate = '';

  private tasksService = inject(TasksService);

  onCancelAddTask() {
    this.close.emit();
  }

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.title,
        summary: this.summary,
        date: this.dueDate,
      },
      this.userId
    );

    this.close.emit();
  }
}
