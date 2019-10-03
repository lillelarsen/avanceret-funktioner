// Procedural programmering er det normale

///////////////////// CALLBACK /////////////////////////////////

// Definition
function lazy(text, callback) {
    if (typeof text !== "string") {
        return callback("text must be a string"); // vores error i callbacket
    }
    setTimeout(() => callback(null, text), 3000); //callback springer ud af lazy funktionen men først efter evt. fejl. somher er sendt videre med "null"
}

// Invoke
lazy(23455, (err, text) => {
    if (err) return console.error(err); // return hopper ud af funktionen (stopper den)
    console.log(text);
});

///////////////////// PROMISES /////////////////////////////////

// definition
function lazy(text) {
    return new Promise(function (resolve, reject) { //resolve og reject er to forskellige calback funktioner
        if (typeof text !== "string")
            return reject("text must be a string");
        setTimeout(() => resolve(text), 3000);
    });
}

// Invoke
lazy(12)
    .then(response => console.log(response))
    .catch(error => console.error(error))

///////////////////// PROMISES async invoke (without CB function) /////////////////////////////////

// definition
function lazy(text) {
    return new Promise(function (resolve, reject) { //resolve og reject er to forskellige callback funktioner
        if (typeof text !== "string")
            return reject("text must be a string");
        setTimeout(() => resolve(text), 3000);
    });
}

// Invoke
// ()(); // IIFE Immediately invoked function expression
(async function () {
   try {
        const response = await lazy(56515); // venter på et promise, og tager resultatet herfra
        console.log(response)
    } catch (error) {
        console.error(error)
    }
})();