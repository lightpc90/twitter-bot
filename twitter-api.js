const {TwitterApi} = require("twitter-api-v2")
require("dotenv").config()

const client = new TwitterApi({
    appKey: process.env.PUBLIC_APP_API_KEY,
    appSecret: process.env.PUBLIC_APP_API_KEY_SECRET,
    accessToken: process.env.PUBLIC_ACCESS_TOKEN,
    accessSecret: process.env.PUBLIC_ACCESS_TOKEN_SECRET
})

const rwClient = client.readWrite

module.exports = rwClient