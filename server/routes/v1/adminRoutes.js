import express from 'express'


import { userGetALL } from '../../controller/userController.js'
import { adminAccoutRestore, adminDelete, adminGet, adminLogin, adminLogout, adminOtpGenerate, adminProfile, adminSignup, adminSoftDelete, AdminTheaterOwnerDelete, adminUpdate, checkAdmin, userDeleteByAdmin} from '../../controller/adminController.js'
import { authAdmin } from '../../middleware/authAdmin.js'
import { theaterList } from '../../controller/theaterController.js'
import { movieList } from '../../controller/movieController.js'
import { totalPaymentList } from '../../controller/movieTicketController.js'
import { upload } from '../../middleware/imageUploadMiddleware.js'
import { errorSignupHandler, loginErrorHandler } from '../../middleware/error.js'
import { movieRatingDelete, movieRatingGetAdmin, movieRatingGetAll } from '../../controller/ratingController.js'
import { ownerGetALL } from '../../controller/theaterOwnerController.js'




const router = express.Router()

router.post('/siginup',errorSignupHandler,adminSignup)
router.post('/login',loginErrorHandler,adminLogin)

router.delete('/account-delete',authAdmin,adminDelete)
router.put('/soft-delete',authAdmin,adminSoftDelete)
router.post('/otp',adminOtpGenerate)
router.put('/account-restore',adminAccoutRestore)


router.put('/update',authAdmin,upload.single('profile-pic'),adminUpdate)

// 
router.get('/logout',authAdmin,adminLogout)
router.get('/profile',authAdmin,adminProfile)
router.get('/check-admin',authAdmin,checkAdmin)

// for dashboard
router.get('/all-users',authAdmin,userGetALL)
router.get('/all-admin',authAdmin,adminGet)
router.get('/theater-list',authAdmin ,theaterList)
router.get('/movie-list',authAdmin,movieList)
router.get('/payment-list',authAdmin,totalPaymentList)
router.get('/rating-All',authAdmin,movieRatingGetAll)
router.get('/movie-rating/:id',authAdmin,movieRatingGetAdmin)
router.get('/owner-All',authAdmin,ownerGetALL)
 
router.delete("/rating/:id", authAdmin, movieRatingDelete);
router.delete("/user/:id", authAdmin, userDeleteByAdmin);
router.delete("/owner/:id", authAdmin, AdminTheaterOwnerDelete);

  

export default router