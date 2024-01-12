import { getDb } from "../util/dbConfig.js";
import mongoose from "mongoose";


const Schema= mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    requierd: true,
  },

  imageUrl: {
    type: String,
    requierd: true,
  },
  description: {
    type: String,
    requierd: true,
  },
  price: {
    type: Number,
    requierd: true,
  },
  userID:{
    type:Schema.Types.ObjectId,
    ref:"User",
    requierd:true,
  }
});




export default mongoose.model("Product",productSchema);









/*


class Product 
{
  constructor(title,price,description,imageUrl,id,userId)
  {
    this.title=title;
    this.price=price;
    this.imageUrl=imageUrl;
    this.description=description;
    this._id=id;
    this.userId=userId;

  }

  async save()
  {
    const db = await getDb();
    if(this._id)
    {

          let result= db.collection("products").updateOne({_id:new mongodb.ObjectId(this._id)},{$set:{title:this.title,price:this.price,description:this.description,imageUrl:this.imageUrl}});
    }
    else
    {
      let res = await db.collection("products").insertOne(this);
      console.log(res);

    }
   
    
  }


  static async fetchAll()
  {
    const db=await getDb();
    let result=await db.collection("products").find().toArray();


    return result;

  }


  static async findById(id)
  {
       const db = await getDb();
       let result = await db.collection("products").findOne({_id: new mongodb.ObjectId(id)});


       return result;

  }

  static async deleteById(id)
  {
    const db =await getDb();
    let result= db.collection("products").deleteOne({_id: new mongodb.ObjectId(id)})
  }
  

  static async UpdateProduct(id,imageUrl,description,title,price)
  {
    const db =await getDb();
  }
}

*/




























/*let products = [];
let count=1;

import db from "../util/dbConfig.js";

class Product {
  constructor(title, imageUrl, description, price, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = id;
  }

  async save() {
    if (this.id) {
      let idx = products.findIndex((prod) => {
        return prod.id == this.id;
      });
      let updatedProduct = {
        title: this.title,
        imageUrl: this.imageUrl,
        description: this.description,
        price: this.price,
        id: this.id,
      };
      products[idx] = updatedProduct;
    } else {
      products.push({
        title: this.title,
        imageUrl: this.imageUrl,
        description: this.description,
        price: this.price,
        id: count,
      });

      await db.query(
        "insert into products (title,imageurl,description,price) values ($1,$2,$3,$4)",
        [this.title, this.imageUrl, this.description, this.price]
      );

      count++;
    }
  }

  static delete(id) {
    products = products.filter((prod) => {
      return prod.id != id;
    });
  }

  static async fetchAll() {
    let data = await db.query("select * from products");
    return data.rows;
  }

  static async getProductByID(id) {
    let product = await db.query("select * from products where id = $1", [id]);

    return product.rows[0];
  }
}
*/
