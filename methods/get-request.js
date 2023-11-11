module.exports = (req, res) => {

    let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1)
    console.log(baseUrl)

    const id = req.url.split("/")
    console.log(id)
    expensesId = id[3]
    // console.log(expensesId)


    if (req.url == "/api/expenses") {
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(req.expenses));
        res.end();
    } else if (baseUrl == "/api/expenses/" && expensesId) {
        res.setHeader("Content-Type", "application/json")
        // let filteredExpense = req.expenses.filter((expense) => {
        //     return expense.id === id;
        // });
        let filteredExpense = req.expenses.filter((exp) => {
            return exp.id == expensesId;
          });
        // filteredExpense = req.expenses[expensesId]
        // for(let i = 0; i <req.expenses.length; i++){
        //     if(req.expenses.id == expensesId){
        //         var filteredExpense = req.expenses[i]
        //     }
        // }
        console.log(filteredExpense)
        if (filteredExpense.length > 0) {
            res.statusCode = 200
            res.write(JSON.stringify(filteredExpense));
            res.end();

        } else {
            res.statusCode = 404
            res.write(JSON.stringify({ title: "Not Found", message: `movies with ID ${expensesId} not found` }));
            res.end();
        }
    }else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ title: "Not Found", message: "Endpoint not found" }))
    }
}