<script>
    export default {
        data() {
            return {
                login: '',
                password: ''
            }
        },
        emits:['enter'],

        methods: {
            SignIn() {
                let currentObject = this
                //alert("Loggined");
                const res = fetch('http://localhost:5000/api/login', {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json'
                    },


                    body: JSON.stringify({
                        login: this.login,
                        password: this.password

                    })
                })
                res.then(res => res.json()).then(function (res) {
                    localStorage.setItem("token", res.token_user)
                    currentObject.$emit('enter')
                })
            }
            },
    }
</script>

<template>
<form>
        <div class="col-sm-3 mx-auto mt-5">

            <div class="mb-3">
                <input v-model="login" type="login" class="form-control" id="login" placeholder="Логин" aria-describedby="login">
            </div>

            <div class="mb-3">                                                                                                                                                                                                                                                                                                                                                  
                <input v-model="password" type="password" class="form-control" placeholder="Пароль" id="password">
            </div>

            <button @click="SignIn" type="button" class="btn btn-primary">Войти</button>
        </div>
</form>
</template>

