
import * as express from 'express'

const app = express()

app.use(express.static('public'))

console.log('test')

app.use((err, req, res, next) => {
  if(err){
    if(err.stack){
      console.error(err.stack)
    } else {
      console.error(err)
    }
  }
})

console.log('Starting server...')
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
