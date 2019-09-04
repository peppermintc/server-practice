const { ApolloServer, gql } = require('apollo-server');
const { connectionPool } = require('./connector.js');
const jsonwebtoken = require('jsonwebtoken');

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const typeDefs = gql`

  type Verse {
      id: ID
    text: String
  }

  type Query {
    verses: [Verse]
    login(id: String, password: String): String
  }
`;

const resolvers = {
  Query: {
    verses: async () => {
        const [row, ] = await connectionPool.query(`SELECT * FROM verse`);
        return row;
    },
    login: async (_, {id, password}) => {
      console.log('args');
      console.log(id);
      console.log(password);
      return jsonwebtoken.sign(
        {
          id,
        },
        'secret',
        { expiresIn: '1d'},
      );
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
