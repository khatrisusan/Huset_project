function show() {
    document.querySelector("#nav").classList.toggle("hide")
}

function showMenu() {
    document.querySelector("#menuItem").classList.toggle("hide")
}


function getNav() {
    //console.log('get nav running')
    fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/categories")
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
        getFrontpageData();
    }

}

function getSearchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event?_embed&search=" + search)
        .then(res => res.json())
        .then(handleData)
}

function getCategoryData(cat) {
    //console.log(cat)

    fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event?_embed&categories=" + cat)
        .then(res => res.json())
        .then(handleData)
}


function getFrontpageData() {
    fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event?_embed")
        .then(res => res.json())
        .then(handleData)
}

function handleData(myData) {
    myData.forEach(showPost);
}

function showPost(post) {
    //console.log(post);

    const template = document.querySelector(".postTemplate").content;
    const postCopy = template.cloneNode(true);

    postCopy.querySelector("h1").innerHTML = post.title.rendered;
    postCopy.querySelector(".date p").innerHTML = post.event_date;
    postCopy.querySelector("img").src = post.event_image.guid;
    postCopy.querySelector("section.description p").innerHTML = post.content.rendered;

    function showMore() {

        var x = document.querySelector("button.SM");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }

    /*
change DOM CONTENT
*/
    //const img = postCopy.querySelector("img");
    //img.setAttribute("src", imgPath);

    //img.setAttribute("alt", "cover of the book"+ post.title.rendered);

    const a = postCopy.querySelector("a");
    //a.href = "subpage.html?id=" + post.id
    document.querySelector("#posts").appendChild(postCopy);

}

/*
==========================================
showMore BUTTON
==========================================
*/

/*
function showMore() {
    //console.log("clicked")
    getShowMoreData();

    function getShowMoreData() {
        fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event?_embed")
            .then(res => res.json())
            .then(handleData)
    }

    function handleData(myData) {
        myData.forEach(showPost);
    }

    function showPost(post) {
        console.log(post);

        const myTemplate = document.querySelector("#template2").content;
        const postCopy2 = myTemplate.cloneNode(true);

        //const addData = document.createElement("p")
        //p.textContent=post.content.rendered;
        postCopy2.querySelector("p.container").innerHTML = post.content.rendered;
        //postCopy2.querySelector(".container").textContent= post.content.rendered;

        document.querySelector(".post").appendChild(postCopy2);

    }



}
*/
