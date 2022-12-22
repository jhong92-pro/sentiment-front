// import '@fortawesome/fontawesome-free/js/all.min.js'
// import "../scss/style.scss"

import checkUser from './checkUser';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class Login{

    loginButtonEl;
    userIdEl;
    userPwEl;

    resetElement(){
        this.assignElement()
        this.addEvent()
    }

    assignElement(){
        
        const root = document.getElementById("root");
        root.innerHTML = `
        <div class="row d-flex justify-content-center mt-5">
        <div class="col-md-6">
            <div class="form-outline mb-4">
                <input type="text" name="userId" placeholder="Email" class="form-control" >
            </div>
            <div class="form-outline mb-4">
                <input type="password" name="userPw" placeholder="Password" class="form-control" >
            </div>
            <div class="col-md-12 text-center">
            <button class="btn btn-primary btn-block mb-4">Login</button>
            </div>
        </div>
        </div>
        `;
        this.loginButtonEl = root.getElementsByTagName("button")[0]
        this.userIdEl = root.querySelector('input[name="userId"]')
        this.userPwEl = root.querySelector('input[name="userPw"]')
    }

    initStorage(storage){
        this.storage = storage;
    }

    addEvent(){
        this.loginButtonEl.addEventListener('click', this.onclickLogin.bind(this))
    }

    onclickLogin(){
        const userId = this.userIdEl.value;
        const userPw = this.userPwEl.value;
        if (checkUser(userId,userPw)){
            console.log(localStorage.getItem("sentimentLocal"))
            const sentimentLocal = {
                ...JSON.parse(localStorage.getItem("sentimentLocal")),
                'userId':userId,
                'userPw':userPw
            }
            
            localStorage.setItem("sentimentLocal", JSON.stringify(sentimentLocal))
            window.location.hash = '#/'
        }else{
            localStorage.removeItem('userId')
            localStorage.removeItem('userPw')
            alert("아이디나 비밀번호를 확인해주세요")
        }
    }

}

export default Login;