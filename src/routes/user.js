const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth');

const router = express.Router()

router.post('/users', async (req, res) => {
    // Create a new user
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        console.log("error", error);
        res.status(400).send(error)
    }
})

router.get('/users/me', auth, async(req, res) => {
    //Get logged in user profile
    res.send(req.user);
})

router.post('/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/users/me/album', async(req, res) => {
    //Update the user album
    try {
        // const { email, password } = req.body
        const {  } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        console.log("error", error);
        res.status(400).send(error)
    }
})
/*
{
    album: [
        {
            coverPhotoURL: '',
            albumHeadingText: '',
            albumDescription: '',
            images: [
                {
                    imageURL: '',
                    dimensions: ''
                }
            ]
        }
    ]
}


{

}
 */

// albums: [{
//     coverPhotoURL: {
//         type: String,
//         required: true
//     },
//     albumHeadingText: {
//         type: String,
//         required: true
//     },
//     albumDescription: {
//         type: String,
//     },
//     images: [{
//         imageURL: {
//             type: String,
//             required: true
//         },
//         dimensions: {
//             type: String
//         }
//     }],
//     //TODO: possibly add get and set directly to schema?
//     //get: (val) => return val
//     //set: 
// }]


/*
 {
     new: true,
     upsert: true
 } 
 */
module.exports = router