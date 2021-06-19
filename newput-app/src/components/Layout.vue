<template>
  <div id="box">
        <div id="navbar" v-if="bool !== 'StarterView' && bool !== 'LoginView' && bool !== 'SignupView' && bool !== 'ForgotPasswordView'">
            <app-Navbar />
        </div>

        <div v-if="bool === 'StarterView'">
            <div id="smallNav">
                <app-Navbar />
            </div>
            <router-view />
        </div>

        <div v-else-if="bool === 'LoginView' || bool === 'SignupView' || bool === 'ForgotPasswordView'">
            <router-view />
        </div>

        <div id="content" v-else>
            <div id="smallNav">
                <app-Navbar />
            </div>
            <div id="visibleContent">
                <router-view />
            </div>
        </div>
        <!-- Button trigger modal
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#SessionTimeoutModal">
            Launch demo modal
        </button>  -->
        <!--Session Timeout Modal-->
        <div class="modal fade" id="SessionTimeoutModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="staticBackdropLabel">Session Timeout Warning</h4>
                        <button type="button" @click="clearSetInterval" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Your session is about to expire. Please click to continue session. </p>
                        <h5>{{ mins }} : {{ secs }}</h5>
                    </div>
                    <div class="modal-footer">
                        <button type="button" @click="clearSetInterval" class="btn backBtn" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" @click="extendSession" class="btn saveBtn">Extend Session</button>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import { computed, ref,  watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import Navbar from './Navbar.vue';
//open and close bootstrap modal
import { Modal } from 'bootstrap';

export default {
 components: {
   'app-Navbar': Navbar
 },
 setup(){
    const store = useStore();
    const route = useRoute();
    var bool = ref('');
    
    watch(route, (newval) => {
        bool.value = newval.name;
    });

    var showModal = computed(() => store.getters.getshowSessionModal);

    watch(showModal, () => {
        if(showModal.value){
            var myModal = new Modal(document.getElementById('SessionTimeoutModal'), {
                keyboard: false
            });

            myModal.show();

            sessionTimer();
        }
        else{
            var myModalEl = document.getElementById('SessionTimeoutModal');
            var modal = Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
            modal.hide();
        }
    });
    
    var sMinutes = ref(); 
    var sSeconds = ref();
    var st;

    function sessionTimer(){
        sMinutes.value = 9;
        sSeconds.value = 59;

        st = setInterval(() => {
            if(sMinutes.value === 0 && sSeconds.value === 0){
                clearInterval(st);
            }
            else if(sSeconds.value === 0){
                sSeconds.value = 59;
                sMinutes.value--;
            }
            else{
                sSeconds.value--;
            }
        }, 1000);
    }

    var mins = computed(() => {
        if(sMinutes.value < 10){
            return '0' + sMinutes.value;
        }
        else{
            return sMinutes.value;
        }
    });

    var secs = computed(() => {
        if(sSeconds.value < 10){
            return '0' + sSeconds.value;
        }
        else{
            return sSeconds.value;
        }
    });

    function extendSession(){
        //close session modal
        store.commit('setSMToFalse');

        clearInterval(st);

        store.dispatch('extendSession');
    }

    function clearSetInterval(){
        clearInterval(st);
    }

    return{
        bool,
        mins,
        secs,
        extendSession,
        clearSetInterval
    }
 }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
#navbar{
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    width: 260px;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #6e72fc;
    background-image: linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%);
}
#content{
    margin: 0 0 0 260px;
    padding: 0;
}
#smallNav{
    display: none;
}
#SessionTimeoutModal .modal-body{
    text-align: center;
}
#SessionTimeoutModal p{
    font-size: 18px;
}

@media (max-width: 850px){
    #navbar{
        display: none;
        width: 0;
    }
    #content{
        margin: 0 0 0 0;
    }
    #smallNav{
        display: block;
        position:sticky;
        top: 0;
        z-index: 1;
    }
}


</style>