const express =require('express')
const Category = require('../Models/CatagoryModel')
const router = express.Router();
router.post('/', async (req, res)=>{
    let category = new Category ({
       name : req.body.name,
       icon:req.body.icon,
    })
    category = await category.save().catch(err=>{
        res.status(500).json({
            message:err,
            success:false,
        })
    })
    if(!category)
    return res.status(400).send({
        success:false,
        message:'tạo không thành công'
    })
    res.status(200).send({
        data:category,
        success:true,
    })
})
module.exports = router