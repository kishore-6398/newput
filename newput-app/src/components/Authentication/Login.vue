<template>
    <div id="loginView">
        <div class="LoginCard">
            <div class="loginHeader">
                <h4>Newput App Login</h4>
            </div>
            <div>
                <label for="loginEmail" class="form-label">Email</label>
                <input v-model="v$.email.$model" type="email" class="form-control" id="loginEmail">
                <span v-if="v$.email.$error">
                    <div id="errorText">{{ v$.email.$errors[0].$message }}</div>
                </span>
            </div>
            <div>
                <label for="loginPassword" class="form-label">Password</label>
                <input v-model="v$.password.$model" type="password" class="form-control" id="loginPassword">
                <span v-if="v$.password.$error">
                    <div id="errorText">{{ v$.password.$errors[0].$message }}</div>
                </span>
            </div>
            <div>
                <button @click="loginUser" class="btn btn-primary loginBtn">Login</button>
            </div>
            <div class="loginFooter">
                <span>Doesn't have an account yet? </span>
                <router-link to="/signup" class="link">Sign Up</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, computed } from 'vue';
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

        return{
            loginDetails,
            loginUser,
            v$
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
    }
    .loginHeader{
        text-align: center;
    }
    .LoginCard .loginFooter{
        margin-bottom: 10px;
    }
    .link{
        text-decoration: none;
    }

    @media (max-width: 850px){
        .LoginCard{
            width: 55%;
        }
    }

    @media (max-width: 550px){
        #loginView{
            height: 93vh;
        }
        .LoginCard{
            width: 100%;
            margin: auto 20px;
        }
    }
    
    
</style>