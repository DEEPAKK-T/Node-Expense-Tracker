const requestBodyparser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");

module.exports = async (req, res)=> {

    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
    let id = req.url.split("/")[3];

    if (baseUrl == "/api/expenses/" && id) {
        try {
            body = await requestBodyparser(req);
            const index = req.expenses.findIndex((exp) => {
                return exp.id === id;
            });
            if (index === -1) {
                res.statusCode = 404;
                res.write(
                    JSON.stringify({ title: "Not Found", message: "Movie not found" })
                );
                res.end();
            } else {
                req.expenses[index] = { id, ...body};
                writeToFile(req.expenses);
                res.writeHead(200, {"Content-Type":"application/json"})
                res.end(JSON.stringify(req.expenses[index]))
            }

        }catch(err){
            console.log(err)
            res.writeHead(400, {"Content-Type": "application/json"})
            res.end(
                JSON.stringify({
                    "title": "Invalid request body",
                    "message": "Bad request"
                })
            )
        }

    } else {
        res.writeHead(404, {"Content-Type": "application/json"})
        res.end(
            JSON.stringify({
                "title": "Route not found",
                "message": "No route found"
            })
        )

    }
}