// console.log("123")

// 按鈕
const signupBtn = document.querySelector(".signup_btn")
const toLoginBtn = document.querySelector(".switch_to_login")
const loginBtn = document.querySelector(".login_btn")
const toSignupBtn = document.querySelector(".switch_to_signup")


// 輸入欄位
const signupEmail = document.querySelector("#signup_email")
const signupName = document.querySelector("#signup_name")
const signupPassword = document.querySelector("#signup_password")
const signupPassword2 = document.querySelector("#ignin_password_2")
const loginEmail = document.querySelector("#login_email")
const loginPassword = document.querySelector("#login_password")

// 要送去api的欄位
const signupInfo = {};
const loginInfo ={};

// 錯誤訊息
const errorTxts = document.querySelectorAll(".error_txt")
    // [0] >> login Email
    // [1] >> login 密碼
    // [2] >> signin Email
    // [3] >> signin 您的暱稱
    // [4] >> signin 密碼
    // [5] >> signin 再次輸入密碼


// API
const apiURL = "https://todoo.5xcamp.us"
let token = "" ; 
let nickname = "";

// 頁面
const signupPage = document.querySelector(".signup_page")
const loginPage = document.querySelector(".login_page")
const todolistPage = document.querySelector(".todolist_page")

// 通用頁面code
function switchPage(onPage){
    //初始化
    signupPage.classList.remove("active")
    loginPage.classList.remove("active")
    todolistPage.classList.remove("active")

    //需要的網站on
    onPage.classList.add("active")
    console.log("跳轉頁面結束")
}

function clearInput(inputname){
    inputname.value = "";
}

// 註冊頁面code
signupBtn.addEventListener("click",function(e){
    e.preventDefault();
    signupInfo.email = signupEmail.value;
    signupInfo.name =  signupName.value;
    signupInfo.psw = signupPassword.value;
    signupInfo.psw2 = signupPassword2.value;
    if (signupCheck() == true) {
        signup();
    };
})

toLoginBtn.addEventListener("click",function(e){
    e.preventDefault();
    switchPage(loginPage);
})


function signupCheck(){
     // 初始化
    errorTxts.forEach((item)=>{
        item.textContent = "";
    })

    // error check
    if(signupInfo.email ===""){
        errorTxts[2].textContent = "此欄不可為空"
        return false;
    }else if(signupInfo.name ===""){
        errorTxts[3].textContent = "此欄不可為空"
        return false;
    }else if(signupInfo.psw ===""){
        errorTxts[4].textContent = "此欄不可為空"
        return false;
    }else if(signupInfo.psw2 ===""){
        errorTxts[5].textContent = "此欄不可為空"
        return false;
    }else if(signupInfo.psw2 !== signupInfo.psw){
        errorTxts[5].textContent = "兩次輸入密碼不相同"
        return false;
    }

    return true;
}
        "user": {
            "email": signupInfo.email,
            "nickname": signupInfo.name,
            "password": signupInfo.psw
          }
    })

    // 取得token
    .then(res =>{
        token = res.headers.authorization
        nickname = res.data.nickname
    })

    // 清除input
    .then(res => {
        clearInput(signupEmail)
        clearInput(signupName)
        clearInput(signupPassword)
        clearInput(signupPassword2)
    })
    // 彈跳成功視窗
    .then(res=>{
        let timerInterval;
        Swal.fire({
        title: "註冊成功",
        icon:"success",
        html: "正在創建帳號中...",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
        });
    })

    // 跳轉頁面+render
    .then(res=>{
        switchPage(todolistPage)
        renderUserName()
        getTodo()
    })

    .catch(error => {
        Swal.fire({
            title: "註冊失敗",
            text: error.response.data.error,
            icon: "error"
          })
}
)}


// 登入頁面code

loginBtn.addEventListener("click",function(e){
    e.preventDefault();
    loginInfo.email = loginEmail.value;
    loginInfo.psw = loginPassword.value;
    loginCheck();
    console.log(loginInfo)
})

toSignupBtn.addEventListener("click",function(e){
    e.preventDefault();
    switchPage(signupPage);
})

function loginCheck(){
     // 初始化
     errorTxts.forEach((item)=>{
        item.textContent = "";
    })

    if(loginInfo.email ===""){
        errorTxts[0].textContent = "此欄不可為空"
        return;
    }else if(loginInfo.psw ===""){
        errorTxts[1].textContent = "此欄不可為空"
        return;
    }else{login()}
}

function login(){
    axios.post(`${apiURL}/users/sign_in`,{
        "user": {
            "email": loginInfo.email,
            "password": loginInfo.psw
          }
    })
    .then(res=>{
        console.log(res)
        token = res.headers.authorization
        nickname = res.data.nickname
    })

    .then(res => {
        clearInput(loginEmail)
        clearInput(loginPassword)
    })
    
    .then(res=>{
        let timerInterval;
        Swal.fire({
        title: "登入成功",
        icon:"success",
        html: "正在建立頁面...",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
        }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
        });
    })
    .then(res=>{
        switchPage(todolistPage)
        renderUserName()
        getTodo()
    })
   
    .catch(error=>{
        Swal.fire({
            title: "登入失敗",
            text: "帳號密碼有誤 請重新輸入",
            icon: "error"
          })
        loginEmail.value = "";
        loginPassword.value = "";
})
}

// 代辦事項頁面 code

// 暫時用資料
// Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NTgxIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjk5NjA2NjgzLCJleHAiOjE3MDA5MDI2ODMsImp0aSI6ImExMDdjODEzLTAwMzQtNGU3MC1hNWRiLTQxY2JiMmZkNzM5OCJ9.6t6o8mB6QvpW2ujVFI2U3D0EZExvJw9o25scI1R1i74
let todos = [];

const todoList = document.querySelector(".todo_ul")
const todoInput = document.querySelector(".todo_input")
const addTodoBtn = document.querySelector(".add_todo_btn")
const todoListCard = document.querySelector(".todo_list_container")
const noTodoImg = document.querySelector(".no_todo_container")
const logoutBtn = document.querySelector(".logout_btn")
const userName = document.querySelector(".user_name")
const showUncheckedNum = document.querySelector(".show_unchecked")
const deleteCheckedTodosBtn = document.querySelector(".delete_checked")
const tabs = document.querySelector(".tabs")
const tabAll = document.querySelector("#tab_all")
const tabUnchecked = document.querySelector("#tab_unchecked")
const tabChecked = document.querySelector("#tab_checked")
let todosOnclicked = [];
let tabOnClicked = "" ;


function getTodo(){
    axios.get(`${apiURL}/todos`,{
        headers:{
            "Authorization": token
        }
    })
    .then(res => {
        todos = res.data.todos
        getTodosOnclicked()
    })
    .then(res => {
        checkTodoLength(todos)
        renderTodo(todosOnclicked)
        // renderTodo(todos)
        renderUncheckedNum()
    })
    .catch(error => console.log(error.response))
}

function checkTodoLength(todos){
    todoListCard.classList.remove("active")
    noTodoImg.classList.remove("active")

    if(todos.length === 0){
        noTodoImg.classList.add("active")
    }else{
        todoListCard.classList.add("active")
    }
}


// 放在getTodo()中
function renderTodo(todos){
    let str = ""
    todos.forEach((item)=>{
        if(item.completed_at == null){
            str += 
            `<li class="todo_li data-id=${item.id}">
                <label class="checkbox">
                    <input type="checkbox" data-id=${item.id}>
                    <span>${item.content}</span>
                </label>
                <i role="button" class="fa-solid fa-xmark delete_btn" data-id=${item.id}></i>
            </li>`
        }else{
            str += 
            `<li class="todo_li data-id=${item.id}">
                <label class="checkbox">
                    <input type="checkbox" data-id=${item.id} checked>
                    <span>${item.content}</span>
                </label>
                <i role="button" class="fa-solid fa-xmark delete_btn" data-id=${item.id}></i>
            </li>`
        }
    })
    todoList.innerHTML = str;
}

addTodoBtn.addEventListener("click",function(e){
    e.preventDefault();
    addTodo()
    switchTab("tab_all")
    todoInput.value = ""
})

function addTodo(){
    let newTodo = todoInput.value
    if(newTodo === ""){
        alert("請輸入待辦事項")
        return
    }
    axios.post(`${apiURL}/todos`,{
        "todo": {
          "content": newTodo
        }
    },{
        "headers":{
            "Authorization": token
        }
    })
    .then(res=>getTodo())
    .catch(error=>console.log(error.response))
}

logoutBtn.addEventListener("click",function(e){
    e.preventDefault();
    logout();
})


function logout(){
    axios.delete(`${apiURL}/users/sign_out`,{
        "headers":{
            "Authorization": token
        }
    })
    .then(res=>{
        Swal.fire({
            title: "已登出",
            icon: "success"
          })
        switchPage(loginPage)
    })
    .catch(error=>console.log(error.response))
}

function renderUserName(){
    userName.textContent = `${nickname}的待辦`
}

todoList.addEventListener("click",function(e){
    e.preventDefault();
    if(e.target.nodeName == "I"){
        let todoId = e.target.getAttribute("data-id")
        deleteTodo(todoId)
        // 執行刪除
    }
    
    // console.log("點到list了")
})

function deleteTodo(todoId){
    axios.delete(`${apiURL}/todos/${todoId}`,{
        "headers":{
            "Authorization": token
        }
    })
    .then(res=>{
        getTodo()
        // getTodosOnclicked()
        // renderTodo(todosOnclicked)
    })
    .catch(error=>console.log(error.response))
}


// 改變狀態

todoList.addEventListener("click",function(e){
    e.preventDefault();
    let todoId = ""
    if(e.target.nodeName == "INPUT"){
        todoId = e.target.getAttribute("data-id")
    }
    toggleTodo(todoId)
})

function toggleTodo(todoId){
    axios.patch(
        `${apiURL}/todos/${todoId}/toggle`,
        {},
        {
            "headers":{
                "Authorization": token
            }
        })
    .then(res=>getTodo())
    .catch(error=>console.log(error.response))
}

// 顯示未完成項目

function renderUncheckedNum(){
    let uncheckedTodos = todos.filter((item)=>item.completed_at == null)
    showUncheckedNum.textContent = `${uncheckedTodos.length}個待完成項目`
}

// 刪除已完成

deleteCheckedTodosBtn.addEventListener("click",function(e){
    deleteCheckedTodos()
})


function deleteCheckedTodos(){
    let checkedTodos = todos.filter((item)=>item.completed_at !== null)
    checkedTodos.forEach((item)=>{
        let todoId = item.id
        deleteTodo(todoId)
    })
}

// tabs

tabs.addEventListener("click",function(e){
    // console.log(e.target.getAttribute("id"))
    tabOnClicked = e.target.getAttribute("id")
    switchTab(tabOnClicked)
    getTodosOnclicked()
    renderTodo(todosOnclicked)
    // renderTabTodos(tabOnClicked)
   
})

function switchTab(tabOnClicked){
    tabAll.classList.remove("tab_active")
    tabUnchecked.classList.remove("tab_active")
    tabChecked.classList.remove("tab_active")

    if(tabOnClicked === "tab_all"){
        tabAll.classList.add("tab_active")
    }else if(tabOnClicked === "tab_unchecked"){
        tabUnchecked.classList.add("tab_active")
    }else if(tabOnClicked === "tab_checked"){
        tabChecked.classList.add("tab_active")
    }
}


function getTodosOnclicked(){
    if(tabAll.classList.contains("tab_active")){
        todosOnclicked = todos
    }
    if(tabUnchecked.classList.contains("tab_active")){
        todosOnclicked = todos.filter((item)=>
            item.completed_at == null
        )
    }
    if(tabChecked.classList.contains("tab_active")){
        todosOnclicked = todos.filter((item)=>
            item.completed_at !== null
        )
    }
}

// 修改待辦(?)

// let checkedTodos = todos.filter((item)=>item.completed_at !== null)
//     console.log(checkedTodos)