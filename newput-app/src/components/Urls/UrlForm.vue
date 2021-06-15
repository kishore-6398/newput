<template>
    <div id="UrlFormView">
        <div class="urlformcard">
            <div class="card-title">
                Bookmark URL Form
            </div>
            <div class="hr"></div>
            <div class="mb-3">
                <label for="urlName" class="form-label">Name</label>
                <input type="text" v-model="v$.urlName.$model" class="form-control" id="urlName">
                <span v-if="v$.urlName.$error">
                    <div id="errorText">{{ v$.urlName.$errors[0].$message }}</div>
                </span>
            </div>
            <div class="mb-3">
                <label for="urlText" class="form-label">URL</label>
                <input type="url" v-model="v$.urlText.$model" class="form-control" id="urlText" placeholder="https://www.example.com">
                <span v-if="v$.urlText.$error">
                    <div id="errorText">{{ v$.urlText.$errors[0].$message }}</div>
                </span>
            </div>
            <div class="mb-3">
                <label for="urlTag" class="form-label">Tag</label>
                <input type="text" v-model="v$.urlTag.$model" class="form-control" id="urlTag">
                <span v-if="v$.urlTag.$error">
                    <div id="errorText">{{ v$.urlTag.$errors[0].$message }}</div>
                </span>
            </div>
            <div class="savebtngroup">
                <router-link to="/url" class="btn backBtn">Go Back</router-link>
                <button class="btn saveBtn" @click="submitURL">Add URL</button>
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
    setup() {
        const store = useStore();
        var urlDataObj = reactive({
            urlDetails: {
                urlName: '',
                urlText: '',
                urlTag: ''
            }
        });

        var rules = computed(() => {
            return{
                urlName: { required },
                urlText: { required, url },
                urlTag: { required }
            }
        });

        var v$ = useVuelidate(rules, urlDataObj.urlDetails);

        function submitURL(){
            this.v$.$validate();    
            if(!this.v$.$error){
                store.dispatch('saveUrlInDb', urlDataObj.urlDetails);
            }
        }

        return{
            urlDataObj,
            submitURL,
            v$
        };
    }
}
</script>

<style>
    #UrlFormView{
        height: 100vh;
        display: flex;
    }
    #errorText{
        color: red;
        margin-top: 4px; 
    }
    .urlformcard{
        background-color: white;
        padding: 20px;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
        width: 50%;
        margin: auto;
        border-radius: 20px;
    }
    .card-title{
        text-align: center;
        font-style: italic;
        font-weight: bold;
        font-size: 22px;
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
    .savebtngroup .saveBtn{
        margin-left: 10px;
    }

    @media (max-width: 850px){
        #UrlFormView{
            height: calc(100vh - 58px);
        }
        .urlformcard{
            width: 75%;
            margin: auto;
        }
    }

    @media (max-width: 768px){
        .urlformcard{
            width: 90%;
        }
        .savebtngroup{
            display: flex;
        }
        .savebtngroup .btn{
            width: 50%;
        }
    }
</style>