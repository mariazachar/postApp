const EntitySchema = require('typeorm').EntitySchema;
//  απο την βιβλιοθήκη typeorm φερε οτι χρειάζομαι για να φτιαξω το σχήμα μου (EntitySchema)

const CategoryEntity = new EntitySchema({
    name: "Category",
    target: "Category", // εδω δηλώνουμε ενα όνομα ή συντομογραφια για το πως θα καλουμε το σschema μας)
    columns: {
       id: {
        primary: true,
        type: "int",
        generated: true
       },
       name: {
        type: "varchar"
       }
    }
});

module.exports = {CategoryEntity}



