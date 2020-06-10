// API

// ExpressJS

const express = require("express");
const server = express();

const fs = require("fs");
const cors = require("cors");

// Ugly but we have to do this
server.use(express.json());
// Allow Cross-Origin requests
server.use(cors());

const port = 4000;

// Questions route
server.get("/questions", async (request, response) => {
	const jsonDataString = await fs.promises.readFile("./questions.json");
	const jsonData = JSON.parse(jsonDataString);

	response.json(jsonData);
});

// Question route
server.post("/question", async (request, response) => {
	try {
		// Question from the fetch request
		const newQuestion = request.body.question;

		// Get the data from the JSON file
		const jsonDataString = await fs.promises.readFile("./questions.json");
		// Parse the JSON data from the file into a javascript array
		const jsonData = JSON.parse(jsonDataString);

		// "['my first question', 'my second question']"
		// -> JSON.parse
		// ['my first question', 'my second question']
		// -> JSON.stringify
		// "['my first question', 'my second question']"

		// Add the new question to the array
		jsonData.push(newQuestion);

		// Write the changed array back to the JSON file
		await fs.promises.writeFile("questions.json", JSON.stringify(jsonData));

		// Respond saying everything worked
		response.json({ success: true });
	} catch (error) {
		response.json({ success: false, error: error });
	}
});

server.listen(port, () => {
	console.log("Server has started on " + port);
});
