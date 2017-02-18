
import * as express from 'express'

import runTests from './runTests'

const router = express.Router()

if(process.env.NODE_ENV !== 'production') {
  router.use('/runTests', runTests)
}

export default router