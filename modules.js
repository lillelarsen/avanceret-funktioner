// IIFE return { function, function }
module.exports = (function(){
    const { createPool } = require('mysql');

    const db = createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "cms",
        connectionLimit: 10
    });

    function extrapolate(object) {
        const keys = [];
        const values = [];

        for (let i in object) {
            keys.push(`${i} = ?`);
            values.push(object[i]);
        }

        return { keys, values };
    }

    function getAllUsers() {
        return new Promise(function (resolve, reject) {
            try {
                db.query("SELECT * FROM users", (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    function getSingleUser(id) {
        return new Promise(function(resolve, reject) {
            try {
            if (typeof id !== "number") 
                return reject('id must be a number');
                db.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            } catch (error){
                reject(error);
            }
        });
    }

    function deleteSingleUser(id) {
        return new Promise(function(resolve, reject) {
            if (typeof id !== "number") 
                return reject('id must be a number');
            try {
                db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            } catch (error){
                reject(error);
            }
        });
    }

    function createSingleUser(user) {
        return new Promise(function(resolve, reject) {
            if (typeof user !== "object") 
                return reject('user must be an object');
            try {
                db.query("INSERT INTO users (user_name, pass, fk_role) VALUES (?, ?, ?)", [user.username, user.password, user.role], (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            } catch (error) {
                reject(error);
            }
        })
    }

    // Kan kun opdatere alt!
    function updateSingleUser(user) {
        return new Promise(function(resolve, reject) {
            try {
                db.query("UPDATE users SET user_name = ?, pass = ?, fk_role = ? WHERE id = ?", [user.username, user.password, user.role, user.id], (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            } catch (error) {
                reject(error);
            }
        })
    }

    function updateUser(id, data) {
        return new Promise(function(resolve, reject) {
            if (typeof id !== "number") 
                return reject('id must be a number');
            if (typeof data !== "object") 
                return reject('data must be an object');
            try {
                const { keys, values } = extrapolate(data);
                db.query(`UPDATE users SET ${keys.join(', ')} WHERE id = ${id}`, values, (err, result) => { //Join tager array og adskiller med komma og mellemrum som vi beder den om
                    if (err) return reject(err);
                    resolve(result);
                })
            } catch(error) {
                reject(error);
            }
        })
    }

    return {
        getAllUsers,
        getSingleUser,
        deleteSingleUser,
        createSingleUser,
        updateSingleUser,
        updateUser
    }
})();