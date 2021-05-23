const user = document.getElementById('userTaskName')
const description = document.getElementById('userDescription')
const assign = document.getElementById('userAssignedTo')
const status = document.getElementById('select')
const form = document.getElementById('myForm')
// const errorElement = document.getElementById('error')

document.querySelector("#addTask").addEventListener("click", () => {
  let validateTaskForm = []
  if (userTaskName.value === '' || userTaskName.value.length > 20) {
    alert('Name is required and it needs to be less than 20 characters')
  }

  if (userDescription.value === '' || userDescription.length>20) {
    alert('Description is required and it needs to be less than 20 characters')
  }

  if (userAssignedTo.value === '' || userAssignedTo.length<20) {
    alert('Assigned to is required and it needs to be less than 20 characters')
  }

//   if (dueDate.value === '' || dueDate.length>20) {
//     alert('Enter valid due date')
//   }

});

// let myArray = []

//  myArray = createNewTaskObj

// function createNewTaskObj(taskName, taskDescription, taskAssignedTo, taskStatus, taskDueDate, taskArray) {
//     theTaskManager.alltasks.push({
//         "name": taskName,
//         "Description": taskDescription,
//         "assignedTo": taskAssignedTo,
//         "DueDate": taskDueDate,
//         "Status": taskStatus,
//         "ID": `${taskArray.length < 1 ? 1 : taskArray.length+1}`
    // })

//     localStorage.setItem("localStorageTaskArray", JSON.stringify(theTaskManager.taskManArray));
//     return theTaskManager.taskManArray;
// }


// }
// console.log(myArray)

// let myArray = []

class TaskManager {
    constructor() {
        this.tasks=[]
}
    getTasks() {
        return this.tasks
    }
    addTask() {
        this.tasks.push(task);
    }
    deleteTasks(){
        return this.tasks
    }
    updateTasks(){
        return this.tasks
    }
 }

 let tm = new TaskManager();


document.querySelector("#addTask").addEventListener("click", function(){
    if (validateTaskForm()==true){
        let id = tm.tasks.length + 1
        let assignedBy = document.querySelector("#userTaskName").value;
        let description = document.querySelector("#userDescription").value;
        let assignedTo = document.querySelector("#userAssignedTo").value;
        let dueDate = document.querySelector("#userDueDate").value;
        let status = document.querySelector("#select").value;

        let newTask = createTask(id, assignedBy, description, assignedTo, dueDate, status)
        tm.addTask(newTask)
        console.log('current tasks:', tm.getTasks())

        
        display()
    }

})