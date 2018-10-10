const baseURL = "https://api.edamam.com/search";
const appID = "3331884a";
const key = "13b070c7b2354399fda8dbe641b2ea76";
let url;

const searchTerm = document.querySelector(".search");
const searchForm = document.querySelector("form");
const submitBtn = document.querySelector(".submit");

// const hiFiber = document.querySelector("#hiFiber");
const bal = document.querySelector("#bal");
const hiProt = document.querySelector("#hiProt");
const lowCarb = document.querySelector("#lowCarb");
const lowFat = document.querySelector("#lowFat")

// const dairyFree = document.querySelector("#dairyFree");
// const glutFree = document.querySelector("#glutFree");
// const noSugAdd = document.querySelector("#noSugAdd");  //low-sugar
// const soyFree = document.querySelector("#soyFree");
const noBooze = document.querySelector("#noBooze");
const pnutFree = document.querySelector("#pnutFree");
const tnutFree = document.querySelector("#tnutFree");
const sugLow = document.querySelector("#sugLow");  //sugar-conscious
const vegan = document.querySelector("#vegan");
const veg = document.querySelector("#veg");

const omit = document.querySelector("#omit");


const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".prev");
const nav = document.querySelector("nav");

const section = document.querySelector("section");

nav.style.display = "none";
let pageNumber = 0;

searchForm.addEventListener("submit", fetchResults);
nextBtn.addEventListener("click", nextPage);
previousBtn.addEventListener("click", previousPage);

function fetchResults(e) {
    if (pageNumber === 0) {
    e.preventDefault();
    }

    url = `${baseURL}?q=${searchTerm.value}&app_id=${appID}&app_key=${key}`;
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
            // console.log(result);
            return result.json();
        })
        .then(function (json) {
            // console.log(json);
            displayResults(json);
        })
}

function displayResults(json) {
    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    let recipes = json.hits;
    console.log(recipes);

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
            let img = document.createElement("img");
            let dLabel = document.createElement("p");
                dLabel.setAttribute("id", "dietLabel");
            let hLabel = document.createElement("p");
                hLabel.setAttribute("id", "healthLabel")
            let ingreds = document.createElement("p");
                ingreds.setAttribute("id", "ingredients");
            // let clearfix = document.createElement("div");

            let current = recipes[i];
            // console.log("Current:", current);


            link.href = current.recipe.url;
            link.textContent = `${current.recipe.label} - ${current.recipe.source}`;
            ingreds.textContent = "Ingredients: ";
            dLabel.textContent = "Diet labels: ";
            hLabel.textContent = "Health labels: ";

            for (let j = 0; j < current.recipe.ingredientLines.length; j++) {
                let ilist = document.createElement("span");
                if (current.recipe.ingredientLines.length == 0) {
                    ilist.textContent = "None";
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
                if (current.recipe.dietLabels.length == 0) {
                    dlist.textContent = "None";
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
                if (current.recipe.healthLabels.length == 0) {
                    hlist.textContent = "None";
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

            // clearfix.setAttribute("class", "clearfix");

            recipe.appendChild(heading);
            recipe.appendChild(dLabel);
            recipe.appendChild(hLabel);
            heading.appendChild(link);
            recipe.appendChild(img);
            recipe.appendChild(ingreds);
            // recipe.appendChild(clearfix);
            section.appendChild(recipe);
        }
    }

    if (recipes.length != 0) {
        nav.style.display = "block";
    } else {
        nav.style.display = "none";
    }
}

function nextPage(e) {
    pageNumber++;
    fetchResults(e);
}

function previousPage() {
    if (pageNumber > 0) {
        pageNumber--;
        fetchResults(e);
    } else {
        return;
    }
    fetchResults(e);
}
