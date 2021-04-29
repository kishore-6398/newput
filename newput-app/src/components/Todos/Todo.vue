<template>
    <div id="todoContent">
        <h3>My Todo List</h3>
         <!--todo Form and mobile form-->   
        <app-TodoForm id="todo-form" />
        
        <!--search and dropdown-->
        <div class="row searchAndDd" :class="{ searchAndDdNavActive: position }">
            <div class="col-lg-4 col-md-6 col-6 search">
                <!-- <label for="searchInput" class="form-label">Search</label> -->
                <input type="search" v-model="selearch.search" class="form-control" id="searchInput" placeholder="Search Todos...">
            </div>
            <div class="col-lg-4 offset-lg-4 col-md-6 col-6 dd">
                <!-- <label for="filterBy" class="form-label">Filter By</label> -->
                <select class="form-select" v-model="selearch.filter" id="filterBy">
                    <option value="All Todos">All Todos</option>
                    <option value="Pending Todos">Pending Todos</option>
                    <option value="Completed Todos">Completed Todos</option>
                </select>
            </div>
        </div>

        <!-- Total display
        <div id="count">{{ selearch.filter }}: {{ total }}</div> -->

        <!--todo list-->
        <app-ITodo v-for="temp in todosArray" :key="temp.id" :todo="temp" id='todo-list' />
    </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue';
import { useStore } from 'vuex';
import TodoForm from './TodoForm.vue';
import ITodo from './ITodo.vue';

export default {
    components: {
        'app-TodoForm': TodoForm,
        'app-ITodo': ITodo
    },
    setup(){
        const store = useStore();
        
        var selearch = reactive({
            search: '',
            filter: 'All Todos'
        });
        onMounted(() => {
            store.dispatch("getTodosFromDb");
        });
        var todosArray = computed(() => {
            return store.getters.gettodosArray.filter(temp => {
                if(selearch.filter === 'Pending Todos'){
                    return temp.todoMsg.toLowerCase().match(selearch.search.toLowerCase()) && temp.completed === false;
                }
                else if(selearch.filter === 'Completed Todos'){
                    return temp.todoMsg.toLowerCase().match(selearch.search.toLowerCase()) && temp.completed === true;
                }
                else if(selearch.filter === 'All Todos'){
                    return temp.todoMsg.toLowerCase().match(selearch.search.toLowerCase());
                }
            })
        });

        //var total = computed(() => todosArray.value.length);

        var position = computed(() => {
            // console.log(store.getters.getposition);
            return store.getters.getposition;
        });

        return{
            todosArray,
            selearch,
            position
        };
    }
}
</script>

<style >
#todoContent{
    margin: 20px 0;
}
#todo-form, #todo-list{
    margin: 0 20px;
}
h3{
    text-align: center;
}
.searchAndDd{
    margin: 15px 0;
    padding: 0 20px;
    position: sticky;
    top: 0px;
    background-color: white;
    box-shadow: 0 5px 25px rgba(0, 0, 0 , 0.12);
}

.searchAndDd .search{
    padding: 15px 5px 15px 0px;
}
.searchAndDd .dd{
    padding: 15px 0px 15px 5px;
}
#searchInput{
    border-radius: 50px;
}

@media (max-width: 850px){
    #todoContent{
        margin-bottom: 65px;
    }
    .searchAndDd{
        margin: 15px 0;
        padding: 0 20px;
        background-color: white;
        box-shadow: 0 5px 25px rgba(0, 0, 0 , 0.12);
        position: unset;
        /* transition: 1.5s;toggle position sticky in card
        z-index:0; toggle position sticky in card */
    }
    /* .searchAndDdNavActive{
        z-index: -1;/*toggle position sticky in card
        transition: 0s;/*toggle position sticky in card
    } */
}
</style>