<script>
    import SignUp from "./signup.vue";
    import SignIn from "./signin.vue";
    import Prescription from "./prescription.vue";

    export default {
    components: { SignIn,SignUp, Prescription },
    data() {
        return {
            Step: "Mode-SignUp"
        }
    },

}
</script>

<template>
    <SignIn @enter='Step="Mode-Prescription"' v-if='Step=="Mode-SignIn"'/>
    <SignUp @login='Step="Mode-SignIn"' v-if='Step=="Mode-SignUp"'/>
    <Prescription  v-if='Step=="Mode-Prescription"' />
</template> 

<style>

</style>
