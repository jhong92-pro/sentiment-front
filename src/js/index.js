import '@fortawesome/fontawesome-free/js/all.min.js'
// import "../scss/style.scss"
import 'bootstrap';
import CreateChart from './createChart';
import datasample from './datasample';
import Login from './login';
import loginsample from './loginsample';
import Main from './main'

class Router {
    routes = [];
    notFoundCallback = () => {
        window.location.hash = '#/404'
    };
    addRoute(url, callback){
        this.routes.push({
            url,callback
        })
        return this;
    }

    checkRoute(){
        const currentRoute = this.routes.find((route)=> route.url===window.location.hash)
        console.log(currentRoute)
        if (!currentRoute){
            this.notFoundCallback();
            return;
        }
        currentRoute.callback();
    }

    init(){
        window.addEventListener('hashchange', this.checkRoute.bind(this))
        console.log(window.location.hash)
        if(!window.location.hash){
            window.location.hash = '#/login'
            return
        }
        this.checkRoute();
    }

    setNotFound(callback){
        this.notFoundCallback = callback
        return this
    }
}

class Storage {
    saveTodo(id, todoContent){
        const todosData = this.getTodos()
        todosData.push({id, content:todoContent, status:"TODO"})
        localStorage.setItem('todos', JSON.stringify(todosData))
    }
    editTodo(id, todoContent, status = "TODO"){
        const todosData = this.getTodos();
        const todoIndex = todosData.findIndex((todo) => todo.id == id)
        const targetTodoData = todosData[todoIndex]
        const editedTodoData = todoContent === '' ? {...targetTodoData, status} : {...targetTodoData, content: todoContent}
        todosData.splice(todoIndex, 1, editedTodoData)
        localStorage.setItem('todos', JSON.stringify(todosData))
    }
    deleteTodo(id){
        const todosData = this.getTodos()
        console.log(todosData)
        todosData.splice(
            todosData.findIndex((todo)=>todo.id==id),
            1,
        )
        console.log(todosData)
        localStorage.setItem('todos',JSON.stringify(todosData))
    }
    getTodos(){
        return localStorage.getItem('todos') === null
        ? []
        :JSON.parse(localStorage.getItem('todos'))
        
    }
}

class TodoList{
    constructor(storage){
        this.initStorage(storage)
        this.assignElement();
        this.addEvent();
        this.loadSavedData();
    }   

    initStorage(storage){
        this.storage = storage;
    }

    assignElement(){
        this.inputContainerEl = document.getElementById("input-container");
        this.inputAreaEl = this.inputContainerEl.querySelector("#input-area");
        this.todoInputEl = this.inputAreaEl.querySelector('#todo-input');
        this.addBtnEl = this.inputAreaEl.querySelector('#add-btn')
        this.todoContainerEl = document.getElementById('todo-container')
        this.todoListEl = this.todoContainerEl.querySelector('#todo-list');
        this.radioAreaEl = this.inputContainerEl.querySelector('#radio-area')
        this.filterRadioBtnEls = this.radioAreaEl.querySelectorAll('input[name="filter"]')
    }

    addEvent(){
        this.addBtnEl.addEventListener('click', this.onClickAddBtn.bind(this))
        this.todoListEl.addEventListener('click', this.onClickTodoList.bind(this))
        this.addRadioBtnEvent()
    }

    loadSavedData(){
        const todosData = this.storage.getTodos()
        for(const todoData of todosData){
            const {id, content, status} = todoData;
            this.createTodoElement(id, content, status)
        }
    }

    addRadioBtnEvent(){
        for (const filterRadioBtnEl of this.filterRadioBtnEls){
            filterRadioBtnEl.addEventListener('click', this.onClickRadioBtn.bind(this))
        }
    }

    onClickRadioBtn(event){
        const {value} = event.target;
        window.location.href = `#/${value.toLowerCase()}`
        console.log(value)
        // this.filterTodo(value) : 라우터에서 사용
    }

    filterTodo(status){
        const todoDivEls = this.todoListEl.querySelectorAll('div.todo')
        for (const todoDivEl of todoDivEls){
            switch(status){
                case 'ALL':
                    todoDivEl.style.display = 'flex';
                    break;
                case 'DONE':
                    todoDivEl.style.display = todoDivEl.classList.contains('done') ? 'flex' : 'none'
                    break;
                case 'TODO':
                    todoDivEl.style.display = todoDivEl.classList.contains('done') ? 'none' : 'flex'
                    break;
            }
        }
    }

    onClickAddBtn(){
        if(this.todoInputEl.value.length === 0){
            alert("내용을 입력해주세요")
            return
        }

        const id = Date.now();
        this.storage.saveTodo(id, this.todoInputEl.value)

        this.createTodoElement(id, this.todoInputEl.value);
        this.todoInputEl.value = ''
    }

    onClickTodoList(event){
        const {target} = event
        const btn = target.closest('button') // 상위로
        if (!btn) return;
        if(btn.matches('#delete-btn')){
            this.deleteTodo(target)
        }else if(btn.matches('#edit-btn')){
            this.editTodo(target)
        }else if(btn.matches('#save-btn')){
            this.saveTodo(target)
        }else if(btn.matches('#complete-btn')){
            this.completeTodo(target)
        }
    }

    completeTodo(target){
        const todoDiv = target.closest('.todo')
        todoDiv.classList.toggle('done')
        console.log(todoDiv.dataset)
        const {id} = todoDiv.dataset;
        this.storage.editTodo(id, '', todoDiv.classList.contains('done')?'DONE':'TODO')
    }

    saveTodo(target){
        const todoDiv = target.closest('.todo');
        todoDiv.classList.remove('edit')
        const todoInputEl = todoDiv.querySelector('input')
        todoInputEl.readOnly = true;
        console.log(todoDiv)
        const {id} = todoDiv.dataset;
        this.storage.editTodo(id, todoInputEl.value)
    }

    editTodo(target){
        const todoDiv = target.closest('.todo')
        const todoInputEl = todoDiv.querySelector('input')
        todoInputEl.readOnly = false
        todoInputEl.focus()
        todoDiv.classList.add('edit')
    }

    deleteTodo(target){
        const todoDiv = target.closest('.todo')
        todoDiv.addEventListener('transitionend',() => {
            todoDiv.remove()
        })
        todoDiv.classList.add('delete');
        this.storage.deleteTodo(todoDiv.dataset.id)
    }

    createTodoElement(id,value,status=null){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        if(status === 'DONE'){
            todoDiv.classList.add('done')
        }

        todoDiv.dataset.id = id;

        const todoContent = document.createElement('input');
        todoContent.value = value;
        todoContent.readOnly = true;
        todoContent.classList.add('todo-item')
        const fragment = new DocumentFragment()
        fragment.appendChild(todoContent);
        fragment.appendChild(
            this.createButton('complete-btn', 'complete-btn',['fas','fa-check'])
        )
        fragment.appendChild(
            this.createButton('edit-btn', 'edit-btn',['fas','fa-edit'])
        )        
        fragment.appendChild(
            this.createButton('delete-btn', 'delete-btn',['fas','fa-trash'])
        )
        fragment.appendChild(
            this.createButton('save-btn', 'save-btn',['fas','fa-save'])
        )        
        todoDiv.appendChild(fragment)
        this.todoListEl.appendChild(todoDiv)
    }

    createButton(btnId, btnClassName, iconClassName){
        const btn = document.createElement('button')
        const icon = document.createElement('i')
        icon.classList.add(...iconClassName);
        btn.appendChild(icon);
        btn.id = btnId
        btn.classList.add(btnClassName)
        return btn
    }
}

const root = document.getElementById("super-root");
root.innerHTML =
`
<section class="vh-100" style="background-color: #e2d5de;">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col col-xl-10">
        <div class="card" style="border-radius: 15px;">
          <div class="card-body p-5" id="root">
          <!-- BODY HERE -->
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
`
// DOMContentLoaded : Dom을 완전히 불러왔을 떄 실행
document.addEventListener('DOMContentLoaded', ()=>{
    const router = new Router();
    const login = new Login();
    const main = new Main();
    const createChart = new CreateChart();
    // const todoList = new TodoList(new Storage());
    const loginCallback = () => login.resetElement()
    const mainCallback = () => main.resetElement()
    const createChartCallback = () => createChart.resetElement()
    router
    .addRoute('#/login', loginCallback)
    .addRoute('#/', mainCallback)
    .addRoute('#/create', createChartCallback)
    // .setNotFound(routeCallback('ALL'))
    .init();
})
