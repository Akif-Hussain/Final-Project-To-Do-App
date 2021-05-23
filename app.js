// let taskSections = document.getElementsByTagName("input", "select");




function validateTaskForm(taskName, taskDescription, taskAssign, taskDueDate) {
    let formValues = [taskName, taskDescription, taskAssign, taskDueDate]
     console.log(formValues)  
    let isValid = true;
    for (value of formValues){ 
        if (value.length === 0 || value.length >= 20) {
            alert("Name must be filled out");
            isValid = false;  
            
            
        }
    }
    return isValid;
};

// function validateTaskForm() {
//     var name = document.forms["Form"]["userTaskName"].value;
//     var description = document.forms["Form"]["userDescription"].value;
//     var assignedTo = document.forms["Form"]["userAssignedTo"].value;

//     if ((name == "") || (name.length > 20)) {
//       alert("Name must be filled out");
//       return false;
//     } else if ((description == "") || (description.length > 20)) {
//         alert("Description must be filled out");
//         return false;
//     } else if ((assignedTo == "") || (assignedTo.length > 20)) {
//         alert("AssignedTo must be filled out");
//         return false;
//     }
// }
