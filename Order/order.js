const express = require('express')
// const { default: mongoose, Model } = require('mongoose')
const Authenticate=require('../Authenticate')
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
const router = express.Router()
app.use(express.json());

// const ORDER =mongoose.model("ORDER")
// const UserIDs="";
const ORDER =require("./orderModel/ordermodel")

router.get('/order',Authenticate,(req,res)=>{
  
  res.send(req.rootUser)

  // UserIDs=req.userID
  console.log("this is my id "+ req.userID)//112345655zsfzs 
  // console.log("mee")
})

router.post("/", async (req, res) => {
  try {
    const order = req.body;
    const date = new Date();
    const n = date.toDateString();
    const time = date.toLocaleTimeString();
    let k = n.split(" ");
    let totalquantity = 0;
    let totalcost = 0;
    const created = (k[1], k[2], k[3], time);

    
    let arr = [];

    for (let value in order) {
      let subarr = [];
      let appenddata = "";
      if (order[value].quantity) {
        if (order[value].washing) {
          appenddata = appenddata + "washing,";
        }
        if (order[value].ironing) {
          appenddata = appenddata + "ironing,";
        }
        if (order[value].drycleaning) {
          appenddata = appenddata + "drycleaning,";
        }
        if (order[value].chemicalcleaning) {
          appenddata = appenddata + "chemicalcleaning,";
        }
        subarr.push(value);

        subarr.push(appenddata);
        subarr.push(order[value].quantity);
        subarr.push(order[value].bill);
        subarr.push(subarr[2]*subarr[3]);
        arr.push(subarr);
        totalcost = totalcost + subarr[4];
        totalquantity = totalquantity + order[value].quantity;
      }
    }
    const {USER, user, shirts, tshirts, trousers, jeans, boxers, joggers, others } =
      req.body;
      
    console.log(USER+"found............................................................");
    console.log(user);
    console.log(totalquantity, totalcost);
    const orders = await ORDER.create({
      washtype: arr,
      
      shirts,
      tshirts,
      trousers,
      jeans,
      boxers,
      joggers,
      others,
      user:"welcome",
      totalquantity: totalquantity,
      subtotalcost: totalcost,
      totalcost: totalcost + 90,
      orderdate: created,
      storelocation: "PUNE",
      phonenumber: "8753885949",
      USER
    });
    console.log(orders , "112345655zsfzs");
    res.status(200).json({
      status: "Success",
      orders,

    });
  } catch (e) {
    res.json({
      status: "failed",
    });
  }
});
// router.get('/products', async(req, res) => {
//     try{
        
//         const data = await ORDER.find().sort({_id:-1});
//         res.json(data);
//     }
//     catch(e){
//         res.status(406).json({
//             status:"Failed",
//             message:e.message,
//         })
//     }
// })

// router.post('/createorder',async(req,res)=>{

//     try{
//         await ORDER.create({user:req.user, ...req.body});
//             res.status(201).json({
//                 status : "success",
//                 message: "data added"
//             });
//         }
//         catch(e){
//             res.status(406).json({
//                 status:"Failed",
//                 message:e.message,
//             })
//         }
   
// })
router.get('/products', async(req, res) => {
    try{
        
        const data = await ORDER.find().sort({_id:-1});
        res.json(data);
    }
    catch(e){
        res.status(406).json({
            status:"Failed",
            message:e.message,
        })
    }
})


router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await ORDER.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.patch('/update/:id',async(req,res)=>{
    try{
        const id =req.params.id;
        const updateOrder =req.body;
        const result=await ORDER.findByIdAndUpdate(
            id,updateOrder
        )
        res.send(result)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})
router.delete('/delete/:id',async(req,res)=>{
    try{
        const id =req.params.id;
        const deleteORDER=await ORDER.findByIdAndDelete(id)
        res.send(`data deleted ${deleteORDER}`)
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
})


module.exports=router