const express = require("express");
const Product = require("../Models/Product.model");
const User = require('../Models/User.model')
const userExists = async (proId) => {
  try {
    return await User.exists({_id: proId})
  } catch (error) {
    return 
    
  }
}

exports.createProduct = async(req, res)=>{
    const {proId, name, category, description, price } = req.body
    try {
        const createProducts = await Product.create({
            customerOf: proId,
            name,
            category,
            price,
            description
            
        })
        if(!createProducts) return res.status(500).json({message: "Couldnot create product"})
        
        res.status(201).json({message: "Product Created", product: createProducts})
    } catch (error) {
        res.status(500).json({message: "Couldnot create product", error: error.message})
    }
}

exports.getAllProducts = async(req, res) => {
    const { proId }  = req.params
    
    // const exists = await userExists(proId)
    // if(!exists) return res.status(400).json({message: "User not exist"})
    try {
        const products = await Product.find({customerOf: proId})
        res.status(200).json(products)
    }
    
    catch (error) {
        res.status(500).json({message: "Failed to load"})
    }
}

exports.viewProduct = async (req, res) => {
  const { proId, productId } = req.params;
  const exists = await userExists(proId)
  if(!exists) return res.status(400).json({message: "User not exist"})
  try {
    const productDetails = await Product.findOne({
      _id: productId,
      customerOf: proId,
    });
    if (!productDetails)
      return res.status(404).json({ message: "Customer not found" });

    res.status(200).json(productDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrive customer", error: error.message });
  }
};