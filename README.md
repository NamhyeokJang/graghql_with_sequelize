#NodeJS + graphQL + Sequelize + Mysql Example
---

간단한 GraphQL을 이용한 예제 

###Get Started
---
```
# install dependencies
yarn add express express-graphql graphql sequelize-cli sequelize mysql2 

# generate dummy data
yarn seed

# Run Server
yarn start

# Access GraphQLi
http://localhost:3000/graphql

```


###Table
---
######Authors
| Field | Type |
|-------|------|
| id | int |
| name | string |

######Books
| Field | Type |
|-------|------|
| id | int |
| name | string |
| authorId | int |


###Example Operations
---
Get all authors
```
{
  authors {
    id,
    name,
    books{
      id, 
      name
    }
  }
}
```

Get an author by author's id
```
{
  author(id: 1){
    id,
    name,
    books{
      id,
      name
    }
  }
}
```

Get all Books 
```
{
  books {
    id,
    name,
    author{
      id,
      name
    }
  }
}
```

Get a book by book's id
```
{
  book(id: 1){
    id,
    name,
    author{
      id,
      name
    }
  }
}
```

Add a new author
```
mutation{
  addAuthor(name: "new Author") {
    id,
    name
  }
}
```

Add a new book
```
mutation{
  addBook(name: "new Book", authorId: 1){
    id, 
    name,
    authorId
  }
}
```

