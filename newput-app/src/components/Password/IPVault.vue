<template>
    <div id="vaultdata" class="col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12">

        <div class="vault-card">
            <div class="vault-title">
                <span class="material-icons md-tag">tag</span>
                <div class="titletag text-truncate" :title="vault.vaultTag">{{ vault.vaultTag }}</div>
                <span class="material-icons md-edit" @click="cloneData" data-bs-toggle="modal" :data-bs-target="'#vaultUpdateModal' + vault.id">edit_note</span>
                <span class="material-icons md-del" @click="deleteVaultData">delete</span>
            </div>
            <div class="hrLine"></div>
            <div class="vault-body">
                <div class="vault-name">
                    <span class="material-icons md-person">person</span>
                    <div :id="'vault-name-text' + vault.id" class="vault-name-text text-truncate" :title="vault.vaultName">{{ vault.vaultName }}</div>
                    <span @click="alterIconUser" v-if="boolUser" data-clipboard-action="copy" :data-clipboard-target="'#vault-name-text' + vault.id" class="material-icons md-copy-text">content_copy</span>
                    <span v-else class="material-icons md-tick">done</span>
                </div>
                <div class="vault-password">
                    <span class="material-icons md-password">password</span>
                    <div type='password' :id="'vault-password-text' + vault.id" class="vault-password-text text-truncate" :title="vault.vaultPassword" >{{ vault.vaultPassword }}</div>
                    <span @click="alterIconPassword" v-if="boolPassword" data-clipboard-action="copy" :data-clipboard-target="'#vault-password-text' + vault.id" class="material-icons md-copy-text">content_copy</span>
                    <span v-else class="material-icons md-tick">done</span>
                </div>
                <div class="vault-url" v-if="vault.vaultUrl">
                    <span class="material-icons md-public">public</span>
                    <div :id="'vault-url-text' + vault.id" class="vault-url-text text-truncate" :title="vault.vaultUrl">{{ vault.vaultUrl }}</div>
                    <span @click="alterIconUrl" v-if="boolUrl" data-clipboard-action="copy" :data-clipboard-target="'#vault-url-text' + vault.id" class="material-icons md-copy-text">content_copy</span>
                    <span v-else class="material-icons md-tick">done</span>
                </div>
            </div>
        </div>

        <!-- Update Modal -->
        <div class="modal fade" :id="'vaultUpdateModal' + vault.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Login Details</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label :for="'vaultUname' + vault.id" class="form-label">User Name</label>
                            <input type="text" v-model="v$.vaultName.$model" class="form-control" :id="'vaultUname' + vault.id">
                            <span v-if="v$.vaultName.$error">
                                <div id="errorText">{{ v$.vaultName.$errors[0].$message }}</div>
                            </span>
                        </div>
                        <div class="mb-3">
                            <label :for="'vaultPassword' + vault.id" class="form-label">Password</label>
                            <input type="text" v-model="v$.vaultPassword.$model" class="form-control" :id="'vaultPassword' + vault.id">
                            <span v-if="v$.vaultPassword.$error">
                                <div id="errorText">{{ v$.vaultPassword.$errors[0].$message }}</div>
                            </span>
                        </div>
                        <div class="mb-3">
                            <label :for="'vaultAddress' + vault.id" class="form-label">Website Address</label>
                            <input type="url" v-model="v$.vaultUrl.$model"  class="form-control" :id="'vaultAddress' + vault.id" placeholder="https://www.example.com">
                            <span v-if="v$.vaultUrl.$error">
                                <div id="errorText">{{ v$.vaultUrl.$errors[0].$message }}</div>
                            </span>
                        </div>
                        <div class="mb-3">
                            <label :for="'vaultTag' + vault.id" class="form-label">Tag / Title</label>
                            <input type="text" v-model="v$.vaultTag.$model" class="form-control" :id="'vaultTag' + vault.id">
                            <span v-if="v$.vaultTag.$error">
                                <div id="errorText">{{ v$.vaultTag.$errors[0].$message }}</div>
                            </span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn saveBtn" @click="updateVaultDetails">Save changes</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import ClipboardJS from '../../../node_modules/clipboard/dist/clipboard.min';
import { reactive, ref, computed } from 'vue';
import { useStore } from 'vuex';
import swal from 'sweetalert';
//close bootstrap modal
import { Modal } from 'bootstrap';
import useVuelidate from '@vuelidate/core';
import { required, url } from '@vuelidate/validators';

export default {
    props: ['vault'],
    setup(props){
        //clipboard reg code
        var boolUser = ref(true);
        var boolPassword = ref(true);
        var boolUrl = ref(true);
        var clipboard = new ClipboardJS('.md-copy-text');

        clipboard.on('success', function(e) {
            e.clearSelection();
        });

        function alterIconUser(){
            boolUser.value = !boolUser.value;
            setTimeout(() => {
                boolUser.value = !boolUser.value;
            }, 2000);
        }
        function alterIconPassword(){
            boolPassword.value = !boolPassword.value;
            setTimeout(() => {
                boolPassword.value = !boolPassword.value;
            }, 2000);
        }
        function alterIconUrl(){
            boolUrl.value = !boolUrl.value;
            setTimeout(() => {
                boolUrl.value = !boolUrl.value;
            }, 2000);
        }

        //update vault
        var editedVaultData = reactive({
            evaultData: {}
        });

        function cloneData(){
            var obj = Object.assign({}, props.vault);
            editedVaultData.evaultData.vaultName = obj.vaultName;
            editedVaultData.evaultData.vaultPassword = obj.vaultPassword;
            editedVaultData.evaultData.vaultUrl = obj.vaultUrl;
            editedVaultData.evaultData.vaultTag = obj.vaultTag;
            editedVaultData.evaultData.id = obj.id;
        }

        var rules = computed(() => {
            return{
                vaultName: { required },
                vaultPassword: { required },
                vaultUrl: { url },
                vaultTag: { required }
            }
        });

        var v$ = useVuelidate(rules, editedVaultData.evaultData);

        const store = useStore();

        function updateVaultDetails(){
            this.v$.$validate();    
            if(!this.v$.$error){
                store.dispatch('updateVaultDetailInDb', editedVaultData.evaultData);
                //close bootstrap modal
                var myModalEl = document.getElementById('vaultUpdateModal' + props.vault.id);
                var modal = Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
                modal.hide();
            }
        }

        //delete vault
        function deleteVaultData(){
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this login detail!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        store.dispatch('deleteVaultDataFromDb', props.vault);

                        swal("Poof! Your Login details has been deleted!", {
                            icon: "success",
                        });
                    } 
                });
        }
    
        return{
            boolUser,
            boolPassword,
            boolUrl,
            alterIconUser,
            alterIconPassword,
            alterIconUrl,
            editedVaultData,
            updateVaultDetails,
            deleteVaultData,
            cloneData,
            v$
        };
    }
}
</script>

<style>
    .vault-card{
        box-shadow: 0 3px 20px rgba(0 , 0 , 0, 0.1);
        border-radius: 15px;
        margin: 20px 0 0 0;
        min-height: 160px;
    }
    #errorText{
        color: red;
    }
    .vault-title{
        display: flex;
        align-items: center;
    }
    .hrLine{
        width: 100%;
        height: 1px;
        background-color: rgb(185, 185, 185);
    }
    .titletag{
        width: 100%;
        padding: 10px 0 10px 0;
        font-weight: bold;
        font-size: large;
        overflow: hidden;
        text-overflow:ellipsis;
    }
    .vault-body{
        padding: 10px;
    }
    .vault-name, .vault-password, .vault-url{
        display: flex;
        align-items: center;
    }
    .vault-password, .vault-url{
        margin-top: 8px;
    }
    .vault-name-text, .vault-password-text, .vault-url-text{
        width: 90%;
        margin-left: 7px;
        overflow: hidden;
        text-overflow:ellipsis;
    }

    /*Icon Css*/
    .md-tag{
        padding: 10px 5px 10px 10px;
        color:  rgb(255, 0, 255);
        font-size: 30px;
        cursor: pointer;
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
    .md-copy-text{
        font-size: 20px;
        cursor: pointer;
        color:rgb(153, 153, 153);
    }
    .md-person{
        font-size: 21px;
        color: rgb(137, 4, 245);
    }
    .md-password{
        font-size: 21px;
        color:rgb(255, 153, 0)
    }
    .md-public{
        font-size: 21px;
        color: rgb(0, 183, 255);
    }
    .md-tick{
        color: rgb(5, 255, 5);
    }
</style>