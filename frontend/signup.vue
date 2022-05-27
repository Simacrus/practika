<script>
    export default {
        data() {
            return {
                FirstName: '',
                LastName: '',
                login: '',
                password: ''
            }
        },
        emits: ['login'],
        methods: {
            SignUp() {
                alert("Registered");
                const res = fetch('http://localhost:5000/api/registration', {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json'
                    },


                    body: JSON.stringify({
                        FirstName: this.FirstName,
                        LastName: this.LastName,
                        login: this.login,
                        password: this.password

                    })
                })
                res.then().catch()
                console.log(res)

            }
        }
    }
    
</script>

<template>
<form>
    <div class="col-sm-3 mx-auto mt-5">

        <div class="mb-3">
            <input v-model="FirstName" type="FirstName" class="form-control" id="FirstName" placeholder="Имя" aria-describedby="FirstName">
        </div>

        <div class="mb-3">
            <input v-model="LastName" type="LastName" class="form-control" id="LastName" placeholder="Фамилия" aria-describedby="LastNmae">
        </div>

        <div class="mb-3">
            <input v-model="login" type="login" class="form-control" id="login" placeholder="Логин" aria-describedby="login">
        </div>

        <div class="mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="Пароль" id="password">
        </div>

        <button @click="SignUp" type="button" class="btn btn-primary">Зарегистрироваться</button>
        <p @click="$emit('login')" class="about">Есть аккаунт? Войдите!</p>
       
    </div>
</form>
</template>

<style>

    .about {
        text-decoration: none;
        color: #ffffff;
        padding: 20px;
        font: 20px/40px Roboto, sans-serif;
        position: relative;
        transition: all .2s ease;
    }

        .about:after {
            content: '';
            position: absolute;
            border: 10px solid darkorange;
            border-top-color: transparent;
            border-left-color: transparent;
            border-right-color: transparent;
            left: calc(50% - 5px);
            transition: all .2s ease;
            bottom: -5px;
            opacity: 0;
        }

        .about:hover {
            color: #57dfeb;
            text-shadow: 0 0 1px darkorange;
        }

    body {
        background-image: url('https://sun9-west.userapi.com/sun9-37/s/v1/ig2/Lf6zyKrKKtnxfqVpbR-kcrjEB-lrHpp6YaDSxh2cL1X4tSRHUaSYQuXceF_CsEiIKeYQwu9jZaEUPBuisSkLvTjd.jpg?size=1280x720&quality=96&type=album');
        background-size: cover;
    }

    .about {
        cursor: pointer;
    }

</style>

