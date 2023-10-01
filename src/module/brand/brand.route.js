import {Router} from "express"
import {asyncHandler} from '../../middleware/asyncHandling.js'
import {auth} from '../../middleware/auth.js'
import * as brand from './controller/brand.controller.js'
import { endpoint } from "./brand.endpoint.js";
import { fileValidation, myMulter } from "../../services/multer.js"
const router=Router() 

router.post('/',auth(endpoint.add),myMulter(fileValidation.imag).single('image'),asyncHandler(brand.createdBrand))
router.put('/:id',auth(endpoint.update),myMulter(fileValidation.imag).single('image'),asyncHandler(brand.updatebrand))
router.get('/',asyncHandler(brand.getAllBreand))
export default router;