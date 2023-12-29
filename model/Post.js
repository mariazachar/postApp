const EntitySchema = require('typeorm').EntitySchema;

const PostEntity = new EntitySchema({
    name: "Post",
    target: "Post",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        }, 
        title: {
            type: "varchar"
        },
        text: {
            type: "text"
        }
    },
    relations: {
        categories: {
            target: "Category",
            type: "many-to-many",
            joinTable: true,
            cascade: true // οταν κανουμε update, διαγραφή και εχει στοιχεια και απο τον πίνακα category να ενημερωθει και ο ενδιαμεσος πίνακας
        }
    }
});

module.exports = {PostEntity};

