//todo-module
(() => {
    let lastIndex = 0
    const input = document.getElementById('new-task');
    const btn = document.getElementById('btn-new-todo');
    const todosCont = document.getElementById("incomplete-tasks");
    const completedCont = document.getElementById("completed-tasks");
    const edit = document.getElementById("edit");

    const todos = [

    ];

    const createToDo = () => {
        if(input.value){
            todos.push({
                id: lastIndex++,
                todo: input.value,
                completado: false,
            })
            input.value = "";
            input.style.borderBlockColor = "black";
            updateComponentTodos();
        }else{
            input.style.borderBlockColor = "red";
        }        
    }

    input.oninput = ()=>{
        if(input.value){
            input.style.borderBlockColor = "black";
        }else{
            input.style.borderBlockColor = "red";
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
                const cbtodo = document.getElementById(`cb-todo-${key}`);
                const btndel = document.getElementById(`del-todo-${key}`);
                const btnupd = document.getElementById(`upd-todo-${key}`);
                console.log(btndel);
                cbtodo.onclick = changeStateTodo(todo);
                btndel.onclick = deleteTodo(todo);
                btnupd.onclick = editTodo(todo);
            }, 1);
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
        if(!todos.length) lastIndex = 0;
        updateComponentTodos();
    }

    const editTodo = (todo) => () => {        
        edit.innerHTML = `            
            <input id="input-todo-edit" type="text" value="${todo.todo}" />
            <button id="btn-todo-save">Save</button>
        `;       
        const input = document.getElementById("input-todo-edit");
        const btnsave = document.getElementById("btn-todo-save");
        input.oninput = ()=>{
            if(!input.value){
                input.value = todo.todo;
            }
        }
        btnsave.onclick = ()=>{
            todo.todo = input.value;
            updateComponentTodos();
        }
    }

    updateComponentTodos();
})();