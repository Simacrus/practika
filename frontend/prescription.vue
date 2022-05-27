<script>
    export default {
        name: 'drugs',
        components: {
            prescriptions
        };
        data() {
            return {
                id_prescription: '',
                drug_name: '',
                days: '',
                start_date: '',
                how_much_in_day: ''
            }
        },



            methods: {
                GetDrugs() {
                    const res = fetch('http://localhost:5000/api/drugs/prescriptions', {
                        method: 'Get',
                        headers: {
                            'Content-Type': 'application/json'
                        },

                        })
                    })
                    res.then(res => res.text()).then(res=>console.log(res)).catch()
                    

                }
            }
        }
        mounted() {
            this.GetDrugs();
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

