var express = require('express');
var bodyParser = require('body-parser');
var { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
var { makeExecutableSchema } = require('graphql-tools');
var sqlConnection = require('./model.js')
var graphqlHTTP = require('express-graphql')
var cors = require('cors')

var typeDefs = [`
type Champion {
  id: ID
  name: String
  attackdamage: String
}
 
type Query {
  getChampions: [Champion]
  getChampionById(id: ID): [Champion]
}

type Mutation {
  createChampion(name: String!, attackdamage: String): Boolean
  deleteChampion(id: ID): Boolean
  updateChampion(id: ID, name: String!, attackdamage: String): Boolean
}
 
schema {
  query: Query
  mutation: Mutation
}`];

var resolvers = {
  Query: {
    getChampions(root) {
      return sqlConnection.getChampions()
    },
    getChampionById(_, args) {
      return sqlConnection.getChampionById(args.id)
    }
  },
  Mutation: {
    createChampion(_, args) {
      return sqlConnection.createChampion(args.name,args.attackdamage)
    },
    deleteChampion(_, args) {
      return sqlConnection.deleteChampion(args.id)
    },
    updateChampion(_, args) {
      return sqlConnection.updateChampion(args.id,args.name,args.attackdamage)
    }
  }
};

var schema = makeExecutableSchema({ typeDefs, resolvers });
var app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({schema, graphiql: true}))
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
console.log('waiting for database response.....')
app.listen(4000, () => console.log('Now browse to localhost:4000/graphiql'));