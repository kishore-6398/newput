<template>
    <div id="todoContent">
        <div class="todoTitle">
            <img src="../../assets/todo.jpg" class="todoimage" width="45" height="45" alt="todo img" />
            <h3>Todo List</h3>
            <div class="date">
                <span class="material-icons md-today">today</span>
                <span>{{ dateToday }}</span>  
            </div>
        </div>
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

        <!-- Count display -->
        <div v-if="selearch.filter === 'All Todos'" class="count" id="allTodosCount">Total: {{ allTodosCount }}</div>
        <div v-else-if="selearch.filter === 'Pending Todos'" class="count" id="pendingTodosCount">Pending: {{ pendingTodosCount }}</div>
        <div v-else class="count" id="completedTodosCount">Completed: {{ completedTodosCount }}</div>

        <span v-if="todosArray.length > 0">
            <!--todo list-->
            <app-ITodo v-for="temp in todosArray" :key="temp.id" :todo="temp" id='todo-list' />
        </span>
        <span v-else>
            <p class="noData">Sorry! No result found :(</p>
        </span>
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

        var d = new Date();
        var fulldate = d.toDateString();
        var day = fulldate.slice(0, 3);
        var month = fulldate.slice(4, 7);
        var date = fulldate.slice(8, 10);
        var year = fulldate.slice(11, 15);
        var dateToday = day + ', ' + month + ' ' + date + ', ' + year;
        
        var selearch = reactive({
            search: '',
            filter: 'Pending Todos'
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

        var allTodosCount = computed(() => store.getters.getallTodosCount);
        var pendingTodosCount = computed(() => store.getters.getpendingTodosCount);
        var completedTodosCount = computed(() => store.getters.getcompletedTodosCount);

        var position = computed(() => {
            return store.getters.getposition;
        });

        return{
            todosArray,
            selearch,
            position,
            dateToday,
            allTodosCount,
            pendingTodosCount,
            completedTodosCount
        };
    }
}
</script>

<style>
.todoTitle{
    display: flex;
    align-items: center;
    margin: 0 20px;
}
.date{
    margin-left: auto;
    display: flex;
}
.todoimage{
    border-radius: 50%;
    margin-right: 5px;
}
#todoContent{
    margin: 10px 0 20px 0;
}
#todo-form, #todo-list{
    margin: 0 20px;
}
h3{
    text-align: center;
    margin-bottom: 1px;
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
.count{
    margin-left: 22px;
    font-weight: bold;
    font-style: italic;
    font-size: large;
}

.md-today{
    margin-right: 3px;
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

@media (max-width: 350px){
    h3{
        display: none;
    }
}
</style>