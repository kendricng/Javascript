
// Create Dino Constructor
/**
 * @constructor
 * @param {string} species name of the dinosaur's species
 * @param {number} weight how heavy the dinosaur was on average in lbs
 * @param {number} height how tall the dinosaur was on avarge in inches
 * @param {string} diet what foods the dinosaur ate (e.g. Herbavor, Omnivor, Carnivor)
 * @param {string} where continent(s) where the dinosaur lived
 * @param {string} when era during which the dinosaur lived
 * @param {string} fact one cool fact about the dinosaur
 */
function Dinosaur(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
}

// Create Dino Objects
const json = `{
    "Dinos": [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbavor",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavor",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ]}`
const obj = JSON.parse(json);
const button = document.getElementById("btn");

let dinosaurs = [];
obj.Dinos.forEach(
    dino => dinosaurs.push(
        new Dinosaur(
            dino.species,
            dino.weight,
            dino.height,
            dino.diet,
            dino.where,
            dino.when,
            dino.fact
        )
    )
);

/**
 * @constructor 
 * @param {string} name the name of the human
 * @param {number} weight how heavy a human is in lbs
 * @param {number} height how tall a human is in inches
 * @param {string} diet what foods the human ate (e.g. Herbavor, Omnivor, Carnivor)
 */
function Human(name, weight, height, diet) {
    this.name = name;
    this.species = "Homo sapiens";
    this.weight = weight;
    this.height = height;
    this.diet = diet;
}

// global variables
// TODO: to be refactored
const form = document.getElementById("dino-compare");

// Use IIFE to get human data from form
// TODO: Refactor error messages with isValidInput, since these are all type checks. 
// TODO: What if I entered 0-5 that's a "valid number"?
// TODO Corner cases:
// - "0-5" interpreted as valid
// - -0 that needs to be converted to 0
function generateUserObject(form, callback) {
    let input = retrieveInput(form);

    if (callback(input)) {
        if (["feet", "inches", "weight"].some(attr => Number(input[attr]) < 0 )) {
            alert("Please enter non-negative numbers.");
            return;
        } else if (Number(input["feet"]) % 1 !== 0) {
            alert("Please enter feet as whole numbers.");
            return;
        } else if (Number(input["inches"]) > 12) {
            alert("Please enter inches between 0 and 12.");
            return;
        } else {
            storeInputToLocal(input);
            return convertSessionToUserObject();
        }
    } else {
        alert("Please fill out all the entries in the form.");
        return;
    }
}

/**
 * @description retrieves input from form
 * @param {Object} form HTML-strutuctured user input
 */
function retrieveInput(form) {
    let input = {};
    for (let i = 0; i < form.length; i++) {
        let key = form[i].getAttribute("id");
        input[key] = form[i].value;
    }
    return input;
}

/**
 * @description checks if user has filled in all the items in the form
 * @param {Object} input 
 * @returns 
 */
function isValidInput(input) {
    let validEntries = []; 
    Object.keys(input).forEach(
        key => validEntries.push(
            (function(value) {
                return value != "" && value != null && value.length > 0;
            })(input[key])
        )
    );
    return validEntries.every(e => e === true);
}

// TODO: check if there's a way to avoid storing to local browsing session
/**
 * @description stores user input into a local session
 * @param {*} input 
 */
function storeInputToLocal(input) {
    Object.keys(input).forEach(
        key => sessionStorage.setItem(key, input[key])
    );
}

// TODO: add height functionality
// TODO: add checks for empty fields
/**
 * @description saves the user's input into a Human object
 * @param {void}
 * @returns {Object} a user's input saved as a Human object
 */
function convertSessionToUserObject() {
    let user = new Human();
    Object.keys(sessionStorage).forEach(key => {
        user[key] = sessionStorage.getItem(key);
    })    
    return user;
}


// if all the entries are empty, error for all
// if a couple of the entries are empty, list out fields to fill
// out
// if one entry is empty, retrieve key

// add a height attribute which is feet + inches
// delete feet + inches
// add a checker if no data entered in the form
// reject and add a warning checking which pieces are blank
const dinosaur = new Dinosaur();
dinosaur["weight"] = 44;
dinosaur["height"] = 20;
dinosaur["diet"] = "carnivor";

const user = new Human();
user["weight"] = 45;
user["height"] = 21;
user["diet"] = "carnivor";

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
/**
 * @description A weight comparator between the user and a dinosaur
 * @param {Object} human user input from the form
 * @param {number} human.weight user's weight input from the form (in lbs)
 * @param {Object} dino a JSON repository of dinosaurs
 * @param {number} dino.weight weight-related info from a dinosaur (in lbs)
 * @returns {string} Descriptor comparing the user's weight with a dinosaur's
 */
function compareWeights(human, dino) {
    if (human.weight > dino.weight) {
        return `This dinosaur is ${human.weight - dino.weight} lbs lighter than you.`;
    } else if (human.weight < dino.weight) {
        return `This dinosaur is ${dino.weight - human.weight} lbs heavier than you.`;
    } else {
        return "This dinosaur is as heavy as you.";
    }
}

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
/**
 * @description A height comparator between the user and a dinosaur
 * @param {Object} human user input from the form
 * @param {number} human.height user's height input from the form (in inches)
 * @param {Object} dino a JSON repository of dinosaurs
 * @param {number} dino.height height-related info from a dinosaur (in inches)
 * @returns {string} Descriptor comparing the user's height with a dinosaur's
 */
function compareHeights (human, dino) {
    if (human.height > dino.height) {
        return `This dinosaur is ${human.height- dino.height} in shorter than you.`;
    } else if (human.height< dino.height) {
        return `This dinosaur is ${dino.height - human.height} in taller than you.`;
    } else {
        return "This dinosaur is as tall as you.";
    }
}

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
/**
 * @description A height comparator between the user and a dinosaur
 * @param {Object} human user input from the form
 * @param {string} human.diet user's diet input from the form
 * @param {Object} dino a JSON repository of dinosaurs
 * @param {string} dino.diet diet-related info from a dinosaur
 * @returns {string} Descriptor comparing the user's diet with a dinosaur's
 */
function compareDiets(human, dino) {
    return human.diet.toLowerCase() == dino.diet.toLowerCase() ?
           `This dinosaur is also a ${dino.diet} like you.` :
           `This dinosaur, unlike you, is a ${dino.diet}.`;
}


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
button.addEventListener("click", () => {
    let user = generateUserObject(form, isValidInput);
    console.log(user);
})