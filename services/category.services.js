const CategoryEntity = require('../model/Category').CategoryEntity
//  φερε τι σχήμα πιυ εχω δημιουργήσει 
const dataSource = require('../connect').dataSource
//  φερε τη μεταβλήτη που εχει ολές τις ιδιοτητες που εχει η βαση μου , που εχει κνει τη συνδεση 

function findAll() {
    console.log("Service category findall")
    const result = dataSource
        .getRepository(CategoryEntity)
        .createQueryBuilder()
        .select("ct") // slecte * from Category as category (το ct Μεσα στη παρεμνθεση ειναι alaias)
        .from(CategoryEntity, 'ct') //  αν απο πανω δεν χρησιμοποιουσαμε alaias τοτε δεν θα βαζαμε και εδω το 'ct'
        .getMany()
        // .catch(error=> console.log(error)); (μπορουμε να βαλουμε catch αν θελουμε)

        return result
}


function findOne(value) {
    console.log("Service category findOne with id")
    const result = dataSource
        .getRepository(CategoryEntity)
        .createQueryBuilder()
        .select("ct") 
        .from(CategoryEntity, 'ct') 
        .where('ct.id = :x', {x: value}) 
        .getOne()
       
        return result
}

function create(name) {
    console.log("Service category create", name)
    const result = dataSource
        .getRepository(CategoryEntity)
        .createQueryBuilder()
        .insert()
        .into(CategoryEntity)
        .values([
            {name: name}
        ])
        .execute()
        .catch(error=> console.log(error));

        return result
}

function update(data) {
    console.log("Service category update with id")
    const result = dataSource
        .getRepository(CategoryEntity)
        .createQueryBuilder()
        .update(CategoryEntity) 
        .set({name: data.name}) 
        .where('id = :id', {id: data.id}) 
        .execute()
        .catch(error=> console.log(error));
       
        return result
}

function deleteCategory(value) {

    const result = dataSource
        .getRepository(CategoryEntity)
        .createQueryBuilder()
        .delete(CategoryEntity)
        .from(CategoryEntity)
        .where('id = :x', {x: value}) 
        // .getQuery() μου εμφανίζει το query σαν  result ( h to getquery h to execute)
        .execute()
        .catch(error=> console.log(error));
       
        return result
}




module.exports = { findAll, findOne, create, update, deleteCategory }