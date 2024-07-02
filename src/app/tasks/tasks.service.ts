import { Injectable } from '@angular/core';

import { DUMMY_TASKS } from '../dummy-tasks';
import { type NewTask } from './new-task/new-task.model';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = DUMMY_TASKS;

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(newTask: NewTask, userId: string) {
    const { title, summary, date } = newTask;
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId,
      title,
      summary,
      dueDate: date,
    });
    this.saveTasks();
  }

  deleteTask(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
