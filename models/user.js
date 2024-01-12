import mongoose from "mongoose";



const Schema=mongoose.Schema;

const userSchema=new Schema(
    {
        password:
        {
            type:String,
            required:true
        },
        email:
        {
             type:String,
            required:true

        },
        userType:String,
        
        resetToken:String,
        tokenExpirationDate:Date,
        cart:{
            items:[
                {
                    productId:{type:Schema.Types.ObjectId,ref:"Product",required:true},
                    quantity:{type:Number,required:true}
                }
            ]
        }

    });


    userSchema.methods.addToCart=async function(productId)
    {
         //check
        let productidx=this.cart.items.findIndex(prod=>{ return prod.productId==productId});
        let updatedCartItems=[...this.cart.items];

        let newQuantity=1;
        if(productidx>=0)
        {
            newQuantity=this.cart.items[productidx].quantity+1;
            updatedCartItems[productidx].quantity=newQuantity;
        }
        else
        {
            updatedCartItems.push({productId:productId,quantity:newQuantity})
        }

        let updatedCart={items:updatedCartItems};
        this.cart=updatedCart;
        await this.save();

    }


    userSchema.methods.deleteFromCart=async function(productId)
    {
      let updatedCartItems = this.cart.items.filter((i) => {
        return i.productId.toString() != productId.toString();
      });


      this.cart.items=updatedCartItems;
      await this.save();
    }
    

    export default mongoose.model("User",userSchema);







/*
import { getDb } from "../util/dbConfig.js";
import mongodb from"mongodb";
class User
{
    constructor(name,email,cart,id)
    {
        this.name=name;
        this.email=email;
        this.cart=cart;// {items:[,..,{product,quatity} , .... ], 
        this._id=id;
    }

    async save()
    {
        let db=await getDb();
        db.collection("users").insertOne(this);

    }

    addToCart(productId)
    {
        //check
        let productidx=this.cart.items.findIndex(prod=>{ return prod.productId==productId});
        let updatedCartItems=[...this.cart.items];

        let newQuantity=1;
        if(productidx>=0)
        {
            newQuantity=this.cart.items[productidx].quantity+1;
            updatedCartItems[productidx].quantity=newQuantity;
        }
        else
        {
            updatedCartItems.push({productId:new mongodb.ObjectId(productId),quantity:newQuantity})
        }

        let updatedCart={items:updatedCartItems};
        let db=getDb();
        db.collection("users").updateOne({_id: new mongodb.ObjectId(this._id)},{$set:{cart:updatedCart}})

    }


    static async findById(id)
    {

         let db = await getDb();
         let user=await db.collection("users").findOne({_id: new mongodb.ObjectId(id)});
         return user;
        

    } 

    async getCart()
    {

        let productsIds=this.cart.items.map(prod=>{ return prod.productId});
        let db= await getDb();
        let products=await db.collection("products").find({_id:{$in:productsIds}}).toArray();

        let cartProducts= products.map((p)=>{
            return{...p,quantity:this.cart.items.find((i)=>{
                 if (i.productId.toString()==p._id.toString())
                  {
                    return i.quantity;
                  }
            })}
        });
        
    

        return cartProducts;
    }



    async deleteFromCart(productId)
    {
       let db =await getDb();

      let updatedCartItems = this.cart.items.filter((i) => {
        return i.productId.toString() != productId.toString();
      });


     let updatedCart = { items: updatedCartItems };

     let res=await db.collection("users").updateOne({_id: new mongodb.ObjectId(this._id)},{$set:{cart:updatedCart}})
     console.log(res);

    }


   async addOrder()
   {
    let db=await getDb();

   let products= await this.getCart();
    let order=
    {
        items:products,
        user:
        {
            _id:new mongodb.ObjectId(this._id),
            name:this.name
        }
    }
    db.collection("orders").insertOne(order).then
    (result=>
        {
            this.cart={items:[]};
            db.collection("users").updateOne({_id: new mongodb.ObjectId(this._id)},{$set:{cart:{items:[]}}});
        }
    )
 
   }


   async getOrders()
   {
    let db=await getDb();
    let orders=await db.collection("orders").find({"user._id":new mongodb.ObjectId(this._id)}).toArray();
    return orders;
   }
}



export default User;
*/
