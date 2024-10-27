const cart = require('../Model/cartModel');

exports.addToCartController = async(req,res)=>{
    const userId = req.payload
    const {id,title,price,description,category,image,rating,quantity} =req.body

    try{
       const existingProduct = await cart.findOne({id,userId}) 

       if(existingProduct){
        existingProduct.quantity+=1
        existingProduct.grandTotal = existingProduct.quantity*existingProduct.price
        await existingProduct.save()
        res.status(200).json('item incremented')
       }
       else{
        const newProduct = new cart({
            id,title,price,description,category,image,rating,quantity,grandTotal:price,userId
        })
        await newProduct.save()
        res.status(200).json('new item added to cart')
       }
    }catch(error){
        console.log(error);
        res.status(401).json(error)
    }
}


exports.getItemFromCartController = async(req,res)=>{
    const userId = req.payload
    try{
        const allProductUser = await cart.find({userId})
        res.status(200).json(allProductUser)
    }catch(error){
        res.status(401).json(error)
    }

}


exports.removeItemController = async(req,res)=>{
    const {id} = req.params
    try{
         await cart.deleteOne({_id:id})
        res.status(200).json('removed the item')
    }catch(error){
        res.status(401).json(error)
    }

}

exports.incrementItem = async(req,res)=>{
    const {id} = req.params
    

    try{
       const selectedItem = await cart.findOne({_id:id})
       if(selectedItem){
        selectedItem.quantity+=1
        selectedItem.grandTotal=selectedItem.price*selectedItem.quantity 
        await selectedItem.save()
        res.status(200).json(selectedItem)
       }
       else{
        res.status(406).json("no such product")
       }
    }catch(error){
        console.log(error);
        res.status(401).json(error)
    }
}

exports.decrementItem = async(req,res)=>{
    const {id} = req.params
  
    try{
       const decrementSelectedItem = await cart.findOne({_id:id})
       if(decrementSelectedItem){
        decrementSelectedItem.quantity-=1
        if(decrementSelectedItem.quantity==0){
            await cart.deleteOne({_id:id})
            res.status(200).json("item removed from cart")
        }
        else{
            decrementSelectedItem.grandTotal=decrementSelectedItem.price*decrementSelectedItem.quantity 
            await decrementSelectedItem.save()
            res.status(200).json(decrementSelectedItem)
        }
        
        
       }
       else{
        res.status(406).json("no item found")
       }
    }catch(error){
        console.log(error);
        res.status(401).json(error)
    }
}

//empty cart
exports.emptyCartController = async(req,res)=>{
    const userId = req.payload
    try{
        await cart.deleteMany({userId:userId})
       res.status(200).json('cart deleted successfully')
   }catch(error){
        console.log(error);
       res.status(401).json(error)
   }

}