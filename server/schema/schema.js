const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLNonNull } = require('graphql/type');
const { GraphQLList } = require('graphql');
const BookModel = require('../models/book');
const AuthorModel = require('../models/author');

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
     id: {
      type: GraphQLID
     },
     name: {
      type: GraphQLString,
     },
     genre: {
      type: GraphQLString,
     },
     author: {
      type: AuthorType,
      resolve(parent, args){
        return AuthorModel.findById(parent.authorId);
      }
     },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
     id: {
      type: GraphQLID
     },
     name: {
      type: GraphQLString,
     },
     age: {
      type: GraphQLInt,
     },
     books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return BookModel.find({authorId: parent.id});
      }
     }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, {id}) {
        return BookModel.findById(id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(parent, {id}) {
        return AuthorModel.findById(id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return BookModel.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args){
        return AuthorModel.find({});
      }
    }
  },
});

const MutationQuery = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve(parent, {name, age}){
        const newAutor = new AuthorModel({name, age});

        return newAutor.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)},
      },
      resolve(parent, {name, genre, authorId}){
        const newBook = new BookModel({name, genre, authorId});

        return newBook.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: MutationQuery,
});
