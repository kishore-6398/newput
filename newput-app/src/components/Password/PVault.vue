<template>
    <div>
        <div class="header-desktop">
            <div class="search-container">
                <input type="search" v-model="vaultsearch" class="form-control" id="searchPasswords" placeholder="Search passwords..."/>
            </div>
            <div>
                <h4>Password Vault</h4>
            </div>
            <router-link to="/pvault/form" class="btn btn-info">Create New Login</router-link>
        </div>
        <div class="header-mobile">
            <div>
                <img src="../../assets/pvault.png" class="icon" width="40" height="40" alt="pvault icon">
                <h4>Password Vault</h4>
            </div>
            <div class="search-container">
                <input type="search" v-model="vaultsearch" class="form-control" id="searchPasswords" placeholder="Search passwords..."/>
            </div>
            
                <router-link to="/pvault/form"><span class="material-icons newvault-icon">add</span></router-link>
        </div>

        <div class="individual-vault row">
            <app-IPVault v-for="temp in vaultData" :key="temp.id" :vault = "temp" />
        </div>
    </div>
</template>

<script>
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import IPVault from './IPVault.vue';

export default {
    components: {
        'app-IPVault': IPVault
    }, 
    setup(){
        const store = useStore();
        var vaultsearch = ref('');

        onMounted(() => {
            store.dispatch('getVaultDataFromDb');
        });

        var vaultData = computed(() => {
            return store.getters.getVaultData.filter(temp => {
                return temp.vaultName.toLowerCase().match(vaultsearch.value.toLowerCase()) || 
                temp.vaultPassword.toLowerCase().match(vaultsearch.value.toLowerCase()) || 
                temp.vaultUrl.toLowerCase().match(vaultsearch.value.toLowerCase()) || 
                temp.vaultTag.toLowerCase().match(vaultsearch.value.toLowerCase());
            });
        });

        return{
            vaultData,
            vaultsearch
        };
    }
}
</script>

<style>
    .individual-vault{
        margin: 20px;
        -webkit-tap-highlight-color: transparent !important;
    }
    .header-desktop{
        box-shadow: 0 3px 25px rgba(0, 0, 0, 0.12);
        padding: 15px 35px;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        position: sticky;
        top:0;
        background: rgb(255, 255, 255);
    }
    .header-mobile{
        display: none;
    }
    #searchPasswords{
        border-radius: 20px;
    }
    .icon{
        display:none;
    }

    @media(max-width: 850px){
        .individual-vault{
            margin: 20px 20px 70px 20px;
            -webkit-tap-highlight-color: transparent !important;
        }
        .header-desktop{
            display: none;
        }
        .header-mobile{
            display: block;
            box-shadow: 0 3px 25px rgba(0, 0, 0, 0.12);
            padding: 15px 35px;
            display: flex;  
            justify-content: space-between;
            align-items: baseline;
            background: rgb(255, 255, 255);
            position: static;
        }
        .icon{
            display:none;
        }
        .newvault-icon{
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgb(213, 2, 255);
            color:white;
            border-radius: 50%;
            width: 55px;
            height: 55px;
            font-size: 55px;
            box-shadow: 0 5px 40px 5px rgba(0, 0, 0, 0.12);
        }
    }

    @media(max-width: 450px){
        .header-mobile{
            justify-content: space-between;
            align-items:stretch;
        }
        .icon{
            display:block;
            border-radius: 15px;
        }
        h4{
            display: none;
        }
    }
</style>