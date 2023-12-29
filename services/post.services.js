const {dataSource} = require("../connect");
const PostEntity = require("../model/Post").PostEntity;

function findAll() {
    const result = dataSource
        .getRepository(PostEntity)
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.categories", "ct")
        .getMany()
        // .catch(error=> console.log(error)); (μπορουμε να βαλουμε catch αν θελουμε)

        return result
}

function findOne(id) {
    const result = dataSource
        .getRepository(PostEntity)
        .createQueryBuilder()
        .leftJoinAndSelect("post.categories", "ct")
        .where("post.id = :id", { id: id})
        .getOne()
      
        return result
}

function create(data) {
    const result = dataSource
        .getRepository(PostEntity)
        .save(data)
        .catch((error) => console.log("Problem in saving post", error))
    return result

    //  ο τρόπος που καταχωρούμε ειναι ο παρακάτω για να μας περασει και τα στοιχεία στον ενδιάμεσο πίνακα
    //  θα πρεπει το categories να γραφετει σαν πινακας
    // {
    //     "title": "my second post",
    //     "text": "my text for post 2",
    //     "categories": [
    //         { "id": 2} , 
    //         { "id": 3} ]
    // }
}

function updatePost(data) {
    const result = dataSource
        .getRepository(PostEntity)
        .createQueryBuilder()
        .update(PostEntity)
        .set ({
            title: data.title, 
            text: data.text
        })
        .where("id = :id", { id: data.id})
        .execute()
      
        return result
}

async function updateCategory(data) {
    const actualRealationShips = await dataSource // να μας φερει αυτο το post id ανηκει
        .getRepository(PostEntity)
        .createQueryBuilder()
        .relation (PostEntity, "categories") // αλλος τρόπος αντι για join
        // για το realation που τπάρχει στο post me to categories 
        .of(data.id)
        .loadMany()
        
    const result = await dataSource
        .getRepository(PostEntity)
        .createQueryBuilder()
        .relation(PostEntity, "categories")
        .of(data.id)
        .addAndRemove(data.categories, actualRealationShips)
        .catch((error) => console.log("Cannot update categories", error))
    return result
}

function deletePost(id) {
    const result = dataSource
        .getRepository(PostEntity)
        .createQueryBuilder()
        .delete()
        .from (PostEntity)
        .where("id = :id", { id: data.id})
        .execute()
      
        return result
}

function deleteCategories(data) {
    const result = dataSource
        .getRepository(PostEntity)
        .createQueryBuilder()
        . relation(PostEntity, "categories")
        .of(data)
        .remove (data.categories)

      
        return result
}

// {
//     "id": 2,
//     "categories": [
//         {"id": 5}
//     ]
// }


module.exports = {findAll, findOne, create, updatePost, updateCategory,deletePost, deleteCategories }