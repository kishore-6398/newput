<template>
  <div>

    <div class="titlenotecard">
        <img src="../../assets/notes.png" class="notesimage" width="45" height="45" alt="notes img" />
        <h4 class="notestitleheading">Notes Editor</h4>
        <router-link to="/noteseditor" class="btn newnoteBtn">Add New Notes</router-link>
        <router-link to="/noteseditor"><span class="material-icons newnote-icon">add</span></router-link>
    </div>

    <div class="filterContainer">
      <div class="searchNotes">
        <input type="search" v-model="filterNotes.filterData.search" class="form-control searchNotesBar" placeholder="Search Notes..."/>
      </div>
      <div class="selectCat">
        <select class="form-select" v-model="filterNotes.filterData.tag">
          <option v-for="tag in tags" :key="tag">{{ tag }}</option>
        </select>
      </div>
    </div>

    <span v-if="notesDataArray.length > 0">
      <div class="row individual-note">
        <app-INote v-for="note in notesDataArray" :key="note.id" :notes="note" />
      </div>
    </span>
    <span v-else>
        <p class="noData">Sorry! No result found :(</p>
    </span>

  </div>
</template>

<script>
import { onMounted, computed, watch, reactive } from 'vue';
import { useStore } from 'vuex';
import INote from "./INote.vue";

export default {
  components: {
    "app-INote": INote
  },
  setup() {
    const store = useStore();
    var filterNotes = reactive({
        filterData: {
            search: '',
            tag: 'All Tags'
        }
    });

    onMounted(() => {
      store.dispatch('getNotesFromDb');
    });

    var profile = computed(() => store.getters.getProfile);

    watch(profile, () => {
      if(profile.value !== ''){
        store.dispatch("getNotesFromDb");
      }
    });

    var notesDataArray = computed(() => {
      return store.getters.getnotesArray.filter(temp => {
        if(filterNotes.filterData.tag === 'All Tags'){ 
            return temp.title.toLowerCase().match(filterNotes.filterData.search.toLowerCase()) ||
            temp.category.toLowerCase().match(filterNotes.filterData.search.toLowerCase());
        }
        else {
            return temp.category === filterNotes.filterData.tag 
            && temp.title.toLowerCase().match(filterNotes.filterData.search.toLowerCase());
        }
      });
    });

    var tags = computed(() => store.getters.getnotestags);

    return {
      notesDataArray,
      tags,
      filterNotes
    };
  }
};
</script>

<style>
  .titlenotecard{
    background-color: white;
    padding: 10px 20px;
    display: flex;
    align-items: center;
  }
  .notestitleheading{
    margin-top: 5px;
  }
  .newnoteBtn{
        margin-left: auto;
        background-color: #f977ce;
        background-image: linear-gradient(315deg, #f977ce 0%, #c373f2 74%);
        color: white;
        outline: none;
        border: none;
        font-weight: bold;
    }
    .newnoteBtn:hover{
        color: white;
        background-color: #f977ce;
        background-image: linear-gradient(315deg, #fd94da 0%, #d399f5 74%);
    }
    .newnoteBtn:focus{
        outline: none;
        border: none;
        box-shadow: 0 0 0 3px rgb(253, 253, 216);
    }
  .individual-note{
    margin: 5px 10px 70px 10px;
  }
  .filterContainer{
    background-color: #f876de;
    background-image: linear-gradient(315deg, #f876de 0%, #b9d1eb 74%);
    box-shadow: 0 2px 25px rgba(0, 0, 0, 0.13);
    padding: 12px 18px;
    display: flex;
  }
  .searchNotes, .selectCat{
    width: 30%;
  }
  .selectCat{
    margin-left: auto;
  }
  .searchNotesBar{
    border-radius: 20px;
  }
  .newnote-icon{
      display: none;
  }

  @media (max-width: 992px){
    .searchNotes, .selectCat{
        width: 50%;
    }
    .searchNotes{
        margin-right: 5px;
    }
    .selectCat{
        margin-left: 5px;
    }
  }
  @media(max-width: 850px){
      .newnoteBtn{
          display: none;
      }
      .newnote-icon{
          display: block;
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #6e72fc;
          background-image: linear-gradient(315deg, #6e72fc 0%, #ad1deb 74%);
          color:white;
          border-radius: 50%;
          width: 55px;
          height: 55px;
          font-size: 55px;
          box-shadow: 0 5px 40px 5px rgba(0, 0, 0, 0.12);
      }
      .notestitleheading{
        display: block;
      }
      .filterContainer{
        background-color:white;
        background-image: unset;
      }
  }
</style>
