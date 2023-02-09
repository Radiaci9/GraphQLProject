const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
  
const app = express();

app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/graphql');
mongoose.connection.once('open', () => {
  console.log('Connected to db');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('now listening for request on port 4000');
});
