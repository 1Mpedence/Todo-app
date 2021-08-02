const body = document.querySelector("body");
const theme = document.querySelector(".theme");
const form = document.querySelector(".form");
const input = document.querySelector(".input-todo");
const todoList = document.querySelector(".todo-list");
const statusAll = document.querySelectorAll(".status");
const deleteAll = document.querySelectorAll(".delete");
const itemLeft = document.querySelector(".items-left-value");
const allTodos = document.querySelectorAll(".all-todo");
const activeTodos = document.querySelectorAll(".active-todo");
const completedTodos = document.querySelectorAll(".completed-todo");
const clearCompleted = document.querySelector(".clear-completed");
const links = document.querySelectorAll(".links *");

theme.addEventListener("click", ()=>{
    if(body.classList.contains("light")){
        body.classList.remove("light");
        body.classList.add("dark");
        theme.setAttribute("src", "images/icon-sun.svg")
    }else{
        body.classList.remove("dark");
        body.classList.add("light");
        theme.setAttribute("src", "images/icon-moon.svg")
    }
})

input.value = null;

let lis = [];
let saved = localStorage.getItem("todosSave");
let todos = JSON.parse(saved);
if(!todos){
    todos = [];
}

itemLeft.innerHTML = todos.length - todos.filter(d => d.completed).length;

for(let todo of todos){
    render(todo);
}
    
form.addEventListener('submit', (e) =>{
    e.preventDefault()
    todoObject = {
        id: Date.now().toString(),
        name: input.value,
        completed: false,
    };
    if(input.value != ''){
        todos.push(todoObject);
        render(todoObject);
        input.value = null;
        
        save();
    }
})

function render(todoObject){
    let li = document.createElement("li");
    li.classList.add("todo-item");

    let status = document.createElement("div");
    status.classList.add("status");

    let p = document.createElement("p");
    p.classList.add("todo-name");
    p.innerHTML = todoObject.name;

    let del = document.createElement("div");
    del.classList.add("delete");
    let img = document.createElement("img");
    img.src = "images/icon-cross.svg";
    del.appendChild(img);

    li.appendChild(status);
    li.appendChild(p);
    li.appendChild(del);
    li.setAttribute("id", todoObject.id);


    todoList.insertBefore(li, todoList.firstChild);

    itemLeft.innerHTML = todos.length - todos.filter(d => d.completed).length;

    if(todoObject.completed === true){
        status.classList.toggle("status-background");
        p.classList.toggle("completed");
    }
    
    lis.push(li);
    status.addEventListener("click", isComplete);
    del.addEventListener("click", deleteTodo);
}


for(let allTodo of allTodos){
    allTodo.addEventListener("click", ()=> {
        showAllTodos();
        links[0].classList.add("current");
        links[3].classList.add("current");
        links[0].classList.remove("cta");
        links[3].classList.remove("cta");
        save()
    })
}

function showAllTodos(){
    for(let li of lis){
        li.style.display = "flex";
    }
    links.forEach(d => {
        d.classList.remove("current");
        d.classList.add("cta");
    });
}


for(let activeTodo of activeTodos){
    activeTodo.addEventListener("click", ()=>{
        showAllTodos()
        active = todos.filter(d => d.completed);
        for(let a of active){
            let _id = a.id;
            for(let li of lis){
                if(li.id == _id){
                    li.style.display = "none";
                }
            }
        }
        links[1].classList.add("current");
        links[4].classList.add("current");
        links[1].classList.remove("cta");
        links[4].classList.remove("cta");
        save()
    })
}

for(let completedTodo of completedTodos){
    completedTodo.addEventListener("click", ()=>{
        showAllTodos()
        active = todos.filter(d => !d.completed);
        for(let a of active){
            let _id = a.id;
            for(let li of lis){
                if(li.id == _id){
                    li.style.display = "none";
                }
            }
        }
        links[2].classList.add("current");
        links[5].classList.add("current");
        links[2].classList.remove("cta");
        links[5].classList.remove("cta");
        save()
    })
}

clearCompleted.addEventListener("click", ()=>{
    todoClears = todos.filter(d => d.completed);
    for(let todoClear of todoClears){
        let _id = todoClear.id;
        for(let li of lis){
            if(li.id == _id){
                li.remove();
                let index = todos.indexOf(todoClear);
                todos.splice(index, 1);

            }
        }
    }
    save()
})

function isComplete(){
    let check = this.parentElement.children[0].classList;
    check.toggle("status-background");
    let cross = this.parentElement.children[1].classList;
    cross.toggle("completed");
    let thisId = this.parentElement.id;
    let result = todos.find(({id}) => id == thisId);
    todos.find(({id}) => id == thisId).completed = !(todos.find(({id}) => id == thisId).completed);
    
    itemLeft.innerHTML = todos.length -  todos.filter(d => d.completed).length;
    save()
}
function deleteTodo(e){
    this.parentElement.remove();
    let thisId = this.parentElement.id;
    let result = todos.find(({id}) => id == thisId);
    let index = todos.indexOf(result);
    console.log(index);
    todos.splice(index, 1);
    
    itemLeft.innerHTML = todos.length -  todos.filter(d => d.completed).length;
    save()
}

function save(){
    let todosSave = todos;
    let str = JSON.stringify(todosSave);
    localStorage.setItem("todosSave", str);
}

showAllTodos();
for(let allTodo of allTodos){
    allTodo.classList.add("current");
    console.log(allTodo.classList);
}
