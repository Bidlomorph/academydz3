<template>
    <div class="container loginform">
    <form>
        <div class="form-group">
            <label>Авторизация</label>
            <input type="text" v-model.lazy="authorization.usernameInput" placeholder="Имя пользователя">
        </div>
        <div class="form-group">
            <input type="text" v-model.lazy="authorization.passwordInput" placeholder="Пароль">
        </div>
            <button type="button" v-on:click="verify()">Войти</button>
    </form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
        data(){
            return{
                counter: '',
                info: null,
                authorization: {
                    usernameInput: null,
                    passwordInput: null,
                },
                phone: '',
                token: localStorage.getItem('token'),
            }
        },
        beforeMount() {
        axios({
            method: 'get',
            url: 'https://jsonplaceholder.typicode.com/users/',
            params: {
                phone: this.token
            }
        })
            .then(response => {
                this.token = response.data[0]
                if(localStorage.getItem('token') !== null){
                    this.$emit('redirectToTodo')
                }
            })
    },
        methods: {
            verify: function(){
                if(this.authorization.usernameInput != null && this.authorization.passwordInput != null){
                    axios({
                        method: 'get',
                        url: 'https://jsonplaceholder.typicode.com/users/',
                        params: {
                            username: this.authorization.usernameInput,
                            id: this.authorization.passwordInput,
                        }
                    })// eslint-disable-next-line no-console
                        .then(response => {

                            this.info = response.data[0]
                            // eslint-disable-next-line no-console
                            if (this.info == undefined){
                                alert('Неверное имя пользователя или пароль!')
                            }
                            else{
                                this.vizovInfo()
                            }
                        })
                }
                else if(this.authorization.usernameInput == null && this.authorization.passwordInput != null){
                    alert('Ввведите имя пользователя!')
                }
                else if(this.authorization.passwordInput == null && this.authorization.usernameInput != null){
                    alert('Ввведите пароль!')
                }
                else {
                    alert('Ввведите имя пользователя и пароль!')
                }
            },
            vizovInfo: function () {
                if (this.info.username == this.authorization.usernameInput &&
                    this.info.id == this.authorization.passwordInput){
                    localStorage.setItem('token', this.info.phone)
                    this.$emit('redirectToTodo')
                }
            }
        }

}



</script>

<style scoped>
    .loginform{
        display: flex;
        justify-content: center;
        border: 1px solid #A5A5A5;
        border-radius: 5px;
        max-width: 320px;
        padding: 20px;
    }
    .form-group label{
        font-size: 20px;
        font-weight: bold;
        padding: 10px;
    }
    .loginform input{
        border: 1px solid #A5A5A5;
        border-radius: 5px;
        width: 200px;
        height: 35px;
        padding: 5px;
        outline: none;
    }
    .loginform button{
         background-color: royalblue;
         color: white;
         width: 100px;
         height: 40px;
         border: 1px solid royalblue;
         border-radius: 10px;
        transition-duration: 0.4s;
        outline: none;
     }
    .loginform button:hover{
        background-color: white;
        color: royalblue;
        border: 1px solid royalblue;
        border-radius: 10px;
    }
</style>