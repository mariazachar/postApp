const typeorm = require('typeorm');
require('dotenv').config();


const CategoryEntity = require('./model/Category').CategoryEntity
const PostEntity = require('./model/Post').PostEntity;

const dataSource = new typeorm.DataSource({
    type: "mariadb",
    host: process.env.HOST,
    port: 3306,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [CategoryEntity, PostEntity],
    synchronize: true // διαβαζει τις οντοτητες και τις συσχετίσεις και δημιουργει τους αντίστοιχους πινακες στη βαση
});

dataSource
    .initialize()
    .then(function(){
        console.log("Connected to database");
    })
    .catch(function(error){
        console.log('Problem in connection to database', error)
    })

    // το datasource ειναι η συνδεση με τη βάση μου και βασει αυτου θα κανουμε όλες τις κλήσεις για διαγραφη , update κτλ

module.exports = {dataSource}
