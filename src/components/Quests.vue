<template>
    <div class="todo">
        <div class="header container-fluid row">
            <div class="col-11 todoname">
                <a>ToDo-List</a>
                <a>{{token.name}}</a>
            </div>
            <div class="col-1">
                <button type="button" v-on:click="exit()">Выход</button>
            </div>
        </div>
        <div class="todos">
            <div class="addToDo">
                <input type="text" v-model.lazy="todoList.todoTitle" placeholder="Имя дела">
                <input type="text" v-model.lazy="todoList.todoDesc" placeholder="Описание дела">
                <button v-on:click="addtodo()">+</button>
            </div>
    </div>
        <div class="stats">
            <h3>Текущие задачи:</h3>
            <div class="task">
                <div v-bind:class="{ active: tasks.active }" v-for="(task, index) in tasks" :key="(task, index)">
                    <h3>{{tasks[index].title}}</h3>
                    <p>{{tasks[index].desc}}</p>
                    <button v-if="tasks.title !== null" class="taskDelete" v-on:click="taskDelete(index)">Удалить дело</button>
                    <button v-if="tasks.title !== null" class="taskComlited" v-on:click="taskComlited(index)">Дело сделано</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                tasks: [{
                    title: null,
                    desc: null,
                    active: null,
                }],
                todos: '',
                token: localStorage.getItem('token'),
                todoList: {
                    todoTitle: null,
                    todoDesc: null
                },
                activeColor: 'green',
                mystore: null,
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
                    this.todos = response.data
                })
            if (localStorage.getItem('tasks') !== null){
                this.tasks = JSON.parse(localStorage.getItem('tasks'))
            }
        },
        methods: {
            exit: function () {
                localStorage.removeItem('token')
                this.$emit('redirectToLogin')
            },
            addtodo: function () {
                if (this.todoList.todoTitle == undefined){
                    alert('Заполните поле имени дела!')
                }
                else {
                    this.tasks.push({
                        title: this.todoList.todoTitle,
                        desc: this.todoList.todoDesc,
                        active: false
                    })
                }
                // eslint-disable-next-line no-console
                console.log(this.tasks)
                this.todoList.todoTitle = null,
                this.todoList.todoDesc = null,
                localStorage.setItem('tasks', JSON.stringify(this.tasks))
            },
            taskDelete: function (id) {
                this.tasks.splice(id, 1);
                this.mystore = JSON.parse(localStorage.getItem('tasks'))
                //// eslint-disable-next-line no-console
                //console.log(this.mystore[id].title)
                // localStorage.removeItem('tasks',this.mystore[id])
                this.mystore.splice(id, 1)
                localStorage.setItem('tasks', JSON.stringify(this.mystore))
            },
            taskComlited: function () {
                this.tasks.active = ! this.tasks.active;
                // eslint-disable-next-line no-console
                console.log(this.tasks.active)
            }
            // Аксиос попытки поста.
            // addtodo: function () {
            //     let todoList = {
            //             todoTitle: this.todoList.todoTitle,
            //             todoDesc: this.todoList.todoDesc,
            //     }
            //     axios({
            //         method: 'post',
            //         url: 'https://jsonplaceholder.typicode.com/users/' + this.token.id,
            //         data: {todoList}
            //     })
            //         .then(response => {
            //             // eslint-disable-next-line no-console
            //             console.log(response);
            //         })
            //         .catch(error => {
            //             // eslint-disable-next-line no-console
            //             console.log(error.response)
            //         })
            //     this.getaxios()
            // },
            // getaxios: function () {
            //     axios({
            //         method: 'get',
            //         url: 'https://jsonplaceholder.typicode.com/users/'
            //     })
            //         .then(response => {
            //             // eslint-disable-next-line no-console
            //             console.log(response)
            //         })
            //         .catch(error => {
            //             // eslint-disable-next-line no-console
            //             console.log(error.response)
            //         })
            // }
        }
    }
</script>

<style scoped>
.active{
    border: 3px solid red;
}
.header{
    margin-top: -50px;
}
.todoname{
    display: flex;
    justify-content: space-between;
}
</style>