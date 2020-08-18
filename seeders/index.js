const faker = require('faker')
const random = require('random')
const { Author, Book } = require('../models')

const init = async () => {
    for (let index = 0; index <= 10; index++) {
        await Author.create({
            name: faker.name.firstName()
        })
    }

    for (let index = 0; index <= 100; index++) {
        await Book.create({
            name: faker.lorem.sentence(),
            authorId: random.int(1, 10)
        })
    }
}

init()