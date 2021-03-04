const mongoose = require('mongoose')
const express =require('express');
const Product = require('../Models/ProductsModel');
const Category = require('../Models/CatagoryModel');
const router = express.Router();
router.post('/',async (req, res)=>{
let category = await Category.findById(req.body.category)
if(!category)
return res.status(404).send({
    message:"Không tim thấy category ",
    successs:false
})
let product = new Product({
        name:req.body.name,
        price:req.body.price,
        icon:req.body.icon,
        category:req.body.category,
        image:req.body.image,
        Featured:req.body.Featured,
        CountInStock:req.body.CountInStock
    }) 
    product = await product.save().catch((err)=>{
        res.status(500).json({
            message:err,
            successs: false
        })
    })
    res.status(200).json({
        data:product,
        successs: true
    })
})
router.get('/', async(req, res)=>{
    let listproduct = await Product.find().populate('category')
    if(!listproduct)
    return res.status(400).json({
        success:false,
        message:"Lấy Không thành công"
    })
    res.status(200).json({
        success:true,
        data:listproduct
    })
})
router.get('/:id',async (req, res)=>{
    let productdetail = await Product.findById(req.params.id).populate('category')
    if(!productdetail)
    return res.status(400).json({
        success:false,
        message:"Lấy Không thành công"
    })
    res.status(200).json({
        success:true,
        data:productdetail
    })

})
router.delete('/:id',async (req, res)=>{
    if(!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(404).send({
            message:"product ivalid",
            success:false,
        })
    }
    else {
    let productdetail = await Product.findByIdAndDelete(req.params.id)
    if(!productdetail)
    return res.status(400).json({
        success:false,
        message:"delete Không thành công"
    })
    res.status(200).json({
        success:true,
        message:"delete thành công"
    })
}
})
module.exports = router