const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ObjectId=Schema.ObjectId;
const orderSchema =new mongoose.Schema(
  {
    // user:{type:ObjectId,ref:"User"},
    washtype: [],
    shirts: {
      quantity: { type: Number, default: 0 },
      washing: { type: Boolean, defalut: false },
      ironing: { type: Boolean, defalut: false },
      drycleaning: { type: Boolean, defalut: false },
      chemicalcleaning: { type: Boolean, defalut: false },
    },
    tshirts: {
      quantity: { type: Number, default: 0 },
      washing: { type: Boolean, defalut: 0 },
      ironing: { type: Boolean, defalut: 0 },
      drying: { type: Boolean, defalut: 0 },
      chemicalcleaning: { type: Boolean, defalut: 0 },
    },
    trousers: {
      quantity: { type: Number, default: 0 },
      washing: { type: Boolean, defalut: 0 },
      ironing: { type: Boolean, defalut: 0 },
      drycleaning: { type: Boolean, defalut: 0 },
      chemicalcleaning: { type: Boolean, defalut: 0 },
    },
    jeans: {
      quantity: { type: Number, default: 0 },
      washing: { type: Boolean, defalut: 0 },
      ironing: { type: Boolean, defalut: 0 },
      drycleaning: { type: Boolean, defalut: 0 },
      chemicalcleaning: { type: Boolean, defalut: 0 },
    },
    boxers: {
      quantity: { type: Number, default: 0 },
      washing: { type: Boolean, defalut: 0 },
      ironing: { type: Boolean, defalut: 0 },
      drying: { type: Boolean, defalut: 0 },
      chemicalcleaning: { type: Boolean, defalut: 0 },
    },
    joggers: {
      quantity: { type: Number, default: 0 },
      washing: { type: Boolean, defalut: 0 },
      ironing: { type: Boolean, defalut: 0 },
      drywashing: { type: Boolean, defalut: 0 },
      chemicalcleaning: { type: Boolean, defalut: 0 },
    },
    others: {
      quantity: { type: Number, default: 0 },
      washing: { type: Boolean, defalut: 0 },
      ironing: { type: Boolean, defalut: 0 },
      drycleaning: { type: Boolean, defalut: 0 },
      chemicalcleaning: { type: Boolean, defalut: 0 },
    },

    totalquantity: { type: String, required: true },

    orderdate: {
      type: String,
      required: true,
    },
    subtotalcost: { type: String, required: true },
    totalcost: { type: String, required: true },

    user: {
      type: Schema.Types.ObjectId,
      ref: "REGISTER",
    },
    storelocation: {
      type: String,
      required: true,
    },
    phonenumber: { type: String, required: true },
  },

  { timestamps: true }
);
const ORDER= mongoose.model("Order",orderSchema);
 module.exports =ORDER;







// {
//     "shirts": {
//         "quantity": 1,
//         "washing":"Yes",
//         "ironing":"No",
//         "drycleaning":"yes",
//         "chemicalcleaning":"yes"
//     },
//     "tshirts": {
//           "quantity": 1,
//         "washing":"Yes",
//         "ironing":"No",
//         "drycleaning":"yes",
//         "chemicalcleaning":"yes"
//     },
//     "trousers": {
//           "quantity": 1,
//         "washing":"Yes",
//         "ironing":"No",
//         "drycleaning":"yes",
//         "chemicalcleaning":"yes"
//     },
//     "boxers": {
//           "quantity": 1,
//         "washing":"Yes",
//         "ironing":"No",
//         "drycleaning":"yes",
//         "chemicalcleaning":"yes"
//     },
//     "joggers": {
//          "quantity": 1,
//         "washing":"Yes",
//         "ironing":"No",
//         "drycleaning":"yes",
//         "chemicalcleaning":"yes"
//     }
   
// }