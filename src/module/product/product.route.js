import {Router} from "express"
import {asyncHandler} from '../../middleware/asyncHandling.js'
import {auth} from '../../middleware/auth.js'
import * as product from './controller/product.controller.js'
import wishListRouter from '../wishlist/wishlist.route.js'
import { endpoint } from "./product.endpoint.js";
import { fileValidation, myMulter } from "../../services/multer.js"
import reviewRouter from '../review/review.route.js'
const router=Router()
router.use('/:productId/wishlist',wishListRouter)
router.use('/:productId/review',reviewRouter)
router.post('/',auth(endpoint.add),myMulter(fileValidation.imag).array('image',5),asyncHandler(product.createdProduct))
router.put('/:id',auth(endpoint.update),myMulter(fileValidation.imag).array('image',5),asyncHandler(product.updateProduct))
router.get('/',asyncHandler(product.getAllProducts)) //اذا اي واحد معه الرابط بقدر يدخل auth ما اعطيته 
export default router;