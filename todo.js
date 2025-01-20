        import inquirer from 'inquirer';
        import { error } from 'node:console';
        import { writeFileSync, readFile } from 'node:fs';
    import { monitorEventLoopDelay } from 'node:perf_hooks';
        let tasks =[]
        const filepath = "todo.json"
        readFile(filepath, (error, data) =>{
            if (error) {
                console.error(error);
                return;
            }
            const alldata = JSON.parse(data)
            tasks = alldata
        })
        async function addTask() {
            await inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Please enter your task"
                }
            ]).then((value)=>{
                if(value.name === ""){
                    return ;
                }
                const task = {
                    id: Date.now(),
                    title: value.name,
                    completed: false
                }
                tasks.push(task)
                let newdata = JSON.stringify(tasks)
                writeFileSync(filepath,newdata)
            })
            
        console.log(tasks.map(task => task.title).join("\n"));
        }
        const deleteTask = async () => {
            await inquirer.prompt([
                {
                    type: "list",
                    name: "task",
                    message: "Select a task to delete",
                    choices: tasks.map(task => task.title)
                    }
                    ]
                    ) .then((value) => {
                        const task = tasks.find(task => task.title === value.task)
                        if (task) {
                            tasks = tasks.filter(t => t.id !== task.id);
                            let newdata = JSON.stringify(tasks)
                            writeFileSync(filepath, newdata)}
                            else{
                                console.log("No task selected")
                            }
                        })}
                        const ShowTask = async () => {
                            console.log("\nYour Tasks!")
                            tasks.length
                            ? console.log(tasks.map(task => task.title).join("\n"))
                            : console.log("No tasks available");
                          }
            
                        const { choice } = await inquirer.prompt({
                            type: "list",
                            name: "choice",
                            message: "Select an option:",
                            choices: ["addTask", "deleteTask","ShowTask" ]
                        });
                        if (choice === "addTask") {
                            addTask();
                                }
                                else if (choice === "deleteTask") {
                                    deleteTask();
                                    }
                                    else if (choice === "ShowTask") {
                                        ShowTask();
                                        }
                                  
                    