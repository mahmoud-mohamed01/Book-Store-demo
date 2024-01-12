import mongodb from "mongodb"


let db;
let client;


async function mongoConnect(){
  const mongoClient=mongodb.MongoClient;
  try
   {
      client= await mongoClient.connect("mongodb+srv://admin-mahmoud:mahmoud123@cluster0.rkskfqb.mongodb.net/bookStore");
      db = client.db("bookStore");
      console.log(db);
   } 

    catch(err)
    {
      console.log(err);
    }



}

function getDb()
{
  if(db)
  {
    return db;
  }
  else
  {
    throw "no DataBase found";
  }
}


export{getDb};
export default mongoConnect;