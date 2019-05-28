import { championService } from "../../../service";
// import { state } from "fs";

function initialState() {
  return {
    championList: {},
    champ: {
      id: null,
      name: null,
      attackDamage: 0,
    },
    champion: {}
  };
}

const getters = {
    championList: state => state.championList,
    champ: state => state.champ,
    champion: state => state.champion
};

const actions = {
  getChampionList({ commit }) {
    commit("championRequest");
    championService
      .championList()
      .then(champion => {
        commit("ListSuccess", champion.data);
      })
      .catch(error => {
        commit("ListFailure", error);
      });
  },

  fetchData({ commit }, id) {
    championService
      .getChampion(id)
      .then(champion => {
        console.log(champion);
        commit("setItem", champion);
      })
  },

  storeData({  commit, state }) {
    championService.createChampion(state.champ)
      .then(champion => {
        console.log(champion);
        commit("resetState");
      })
      .catch(error => {
        console.log(error);
      });
  },

  updateChampion({ commit, state }) {
    championService
      .updateChampion(state.champ)
      .then(champion => {
        console.log(champion);
        commit("resetState");
      })
      .catch(error => {
        console.log(error);
      });
  },

  deleteChampion({ dispatch, commit, state },   ) {
    championService
      .deleteChampion(state.champ)
      .then(champion => {
        console.log(champion);
        dispatch("getChampionList");
      })
      .catch(error => {
        commit("CustomerDeleteFailure", error);
      });
  }

}

const mutations = {
  championRequest(state) {
    state.championList = {};
  },
  ListSuccess(state, champion) {
    state.championList = champion;
    console.log("Success", champion);
  },
  ListFailure(){
    console.log("List Failure.")
  },
  setItem(state, champ) {
    state.champ.id = champ.id;
    state.champ.name = champ.name;
    state.champ.attackDamage = champ.attackDamage;
  },
  resetState(state) {
    state = Object.assign(state, initialState());
    console.log(state);
  },
  customerDeleteFailure(){
    console.log("Delete Failure")
  }
};

export const champion = {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
};
