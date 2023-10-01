import {Router} from "express"
import {asyncHandler} from '../../middleware/asyncHandling.js'
import {auth} from '../../middleware/auth.js'
import * as cart from './controller/cart.controller.js'
import { endpoint } from "./cart.endpoint.js";
import { fileValidation, myMulter } from "../../services/multer.js"
const router=Router() 

router.post('/',auth(endpoint.add),asyncHandler(cart.addToCart))
// router.put('/:id',auth(endpoint.update),myMulter(fileValidation.imag).single('image'),asyncHandler(brand.updatebrand))
// router.get('/',asyncHandler(brand.getAllBreand))
export default router;