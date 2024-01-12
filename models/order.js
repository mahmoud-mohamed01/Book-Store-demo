import mongoose from "mongoose";


const orderSchema=mongoose.Schema(
    {
        products:[
            {
                product:
                {
                    type:Object,
                    required:true
                },
                quantity:
                {
                    type:Number,
                    required:true
                }
            }],

            user:
            {
                email:{
                    type:String,
                    required:true
                },

                userId:
                {
                    type:mongoose.Types.ObjectId,
                    required:true,
                    ref:"User"

                }
            }
       
    });




    export default mongoose.model("Order",orderSchema);