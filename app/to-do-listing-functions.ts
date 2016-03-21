/// <reference path="to-do-classes-interfaces.ts" />
module ToDoList {
  export var describeTasksForPerson = function(assignee: IPerson, taskCollection: Task[]): String[] {
    var descriptions: String[] = [];
    for(var task of taskCollection){
      if(task.assignedTo === assignee) {
        descriptions.push(task.description);
      }
    }
    return descriptions;
  }

  export var describeTasksForType = function(chosenType: string, taskCollection: Task[]): String[] {
    var typeDescriptions: String[] = [];
    for(var task of taskCollection) {
      if(task.type === chosenType){
        typeDescriptions.push(task.description);
      }
    }
    return typeDescriptions;
  }

  export var describeTasksForPriority = function(chosenPriority: string, taskCollection: Task[]): String[] {
    var priorityDescriptions: String[] = [];
    for(var task of taskCollection) {
      if(task.priority === chosenPriority){
        priorityDescriptions.push(task.description);
      }
    }
    return priorityDescriptions;
  }

  export var listTopPriorityForPerson = function(assignee: IPerson, taskCollection: Task[]): string {
    var topPriority = [];
    for(var task of taskCollection) {
      if(task.assignedTo === assignee && task.priority === "high" && task.done === false) {
        topPriority.push(task.description);
      }
    }
    return topPriority[0];
  }

}
