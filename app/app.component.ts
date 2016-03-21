import { Component, EventEmitter } from 'angular2/core';

  @Component({
      selector: 'task-display',
      inputs: ['task'],
    template: `
      <h3>{{ task.description }}</h3>
    `
  })

  export class TaskComponent {
    public task: Task;
  }

  @Component({
    selector: 'task-list',
    inputs: ['taskList'],
    outputs: ['onTaskSelect'],
    directives: [TaskComponent],
    template: `
    <task-display *ngFor="#currentTask of taskList"
    (click)="taskClicked(currentTask)"
    [class.selected]="currentTask === selectedTask"
    [task]="currentTask">
    </task-display>
    `
  })

  export class TaskListComponent {
    public taskList: Task[];
    public onTaskSelect: EventEmitter<Task>;
    public selectedTask: Task;
    constructor() {
      this.onTaskSelect = new EventEmitter();
    }
    taskClicked(clickedTask: Task): void{
      console.log(clickedTask);
      this.selectedTask = clickedTask;
      this.onTaskSelect.emit(clickedTask);
    }
  }

  @Component({
    selector: 'my-app',
    directives: [TaskListComponent],
    template: `
    <div class="container jumbotron">
    <h1>To Do List App!</h1>
    </div>
    <div class='container'>
    <task-list
      [taskList]="tasks"
      (onTaskSelect)="taskWasSelected($event)">
      </task-list>
    </div>
    `
  })

  export class AppComponent {
    public tasks: Task[];
    constructor(){
      this.tasks = [
        new Task("create to-do list app.", 0),
        new Task("learn kung fu", 1),
        new Task("rewatch lotr", 2),
        new Task("do the laundry", 3),
      ];
    }
    taskWasSelected(clickedTask: Task): void {
      console.log(clickedTask);
    }
  }

  export class Task {
    public done: boolean = false;
    constructor(public description: string, public id: number) {

    }
  }
