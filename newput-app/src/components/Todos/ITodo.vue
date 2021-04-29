<template>
    <div class="todoList">
        <div class="todo-bar"  :class="{ 'todo-complete': todo.completed }">
            <div class="todo-tick" @click="updateTickIcon">
                <span v-if="!todo.completed" class="md-tick-grey material-icons" >check_circle_outline</span>
                <span v-else class="md-tick-green material-icons" >check_circle</span>
            </div>

            <div class="todo-cap" data-bs-toggle="modal" :data-bs-target="'#updateTodoModal' + todo.id">
                <span class="text-truncate todo-complete-text">{{ todo.todoMsg }}</span><br/>
                <div class="date" v-if="todo.dueDate">
                    <span class="md-date material-icons">date_range</span>
                    <div class="fulldate">{{ filteredDate }}</div>
                </div>
            </div>

            <div class="todo-delete" @click="deleteTodo">
                <span class="md-delete material-icons">delete</span>
            </div>
        </div>

       
        <!--Update Modal -->
        <div class="modal fade" :id="'updateTodoModal' + todo.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Update Todo</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label :for="'todotext' + tododata.todoObj.id" class="form-label">Enter Todo</label>
                            <textarea v-model="tododata.todoObj.todoMsg" class="form-control" :id="'todotext' + tododata.todoObj.id" rows="3" placeholder="I want to watch IPL..."></textarea>
                        </div>
                        <div class="mb-3">
                            <label :for="'duedate' + tododata.todoObj.id" class="form-label">Due Date (Optional)</label>
                            <input type="date" v-model="tododata.todoObj.dueDate" class="form-control" :id="'duedate' + tododata.todoObj.id">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="updateTodo">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
        <!--end of update modal-->
    </div>
</template>

<script>
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
//close bootstrap modal
import { Modal } from 'bootstrap';
import swal from 'sweetalert';

export default {
    props: ['todo'],
    setup(props){
        var tododata = reactive({
            todoObj: Object.assign({}, props.todo)
        });
        var store = useStore();

        function updateTodo(){
            store.dispatch('updateTodoInDb', tododata.todoObj);
            
            //close bootstrap modal
            var myModalEl = document.getElementById('updateTodoModal' + tododata.todoObj.id);
            var modal = Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
            modal.hide();
        }

        function updateTickIcon(){
            tododata.todoObj.completed = !tododata.todoObj.completed;
            store.dispatch('updateTodoInDb', tododata.todoObj);
        }

        function deleteTodo(){
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this todo!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        store.dispatch('deleteTodoInDb', tododata.todoObj);
                        swal("Poof! Your todo has been deleted!", {
                            icon: "success",
                        });
                    }
            });
        }

        var filteredDate = computed(() => {
            var dueDateOld = props.todo.dueDate;
            var date = dueDateOld.slice(8);
            var month = parseInt(dueDateOld.slice(5, 7));
            var year = dueDateOld.slice(0, 4);
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            return date + ' ' + months[month - 1] + ' ' + year;
        });

        return{
            tododata,
            updateTodo,
            updateTickIcon,
            deleteTodo,
            filteredDate
        };
    }
}
</script>

<style>
    .todo-bar{
        border: 1px solid lightgray;
        border-radius: 15px;
        margin: 10px 0 0 0;
        width: 100%;
        cursor: pointer;
        display: inline-flex;
        transition: 0.3s ease-in-out;
    }
    .todo-tick{
        padding: 10px 5px 10px 10px;
        margin: auto 0;
    }
    .todo-cap{
        width:100%;
        padding: 10px 10px 10px 10px;
        overflow: hidden;
        text-overflow:ellipsis;
    }
    .todo-delete{
        padding: 10px 10px 10px 5px;
        margin: auto 0;
    }
    .todo-cap .date{
        display: flex;
    }
    .todo-cap .fulldate{
        padding: 2px 0 0 2px;
    }
    .md-tick-grey{
        color: rgb(170, 170, 170);
        font-size: 30px;
        transition: 0.2s;
    }
    .md-tick-green{
        color: rgb(6, 250, 67);
        font-size: 30px;
        transition: 0.2s;
    }
    .md-date{
        font-size: 18px;
        padding-top: 5px;;
    }
    .md-delete{
        color: rgb(241, 16, 16);
        font-size: 30px;
        -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
    }
    .todo-complete{
        background-color: rgb(250, 236, 246);
    }
    .todo-complete .todo-complete-text{
        text-decoration: line-through;
    }
</style>