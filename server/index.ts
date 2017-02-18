
import * as express from 'express'

const app = express()

app.use(express.static('public'))
app.use('/coverage', express.static('coverage/lcov-report'))

console.log('Starting server...')
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
