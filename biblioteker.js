// const fs = require('fs'); // Hele biblioteket
// const {readFile, writeFile} = require('fs'); // Funktioner fra biblioteket
const modulius = require('./modules');

// modulius.getAllUsers()
//     .then(response => console.log(response));

// modulius.getSingleUser(2)
//     .then(response => console.table(response))
//     .catch(error => console.error(error))

// modulius.deleteSingleUser(9)
//     .then(response => console.table(response))
//     .catch(error => console.error(error))

// modulius.createSingleUser({username:'steffhyuen', password:'1234', role: 1 })
//     .then(response => console.table(response))
//     .catch(error => console.error(error))

// modulius.updateSingleUser({username:'stefen', password:'1245634', role: 2, id: 12 })
//     .then(response => console.table(response))
//     .catch(error => console.error(error));

modulius.updateUser(12, {pass: 'aaaaaaaaaadsfkjsefkjn21332', fk_role: 4})
    .then(response => console.table(response))
    .catch(error => console.error(error));