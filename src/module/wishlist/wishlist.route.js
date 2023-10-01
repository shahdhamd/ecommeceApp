import { Router } from "express";
import { endpoint } from "./wishlist.endpoint.js";
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../middleware/asyncHandling.js";
import * as wishlist from './controller/wishlist.controller.js'
const router=Router({mergeParams:true});
// router.get('/',(req,res)=>{
//     const {productId}=req.params; //{mergeParams:true} مشان اقدر اوصل للاي دي لازم احط 
//     res.json(productId)
// })
router.post('/',auth(endpoint.add),asyncHandler(wishlist.createWishlist))
router.delete('/',auth(endpoint.remove),asyncHandler(wishlist.remove))
export default router