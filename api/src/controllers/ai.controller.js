const { OpenAI } = require("openai");
const Garden = require('../models/garden.model')
const actionController = require('./garden.controller')
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

async function createVegetable(args) {
    try {
    const garden = await Garden.findByIdAndUpdate(
        args.gardenId,
        { $push: { vegetable: { 
            maturity: args.maturity,
            plantationDate: args.plantationDate,
            name: args.name,
            recipe: args.recipe,
            description: args.description,
            harvestDate: args.harvestDate,
            garden: args.gardenId
         } } },
        { new: true, useFindAndModify: false }
      )
      if (garden) {
        return garden;
      } else {
        return {message: "jardin non trouvé"}
      }
    } catch (err) {
      throw new Error('Erreur lors de la mise à jour du jardin:', err);
    }

}

async function createAction(actionType, actionDate, actionUser) {
    try {

        const action = await actionController.createActionFunction(actionType, actionDate, actionUser);

    } catch (err) {
        throw new Error("Erreur lors de la saisie de l'action:", err);
    }
}


const aiBase = async (req,res) => {
    const history = [];
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
                },
                {
                    name: "createVegetable",
                    description: "create a new vegetable with rich data, maturity, name, one recipe and a brief description of the vegatable",
                    parameters: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string",
                                description: "name of the vegetable"
                            },
                            maturity: {
                                type: "string",
                                description: "actual maturity of the vegetable (ex: if the vegetable is just a seed)"
                            },
                            recipe: {
                                type: "string",
                                description: "you have to generate a recipe based on the vegetable name"
                            },
                            description: {
                                type: "string",
                                description: "you have to generate a description based on the vegetable name"
                            },
                            plantationDate: {
                                type: "string",
                                description: "Plantation date formated in javascript readable date format"
                            },
                            harvestDate:{
                                type: "string",
                                description: "you have to (Based on maturity and plantation date) give me the estimated harvest date"
                            },
                            gardenId: {
                                type: "string",
                                description: "ID of the garden"
                            }
                        }
                    }
                },
                {
                    name: "createAction",
                    description: "create a new gardening action with specific type. We do not need the garden location, id or name.",
                    parameters: {
                        type: "object",
                        properties: {
                            type:{
                                type: "string",
                                description: "Type of the action resumed in one name in french and not a verb"
                            }
                        }
                    },
                    required: ['type']
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

                if(garden.id){
                    res.send(200, {message: "Garden created", data: garden})
                } else {
                    res.send(500)
                }
            }

            if(functionCallName === "createVegetable") {
                const completionArguments = JSON.parse(completionResponse.function_call.arguments)
                const vegetable = await createVegetable(completionArguments);
                res.send(vegetable);
            }

            if (functionCallName === "createAction") {
                const completionArguments = JSON.parse(completionResponse.function_call.arguments)
                const action = await createAction(completionArguments.type, new Date(), "");
                res.send(action);
            }
        } else {
            res.send(completionResponse.content)
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