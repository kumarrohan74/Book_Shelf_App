
const app = require('./expressServer');
const db = require('./database');

app.post('/books', (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const offset = (page - 1) * pageSize;

    const selectAll = `select * from books`;
    const LimitPageParam = `LIMIT ${pageSize} offset ${offset}`

    if (req.body.fromDate && req.body.toDate) {
        const queryString = `${selectAll} WHERE Published_Date BETWEEN "${req.body.fromDate}" AND "${req.body.toDate}" ${LimitPageParam}`;
        db.query(queryString, (err, result) => {
            if (err) {
                return console.log(err)
            }
            else if(result.length) {
                res.status(200);
                res.send({ "response": result });
            }
            else {
                res.status(204);
                res.send({ "response": "no result based on your search" });
            }
            
        })
    }
    else if (req.body?.name?.length) {
        const queryString = `${selectAll} where Title like '%${req.body.name}%' OR Author like '%${req.body.name}%' OR Genre like '%${req.body.name}%' ${LimitPageParam} `
        db.query(queryString, (err, result) => {
            if (err) {
                return console.log(err)
            }
            else if(result.length) {
                res.status(200);
                res.send({ "response": result });
            }
            else {
                res.status(204);
                res.send({ "response": "no result based on your search" });
            }
        })
    }

    else if(!req.body?.name?.length && !req.body.fromDate && !req.body.toDate && !req.query.isSort) {
        res.status(401);
    }

    else if (req.query.isSort) {
        db.query(`${selectAll} ORDER BY ${req.query.param} ${LimitPageParam}`, (err, result) => {
            if (err) {
                return console.log(err);
            }
            res.status(200)
            res.send({ "response": result })
        })
    }
    else {
        db.query(`${selectAll} ${LimitPageParam}`, (err, result) => {
            if (err) {
                return console.log(err);
            }
            else if(result.length) {
                res.status(200);
                res.send({ "response": result });
            }
            else {
                res.status(204)
                res.send({ "response": "no result based on your search" });
            }
        })
    }

});

app.get('/getTotalCount', (req,res) => {
    db.query(`select count(title) from books`, (err,result) => {
        if (err) {
            return console.log(err);
        }
        else if(result.length) {
            res.status(200);
            res.send(result);
        }
        else {
            res.status(204)
            res.send({ "response": "no result based on your search"});
        }
    })
})

app.listen(5005, () => {
    console.log('server running on port 5005');
})

