const { createPool } = require('mysql');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "Books_Shelf",
    connectionLimit:10
});

module.exports = pool;