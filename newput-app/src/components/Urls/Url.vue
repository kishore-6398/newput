<template>
    <div id="urlManager">

        <div class="titlecard">
            <img src="../../assets/url-logo.jpg" class="urlimage" width="45" height="45" alt="url img" />
            <h4 class="urltitleheading">URL Manager</h4>
            <router-link to="/url/form" class="btn btn-info newform">Add New Url</router-link>
            <router-link to="/url/form"><span class="material-icons newurl-icon">add</span></router-link>
        </div>

        <div class="searchandcatcard">
            <div class="searchbar">
                <input type="search" v-model="filterObj.filterData.search" class="form-control searchinput" placeholder="Search links..."/>
            </div>
            <div class="select">
                <select class="form-select" id="tag" v-model="filterObj.filterData.tagValue">
                    <option v-for="tag in tags" :key="tag">{{ tag }}</option>
                </select>
            </div>
        </div>
        
        <span v-if="urlData.length > 0">
            <div class="row individual-url">
                <app-IUrl v-for="temp in urlData" :key="temp.id" :urlData="temp" />
            </div>
        </span>
        <span v-else>
            <p class="noData">Sorry! No result found :(</p>
        </span>
        
    </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue';
import { useStore } from 'vuex';
import IUrl from './IUrl.vue';

export default {
    components: {
        'app-IUrl': IUrl
    },
    setup() {
        const store = useStore();

        var filterObj = reactive({
            filterData: {
                search: '',
                tagValue: 'All Tags'
            }
        });

        onMounted(() => {
            store.dispatch('getUrlFromDb');
        });

        var urlData = computed(() => {
            return store.getters.getUrlData.filter(temp => {
                if(filterObj.filterData.tagValue === 'All Tags'){ 
                    return temp.urlName.toLowerCase().match(filterObj.filterData.search.toLowerCase()) ||
                    temp.urlText.toLowerCase().match(filterObj.filterData.search.toLowerCase()) ||
                    temp.urlTag.toLowerCase().match(filterObj.filterData.search.toLowerCase());
                }
                else {
                    return temp.urlTag === filterObj.filterData.tagValue 
                    && temp.urlName.toLowerCase().match(filterObj.filterData.search.toLowerCase()) || 
                    temp.urlTag === filterObj.filterData.tagValue 
                    && temp.urlText.toLowerCase().match(filterObj.filterData.search.toLowerCase());
                }
                
            })
        });
        var tags = computed(() => store.getters.gettags);

        return{
            urlData,
            tags,
            filterObj
        };
    }
}
</script>

<style>
    .titlecard{
        background-color: white;
        padding: 10px 25px;
        display: flex;
        align-items: center;
    }
   .newform{
        margin-left: auto;
    }
    .searchandcatcard{
        background-color: white;
        box-shadow: 0 2px 25px rgba(0, 0, 0, 0.13);
        padding: 12px 25px;
        display: flex;
    }
    .searchbar, .select{
        width: 30%;
    }
    .select{
        margin-left: auto;
    }
    .searchinput{
        border-radius: 20px;
    }
    .individual-url{
        margin: 10px 10px 70px 10px;
    }
    .newurl-icon{
        display: none;
    }
    .urlimage{
        border-radius: 10px;
        margin-right: 10px;
    }

    @media (max-width: 992px){
        .searchbar, .select{
            width: 50%;
        }
        .searchbar{
            margin-right: 5px;
        }
        .select{
            margin-left: 5px;
        }
    }
    @media(max-width: 850px){
        .newform{
            display: none;
        }
        .newurl-icon{
            display: block;
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
        .urltitleheading{
            display: block;
        }
    }
</style>