const crypto = require("crypto")
const requestBodyparser = require("../util/body-parser");
const writeToFile = require("../util/write-to-file");
module.exports = async (req, res)=> {

    if (req.url === "/api/expenses") {

        try{
            let body = await requestBodyparser(req)
            console.log("Request body:", body);
            body.id = crypto.randomUUID();
            // console.log(req)
            console.log("UUID aksjdhkjs", body.id)
            req.expenses.push(body);
            writeToFile(req.expenses)
            res.writeHead(201, {"Content-Type": "application/json"});
            res.end();
        }catch(err){
            console.log(err);
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