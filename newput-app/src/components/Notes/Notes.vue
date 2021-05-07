<template>
  <div>

    <div class="titlenotecard">
        <img src="../../assets/notes.png" class="notesimage" width="45" height="45" alt="notes img" />
        <h4 class="titleheading">Notes Editor</h4>
        <router-link to="/noteseditor" class="btn btn-info newnote">Add New Notes</router-link>
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

    <div class="row individual-note">
      <app-INote v-for="note in notesDataArray" :key="note.id" :notes="note" />
    </div>

  </div>
</template>

<script>
import { onMounted, computed, reactive } from 'vue';
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
    padding: 10px 25px;
    display: flex;
    align-items: center;
  }
  .titleheading{
    margin-top: 5px;
  }
  .newnote{
      margin-left: auto;
  }
  .individual-note{
    margin: 20px 10px 70px 10px;
  }
  .filterContainer{
    background-color: white;
    box-shadow: 0 2px 25px rgba(0, 0, 0, 0.13);
    padding: 12px 25px;
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
      .newnote{
          display: none;
      }
      .newnote-icon{
          display: block;
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: rgb(213, 2, 255);
          color:white;
          border-radius: 50%;
          width: 55px;
          height: 55px;
          font-size: 55px;
          box-shadow: 0 5px 40px 5px rgba(0, 0, 0, 0.12);
      }
  }
</style>
