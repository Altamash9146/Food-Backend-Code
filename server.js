// const express = require('express');
// const cors  = require('cors')
// const dotenv = require('dotenv');
// const passport = require('passport');

// const axios = require('axios');
// const server = express()
// server.use(express.json())
// server.use(cors({
//     origin:'*'
// }))
// dotenv.config()

// const userRoute = require('./Routes/UserRoutes')
// const BookmarkRoutes  = require('./Routes/BookmarkRoutes/BookmarkRoutes')
// const connectToDatabase = require('./Connection/Connection')

// server.use('/user',userRoute)
// server.use(BookmarkRoutes)
// server.use(passport.initialize());
// connectToDatabase()

// console.log("AppID", process.env.APP_ID)

// server.get('/recipes/:query', async (req, res) => {


//     const response = await axios.get(
//         `https://api.edamam.com/search?q=${req.params.query}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
//     )

//     // console.log(response.data.hits)
//     res.json(response.data.hits)
// })



// server.listen(8080,()=>{
//     console.log('server running on port 8080');
// })


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const axios = require('axios');
const server = express();
server.use(express.json());
server.use(cors({
  origin: '*'
}));
dotenv.config();


const userRoute = require('./Routes/UserRoutes');
const connectToDatabase = require('./Connection/Connection');


connectToDatabase();

console.log("AppID", process.env.APP_ID);

server.get('/recipes/:query', async (req, res) => {


        const response = await axios.get(
            `https://api.edamam.com/search?q=${req.params.query}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`
        )
    
        // console.log(response.data.hits)
        res.json(response.data.hits)
    })

server.use('/user', userRoute);

server.listen(8080, () => {
  console.log('server running on port 8080');
});
