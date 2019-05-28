<template>
  <div id="app">
    <h3>List of Champion</h3>
    <div v-for="champion in championList" v-bind:key="champion.id" >
      List: {{ champion }}
    </div>
    <hr>
    <br>
    <b-form @submit.prevent="handleSubmitForAdd" >
      Name
      <b-form-input
        type="text"
        class="form-control"
        placeholder="Enter Champion Name"
        v-model="champ.name"
        autocomplete="name"
        name="Name"
      ></b-form-input>          
      AttackDamage
      <b-form-input
        type="text"
        class="form-control"
        placeholder="Enter Champion AttackDamage"
        v-model="champ.attackDamage"
        autocomplete="attackDamage"
        name="AttackDamage"
      ></b-form-input> <br><br>
      <b-button type="submit" class="btn-submit mr-3"> Add</b-button>
    </b-form>
    <hr>
    <br>
    <br>
    <b-form @submit.prevent="handleSubmitForUpdate" >
      Id
      <b-form-input
          type="text"
          class="form-control"
          placeholder="Enter Champion Id"
          v-model="champ.id"
          autocomplete="id"
          name="Id"
        ></b-form-input>   
      Name
      <b-form-input
        type="text"
        class="form-control"
        placeholder="Enter Champion Name"
        v-model="champ.name"
        autocomplete="name"
        name="Name"
      ></b-form-input>       
      AttackDamage
      <b-form-input
        type="text"
        class="form-control"
        placeholder="Enter Champion AttackDamage"
        v-model="champ.attackDamage"
        autocomplete="attackDamage"
        name="AttackDamage"
      ></b-form-input> <br><br>
      <b-button type="submit" class="btn-submit mr-3"> Update</b-button>
    </b-form>
     <hr>
     <b-form @submit.prevent="handleSubmitForDelete" >
      Id
      <b-form-input
          type="text"
          class="form-control"
          placeholder="Enter Champion Id"
          v-model="champ.id"
          autocomplete="id"
          name="Id"
        ></b-form-input><br><br>   
      <b-button type="submit" class="btn-submit mr-3">Delete</b-button>
    </b-form>
     <hr>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'app',

  data () {
    return {
      submitted: false,
    }
  },
  destroyed() {
    this.resetState();
  },
  created() {
    this.getChampionList();
    this.fetchData(this.champ.id);
  },
  watch: {
    function() {
      this.resetState();
      this.fetchData(this.champ.id);
    }
  },
  computed: {
    ...mapGetters("champion", {
      championList: "championList",
      champ: "champ"
    }),
  },

  methods: {
    ...mapActions("champion", ["getChampionList","fetchData","updateChampion","storeData", "resetState","deleteChampion"]),
    handleSubmitForAdd() {
      this.submitted = true;
      this.storeData();
    },

    handleSubmitForUpdate() {
      this.submitted = true;
      this.updateChampion();
    },

    handleSubmitForDelete() {
      this.submitted = true;
      this.deleteChampion();
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
