import {Router} from "express"
import {asyncHandler} from '../../middleware/asyncHandling.js'
import {auth} from '../../middleware/auth.js'
import * as coupon from './controller/coupon.controller.js'
import { endpoint } from "./coupon.endpoint.js";
import { fileValidation, myMulter } from "../../services/multer.js"
const router=Router() 

router.post('/',auth(endpoint.add),asyncHandler(coupon.createdCoupon))
router.put('/:id',auth(endpoint.update),asyncHandler(coupon.updateCoupon))
router.delete('/:id',auth(endpoint.delete),asyncHandler(coupon.deleteCoupon))
router.get('/validCoupon',coupon.getValidCoupon)
// router.get('/',asyncHandler(brand.getAllBreand))
export default router;