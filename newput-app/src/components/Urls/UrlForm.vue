<template>
    <div id="UrlFormView">
        <div class="urlformcard">
            <div class="card-title">
                Bookmark URL Form
            </div>
            <div class="hr"></div>
            <div class="mb-3">
                <label for="urlName" class="form-label">Name</label>
                <input type="text" v-model="urlDataObj.urlDetails.urlName" class="form-control" id="urlName">
            </div>
            <div class="mb-3">
                <label for="urlText" class="form-label">URL</label>
                <input type="url" v-model="urlDataObj.urlDetails.urlText" class="form-control" id="urlText" placeholder="https://www.example.com">
            </div>
            <div class="mb-3">
                <label for="urlTag" class="form-label">Tag</label>
                <input type="text" v-model="urlDataObj.urlDetails.urlTag" class="form-control" id="urlTag">
            </div>
            <div class="savebtngroup">
                <router-link to="/url" class="btn btn-secondary backbtn">Go Back</router-link>
                <button class="btn btn-primary savebtn" @click="submitURL">Add URL</button>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';

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

        function submitURL(){
            store.dispatch('saveUrlInDb', urlDataObj.urlDetails);
        }

        return{
            urlDataObj,
            submitURL
        };
    }
}
</script>

<style scoped>
    #UrlFormView{
        height: 100vh;
        display: flex;
    }
    .urlformcard{
        background-color: white;
        padding: 20px;
        box-shadow: 0 2px 25px rgba(0, 0, 0, 0.13);
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
    .savebtn{
        margin-left: 10px;
    }

    @media (max-width: 768px){
        #UrlFormView{
            height: auto;
        }
        .urlformcard{
            width: 90%;
            margin: 15% 5%;
        }
        .savebtngroup{
            display: flex;
        }
        .savebtn, .backbtn{
            width: 50%;
        }
    }
</style>