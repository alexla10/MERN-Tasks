import app from './app.js'
import {conectDB} from './db.js'

conectDB();

app.listen(4000, ()=>{
    console.log("server running on port 4000")
})