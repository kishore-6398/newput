<template>
    <div>

        <div class="header-desktop">
            <div class="search-container">
                <input type="search" v-model="vaultsearch" class="form-control" id="searchPasswords" placeholder="Search passwords..."/>
            </div>
            <div class="title">
                <h4>Password Vault</h4>
            </div>
            <router-link to="/pvault/form" class="btn btn-info">Create New Login</router-link>
        </div>

        <div class="header-mobile">
            <div class="title">
                <img src="../../assets/pvault.png" class="icon" width="40" height="40" alt="pvault icon">
                <h4>Password Vault</h4>
            </div>
            <div class="search-container">
                <input type="search" v-model="vaultsearch" class="form-control" id="searchPasswords" placeholder="Search passwords..."/>
            </div>
            
            <router-link to="/pvault/form"><span class="material-icons newvault-icon">add</span></router-link>
        </div>

        <span v-if="vaultData.length > 0">
            <div class="individual-vault row">
                <app-IPVault v-for="temp in vaultData" :key="temp.id" :vault = "temp" />
            </div>
        </span>
        <span v-else>
            <p class="noData">Sorry! No result found :(</p>
        </span>
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
        margin: 10px;
        -webkit-tap-highlight-color: transparent !important;
    }
    .header-desktop{
        box-shadow: 0 3px 25px rgba(0, 0, 0, 0.12);
        padding: 15px 25px;
        display: flex;
        position: sticky;
        top:0;
        background: rgb(255, 255, 255);
    }
    .header-mobile{
        display: none;
    }
    .title{
        margin: auto;
    }
    #searchPasswords{
        border-radius: 20px;
    }
    .icon{
        display:none;
    }

    @media(max-width: 850px){
        .individual-vault{
            margin: 10px 10px 70px 10px;
            -webkit-tap-highlight-color: transparent !important;
        }
        .header-desktop{
            display: none;
        }
        .header-mobile{
            display: block;
            box-shadow: 0 3px 25px rgba(0, 0, 0, 0.12);
            padding: 15px 25px;
            display: flex;  
            background: rgb(255, 255, 255);
            position: static;
        }
        .title{
            margin: auto 0;
        }
        .search-container{
            margin-left: auto;
        }
        .icon{
            display:none;
        }
        .newvault-icon{
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #6e72fc;
            background-image: linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%);
            color:white;
            border-radius: 50%;
            width: 55px;
            height: 55px;
            font-size: 55px;
            box-shadow: 0 5px 40px 5px rgba(0, 0, 0, 0.12);
        }
    }

    @media(max-width: 450px){
        .icon{
            display:block;
            border-radius: 15px;
        }
        .title h4{
            display: none;
        }
    }
</style>