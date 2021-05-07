<template>
  <div id="notescardView" class="col-xxl-3 col-xl-3 col-lg-3 col-md-4 col-6">

    <div class="notesCard">

      <div class="notesHeader">
        <span class="material-icons md-cat">local_offer</span>
        <div class="notesTag text-truncate" :title="notes.category">{{ notes.category }}</div>
        <span class="material-icons md-trash" @click="deleteNotes">delete</span>
      </div>

      <div class="hrtag"></div>

      <router-link :to="{ name: 'NotesEditorUpdateView', params: { id: notes.id } }" class="iroute">

        <div class="notesContent">
          <div class="notesTitle text-truncate" :title="notes.title">{{ notes.title }}</div>

          <div class="notesFooter">
            <span class="material-icons md-daterange">date_range</span>
            <div class="notesDate">{{ notes.date }}</div>
          </div>
        </div>

      </router-link>

    </div>

  </div>
</template>

<script>
import swal from 'sweetalert';
import { useStore } from 'vuex';

export default {
  props: ['notes'],
  setup(props){
    const store = useStore();

    function deleteNotes(){
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this note!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          store.dispatch('deleteNotesFromDb', { nid: props.notes.id });

          swal("Poof! Your note has been deleted!", {
            icon: "success",
          });
        }
      });
    }

    return{
      deleteNotes
    };
  }
}
</script>

<style>
  .col-6{
    padding: 0 6px;
  }
  .notesCard{
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 2px 25px rgba(0, 0, 0, 0.11);
    margin: 20px 0 0 0;
    box-sizing: border-box;
  }
  .hrtag{
    width: 90%;
    height: 1px;
    margin: 0 auto;
    background-color: rgb(185, 185, 185);
  }
  .iroute{
    text-decoration: none;
    color: black;
  }
  .iroute:hover{
    color: black;
  }
  .notesHeader, .notesFooter{
    display: flex;
  }
  .notesTag{
    padding: 10px 0;
    margin-left: 4px;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .notesContent{
    padding: 10px;
    padding-top: 15px;
  }
  .notesTitle{
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 20px;
    font-weight: 500;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  .notesFooter{
    padding-top: 15px;
  }
  .notesDate{
    font-size: 15px;
  }

  /* icons */
  .md-cat{
    padding: 10px 0 10px 10px;
    color: #9900ff;
  }
  .md-trash{
    color: red;
    padding: 10px;
    cursor: pointer;
  }
  .md-daterange{
    font-size: 20px;
    margin-right: 2px;
    color:rgb(0, 132, 255);
  }
</style>