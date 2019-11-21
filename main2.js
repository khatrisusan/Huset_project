function show() {
    document.querySelector("#nav").classList.remove("hide");
    const img = document.createElement('img');
    img.src =
        "images/cross.png";
    img.id="close";
    document.querySelector('.filter').appendChild(img);
   document.querySelector("img#close").addEventListener("click", function(){
   console.log("hide");
       document.querySelector("#nav").style.display="none";
       document.querySelector("img#close").parentElement.classList.remove("hide");
});
    }


function showMenu() {
    document.querySelector("#menuItem").classList.toggle("hide")
}


function getNav() {
    //console.log('get nav running')
    fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/categories?per_page=100&exclude=5+7")
        .then(res => res.json())
        .then(getCategory)
}

function getCategory(oneItem) {
    oneItem.forEach(function (e) {
        // console.log(e);
        if (e.parent === 0 && e.count > 0) {
            const newElement = document.createElement("a");
            newElement.textContent = e.name;
            newElement.setAttribute("href", "category.html?category=" + e.id)
            document.querySelector("#nav").appendChild(newElement);
            //console.log(newElement);

        }
    })
}
getNav();
window.addEventListener("DOMContentLoaded", getData);

function getData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const id = urlParams.get("id");
    const category = urlParams.get("category");

    if (search) {
        //console.log("this is searching")
        getSearchData();
    } else if (id) {
        // console.log("hi mom")
        //getSingleBook();
    } else if (category) {
        //category stuffs
        // console.log("you should be displaying category :", category)
        getCategoryData(category)
    } else {
        //console.log("Not searching")

    }


}

