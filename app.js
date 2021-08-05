
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
// TODO: Global objects to be refactored
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
const form = document.getElementById("dino-compare");
const grid = document.getElementById("grid");

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

// TODO: How to store the result not as a global variable
// TODO: Some corner cases are still escaping 0t14 and 04
// Use IIFE to get human data from the form
/**
 * 
 * @param {Object} form HTML-strutuctured user input
 * @returns a user's input stored as a Human object
 */
function generateUserObject(form) {
    const numericInputs = ["feet", "inches", "weight"];

    let input = retrieveInput(form);
    let invalidInputCriteria = [
        (function (input) {
            let validEntries = []; 
            Object.keys(input).forEach(
                key => validEntries.push(
                    (function(value) {return !value})(input[key])
            ));
            return validEntries.some(e => e === true);
        })(input),
        numericInputs.some(attr => Number(input[attr]) <= 0), 
        Number(input["feet"]) % 1 !== 0, 
        Number(input["inches"]) > 12,
    ];

    if (invalidInputCriteria.some(c => c === true)) {
        printErrorMessage(invalidInputCriteria);
        return;
    } else {
        storeInputToLocal(input);
        return convertSessionToUserObject();
    }
} 

/**
 * @description retrieves input from form
 * @param {Object} form HTML-strutuctured user input
 * @returns {Object} user's input stored as an object
 */
function retrieveInput(form) {
    let input = {};
    for (let i = 0; i < form.length; i++) {
        let key = form[i].getAttribute("id");
        input[key] = form[i].value;
    }
    return input;
}

// TODO: Some invalid inputs are still getting through 42t1 and 04
/**
 * @description print an error message based on invalid input criteria
 * @param {Array} criteria set of error criteria
 * @returns {void} 
 */
function printErrorMessage(criteria) {
    let firstErrorIndex = criteria.findIndex(function(c) {return c === true});
    switch (firstErrorIndex) {
        case 0:
            alert("Please fill out all the entries in the form correctly.");
            break;
        case 1:
            alert("Please enter non-negative numbers.");
            break;
        case 2:
            alert("Please enter feet as whole numbers.");
            break;
        case 3:
            alert("Please enter inches between 0 and 12.");
            break;
        default:
            break;
    }
}

// TODO: check if there's a way to avoid storing to local browsing session
/**
 * @description stores user input into a local session
 * @param {Object} input user's input stored as an object
 * @returns {void} 
 */
function storeInputToLocal(input) {
    Object.keys(input).forEach(
        key => sessionStorage.setItem(key, input[key])
    );
}

/**
 * @description saves the user's input from a local session into a Human object
 * @param {void} 
 * @returns {Object} a user's input saved as a Human object
 */
function convertSessionToUserObject() {
    let user = new Human();
    Object.keys(sessionStorage).forEach(key => {
        user[key] = sessionStorage.getItem(key);
    })    
    user["height"] = String(Number(user["feet"]) * 12 + Number(user["inches"]));
    delete user["feet"];
    delete user["inches"];
    return user;
}

// TODO: combine with comparisons with Humans
// TODO: Extract the pigeon to always print its own fact
function produceDinosaurFacts(dino, attr) {
    if (dino.species === "Pigeon") {
        return dino.fact;
    } else {
        switch (attr) {
            case "diet":
                return `The ${dino.species} ate a ${dino.diet} diet.`;
            case "height":
                return `The ${dino.species} was ${dino.height / 12} feet tall.`;
            case "weight":
                return `The ${dino.species} weighed ${dino.weight} lbs.`;
            case "when":
                return `The ${dino.species} lived during the ${dino.when} era.`;
            case "where":
                return `The ${dino.species} lived in ${dino.where}.`;
            case "fact":
                return dino.fact;
            default:
                return `The ${dino.species} is a dinosaur.`;
        }
    }
}

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
    const humanWeight = Number(human.weight);
    const dinoWeight = Number(dino.weight);
    if (humanWeight > dinoWeight) {
        return `This dinosaur is ${humanWeight - dinoWeight} lb lighter than you.`;
    } else if (humanWeight < dinoWeight) {
        return `This dinosaur is ${dinoWeight - humanWeight} lb heavier than you.`;
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
    const humanHeight = Number(human.height);
    const dinoHeight = Number(dino.height);
    if (humanHeight > dinoHeight) {
        return `This dinosaur is ${humanHeight- dinoHeight} in shorter than you.`;
    } else if (humanHeight< dinoHeight) {
        return `This dinosaur is ${dinoHeight - humanHeight} in taller than you.`;
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

// TODO: Change fact displayed to be a random fact
// TODO: Make the info into a sentence
function displayDinosaurGrid(dino) {
    const attributes = Object.keys(dino);
    grid.innerHTML += `
        <div class="grid-item">
          <h3>
            ${dino.species.toUpperCase()}
          </h3>
          <img src="./images/${dino.species.toLowerCase()}.png">
          <p>
            ${produceDinosaurFacts(dino, attributes[parseInt(Math.random() * attributes.length)])}
          </p>
        </div>
    `
}

function displayHumanGrid(user) {
    grid.innerHTML += `
        <div class="grid-item">
          <h3>
            ${user.name.toUpperCase()}
          </h3>
          <img src="./images/human.png">
        </div> 
    `
}

function displayInfographic(user, dinosaurs) {
    let counter = 0;

    // Generate Tiles for each Dino in Array
    (function (array) {
        return array.sort(() => Math.random() - 0.5)
    })(dinosaurs).forEach(dino => {
        displayDinosaurGrid(dino);
        counter += 1;

        if (counter == 4) {
            displayHumanGrid(user);
        }
    }
)}

function removeFormFromScreen(form) {
    return form.style.display = "none";
}
  
// On button click, prepare and display infographic
button.addEventListener("click", () => {
    let user = generateUserObject(form);
    if (user) {
        // Add tiles to DOM
        displayInfographic(user, dinosaurs);

        // Remove form from screen
        removeFormFromScreen(form);
    }
});
