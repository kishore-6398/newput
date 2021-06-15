<template>
    <div id="notesEditor">
        <div class="editorContainer">
            <div id="editor"></div>
            <div class="saveBar">
                <div class="btns">
                    <router-link to="/notes" class="btn backBtn">Back</router-link>
                    <button @click="resetEditor" class="btn btnRed reset">Reset</button>
                    <button data-bs-toggle="modal" data-bs-target="#notesModal" class="btn saveBtn save">Save Notes</button>
                </div>
            </div>
        </div>

        <!-- save Modal -->
        <div class="modal fade" id="notesModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Save As</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="notesTitle" class="form-label">Title</label>
                            <input v-model="v$.title.$model" type="text" class="form-control" id="notesTitle">
                            <span v-if="v$.title.$error">
                                <div id="errorText">{{ v$.title.$errors[0].$message }}</div>
                            </span>
                        </div>
                        <div class="mb-3">
                            <label for="notesCategory" class="form-label">Category</label>
                            <input v-model="v$.category.$model" type="text" class="form-control" id="notesCategory">
                            <span v-if="v$.category.$error">
                                <div id="errorText">{{ v$.category.$errors[0].$message }}</div>
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn backBtn" data-bs-dismiss="modal">Cancel</button>
                        <button @click="saveNotes" type="button" class="btn saveBtn">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import {  onMounted, watch, computed, reactive } from 'vue';
import { useStore } from 'vuex';
//close bootstrap modal
import { Modal } from 'bootstrap';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
    setup() {
        const store = useStore();
        var saveAs = reactive({
            data: {
                title: '',
                category: '',
                date: '',
                delta: null
            }
        });

        var rules = computed(() => {
            return{
                title: { required },
                category: { required }
            }
        });

        var v$ = useVuelidate(rules, saveAs.data);

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
                quill = new Quill('#editor', {
                    modules: {
                        toolbar: toolbarOptions
                    },
                    theme: 'snow'
                });
            });

            function saveNotes(){
                this.v$.$validate();    
                if(!this.v$.$error){
                    var d = new Date();
                    var t = d.toDateString();
                    var notedate = t.slice(4);
                    saveAs.data.date = notedate;

                    saveAs.data.delta = quill.getContents();
                    store.dispatch('saveNotesToDb', saveAs.data);

                    //close bootstrap modal
                    var myModalEl = document.getElementById('notesModal');
                    var modal = Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
                    modal.hide();
                }
            }

            function resetEditor(){
                quill.setContents();
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
            saveAs,
            resetEditor,
            saveNotes,
            v$
        };
    }
}
</script>

<style>
    /* .ql-toolbar{
        background-color: rgb(240, 240, 240);
    } */
    #editor{
        position: unset !important;
    }
    .ql-picker-active{
        position: static !important;
    }
    .ql-picker-label-active{
        z-index: -1 !important;
    }
    
    .editorContainer{
        width: 100%;
        /* totalHeight - navbarHt - savebarHt - toolsbarHt */
        height: calc(100vh - 58px - 60px - 117px);
    }
    #errorText{
        color: red;
        margin-top: 4px; 
    }
    .saveBar{
        width: 100%;
        background-color: rgb(244, 241, 255);
        height: 60px;
    }
    .btns{
        display: flex;
        padding: 10px 15px 0 15px;
    }
    .reset{
        margin-left: auto;
    }
    .save{
        margin-left: 15px;
    }
    .btnRed{
        background-color: rgb(255, 49, 49);
        color: white;
        outline: none;
        border: none;
        font-weight: bold;
    }
    .btnRed:hover{
        color: white;
        background-color: rgb(255, 49, 49);
    }
    .btnRed:focus{
        outline: none;
        border: none;
        box-shadow: 0 0 0 3px rgb(255, 187, 187);
    }

    @media (min-width: 358px){
        .editorContainer{
            /* totalHeight - navbarHt - savebarHt - toolsbarHt */
            height: calc(100vh - 58px - 60px - 93px);
        }
    }
    @media (min-width: 515px){
        .editorContainer{
            /* totalHeight - navbarHt - savebarHt - toolsbarHt */
            height: calc(100vh - 58px - 60px - 68px);
        }
    }
    @media (min-width: 851px){
        .editorContainer{
            /* totalHeight - savebarHt - toolsbarHt */
            height: calc(100vh - 60px - 68px);
        }
    }
    @media (min-width: 1238px){
        .editorContainer{
            /* totalHeight - savebarHt - toolsbarHt */
            height: calc(100vh - 60px - 43px);
        }
    }
</style>