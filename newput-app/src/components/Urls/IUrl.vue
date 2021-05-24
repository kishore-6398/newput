<template>
    <div id="iurlDataView" class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-12">
        <div class="urlcard">
            <div class="urlcardtag">
                <span class="material-icons md-bookmark">star</span>
                <div class="urltag text-truncate" :title="urlData.urlTag">{{ urlData.urlTag }}</div>
                <span class="material-icons md-edit" @click="cloneData" data-bs-toggle="modal" :data-bs-target="'#editModal' + urlData.id">edit_note</span>
                <span class="material-icons md-del" @click="deleteUrl">delete</span>
            </div>
            <div class="hrurl"></div>
            <div class="urlcardbody">
                <div class="urlcardname">
                    <span class="material-icons md-person">person</span>
                    <div class="urlname text-truncate" :title="urlData.urlName">{{ urlData.urlName }}</div>
                </div>
                <div class="urldata">
                    <span class="material-icons md-link">link</span>
                    <div :id="'url' + urlData.id" class="url text-truncate" :title="urlData.urlText">{{ urlData.urlText }}</div>
                    <span v-if="boolPassword" @click="alterIconUrl" data-clipboard-action="copy" :data-clipboard-target="'#url' + urlData.id" class="material-icons md-copy">content_copy</span>
                    <span v-else class="material-icons md-tick">done</span>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" :id="'editModal' + urlData.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit URL</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label :for="'urleditName' + urlData.id" class="form-label">Name</label>
                            <input type="text" v-model="v$.urlName.$model" class="form-control" :id="'urleditName' + urlData.id">
                            <span v-if="v$.urlName.$error">
                                <div id="errorText">{{ v$.urlName.$errors[0].$message }}</div>
                            </span>
                        </div>
                        <div class="mb-3">
                            <label :for="'urleditText' + urlData.id" class="form-label">URL</label>
                            <input type="url" v-model="v$.urlText.$model" class="form-control" :id="'urleditText' + urlData.id" placeholder="https://www.example.com">
                            <span v-if="v$.urlText.$error">
                                <div id="errorText">{{ v$.urlText.$errors[0].$message }}</div>
                            </span>
                        </div>
                        <div class="mb-3">
                            <label :for="'urleditTag' + urlData.id" class="form-label">Tag</label>
                            <input type="text" v-model="v$.urlTag.$model" class="form-control" :id="'urleditTag' + urlData.id">
                            <span v-if="v$.urlTag.$error">
                                <div id="errorText">{{ v$.urlTag.$errors[0].$message }}</div>
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn saveBtn" @click="updateUrl">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ClipboardJS from '../../../node_modules/clipboard/dist/clipboard.min';
import { ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import swal from 'sweetalert';
//close bootstrap modal
import { Modal } from 'bootstrap';
import useVuelidate from '@vuelidate/core';
import { required, url } from '@vuelidate/validators';

export default {
    props: ['urlData'],
    setup(props){
        var boolPassword = ref(true);
        var clipboard = new ClipboardJS('.md-copy');

        clipboard.on('success', function(e) {
            e.clearSelection();
        });

        function alterIconUrl(){
            boolPassword.value = !boolPassword.value;
            setTimeout(() => {
                boolPassword.value = !boolPassword.value;
            }, 2000);
        }

        var urlUpdateData = reactive({
            data: {}
        });

        function cloneData(){
            var obj = Object.assign({}, props.urlData);
            urlUpdateData.data.urlName = obj.urlName;
            urlUpdateData.data.urlText = obj.urlText;
            urlUpdateData.data.urlTag = obj.urlTag;
            urlUpdateData.data.id = obj.id;
        }

        var rules = computed(() => {
            return{
                urlName: { required },
                urlText: { required, url },
                urlTag: { required }
            }
        });

        var v$ = useVuelidate(rules, urlUpdateData.data);

        const store = useStore();

        function updateUrl(){
            this.v$.$validate();    
            if(!this.v$.$error){
                store.dispatch('updateUrlDataInDb', urlUpdateData.data);

                //close bootstrap modal
                var myModalEl = document.getElementById('editModal' + props.urlData.id);
                var modal = Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
                modal.hide();
            }
        }

        function deleteUrl(){
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this URL!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {   
                        store.dispatch('deleteUrlDataFromDb', props.urlData);

                        swal("Poof! Your URL has been deleted!", {
                            icon: "success",
                        });
                    }
            });
        }

        return{
            boolPassword,
            alterIconUrl,
            urlUpdateData,
            updateUrl,
            deleteUrl,
            cloneData,
            v$
        };
    }
}
</script>

<style>
    .urlcard{
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 2px 25px rgba(0, 0, 0, 0.13);
        margin: 20px 0 0 0;
    }
    #errorText{
        color: red;
    }
    .hrurl{
        margin: 0 0;
        width: 100%;
        height: 1px;
        background-color: rgb(185, 185, 185);
    }
    .urlcardbody{
        padding: 10px;
    }
    .urlcardtag, .urlcardname, .urldata{
        display: flex;
        align-items: center;
    }
    .urltag, .urlname, .url{
        flex: 1;
    }
    .urltag{
        padding: 10px 0 10px 0;
        font-weight: bold;
        font-size: large;
        overflow: hidden;
        text-overflow:ellipsis;
    }
    .urlname, .url{
        margin-left: 7px;
        overflow: hidden;
        text-overflow:ellipsis;
    }    
    .urldata{
        margin-top: 8px;
    }

    /*Icon Css*/
    .md-bookmark{
        padding: 10px 5px 10px 10px;
        color:  rgb(255, 0, 255);
        font-size: 30px;
    }
    .md-edit{
        padding: 10px 5px 10px 5px;
        color: rgb(0, 17, 255);
        font-size: 30px;
        cursor: pointer;
    }
    .md-del{
        padding: 10px 10px 10px 5px;
        color: red;
        font-size: 30px;
        cursor: pointer;
    }
    .md-person{
        font-size: 23px;
        color: rgb(137, 4, 245);
    }
    .md-link{
        font-size: 23px;
        color: rgb(245, 120, 4);
    }
    .md-copy{
        font-size: 21px;
        cursor: pointer;
        color:rgb(153, 153, 153);
    }
    .md-tick{
        color: rgb(5, 255, 5);
    }
</style>