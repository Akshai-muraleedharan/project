import express from 'express'
import { movieTicket, ticketTest } from '../../controller/movieTicketController.js'
import { authUser } from '../../middleware/authUser.js';

const router = express.Router()
// payement route

router.post('/movie/:movie/theater/:theater',authUser,movieTicket)
router.get('/session-status',authUser,ticketTest)

 
 
export default router