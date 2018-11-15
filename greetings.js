const getRandomInt = function(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

const randomGreeting = function() {    
    const idx = getRandomInt(5);
    const greetings = ["Hello Creature!", "Hola!", "Wassup Dudebro!", "Hey! Hi! How are ya?!", "Greetings Earthling!"];

    return greetings[idx];

}

module.exports = randomGreeting;