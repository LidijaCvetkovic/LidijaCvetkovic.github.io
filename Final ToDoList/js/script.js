document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("tasks_list").innerHTML = localStorage.getItem("tasksList");
});

const addForm = document.getElementById('add_form');
const newTask = document.getElementById('new_task');
const ul = document.getElementById('tasks_list');
const filterInput = document.getElementById('filter_tasks');
const clearBtn = document.getElementById('clear_btn');

//Create li tag (task to do)
function createLI(text) {

	const li = document.createElement('li');
	const span = document.createElement('span');
	span.textContent = text;
	li.appendChild(span);

	// adding an edit button to li element
	const editButton = document.createElement('button');
	editButton.textContent = 'edit';
	li.appendChild(editButton);

	//adding a remove button to li element
	const removeButton = document.createElement('button');
	removeButton.textContent = 'remove';
	li.appendChild(removeButton);
	return li;	
}

//Press enter or click add new task button to add task to the list
addForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const text = newTask.value;

	if(text === '') {
		alert("You can't add empty task!");
	} else {
		newTask.value = '';
		const li = createLI(text);
		ul.appendChild(li);
		let savedUlList = ul.innerHTML;
 		localStorage.setItem("tasksList", savedUlList);
	}
});

//Removing task with remove button
ul.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		const button = e.target;
		const li = button.parentNode;
		const ul = li.parentNode;

		if (button.textContent === 'remove') {
			const confirmBox = confirm("Do you really want to delete this task? For yes press 'OK'.");
			if (confirmBox === true) {
				ul.removeChild(li);
				savedUlList = ul.innerHTML;
				localStorage.setItem("tasksList", savedUlList);
			}
		}
	}
});

//Editing task and saving changes with edit and save buttons
ul.addEventListener('click', (e) => {
	if (e.target.tagName === 'BUTTON') {
		const button = e.target;
		const li = button.parentNode;
		const ul = li.parentNode;

		if (button.textContent === 'edit') {
			const span = li.firstElementChild;
			const input = document.createElement('input');
			input.type = 'text';
			input.value = span.textContent;
			li.insertBefore(input, span);
			li.removeChild(span);
			button.textContent = 'save';
		} else if (button.textContent === 'save') {
			const input = li.firstElementChild;
			const span = document.createElement('span');
			span.textContent = input.value;
			li.insertBefore(span, input);
			li.removeChild(input);
			button.textContent = 'edit';
		}
	}
});

//Filtering tasks
filterInput.addEventListener('keyup', (e) => {
	const filter = filterInput.value.toUpperCase();
	const ul = document.getElementById('tasks_list');
	const li = ul.getElementsByTagName('li');

	for (let i = 0; i < li.length; i++) {
		if (li[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
		    li[i].style.display = "";
		} else {
		    li[i].style.display = "none";
		}
	}
});

//Removing all tasks from list
clearBtn.addEventListener('click', (e) => {
	const confirmBox = confirm("Do you really want to delete all tasks? For yes press 'OK'.");

	if(confirmBox === true) {
		ul.innerHTML = '';
		localStorage.removeItem("tasksList");	
	}
});


//Adding checkmark to tasks that are done
ul.addEventListener('click', function(e) {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
  }
}, false);
