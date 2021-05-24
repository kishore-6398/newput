<template>
    <div id="signupView">
        <div class="SignupCard">
            <div class="signupHeader">
                <img src="../../assets/newputlogosmall.png" class="newputlogo" alt="newput logo small">
                <h4 class="signuptitle">Newput App Sign Up</h4>
            </div>
            <div>
                <label for="signupName" class="form-label">Username</label>
                <input type="text" v-model="v$.username.$model" class="form-control" id="signupName">
                <span v-if="v$.username.$error">
                    <div id="errorText">{{ v$.username.$errors[0].$message }}</div>
                </span>
            </div>
            <div>
                <label for="signupEmail" class="form-label">Email</label>
                <input type="email" v-model="v$.email.$model" class="form-control" id="signupEmail">
                <span v-if="v$.email.$error">
                    <div id="errorText">{{ v$.email.$errors[0].$message }}</div>
                </span>
            </div>
            <div>
                <label for="signupPassword" class="form-label">Password</label>
                <div class="pwd">
                    <input type="password" v-model="v$.password.$model" class="form-control" id="signupPassword">
                    <span v-if="toggle" @click="togglepassword" class="material-icons md-eye">visibility_off</span>
                    <span v-else @click="togglepassword" class="material-icons md-eye">visibility</span>
                </div>
                <span v-if="v$.password.$error">
                    <div id="errorText">{{ v$.password.$errors[0].$message }}</div>
                </span>
            </div>
            <div>
                <button @click="signupUser" class="btn signupBtn">Sign Up</button>
            </div>
            <div class="signupFooter">
                <span>Already have an account? </span>
                <router-link to="/login" class="link">Login</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, computed,ref } from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

export default {
    setup() {
        const store = useStore();
        var signupDetails = reactive({
            data: {
                username: '',
                email: '',
                password: ''
            }
        });

        var rules = computed(() => {
            return{
                username: {
                    required,
                    minLength: minLength(6)
                },
                email: { required, email },
                password: { 
                    required,
                    minLength: minLength(8)
                }
            }
        });

        var v$ = useVuelidate(rules, signupDetails.data);

        function signupUser(){
            this.v$.$validate();    
            if(!this.v$.$error){
                store.dispatch('signupUserInFb', signupDetails.data);
            }
        }

        var toggle = ref(true);

        function togglepassword(){
            var x = document.getElementById("signupPassword");
            if (x.type === "password") {
                x.type = "text";
                toggle.value = false;
            } else {
                x.type = "password";
                toggle.value = true;
            }
        }

        return{
            signupDetails,
            signupUser,
            v$,
            togglepassword,
            toggle
        };
    }
}
</script>

<style>
    #signupView{
        height: 100vh;
        display: flex;
        background-color: #09c7fb;
        background-image: linear-gradient(315deg, #09c7fb 0%, #93fb9d 74%);
    }
    .SignupCard{
        width: 35%;
        margin: auto;
        padding: 20px;
        box-shadow: 0 2px 25px rgba(0, 0, 0, 0.2);
        background-color: white;
        border-radius: 25px;
    }
    .SignupCard>div{
        margin-bottom: 20px;
    }
    .signupHeader{
        text-align: center;
        display: flex;
        justify-content: center;
    }
    .signuptitle{
        margin-bottom: 0;
        line-height: unset;
    }
    .SignupCard .loginFooter{
        margin-bottom: 10px;
    }
    .signupBtn{
        width: 100%;
        border-radius: 20px;
        background-color: #09c7fb;
        background-image: linear-gradient(315deg, #09c7fb 0%, #93fb9d 74%);
        color: white;
        outline: none;
        border: none;
        font-weight: bold;
    }
    .signupBtn:hover{
        color: white;
        background-color: #09c7fb;
        background-image: linear-gradient(315deg, #31cdf8 0%, #a3ffac 74%);
    }
    .signupBtn:focus{
        outline: none;
        border: none;
        box-shadow: 0 0 0 3px rgb(169, 250, 232);
    }

    @media (max-width: 850px){
        .SignupCard{
            width: 55%;
        }
    }
    @media (max-width: 550px){
        .SignupCard{
            width: 100%;
            margin: auto 20px;
        }
    }
</style>