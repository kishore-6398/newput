<template>
    <div class="forgotpasswordView">
        <div class="fpCard">

            <div class="fpheader">
                Forgot your password
            </div>

            <div>
                <label for="fpEmail" class="form-label">Enter your email</label>
                <input v-model="v$.email.$model" type="email" class="form-control" id="fpEmail" placeholder="example@gmail.com">
                <span v-if="v$.email.$error">
                    <div id="errorText">{{ v$.email.$errors[0].$message }}</div>
                </span>
            </div>

            <div>
                <button class="btn forgotbtn" @click="forgotPassword" :disabled="v$.email.$error">Request reset link</button>
            </div>

            <div class="btlwrapper">
                <router-link to="/login" class="btl">Back to login</router-link>
            </div>

        </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    setup(){
        const store = useStore();

        var fpData = reactive({
            data: {
                email: ''
            }
        });

        var rules = computed(() => {
            return{
                email: { required, email }
            }
        });

        var v$ = useVuelidate(rules, fpData.data);

        function forgotPassword(){
            this.v$.$validate();    
            if(!this.v$.$error){
                store.dispatch('forgotPassword', fpData.data);
            }
        }

        return{
            v$,
            forgotPassword
        };
    }
}
</script>

<style>
    .forgotpasswordView{
        height: 100vh;
        display: flex;
        background-color: #ffcfdf;
        background-image: linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%);
    }
    .fpCard{
        padding: 20px;
        width: 40%;
        box-shadow: 0 2px 25px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        margin: auto;
        background-color: white;
    }
    .fpCard>div{
        margin-bottom: 20px;
    }
    .fpheader{
        text-align: center;
        font-weight: bold;
        font-size: 24px;
    }
    .forgotbtn{
        width: 100%;
        border-radius: 20px;
        background-color: #ffcfdf;
        background-image: linear-gradient(315deg, #ffcfdf 0%, #b0f3f1 74%);
        color: rgb(70, 70, 70);
        outline: none;
        border: none;
        font-weight: bold;
    }
    .forgotbtn:hover{
        color: rgb(70, 70, 70);;
        background-color: #ffcfdf;
        background-image: linear-gradient(315deg, #ffdee9 0%, #cbfdfc 74%);
    }
    .forgotbtn:focus{
        outline: none;
        border: none;
        box-shadow: 0 0 0 3px rgb(192, 253, 240);
    }
    .fpCard .btlwrapper{
        text-align: center;
        margin-bottom: 10px;
    }
    .btl{
        text-decoration: none;
    }

    @media (max-width: 968px){
        .fpCard{
            width: 50%
        }
    }

    @media (max-width: 768px){
        .fpCard{
            width: 60%
        }
    }

    @media (max-width: 600px){
        .fpCard{
            width: 90%
        }
    }
</style>