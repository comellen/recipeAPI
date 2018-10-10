const baseURL = "https://api.edamam.com/search";
const appID = "3331884a";
const key = "13b070c7b2354399fda8dbe641b2ea76";
let url;

const searchTerm = document.querySelector(".search");
const searchForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit");

const bal = document.querySelector("#bal");
const hiProt = document.querySelector("#hiProt");
const lowCarb = document.querySelector("#lowCarb");
const lowFat = document.querySelector("#lowFat")

const noBooze = document.querySelector("#noBooze");
const pnutFree = document.querySelector("#pnutFree");
const tnutFree = document.querySelector("#tnutFree");
const sugLow = document.querySelector("#sugLow");
const vegan = document.querySelector("#vegan");
const veg = document.querySelector("#veg");

const omit = document.querySelector("#omit");

const section = document.querySelector("section");


searchForm.addEventListener("submit", fetchResults);

function fetchResults(e) {
    e.preventDefault();

    url = `${baseURL}?q=${searchTerm.value}&app_id=${appID}&app_key=${key}&from=0&to=100`;

    if (bal.checked) {
        url += "&diet=balanced";
    }
    if (hiProt.checked) {
        url += "&diet=high-protein";
    }
    if (lowCarb.checked) {
        url += "&diet=low-carb";
    }
    if (lowFat.checked) {
        url += "&diet=low-fat";
    }
    if (noBooze.checked) {
        url += "&health=alcohol-free"
    }
    if (sugLow.checked) {
        url += "&health=sugar-conscious";
    }
    if (pnutFree.checked) {
        url += "&health=peanut-free"
    }
    if (tnutFree.checked) {
        url += "&health=tree-nut-free"
    }
    if (vegan.checked) {
        url += "&health=vegan";
    }
    if (veg.checked) {
        url += "&health=vegetarian";
    }
    if (omit.value !== "") {
        url += `&excluded=${omit.value}`
    }

    fetch(url)
        .then(function (result) {
            return result.json();
        })
        .then(function (json) {
            displayResults(json);
        })
}

function displayResults(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    let recipes = json.hits;

    if (recipes.length === 0) {
        console.log("No results");
        let recipe = document.createElement("div");
        recipe.textContent = "No results.";
        recipe.appendChild(recipe);
    } else {
        for (let i = 0; i < recipes.length; i++) {
            let recipe = document.createElement("div");
                recipe.setAttribute("id", "recipe");
            let heading = document.createElement("h3");
                heading.setAttribute("id", "recipeName")
            let link = document.createElement("a");
                link.setAttribute("id", "recipeLink")
            let img = document.createElement("img");
            let dLabel = document.createElement("p");
                dLabel.setAttribute("id", "dietLabel");
            let hLabel = document.createElement("p");
                hLabel.setAttribute("id", "healthLabel")
            let ingreds = document.createElement("p");
                ingreds.setAttribute("id", "ingredients");

            let current = recipes[i];

            link.href = current.recipe.url;
            link.textContent = `${current.recipe.label} - ${current.recipe.source}`;
            ingreds.textContent = "Ingredients: ";
            dLabel.textContent = "Diet labels: ";
            hLabel.textContent = "Health labels: ";

            for (let j = 0; j < current.recipe.ingredientLines.length; j++) {
                let ilist = document.createElement("span");
                if (current.recipe.ingredientLines.length === 0) {
                    ilist.textContent += "None";
                    ingreds.appendChild(ilist);
                }
                if (j == (current.recipe.ingredientLines.length - 1)) {
                    ilist.textContent += "and " + current.recipe.ingredientLines[j] + ".";
                    ingreds.appendChild(ilist);
                } else {
                    ilist.textContent += current.recipe.ingredientLines[j] + ", ";
                    ingreds.appendChild(ilist);
                }
            }
            for (let d = 0; d < current.recipe.dietLabels.length; d++) {
                let dlist = document.createElement("span");
                if (current.recipe.dietLabels.length === 0) {
                    dlist.textContent += "None";
                    dLabel.appendChild(dlist);
                }
                if (d == (current.recipe.dietLabels.length - 1)) {
                    dlist.textContent += current.recipe.dietLabels[d];
                    dLabel.appendChild(dlist);
                } else {
                    dlist.textContent += current.recipe.dietLabels[d] + ", ";
                    dLabel.appendChild(dlist);
                }
            }
            for (let h = 0; h < current.recipe.healthLabels.length; h++) {
                let hlist = document.createElement("span");
                if (current.recipe.healthLabels.length === 0) {
                    hlist.textContent += "None";
                    hLabel.appendChild(hlist);
                }
                if (h == (current.recipe.healthLabels.length - 1)) {
                    hlist.textContent += current.recipe.healthLabels[h];
                    hLabel.appendChild(hlist);
                } else {
                    hlist.textContent += current.recipe.healthLabels[h] + ", ";
                    hLabel.appendChild(hlist);
                }
            }

            if (current.recipe.image.length > 0) {
                img.src = current.recipe.image;
                img.alt = current.recipe.label;
            }

            recipe.appendChild(heading);
            recipe.appendChild(dLabel);
            recipe.appendChild(hLabel);
            heading.appendChild(link);
            recipe.appendChild(img);
            recipe.appendChild(ingreds);
            section.appendChild(recipe);
        }
    }
}

