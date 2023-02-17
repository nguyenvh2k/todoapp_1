
var todosApi = 'https://smil1001.azurewebsites.net/api/v1/todo';

function start(){
    getTodo(renderTodo);
    handleCreateForm();
}

start();

//Functions
function getTodo(callback){
    fetch(todosApi)
    .then(function(response){
        return response.json();
    })
    .then(callback);
}

function createTodo(data,callback){
    var option = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
        body:JSON.stringify(data)
    };
    fetch(todosApi,option)
    .then(function(response){
        return response.json();
    })
    .then(callback)
}

function deleteTodo(id){
    var options = {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
    };
    fetch(todosApi+'/'+id,options)
    .then(function(response){
        // return response.json();
    })
    .then(function(){
        var todoItem = document.querySelector(".todo-item-"+id);
        console.log(todoItem);
        if(todoItem){
            todoItem.remove();
        }
    })
}


function renderTodo(todos){
    var listTodo = document.querySelector('.list-todos');
    console.log(todos);
    console.log(listTodo);
    var htmls = todos.map(function(todo){
        return `
        <li class="list-group-item todo-item-${todo.id}">
        <div class="todo-indicator bg-warning"></div>
        <div class="widget-content p-0">
          <div class="widget-content-wrapper">
            <div class="widget-content-left mr-2">
              <div class="custom-checkbox custom-control">
                <input class="custom-control-input"
                  id="exampleCustomCheckbox12" type="checkbox"><label class="custom-control-label"
                  for="exampleCustomCheckbox12">&nbsp;</label>
                </div>
            </div>
            <div class="widget-content-left">
              <div class="widget-heading">${todo.title} <div class="badge badge-danger ml-2">Rejected</div>
              </div>
              <div class="widget-subheading"><i>${todo.detail}</i></div>
            </div>
          <div class="widget-content-right">
            <button class="border-0 btn-transition btn btn-outline-success" >
              <i class="fa fa-check"></i></button>
              <button class="border-0 btn-transition btn btn-outline-danger" onclick="deleteTodo(${todo.id})">
             <i class="fa fa-trash"></i>
             
            </button>
          </div>
          </div>
        </div>
      </li>
        `;
    });
    console.log(htmls);
    listTodo.innerHTML = htmls.join('');
}

function handleCreateForm(){
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function(){
    var title = document.querySelector('input[name="title"').value;
    var detail = document.querySelector('input[name="detail"').value;
    var formData = {
        title: title,
        detail: detail
    };
        createTodo(formData,function(){
            getTodo(renderTodo);
        });
    }
    
}