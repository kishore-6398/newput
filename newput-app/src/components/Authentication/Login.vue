<template>
    <div id="loginView">
        <div class="LoginCard">
            <div class="loginHeader">
                <img src="../../assets/newputlogosmall.png" class="newputlogo" alt="newput logo small">
                <h4 class="logintitle">Newput App Login</h4>
            </div>
            <div>
                <label for="loginEmail" class="form-label">Email</label>
                <input v-model="v$.email.$model" type="email" class="form-control" id="loginEmail">
                <span v-if="v$.email.$error">
                    <div id="errorText">{{ v$.email.$errors[0].$message }}</div>
                </span>
            </div>
            <div class="loginPassWrapper">
                <label for="loginPassword" class="form-label">Password</label>
                <div class="pwd">
                    <input v-model="v$.password.$model" type="password" class="form-control" id="loginPassword">
                    <span v-if="toggle" @click="togglepassword" class="material-icons md-eye">visibility_off</span>
                    <span v-else @click="togglepassword" class="material-icons md-eye">visibility</span>
                </div>
                <span v-if="v$.password.$error">
                    <div id="errorText">{{ v$.password.$errors[0].$message }}</div>
                </span>
            </div>
            <div class="fplinkwrapper">
                <router-link to="/forgotpassword" class="fplink">Forgot Password?</router-link>
            </div>
            <div>
                <button @click="loginUser" class="btn loginBtn">Login</button>
            </div>
            <div class="loginFooter">
                <span>Doesn't have an account yet? </span>
                <router-link to="/signup" class="link">Sign Up</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, computed, ref } from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';

export default {
    setup() {
        const store = useStore();
        var loginDetails = reactive({
            data: {
                email: '',
                password: ''
            }
        });

        var rules = computed(() => {
            return{
                email: { required, email },
                password: { 
                    required,
                    minLength: minLength(8)
                }
            }
        });

        var v$ = useVuelidate(rules, loginDetails.data);

        function loginUser(){
            this.v$.$validate();    
            if(!this.v$.$error){
                store.dispatch('loginUserInFb', loginDetails.data);
            }
        }

        var toggle = ref(true);

        function togglepassword(){
            var x = document.getElementById("loginPassword");
            if (x.type === "password") {
                x.type = "text";
                toggle.value = false;
            } else {
                x.type = "password";
                toggle.value = true;
            }
        }

        return{
            loginDetails,
            loginUser,
            v$,
            togglepassword,
            toggle
        };
    }
}
</script>

<style>
    #loginView{
        height: 100vh;
        display: flex;
        background-color: #e288f9;
        background-image: linear-gradient(315deg, #e288f9 0%, #ffc988 74%);
    }
    .LoginCard{
        width: 35%;
        margin: auto;
        padding: 20px;
        box-shadow: 0 2px 25px rgba(0, 0, 0, 0.2);
        background-color: white;
        border-radius: 25px;
    }
    .LoginCard>div{
        margin-bottom: 20px;
    }
    .loginBtn{
        width: 100%;
        border-radius: 20px;
        background-color: #e288f9;
        background-image: linear-gradient(315deg, #e288f9 0%, #ffc988 74%);
        color: white;
        outline: none;
        border: none;
        font-weight: bold;
    }
    .loginBtn:hover{
        color: white;
        background-color: #e288f9;
        background-image: linear-gradient(315deg, #e79cfa 0%, #fdd4a1 74%);
    }
    .loginBtn:focus{
        outline: none;
        border: none;
        box-shadow: 0 0 0 3px rgb(255, 218, 255);
    }
    .loginHeader{
        text-align: center;
        display: flex;
        justify-content: center;
    }
    .logintitle{
        margin-bottom: 0;
        line-height:unset;
    }
    .LoginCard .loginFooter{
        margin-bottom: 10px;
    }
    .link{
        text-decoration: none;
    }
    .LoginCard .loginPassWrapper{
        margin-bottom: 5px;
    }
    .fplinkwrapper{
        display: flex;
    }
    .fplink{
        text-decoration: none;
    }
    .pwd{
        display: flex;
        align-items: center;
    }
    .md-eye{
        cursor: pointer;
        color: rgb(82, 82, 82);
        margin-left: 8px;
    }

    @media (max-width: 850px){
        .LoginCard{
            width: 55%;
        }
    }

    @media (max-width: 550px){
        .LoginCard{
            width: 100%;
            margin: auto 20px;
        }
    }
</style>