var http = require("http")
// require("dotenv").config()
const getRequest = require("./methods/get-request")
const postRequest = require("./methods/post-request")
const putRequest = require("./methods/put-request")
const deleteRequest = require("./methods/delete-request")
let expenses = require("./data/expense.json")

const PORT = process.env.PORT || 8080

http.createServer(function (req, res) {
    // res.writeHead(200, {"Content-Type":"text/plain"});
    // res.end("Hello server");

    switch (req.method) {
        case "GET":
            req.expenses = expenses;
            getRequest(req, res);
            break;
        case "POST":
            req.expenses = expenses;
            postRequest(req, res);
            break;
        case "PUT":
            req.expenses = expenses;
            putRequest(req, res);
            break;
        case "DELETE":
            req.expenses = expenses;
            deleteRequest(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json")
            res.write(JSON.stringify({ title: "Not Found", message: "Endpoint not found" }));
            res.end()

    }
}).listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});