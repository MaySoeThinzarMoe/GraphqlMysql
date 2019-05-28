import axios from "axios";

export const championService = {
    championList,
    createChampion,
    updateChampion,
    deleteChampion,
    getChampion
};

/**
 * get Champions
 * 
 */
function championList () {
    const result =  axios.post('http://localhost:4000/graphql', {
    query: `{ 
        getChampions { 
        name 
        attackdamage
        } 
    }`
    });

    return result;
}

function createChampion(champ) {
    const name = champ.name;
    const attackDamage = champ.attackDamage;
    const result =  axios.post('http://localhost:4000/graphql',{
    query: `
    mutation CreateChampion($championName: String!, $attackDamage: String) {
        createChampion(name: $championName, attackdamage: $attackDamage)
    }`,
    variables: {
        championName: name,
        attackDamage: attackDamage
    }
    })
      
    return result
}

function updateChampion (champ) {
    const name = champ.name;
    const attackDamage = champ.attackDamage;
    const id = champ.id;
    const result =  axios.post('http://localhost:4000/graphql', {
        query: ` 
        mutation UpdatedChampion($id: ID, $championName: String!, $attackDamage: String) {
        updateChampion(id: $id, name: $championName, attackdamage: $attackDamage)
        }`,
        variables: {
        id: id,
        championName: name,
        attackDamage: attackDamage
        }
    })

    return result
}

function deleteChampion (champ) {
    const result =  axios.post('http://localhost:4000/graphql',{
    query:`
    mutation DeleteChampion($id: ID) {
        deleteChampion(id: $id)
    }`,
    variables: {
        id: champ.id
    }
    })
    
    return result
}

function getChampion (id) {
      const result = axios.post('http://localhost:4000/graphql', {
        query: ` 
        query GetChampionById($id: ID) {
          getChampionById(id: $id) { 
            id
            name
            attackdamage
          }  
        }`,
        variables: {
          id: id
        }
      })

    return result
}