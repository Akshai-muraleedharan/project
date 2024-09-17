import express from 'express'
import { movieCreate, movieDelete, movieList, movieTime, movieUpdate, singleMovie } from '../../controller/movieController.js'
import { authOwner } from '../../middleware/authOwner.js'
import { upload } from '../../middleware/imageUploadMiddleware.js'
import { authUser } from '../../middleware/authUser.js'
const router = express.Router()

// new movie routes

router.get('/list',movieList)
// router.get('all-movie',authOwner,movieList)
router.post('/Movie-create/:theaterId',authOwner,upload.single('image'),movieCreate)
router.put('/movie-update/:id',authOwner,movieUpdate)
router.put('/movie-timeShedules/:movieId',authOwner,movieTime)
router.delete('/movie-delete/:id',authOwner,movieDelete)
router.get('/single-movie/:id',authUser,singleMovie)

export default router