let toDolist = [];

function displayToDos() {
	toDolist =  getTodoStore();
	
	toDolist.forEach(function add(toDo) {
		addToDo(toDo);
	});		
}
        
function clearFields() {
    document.getElementById('to-do').value = '';
	document.getElementById('date').value = '';
	document.getElementById('time').value = '';
}

function addToDo(toDo) {
	const list = document.getElementById('contain');
	const row = document.createElement('div');
	row.classList.add('container');
	row.classList.add('mr-4');
	row.classList.add('inflated');
	// row.classList.add('fade-in'); implemented using unfade(row);

	row.innerHTML = `
	  <i class="row fas fa-window-close mt-4 px-3 delete"></i>
	  <div class="row todo-div mt-4 px-2">${toDo.todo}</div>
	  <div class="row px-2 font">${toDo.date}</div>
	  <div class="row px-2 font">${toDo.time}</div>`;
	 row.style.opacity = "0.4";
	 list.appendChild(row);
	
	 if (toDolist.length !== list.childElementCount) {
		row.style.opacity = "1";
	 }
	 if (toDolist.length === list.childElementCount) {
		unfade(row);
	 }
}

function recieveInput() {
	const todoVal = document.getElementById('to-do').value;
	const dateVal = document.getElementById('date').value;
	const timeVal = document.getElementById('time').value;
	if(todoVal && dateVal) {
		const toDoItem = {todo:todoVal, date:dateVal, time:timeVal};
		addToDo(toDoItem);
		addTodoStore(toDoItem);
	}
}


function deleteToDo (element) {
	console.log(element);
	if(element.classList.contains('delete')) {
		element.parentElement.remove();
	}
}

function deleteToDoFromStore(deleteStore) {
	const toDos = getTodoStore();
	
	toDos.forEach(function del(element, index) {
		if(element.todo === deleteStore) {toDos.splice(index, 1);} 
		localStorage.setItem('ToDoStore', JSON.stringify(toDos));
	});
}




document.getElementById('contain').addEventListener('click', function(e) {
	deleteToDo(e.target);
	deleteToDoFromStore(e.target.nextElementSibling.textContent);
	console.log(e.target.nextElementSibling);
});                             


function getTodoStore() {
	let toDoArray = JSON.parse(window.localStorage.getItem('ToDoStore')) || [];
	return toDoArray;	
}

function addTodoStore(toDo) {
	const toDos = getTodoStore();
	toDos.push(toDo);
	localStorage.setItem('ToDoStore', JSON.stringify(toDos));
}

document.addEventListener('DOMContentLoaded', displayToDos);

function unfade(element) {
    var op = 0.1;  
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.9;
    }, 30);
}

function generateId() {
	return (new Date()).getTime();
}




