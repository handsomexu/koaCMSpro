// const mysql = require('./../utils/mysqlUtil.js');
const knex = require('./../utils/mysqlUtil.js');

const getUserByIdModel = async(userId) => {
    // let mysqlOptions = {     sql: 'select * from table_user where user_id = ?',
    //   args: [userId] };

    let users = await knex
        .select()
        .from("table_user")
        .where('id', userId);
        
    if (users.length == 0) {
        return null;
    } else {
        return users;
    }
};

module.exports = {
    getUserByIdModel: getUserByIdModel
};