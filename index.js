const rwClient = require("./twitter-api.js");
const funFact = require("./funfacts.js")
const tweetToThread = require("./tweetToThread.js")
const CronJob = require("cron").CronJob;





const tweet = async()=>{

    let postTweet = {}
    let facts = []
    const fetchFact = async()=>{facts = await funFact()}

    try{
        //fetch random fun fact from fun fact API
        await fetchFact()
        while (facts?.length < 1) {
            console.log("Fact fetching failed, retrying in the next 2 secs...");
            
            // Wait for 2 seconds using setTimeout before calling fetchFact()
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            await fetchFact();
        }
        const fact = `Today's Funfact: ${facts[0].fact}. \u0023fun \u0023fact \u0023automation \u0023coding \u0023software_development \u0023API_Ninjas`
        console.log("fact with hashtags: ", fact)
        //passing the fact fetched through a helper function to turn it to list of tweets if it's longer that 200 words
        const thread = tweetToThread(fact)
        if (typeof thread === "string"){
            console.log("tweet to post:... ", thread)
            postTweet = await rwClient.v2.tweet({"text": thread})
            console.log('postTweet: ', postTweet)
        }
        else{
            console.log("thread to post... ", thread)
            postTweet = await rwClient.v2.tweetThread(thread)
            console.log("thread posted successfully...", thread)
        }
    }catch(err){
        console.error("Error fetching and posting tweet on twitter: ", err)
    }
}

// tweet()

//automation the whole function to run 8 O clock every morning
const job = new CronJob("*/2 * * * *", ()=>{
    console.log("tweeting......")
    tweet()
})

job.start();

// "0 8 * * *"