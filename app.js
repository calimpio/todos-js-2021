//todo-module
(() => {
    let lastIndex = 0
    const inptNewTodo = document.getElementById('new-task');
    const btnNewTodo = document.getElementById('btn-new-todo');
    const todosCont = document.getElementById("incomplete-tasks");
    const completedCont = document.getElementById("completed-tasks");
    const editCont = document.getElementById("edit");
    const lbNewTodo = document.getElementById('new-task-label');
    const cbAllToComplete = document.getElementById('completed-all');

    const todos = [

    ];

    cbAllToComplete.onclick = () => {
        todos.forEach(todo => todo.completado = cbAllToComplete.checked);
        renderTodos();
    }

    const taskRequired = (isRequired) => {
        if (isRequired) {
            lbNewTodo.textContent = "Add Task Required *";
            lbNewTodo.style.color = inptNewTodo.style.borderBlockColor = "red";
        } else {
            lbNewTodo.textContent = "Add Task";
            lbNewTodo.style.color = inptNewTodo.style.borderBlockColor = "black";
        }
    }

    btnNewTodo.onclick = () => {
        if (inptNewTodo.value) {
            todos.push({
                id: lastIndex++,
                todo: inptNewTodo.value,
                completado: false,
            })
            taskRequired(false);
            renderTodos();
        } else {
            taskRequired(true);
        }
    }

    inptNewTodo.oninput = () => {
        if (inptNewTodo.value) {
            taskRequired(false);
        } else {
            taskRequired(true);
        }
    }     

    const renderTodos = () => {
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
        editCont.innerHTML = "";
    }

    const changeStateTodo = (todo) => () => {
        todo.completado = !todo.completado;
        renderTodos();
    }

    const deleteTodo = (todo) => () => {
        const i = todos.indexOf(todo);
        todos.splice(i, 1);
        if (!todos.length) lastIndex = 0;
        renderTodos();
    }

    const editTodo = (todo) => () => {
        editCont.innerHTML = ` 
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
            renderTodos();
        }
    }

    renderTodos();
})();