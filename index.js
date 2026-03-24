const fs = require('fs');

const FILE  = 'tasks.json';
const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

const loadTasks = () => {
	if(!fs.existsSync(FILE)) {
		fs.writeFileSync(FILE, JSON.stringify([]));
	}

	const data = fs.readFileSync(FILE);
	return JSON.parse(data);
}

const saveTasks = (tasks) => {
	fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}


if(command === 'add') {
	const descrition = arg1;

	if (!descrition) {
		console.log("Error: description required");
		return;
		
	}
	const tasks = loadTasks();

	const newTask = {
		id: tasks.length + 1,
		descrition,
		status: "todo",
		createdAt: new Date(),
		updatedAt : new Date()
	};
	tasks.push(newTask);
	saveTasks(tasks);
	console.log(`Task  add successfully`);
	
}
if(command == 'update') {
	const id = parseInt(arg1);
	const status = arg2;
	
	if (!id || !status) {
		console.log("Error: id and status required");
		return;
	}
	const tasks = loadTasks();
	const task = tasks.find(t => t.id === id);
	if (!task) {
		console.log("Error: task not found");
		return;
	}
	task.status = status;
	task.updatedAt = new Date();
	saveTasks(tasks);
	console.log(`Task ${id} updated successfully`);
	
}
if(command == 'delete')
{
	const id = parseInt(arg1);
	if (!id) {
		console.log("Error:id required");
		return;
	}
	const tasks = loadTasks();
	const taskIndex = tasks.findIndex(t => t.id == id);
	if (!taskIndex == -1) {
		console.log("Error: task not found");
		return;
	}
	tasks.splice(taskIndex, 1);
	saveTasks(tasks);
	console.log(`Task ${id} deleted successfully`);

}