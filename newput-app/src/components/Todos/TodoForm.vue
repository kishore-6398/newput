<template>
    <div id="todo-form">
        <div class="card-form">
            <div class="row">
                <div class="col-lg-4 col-md-4">
                    <div class="mb-3">
                        <label for="todotext" class="form-label">Enter Todo</label>
                        <input type="text" v-model="todoData.todosModel.todoMsg" class="form-control" id="todotext" placeholder="I want to watch IPL...">
                    </div>
                </div>
                <div class="col-lg-4 col-md-4">
                    <div class="mb-3">
                        <label for="duedate" class="form-label">Due Date (Optional)</label>
                        <input type="date" v-model="todoData.todosModel.dueDate" class="form-control" id="duedate">
                    </div>
                </div>
                <div class="col-lg-4 col-md-4">
                    <label class="form-label d-md-block d-none" style="visibility: hidden">Submit</label>
                    <div>
                        <button class="btn btn-primary w-100" @click="submitTodo" >Add Todo</button>
                    </div>
                </div>
            </div>
        </div>

        <!--Mobile card form-->
        <div id="mobile-form-create">
            <span class="md-mobile-form-create-icon material-icons" data-bs-toggle="modal" data-bs-target="#mobileTodoFormModal">add</span>

            <!-- Modal -->
            <div class="modal fade" id="mobileTodoFormModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Todo Form</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="todotextMobile" class="form-label">Enter Todo</label>
                                <input type="text" v-model="todoData.todosModel.todoMsg" class="form-control" id="todotextMobile" placeholder="I want to watch IPL...">
                            </div>
                            <div class="mb-3">
                                <label for="duedateMobile" class="form-label">Due Date (Optional)</label>
                                <input type="date" v-model="todoData.todosModel.dueDate" class="form-control" id="duedateMobile">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" @click="submitTodo">Add Todo</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
import { useStore } from 'vuex';
//close bootstrap modal
import { Modal } from 'bootstrap';

export default {
    setup(){
        var todoData = reactive({
            todosModel: {
                todoMsg: '',
                dueDate: '',
                completed: false
            }
        });

        const store = useStore();

        function submitTodo(){
            store.dispatch('submitTodoToDb', todoData.todosModel);
            todoData.todosModel.todoMsg = '';
            todoData.todosModel.dueDate = '';

            //close bootstrap modal
            var myModalEl = document.getElementById('mobileTodoFormModal');
            var modal = Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
            if(modal !== null){
                modal.hide();
            }
        }

        return{
            todoData,
            submitTodo
        };
    }
}
</script>

<style>
.card-form{
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
    box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.12);
}
.mobile-form-create, .md-mobile-form-create-icon{
    display: none;
}
@media (max-width: 850px){
    .card-form{
        display: none;
    }
    .mobile-form-create, .md-mobile-form-create-icon{
        display: block;
    }
    .md-mobile-form-create-icon{
        color:rgb(255, 255, 255);
        background-color: rgb(181, 0, 252);
        font-size: 54px;
        position: fixed;
        bottom: 20px;
        right: 20px;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 5px 40px 5px rgba(0, 0, 0, 0.12);
    }
}
</style>