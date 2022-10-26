const http = require("http");
const path = require("path");
const fs = require("fs/promises");
const express = require("express");
const app = express();
app.use(express.json())


const PORT = 8000;

const jsonPath = path.resolve("./data.json");



app.get('/tasks', async (req, res) => {
    const jsonFile = await fs.readFile(jsonPath, "utf-8");
    res.setHeader("Content-Type", "application/json");
    res.write(jsonFile);
    res.end()
})

app.post('/tasks', async (req, res) => {
    try {
        const jsonFile = await fs.readFile(jsonPath, "utf-8");
        req.on("data", async (data) => {
            const newTask = JSON.parse(data);
            const arr = JSON.parse(jsonFile);
            arr.push(newTask);
            await fs.writeFile(jsonPath, JSON.stringify(arr))
            console.log(arr);
        });
        res.statusCode = 201
    } catch (error) {
        res.statusCode = 400
        res.statusMessage = "Failure data"
    }
    res.end();

})

app.put("/tasks", async (req, res) => {
    const jsonFile = await fs.readFile(jsonPath, "utf-8");
    console.log(req.body)
    const { id, status } = req.body;
    const data = JSON.parse(jsonFile)
    const taskId = data.findIndex((data) => data.id === id)
    data[taskId].status = status
    await fs.writeFile(jsonPath, JSON.stringify(data))
    res.sendStatus(204);
    res.end();
})

app.delete("/tasks", async (req, res) => {
    const jsonFile = await fs.readFile(jsonPath, "utf-8");
    const { id } = req.body;
    const data = JSON.parse(jsonFile)
    const taskId = data.findIndex((data) => data.id === id)
    data.splice(taskId, 1)
    await fs.writeFile(jsonPath, JSON.stringify(data))
    res.sendStatus(204);
    res.end();
})

app.listen(PORT);

console.log("servidor corriendo");