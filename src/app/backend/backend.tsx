import express from "express";
import cors from "cors";

const app = express();

app.use(cors()); // Add this line to enable CORS

app.get("/generate", (request, response) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": "Generate a joke based on user's query:"  + request.query.q ?? "no query"
                    }
                ]
            }
        ]
    });
    
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
 
    };
    
    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDdhZG0vQiq7HpMmS0FKr2_NB0khVFBzKs", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            response.json(result.candidates[0].content.parts[0].text);
        })
        .catch((error) => {
            console.error(error);
            response.status(500).send("Error generating content");
        });
});

app.listen(3001, () => {
    console.log("Started on port 3001");
});