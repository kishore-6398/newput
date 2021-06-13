<template>
    <div id="starterView">

      <div class="pageheader">
        <img src="../assets/newputLogo.jpg" class="starterImage" alt="newput start image">
        <div class="pageTitleWrapper">
          <div class="pageTitle">NEWPUT App</div>
          <div class="pageContent lead">
            <p>Newput is a light-weight app built using Vue and Firebase which manages all your todos, urls, notes, passwords and expenses.</p>
          </div>
        </div>
      </div>

      <div class="row">

        <div class="col-xxl-2 col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6 cards">
          <router-link class="card-route" to="/todo" >
            <div class="card-start">
              <img src="../assets/todoCard.png" class="card-img-top-start" alt="newput start image">
              <div class="card-body-start">
                <p class="card-title-start">Todo</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-xxl-2 col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6 cards">
          <router-link class="card-route" to="/pvault" >
            <div class="card-start">
              <img src="../assets/passwordCard.jpg" class="card-img-top-start" alt="newput start image">
              <div class="card-body-start">
                <p class="card-title-start">Password</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-xxl-2 col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6 cards">
          <router-link class="card-route" to="/url" >
            <div class="card-start">
              <img src="../assets/urlCard.jpg" class="card-img-top-start" alt="newput start image">
              <div class="card-body-start">
                <p class="card-title-start">URL</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-xxl-2 col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6 cards">
          <router-link class="card-route" to="/notes" >
            <div class="card-start">
              <img src="../assets/notesCard.jpg" class="card-img-top-start" alt="newput start image">
              <div class="card-body-start">
                <p class="card-title-start">Notes</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-xxl-2 col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6 cards">
          <router-link class="card-route" to="/expense/form" >
            <div class="card-start">
              <img src="../assets/expenseCard.jpg" class="card-img-top-start" alt="newput start image">
              <div class="card-body-start">
                <p class="card-title-start">Expense</p>
              </div>
            </div>
          </router-link>
        </div>

        <div class="col-xxl-2 col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6 cards">
          <router-link class="card-route" to="/weather" >
            <div class="card-start">
              <img src="../assets/weatherCard.png" class="card-img-top-start" alt="newput start image">
              <div class="card-body-start">
                <p class="card-title-start">Weather</p>
              </div>
            </div>
          </router-link>
        </div>

      </div>

    </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
  
    var name = computed(() => store.getters.getUsername);
    var email = computed(() => store.getters.getuserEmail);

    store.commit("stopSpin");

    return{
      name,
      email
    }
  }
}
</script>

<style>
  #starterView{
    margin: 0 50px 30px 50px;
  }
  .pageheader{
    display: flex;
    justify-content:space-evenly;
    align-items: center;
  } 
  .starterImage{
    height: 310px;
    width: 310px;
  }
  .pageTitleWrapper{
      text-align: center;
    }
  .pageTitle{
    font-size:55px;
    font-family:'Kalam', cursive;  
  }
  .pageContent{
    margin-top: 20px;
    font-weight: 400;
  }
  .card-start{
    margin-top: 20px;
    position: unset !important;
    min-height: 180px;
    border: none;
    border-radius: 20px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
  }
  .card-img-top-start{
    width: auto;
    height: auto;
    transition: 0.5s;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
  .card-body-start{
    padding: 15px;
  }
  .card-title-start{
    font-size: 18px !important;
    margin-bottom: 0;
    text-align: center;
    font-style: italic;
    font-weight: bold;
  }
  .card-route{
    text-decoration: none;
    color: black;
  }
  .card-route, .card-start:hover{
    box-shadow: 0 2px 40px rgba(0, 0, 0, 0.18);
    color: black;
  }

  @media (max-width: 850px){
    #starterView{
      margin: 0 30px 30px 30px;
    }
    .pageheader{
      display: flex;
      flex-direction: column;
    } 
    .starterImage{
      height: 200px;
      width: 200px;
    }
    .pageTitle{
      font-size:40px;
    }
    .pageContent{
      margin-top: 10px;
    }
    .cards{
      padding: 0 6px;
    }
  }
</style>