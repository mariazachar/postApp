const categoryServices = require('../services/category.services')

exports.findAll = async (req, res) => {
    console.log("Find all categories");
    try{
        const result =  await categoryServices.findAll();
        res.status(200).json({status: true , data: result});
        console.log("Success in find all category");
    } catch {
        res.status(400).json({status: false});
        console.log("Problem in finding all category");
    }
    
}

exports.findOne = async (req, res) => {
    const id = req.params.id;
    console.log("Find category with id", id);
    try{
        const result =  await categoryServices.findOne(id);
        res.status(200).json({status: true , data: result});
        console.log("Success in find category with id", id);
    } catch {
        res.status(400).json({status: false});
        console.log("Problem in finding category with id", id);
    }
    
}

exports.create = async (req, res) => {
    console.log("Insert new category name");
    const name = req.body.name
    try{
        const result =  await categoryServices.create(name);
        res.status(200).json({status: true , data: result});
        console.log("Success in saving new category");
    } catch {
        res.status(400).json({status: false});
        console.log("Problem in saving new category");
    }
}

exports.update = async (req, res) => {
    const id = req.params.id
    console.log("Update category wit id", id);

    try{
        const result =  await categoryServices.update(req.body);
        res.status(200).json({status: true , data: result});
        console.log("Success in updating  category");
    } catch {
        res.status(400).json({status: false, data: err});
        console.log("Problem in updating category");
    }
}

exports.delete  = async (req, res) => {
    const id = req.params.id
    console.log("Delete category with id", id);

    try{
        const result =  await categoryServices.deleteCategory(id);
        res.status(200).json({status: true , data: result});
        console.log("Success in deleting category");
    } catch {
        res.status(400).json({status: false, data: err});
        console.log("Problem in deleting category");
    }
}