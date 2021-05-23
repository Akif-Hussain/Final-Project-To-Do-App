document.querySelector('#addTask').addEventListener('click', function(){
    const taskName = document.querySelector('#userTaskName').value;
    const taskAssignedTo = document.querySelector('#userAssignedTo').value;
    const taskDescription = document.querySelector('#userDescription').value;
    const taskDueDate = document.querySelector('#userDueDate').value;
    const taskStatus = document.querySelector('#selectD').value;
    let allValuesValid = validateForm(taskName, taskAssignedTo, taskDescription, taskDueDate, taskStatus)
    if(allValuesValid == true){
        console.log("all valid")
        let newTask = makeTaskObjects (taskName, taskAssignedTo, taskDescription, taskDueDate, taskStatus)
        tm.addTask(newTask)
        display()
        console.log(tm.tasks)
    } else {
        console.log("Not valid")
    }
})

function validateForm(taskName, taskAssignedTo, taskDescription, taskDueDate, taskStatus){
    let validateForm = true
    console.log(taskStatus)
    if (taskName == '' || taskName.length > 20) {
        alert('Name of the task is required and it needs to be less than 20 characters')
        validateForm=false
      }
      if (taskAssignedTo == '' ||taskAssignedTo.length>20) {
        alert('Assign is required and it needs to be less than 20 characters')
        validateForm=false
      }
      if (taskDescription == '' || taskDescription.length>20) {
        alert('Description is required and it needs to be less than 20 characters')
        validateForm=false
      }
      if (!taskDueDate) {
        alert('Enter valid due date')
        validateForm=false
      }
      if (!taskStatus) {
        alert('Please enter valid status')
        validateForm=false
      }
      return validateForm;
    }



function makeTaskObjects (taskName, taskAssignedTo, taskDescription, taskDueDate, taskStatus){
    console.log("make task running")
    //this function takes the user input and makes an object
    //this object is stored in the taskArray for use later on
    let ID = 0
    if(tm.tasks.length == 0){
        ID = 1
    } else {
        let lastItemID = tm.tasks[tm.tasks.length-1].ID
        ID = lastItemID + 1
    }
    let myObject = {
        "assignTask": taskAssignedTo,
        "taskName": taskName,
        "Description": taskDescription,
        "DueDate": taskDueDate,
        "status": taskStatus,
        "ID": ID
        }
    // taskArray.push(myObject)
    return myObject
}


class TaskManager {
    constructor() {
        this.tasks=[]
}
    getTasks() {
        return this.tasks
    }
    addTask(task) {
        this.tasks.push(task)
        console.log (this.tasks)
        this.updateLocalStorage()
    }

    // store in Local Storage, this will be in the add task function

    updateLocalStorage(){
        localStorage.setItem("taskList",JSON.stringify(this.tasks))
        location.reload()
    }

    loadLocalStorage(){
        let tasks = JSON.parse(localStorage.getItem("taskList"))
        if(tasks) {
            this.tasks = tasks 
        }
        for(let items in this.tasks) {
            display()
        }
    }

    deleteTasks(){
        let event = window.event.target 
        console.log(event)
        let cardToRemove = event.parentNode.parentNode.parentNode
        let taskID = cardToRemove.attributes.id.value
        console.log(taskID)
        let deletedCard = document.getElementById(taskID)
        deletedCard.remove()
        let deletedSummary = document.getElementById(taskID)
        deletedSummary.remove()

        let task = 0

        for(task in this.tasks){
            if (this.tasks[task].ID == taskID){
                this.tasks.splice(task, 1)
            }
        };

        console.log(this.tasks)

        this.updateLocalStorage()

    }
    updateTasks(){
        let updatedTask = {}
        let event = window.event.target
        let cardToUpdate = event.parentNode.parentNode.parentNode
        let taskID = cardToUpdate.attributes.id.value
        console.log(taskID)

        for(items = 0;items<this.tasks.length;items++) {
            if(this.tasks[items].ID==taskID){
                updatedTask = this.tasks[items]
            }

        } 
        document.querySelector("#userTaskName").value = updatedTask.taskName
        document.querySelector("#userAssignedTo").value = updatedTask.assignTask
        document.querySelector("#userDescription").value = updatedTask.Description
        document.querySelector("#userDueDate").value = updatedTask.DueDate
        document.querySelector("#selectD").value = updatedTask.status

        console.log (updatedTask)

        document.querySelector("#addTask").outerHTML = `<button type="button" class="btn btn-danger"id="SaveTask">Save Item</button>
        `
        document.querySelector('#SaveTask').addEventListener('click', function(){
            const taskName = document.querySelector('#userTaskName').value;
            const taskAssignedTo = document.querySelector('#userAssignedTo').value;
            const taskDescription = document.querySelector('#userDescription').value;
            const taskDueDate = document.querySelector('#userDueDate').value;
            const taskStatus = document.querySelector('#selectD').value;
            
            if(validateForm(taskName, taskAssignedTo, taskDescription, taskDueDate, taskStatus)==true){
                updatedTask.taskName = taskName
                updatedTask.assignTask = taskAssignedTo
                updatedTask.Description = taskDescription
                updatedTask.DueDate = taskDueDate
                updatedTask.status = taskStatus
                tm.updateLocalStorage()
                
            }
        })
    }
}
let tm = new TaskManager();

tm.loadLocalStorage()

function display(){
 let outputSection = document.querySelector('#Taskboard-List')
 outputSection.innerHTML=""

 for (x in tm.tasks) {
     let cardTemplate = `<div style="width:17.77rem" id="${tm.tasks[x]["ID"]}">
     <div class="card" >
     <div class="card-header">
         <h5>TASK</h5>
     </div>
     <ul class="list-group list-group-flush card-space">
         <li class="list-group-item"><span class="card-ref">Name: </span>${tm.tasks[x] ["taskName"]}</li>
         <li class="list-group-item"><span class="card-ref">Description: </span>${tm.tasks[x] ["Description"]}</li>
         <li class="list-group-item"><span class="card-ref">Assign To: </span>${tm.tasks[x] ["assignTask"]}</li>
         <li class="list-group-item"><span class="card-ref">Due Date: </span>${tm.tasks[x] ["DueDate"]}</li>
         <li class="list-group-item"><span class="card-ref">Status: </span>${tm.tasks[x] ["status"]}</li>
         <button type="button" class="btn btn-primary" onclick = "tm.updateTasks()" btn-purpose="update card">Update Card</button>
         <button type="button" class="btn btn-danger" onclick = "tm.deleteTasks()" btn-purpose="delete-card">Delete Card</button>
        
     </ul>
 </div>
 </div>`
 outputSection.innerHTML+=cardTemplate

 let outputSummary = document.querySelector('#summaryList')
 outputSummary.innerHTML=""

 for(items in tm.tasks) {
     let summaryTemplate = `<a href="#" class="list-group-item list-group-item-action active" id="${tm.tasks[items]["ID"]}">
     <div class="d-flex w-100 justify-content-between">
       <h4 class="mb-1"> <strong> Name: </strong>${tm.tasks[items] ["taskName"]}</h4>
       <h6> <strong> Status: </strong>${tm.tasks[items] ["status"]}</h6>
     </div>
     <h5> <strong> Due Date: </strong>${tm.tasks[items] ["DueDate"]}</h5>
   </a>`

   outputSummary.innerHTML+=summaryTemplate
 }

    }
}

     //<p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>



// Graces Code
// function getAllTasks(){
//     console.log(taskArray)
    //function that populates all tasks on the page when it loads
// }
// function addTask(task){
    // going to add a task when form submitted. Add card and update array
// }
// function deleteTask(task){
    //  work out how to identify the task that was clicked, delete from array and page
// }
// function updateTask(){
    // allow you to change info of a task, save to card and update array
// }



// document.querySelector("#addTask").addEventListener("click", () => {
// const user = document.getElementById('userTaskName')
// const description = document.getElementById('userDescription')
// const assign = document.getElementById('userAssignedTo')
// const status = document.getElementById('select')
// const form = document.getElementById('myForm')

//   let validateTaskForm = []
//   if (userTaskName === '' || userTaskName.value.length > 20) {
//     alert('Name is required and it needs to be less than 20 characters')
//   }

//   if (userDescription === '' || userDescription.length>20) {
//     alert('Description is required and it needs to be less than 20 characters')
//   }

//   if (userAssignedTo.value === '' || userAssignedTo.length<20) {
//     alert('Assigned to is required and it needs to be less than 20 characters')
//   }

//   if (dueDate.value === '' || dueDate.length>20) {
//     alert('Enter valid due date')
//   }

// });












































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

// class TaskManager {
//     constructor() {
//         this.tasks=[]
// }
//     getTasks() {
//         return this.tasks
//     }
//     addTask() {
//         this.tasks.push(task);
//     }
//     deleteTasks(){
//         return this.tasks
//     }
//     updateTasks(){
//         return this.tasks
//     }
//  }

//  let tm = new TaskManager();


// document.querySelector("#addTask").addEventListener("click", function(){
//     if (validateTaskForm()==true){
//         let id = tm.tasks.length + 1
//         let assignedBy = document.querySelector("#userTaskName").value;
//         let description = document.querySelector("#userDescription").value;
//         let assignedTo = document.querySelector("#userAssignedTo").value;
//         let dueDate = document.querySelector("#userDueDate").value;
//         let status = document.querySelector("#select").value;

//         let newTask = createTask(id, assignedBy, description, assignedTo, dueDate, status)
//         tm.addTask(newTask)
//         console.log('current tasks:', tm.getTasks())

        
//         display()
//     }

// })