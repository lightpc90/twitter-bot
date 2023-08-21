const axios = require("axios")
require("dotenv").config()


//for fetching fun facts from its api
const funFact = async(req, res)=>{
    const limit = 1
  const url = 'https://api.api-ninjas.com/v1/facts?limit=' + limit

  try {
    const response = await axios.get(url, {
      headers: {
        'X-Api-Key': process.env.PUBLIC_API_KEY
      }
    });
    
    console.log("success fetching fun facts: ",response.data)
    return response.data //.facts[0].fact
    //res.status(200).json({ facts: response.data });
  } catch (error) {
    console.log("error fetching fun facts: ",error)
    //res.status(500).json({ error: 'Error fetching fact' });
  }
};

module.exports = funFact