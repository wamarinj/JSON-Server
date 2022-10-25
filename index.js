const http = require("http");
const path = require("path");
const fs = require("fs/promises");


const PORT = 8000;

const app = http.createServer(async (request, response) => {

    const method = request.method;
    const url = request.url;
    if (url === '/tasks') {
        const jsonPath = path.resolve("./data.json");
        const jsonFile = await fs.readFile(jsonPath, "utf-8");
        if (method === 'GET') {
            response.setHeader("Content-Type", "application/json");
            response.write(jsonFile);
        }
        if (method === 'POST') {
            console.log(request.body);
            request.on("data", (data) => {
                const newTask = JSON.parse(data);
                const arr = JSON.parse(jsonFile);
                arr.push(newTask);
                console.log(arr);
            });
        }
        if (method === 'PUT'){
            request.on("data", (data) => {
                const putTask = JSON.parse(data);
                const putArr = JSON.parse(jsonFile);
                putArr.push(putTask);
            })
        }
        if (method === 'DELETE') {
            request.on("data", (data) => {
                const deleteTask = JSON.parse(data);
                const delArr = JSON.parse(jsonFile);
                delArr.push(deleteTask);
                console.log(delArr);
            })
        }
        }
    response.end();
});

app.listen(PORT);

console.log("servidor corriendo");