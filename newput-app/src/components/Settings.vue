<template>
    <div id="settingsWrap">
        <div class="settings">
            <div class="personalDetails">
                <h4 class="settingsHead">Personal Details:</h4>
                <div class="detailsWrap">
                    <div class="proName">Name: {{ name }}</div>
                    <div class="proEmail">Email: {{ email }}</div>
                </div>
            </div>

            <div class="profileSettings">
                <h4 class="settingsHead">Profile Settings:</h4>
                <div class="form-check form-switch">
                    <label class="form-check-label" for="flexSwitchCheckChecked">Personal profile</label>
                    <input class="form-check-input" :checked="prof" @change="changeProfile" type="checkbox" id="flexSwitchCheckChecked">
                </div>
                <div class="proText" v-if="profile === 'personal'">Personal profile is set.</div>
                <div class="proText" v-else>Work profile is set.</div>
            </div>

            <div class="deleteAccount">
                <h4 class="settingsHead">Delete Account:</h4>
                <p style="margin-top: 15px;">This will delete all the account related details, stored data etc.</p>
                <p>Once deleted you will not be able to recover data again.</p>
                <button class="btn btn-danger" @click="deleteAccount">Delete Account</button>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import swal from 'sweetalert';

export default {
    setup(){
        const store = useStore();

        var prof = ref(false);

        var profile = computed(() => store.getters.getProfile);
        var name = computed(() => store.getters.getUsername);
        var email = computed(() => store.getters.getuserEmail);
        
        if(profile.value === 'personal'){
            prof.value = true;
        }
        else{
            prof.value = false;
        }
        
        function changeProfile(){
            prof.value = !prof.value;
            if(prof.value){
                store.dispatch('changeProfileInDb', { profile: 'personal' });
            }
            else{
                store.dispatch('changeProfileInDb', { profile: 'work' });
            }
        }

        function deleteAccount(){
            swal({
                title: "Confirm Delete",
                text: "Are you sure you want to delete account and all account related data?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                })
                .then((willDelete) => {
                    if (willDelete) {
                        store.dispatch('deleteAccount');
                    }
            });
        }

        return{
            prof,
            name,
            email,
            profile,
            changeProfile,
            deleteAccount
        };
    }
}
</script>

<style>
    #settingsWrap{
        display: flex;
        flex-direction: column;
        margin: 50px 40px;
    }
    .settings{
        margin: auto;
    }
    .detailsWrap{
        margin: 20px 0;
        display: flex;
    }
    .proEmail, .proName{
        font-weight: bold;
        font-style: italic;
        font-size: 17px;
    }
    .proEmail{
        margin-left: 100px;
    }
    .profileSettings, .deleteAccount{
        margin-top: 50px;
    }
    .form-check{
        margin-top: 20px;
    }
    .form-check-label{
        padding-left: 8px;
        font-weight:bold;
        font-size: 17px;
    }
    .proText{
        margin-top: 10px;
    }
    .settingsHead{
        color: rgb(183, 0, 255);
    }

    @media (max-width: 1024px){
        .detailsWrap{
            flex-direction: column;
        }
        .proEmail{
            margin-left: 0px;
            margin-top: 15px;
        }
    }

    @media (max-width: 568px){
        #settingsWrap{
            margin: 40px;
        }
        .profileSettings, .deleteAccount{
            margin-top: 25px;
        }
        p{
            margin-bottom: 0.6rem !important;
        }
    }

     @media (max-width: 400px){
        .proEmail, .proName{
            font-weight: bold;
            font-style: italic;
            font-size: 17px;
            word-wrap: break-word;
            width: calc(100vw - 80px);
        }
     }
</style>