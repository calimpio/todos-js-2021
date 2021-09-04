//todo-module
(() => {
    let lastIndex = 0
    const input = document.getElementById('new-task');
    const btn = document.getElementById('btn-new-todo');
    const todosCont = document.getElementById("incomplete-tasks");
    const completedCont = document.getElementById("completed-tasks");
    const edit = document.getElementById("edit");
    const label = document.getElementById('new-task-label');
    const allToComplete = document.getElementById('completed-all');

    const todos = [

    ];

    allToComplete.onclick = () => {
        todos.forEach(todo => todo.completado = !todo.completado);
        updateComponentTodos();
    }

    const taskRequired = (isRequired) => {
        if (isRequired) {
            label.textContent = "Add Task Required *";
            label.style.color = input.style.borderBlockColor = "red";
        } else {
            label.textContent = "Add Task";
            label.style.color = input.style.borderBlockColor = "black";
        }
    }

    const createToDo = () => {
        if (input.value) {
            todos.push({
                id: lastIndex++,
                todo: input.value,
                completado: false,
            })
            taskRequired(false);
            updateComponentTodos();
        } else {
            taskRequired(true);
        }
    }

    input.oninput = () => {
        if (input.value) {
            taskRequired(false);
        } else {
            taskRequired(true);
        }
    }

    btn.onclick = createToDo;

    const updateComponentTodos = () => {
        const multiRenderTodo = todos.reduce((ac, todo, key) => {
            const li =
                `<li>
                    <input id="cb-todo-${key}" ${todo.completado ? "checked" : ""} type="checkbox">
                    <label>${todo.todo}</label>                
                    <button id="del-todo-${key}" class="delete">Delete</button>
                    ${!todo.completado ? `<button id="upd-todo-${key}">Edit</button>` : ""}
                </li>`;
            setTimeout(() => {
                try {
                    const cbtodo = document.getElementById(`cb-todo-${key}`);
                    const btndel = document.getElementById(`del-todo-${key}`);
                    const btnupd = document.getElementById(`upd-todo-${key}`);
                    cbtodo.onclick = changeStateTodo(todo);
                    btndel.onclick = deleteTodo(todo);
                    btnupd.onclick = editTodo(todo);
                } catch (err) { }
            }, 2);
            todo.completado ? ac.completado += li : ac.todos += li;
            return ac;
        }, { todos: "", completado: "" });
        todosCont.innerHTML = multiRenderTodo.todos;
        completedCont.innerHTML = multiRenderTodo.completado;
        edit.innerHTML = "";
    }

    const changeStateTodo = (todo) => () => {
        todo.completado = !todo.completado;
        updateComponentTodos();
    }

    const deleteTodo = (todo) => () => {
        const i = todos.indexOf(todo);
        todos.splice(i, 1);
        if (!todos.length) lastIndex = 0;
        updateComponentTodos();
    }

    const editTodo = (todo) => () => {
        edit.innerHTML = ` 
            <h3>Edit</h3>           
            <input id="input-todo-edit" type="text" value="${todo.todo}"/>
            <button id="btn-todo-save">Save</button>
        `;
        const input = document.getElementById("input-todo-edit");
        input.focus();
        const btnsave = document.getElementById("btn-todo-save");
        input.onblur = () => {
            if (!input.value) {
                input.value = todo.todo;
            }
        }
        btnsave.onclick = () => {
            todo.todo = input.value;
            updateComponentTodos();
        }
    }

    updateComponentTodos();
})();