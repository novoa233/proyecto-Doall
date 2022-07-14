const pg = require('pg')


const pgPool = new pg.Pool({
    // Insert pool options here
    host: 'localhost',
    user: 'postgres',
    password: '13991987Ft',
    database: 'bd_sequelize'
});

module.exports ={pgPool}
