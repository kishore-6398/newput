<template>
  <div id="editNotes">
    <div class="editContainer">
      <div id="editor1"></div>
        <div class="editsaveBar">
            <div class="editbtns">
                <router-link to="/notes" class="btn btn-secondary">Back</router-link>
                <button @click="resetEditor" class="btn btn-danger reset">Reset</button>
                <button @click="cloneData" data-bs-toggle="modal" data-bs-target="#notesEditModal" class="btn btn-primary update">Update Notes</button>
            </div>
        </div>
    </div>

    <!-- save Modal -->
    <div class="modal fade" id="notesEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Update Notes</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="notesEditTitle" class="form-label">Title</label>
                        <input v-model="v$.title.$model" type="text" class="form-control" id="notesEditTitle">
                        <span v-if="v$.title.$error">
                            <div id="errorText">{{ v$.title.$errors[0].$message }}</div>
                        </span>
                    </div>
                    <div class="mb-3">
                        <label for="notesEditCategory" class="form-label">Category</label>
                        <input v-model="v$.category.$model" type="text" class="form-control" id="notesEditCategory">
                        <span v-if="v$.category.$error">
                            <div id="errorText">{{ v$.category.$errors[0].$message }}</div>
                        </span>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button @click="updateNotes" type="button" class="btn btn-primary">Update</button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import {  onMounted, computed, watch, toRefs, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
//close bootstrap modal
import { Modal } from 'bootstrap';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  setup() {
    const store = useStore();
    var route = useRoute();
    var quill = null;

    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'font': [] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'align': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['image'],
        ['clean']                                         // remove formatting button
    ];

    onMounted(() => {
        quill = new Quill('#editor1', {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        });

        var id = route.params.id;
        store.dispatch('getSingleNoteFromDb', { id: id });
        
    });

    var noteData = reactive({
        singleNote: computed(() => store.getters.getsingleNote),
        cloneSingleNote: {}
    });

    var { singleNote } = toRefs(noteData);

    watch(singleNote, () => {
        quill.setContents(singleNote.value.delta);
    });

    function cloneData(){
        var obj = Object.assign({}, noteData.singleNote);
        noteData.cloneSingleNote.title = obj.title;
        noteData.cloneSingleNote.category = obj.category;
        noteData.cloneSingleNote.delta = obj.delta;
        noteData.cloneSingleNote.date = obj.date;
    }

    var rules = computed(() => {
        return{
            title: { required },
            category: { required }
        }
    });

    var v$ = useVuelidate(rules, noteData.cloneSingleNote);
    
    function resetEditor(){
        quill.setContents();
    }

    function updateNotes(){
        this.v$.$validate();    
        if(!this.v$.$error){
            var d = new Date();
            var t = d.toDateString();
            var updatedate = t.slice(4);

            noteData.cloneSingleNote.date = updatedate;
            noteData.cloneSingleNote.delta = quill.getContents();
            noteData.cloneSingleNote.id = route.params.id;
            
            store.dispatch('updateNotesInDb', noteData.cloneSingleNote);

            //close bootstrap modal
            var myModalEl = document.getElementById('notesEditModal');
            var modal = Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
            modal.hide();
        }
    }

    //while sidenav opens and closes, prevent overlapping
    var cond = computed(() => store.getters.getposition);
    watch(cond, () => {
        var a, b;
        if(cond.value === true){
            a = document.getElementsByClassName('ql-picker');
            a.forEach(temp => {
                temp.classList.add("ql-picker-active");
            })
            b = document.getElementsByClassName('ql-picker-label');
            b.forEach(temp => {
                temp.classList.add("ql-picker-label-active");
            })
        }
        else{
            a = document.getElementsByClassName('ql-picker');
            a.forEach(temp => {
                temp.classList.remove("ql-picker-active");
            })
            b = document.getElementsByClassName('ql-picker-label');
            b.forEach(temp => {
                temp.classList.remove("ql-picker-label-active");
            })
        }
    });
    
    return{
      quill,
      noteData,
      resetEditor,
      updateNotes,
      cloneData,
      v$
    };
  }
}
</script>

<style>
    #editor1{
        position: unset !important;
    }
    .ql-picker-active{
        position: static !important;
    }
    .ql-picker-label-active{
        z-index: -1 !important;
    }
    .editContainer{
        width: 100%;
        /* totalHeight - navbarHt - savebarHt - toolsbarHt */
        height: calc(100vh - 58px - 60px - 117px);
    }
    .editsaveBar{
        width: 100%;
        background-color: rgb(244, 241, 255);
        height: 60px;
    }
    .editbtns{
        display: flex;
        padding: 10px 15px 0 15px;
    }
    .reset{
        margin-left: auto;
    }
    .update{
        margin-left: 15px;
    }

    @media (min-width: 358px){
        .editContainer{
            /* totalHeight - navbarHt - savebarHt - toolsbarHt */
            height: calc(100vh - 58px - 60px - 93px);
        }
    }
    @media (min-width: 515px){
        .editContainer{
            /* totalHeight - navbarHt - savebarHt - toolsbarHt */
            height: calc(100vh - 58px - 60px - 68px);
        }
    }
    @media (min-width: 851px){
        .editContainer{
            /* totalHeight - savebarHt - toolsbarHt */
            height: calc(100vh - 60px - 68px);
        }
    }
    @media (min-width: 1238px){
        .editContainer{
            /* totalHeight - savebarHt - toolsbarHt */
            height: calc(100vh - 60px - 43px);
        }
    }
</style>