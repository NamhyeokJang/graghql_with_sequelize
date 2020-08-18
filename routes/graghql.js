const router = require('express').Router()
const { Author, Book } = require('../models')
const { graphqlHTTP } = require('express-graphql')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql')

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents an author of a book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        books: {
            type: GraphQLList(BookType),
            resolve: async (author) => {
                return await Book.findAll({
                    where: {
                        authorId: author.id
                    }
                })
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        authorId: { type: GraphQLNonNull(GraphQLInt) },
        author: {
            type: AuthorType,
            resolve: async (book) => {
                return await Author.findOne({
                    where: {
                        id: book.authorId
                    }
                })
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List of All Authors',
            resolve: async () => {
                return await Author.findAll()
            }
        },
        author: {
            type: AuthorType,
            description: 'A Single Author',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async (_, args) => await Author.findByPk(args.id)
        },
        books: {
            type: new GraphQLList(BookType),
            description: 'List of All Books',
            resolve: async () => {
                return await Book.findAll()
            }
        },
        book: {
            type: BookType,
            description: 'A Single Book',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async (_, args) => await Book.findByPk(args.id)
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        addAuthor: {
            type: AuthorType,
            description: 'Add Author',
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                }
            },
            resolve: async (_, args) => {
                return await Author.create({
                    name: args.name
                })
            }
        },
        addBook: {
            type: BookType,
            description: 'Add Book',
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                },
                authorId: {
                    type: GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: async (_, args) => {
                return await Book.create({
                    name: args.name,
                    authorId: args.authorId
                })
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

router.use('/', graphqlHTTP({
    graphiql: true,
    schema: schema
}))

module.exports = router