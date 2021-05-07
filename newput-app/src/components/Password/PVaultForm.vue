<template>
    <div id="pVaultForm">
        <div class="formCard">
            <div class="formCardTitle">
                Create New Login
            </div>
            <div class="hr"></div>
            <div class="mb-3">
                <label for="vaultUname" class="form-label">User Name</label>
                <input type="text" v-model = "v$.vaultName.$model" class="form-control" id="vaultUname">
                <span v-if="v$.vaultName.$error">
                    <div id="errorText">{{ v$.vaultName.$errors[0].$message }}</div>
                </span>
            </div>
            <div class="mb-3">
                <label for="vaultPassword" class="form-label">Password</label>
                <input type="text" v-model = "v$.vaultPassword.$model" class="form-control" id="vaultPassword">
                <span v-if="v$.vaultPassword.$error">
                    <div id="errorText">{{ v$.vaultPassword.$errors[0].$message }}</div>
                </span>
            </div>
            <div class="mb-3">
                <label for="vaultAddress" class="form-label">Website Address</label>
                <input type="url" v-model = "v$.vaultUrl.$model" class="form-control" id="vaultAddress" placeholder="https://www.example.com">
                <span v-if="v$.vaultUrl.$error">
                    <div id="errorText">{{ v$.vaultUrl.$errors[0].$message }}</div>
                </span>
            </div>
            <div class="mb-3">
                <label for="vaultTag" class="form-label">Tag / Title</label>
                <input type="text" v-model = "v$.vaultTag.$model" class="form-control" id="vaultTag">
                <span v-if="v$.vaultTag.$error">
                    <div id="errorText">{{ v$.vaultTag.$errors[0].$message }}</div>
                </span>
            </div>
            <div class="savebtngroup">
                <router-link to="/pvault" class="btn btn-secondary backbtn">Go Back</router-link>
                <button class="btn btn-primary savebtn" @click="submitVault" >Save To Vault</button>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import useVuelidate from '@vuelidate/core';
import { required, url } from '@vuelidate/validators';

export default {
    setup(){
        const store = useStore();

        var vault = reactive({
            vaultData: {
                vaultName: '',
                vaultPassword: '',
                vaultUrl: '',
                vaultTag: ''
            }
        });

        var rules = computed(() => {
            return{
                vaultName: { required },
                vaultPassword: { required },
                vaultUrl: { url },
                vaultTag: { required }
            }
        });

        var v$ = useVuelidate(rules, vault.vaultData);

        function submitVault(){
            this.v$.$validate();    
            if(!this.v$.$error){
                store.dispatch('submitVaultDataToDb', vault.vaultData);
            }
            else{
                console.log(this.v$.$errors);
            }
        }

        return{
            vault,
            submitVault,
            v$
        };
    }
}
</script>

<style scoped>
    #pVaultForm{
        height: 100vh;
        display: flex;
    }
    #errorText{
        color: red;
    }
    .formCard{
        margin: auto;
        border-radius: 20px;
        padding: 20px;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.12);
        width: 50%;
    }
    .formCardTitle{
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        font-style: italic;
    }
    .hr{
        width: 100%;
        height: 1px;
        margin: 20px 0;
        background-color: rgb(185, 185, 185);
    }
    .savebtngroup{
        text-align: right;
        margin-top: 5px;
    }
    .savebtn{
        margin-left: 10px;
    }

    @media (max-width: 768px){
        #pVaultForm{
            height: auto;
        }
        .formCard{
            width: 90%;
            margin: 10% 5%;
        }
        .savebtngroup{
            display: flex;
        }
        .savebtn, .backbtn{
            width: 50%;
        }
    }
</style>