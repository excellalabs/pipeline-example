
import * as express from 'express'

import api from './api'

const app = express()

app.use(express.static('public'))

if (process.env.NODE_ENV !== 'production') {
  app.use('/coverage', express.static('coverage/lcov-report'))
}

app.use('/api', api)

console.log('Starting server...')
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
