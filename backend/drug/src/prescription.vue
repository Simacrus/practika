<script>
    export default {
        data() {
            return {
                token_user: `${localStorage.getItem('token')}`,
                id_prescription: '',
                drug_name: '',
                days: '',
                start_date: '',
                how_much_in_day: ''
            }
        },

        created: function () {
            this.GetDrugss();

            //настройка setTimeout
            //внутри - перебор drugs
        },
        methods: {
            getRest(drug) {
                console.log(drug)

            },
            Logout() {
                const token = localStorage.getItem('token');
                const res = fetch(`http://localhost:5000/api/logout/?token_user=${token}`, {
                    method: 'Get',
                    headers: {
                        'Content-Type': 'application/json'
                    },


                })
                localStorage.removeItem("token");
                //localStorage.setItem("token", null);
                res.then(res => res.text()).then(res => alert(res))
            }
            ,

            GetDrugs() {
                let self = this;
                const token = localStorage.getItem('token');
                const res = fetch(`http://localhost:5000/api/drugs/prescriptions` + new URLSearchParams({
                    token_user: token
                }), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                })


                res.then(res => res.json()).then(res => { console.log(res); self.drugs = res })

            },


            CreateDrug() {
                let self = this;
                const token = localStorage.getItem('token');
                const res = fetch(`http://localhost:5000/api/CreateTimer`, {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        id_timer: this.id_timer,
                        timer_name: this.timer_name,
                        timer_runnig_time: this.timer_runnig_time,
                        token_user: token,
                    })

                })


                res.then(res => res.json()).then(res => self.drugs.push(res))


            },
            //// метод остановки таймер

            Pause(id_timer) {
                const token = localStorage.getItem('token');
                const res = fetch(`http://localhost:5000/api/Pause/${id_timer}`, {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        token_user: token,
                    })

                })
                localStorage.removeItem("token");

                res.then(res => res.text()).then(res => alert(res))
            },

            // Метод старта таймера

            Resume(id_timer) {
                const token = localStorage.getItem('token');
                const res = fetch(`http://localhost:5000/api/Resume/${id_timer}`, {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        token_user: token,
                    })

                })
                localStorage.removeItem("token");

                res.then(res => res.text()).then(res => alert(res))
            },
            //список таймера
            ListTimer: {
                List() {
                    const token = localStorage.getItem('token');
                    const res = fetch(`http://localhost:5000/api/CreateTimer/?token_user=${token}`, {
                        method: 'Post',
                        headers: {
                            'Content-Type': 'application/json'
                        },

                        body: JSON.stringify({
                            timer_name: this.timer_name,
                            timer_runnig_time: this.timer_runnig_time
                        })

                    })
                    localStorage.removeItem("token");

                    res.then(res => res.text()).then(res => alert(res))
                }
            },
        }
    }
</script>

<template>
  <h1 class="text-info">Таблетосы</h1>
    <table class="table table-dark">
        <thead>
            <tr>
                <th scope="col">id</th>
                <th scope="col">Название</th>
                <th scope="col">Кол-во дней</th>
                <th scope="col">Сколько раз в день</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">1</th>
                <td v-for="items in Drugs"></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
            </tr>
        </tbody>
    </table>
</template>

<style>
    body {
        background-image: url('https://sun9-west.userapi.com/sun9-37/s/v1/ig2/Lf6zyKrKKtnxfqVpbR-kcrjEB-lrHpp6YaDSxh2cL1X4tSRHUaSYQuXceF_CsEiIKeYQwu9jZaEUPBuisSkLvTjd.jpg?size=1280x720&quality=96&type=album');
        background-size: cover;
    }

</style>

