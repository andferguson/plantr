const db = require('./models')
const {vegetable} = db.models
console.log(db.models)
db.sync({ force: true })
    .then(() => {
        console.log('Database synced!')
        // db.close() // only if using a version of node without `finally`
    })
    .then(() =>  
    {return vegetable.bulkCreate(
        [{
            name: 'Carrot',
            color: 'Orange',
            planted_on: new Date()
        }]    
    )}
    )
    .catch(err => {
        console.log('Disaster! Something went wrong! ')
        console.log(err)
        // db.close() // only if using a version of node without `finally`
    })
    .finally(() => { // only if using a version of node WITH `finally`
        db.close()
    })
