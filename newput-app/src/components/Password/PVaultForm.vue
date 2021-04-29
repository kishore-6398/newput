<template>
    <div id="pVaultForm">
        <div class="formCard">
            <div class="formCardTitle">
                Create New Login
            </div>
            <div class="hr"></div>
            <div class="mb-3">
                <label for="vaultUname" class="form-label">User Name</label>
                <input type="text" v-model = "vault.vaultData.vaultName" class="form-control" id="vaultUname">
            </div>
            <div class="mb-3">
                <label for="vaultPassword" class="form-label">Password</label>
                <input type="text" v-model = "vault.vaultData.vaultPassword" class="form-control" id="vaultPassword">
            </div>
            <div class="mb-3">
                <label for="vaultAddress" class="form-label">Website Address</label>
                <input type="url" v-model = "vault.vaultData.vaultUrl" class="form-control" id="vaultAddress" placeholder="https://www.example.com">
            </div>
            <div class="mb-3">
                <label for="vaultTag" class="form-label">Tag / Title</label>
                <input type="text" v-model = "vault.vaultData.vaultTag" class="form-control" id="vaultTag">
            </div>
            <div class="savebtngroup">
                <router-link to="/pvault" class="btn btn-secondary backbtn">Go Back</router-link>
                <button class="btn btn-primary savebtn" @click="submitVault" >Save To Vault</button>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';

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

        function submitVault(){
            store.dispatch('submitVaultDataToDb', vault.vaultData);
        }

        return{
            vault,
            submitVault
        };
    }
}
</script>

<style scoped>
    #pVaultForm{
        height: 100vh;
        display: flex;
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
        width: auto;
        margin-left: 10px;;
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