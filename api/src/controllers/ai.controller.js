const { OpenAI } = require("openai");
const Garden = require('../models/garden.model')
const env = require('dotenv').config();


const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
};
const openai = new OpenAI(configuration);


async function createGarden(location, title, created) {
    let garden = await Garden.create({
        title: title,
        location: location,
        created: created
    })
    
    return garden
}


const aiBase = async (req,res) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{role: 'user', 'content' : req.body.msg}],
            functions: [
                {
                    name: "createGarden",
                    description: "create a new garden with specific location, title and creation date",
                    parameters: {
                        type: "object",
                        properties: {
                            title:{
                                type: "string",
                                description: "Name of the garden"
                            },
                            location: {
                                type: "string",
                                description: "Location of the garden"
                            },
                            created:{
                                type: "string",
                                description: "Creation date of the garden must be a date in javascript readable format"
                            }
                        }
                    },
                    required: ['title', 'location', 'created']
                }
            ],
            function_call: "auto"
        })
        const completionResponse = completion.choices[0].message
        if(!completionResponse.content) { 
            const functionCallName = completionResponse.function_call.name
            
            if(functionCallName === "createGarden") {
                const completionArguments = JSON.parse(completionResponse.function_call.arguments)
                
                const garden = await createGarden(completionArguments.location, completionArguments.title, completionArguments.created)

                console.log(garden)
            }
        }
    }   catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }
}

module.exports = {
    aiBase
}