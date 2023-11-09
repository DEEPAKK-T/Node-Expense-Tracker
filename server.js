var http = require("http")
// require("dotenv").config()

const PORT = process.env.PORT || 8080

http.createServer(function (req, res) {
    // res.writeHead(200, {"Content-Type":"text/plain"});
    // res.end("Hello server");

    switch (req.method) {
        case "GET":
            getRequest(req, res);
            break;
        case "POST":
            postRequest(req, res);
            break;
        case "PUT":
            putRequest(req, res);
            break;
        case "DELETE":
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