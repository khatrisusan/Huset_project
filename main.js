const filterBtn = document.querySelector("div.filter img");
filterBtn.addEventListener("click", show);

const img = document.createElement('img');
img.src = "images/cross.png";
img.id="close";
img.classList.add("hide");

document.querySelector('.filter').appendChild(img);

function show() {
    document.querySelector("#nav").classList.toggle("hide");
    console.log("show")
    document.querySelector("img#close").classList.toggle("hide");
    document.querySelector(".search").classList.toggle("hide");
    document.querySelector(".filter img").classList.toggle("hide");
    document.querySelector(".show-menu-btn").style.display="none";

    document.querySelector("img#close").addEventListener("click", () => {
        show();
        document.querySelector(".show-menu-btn").style.display="block";
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
        getFrontpageData();
    }


}


function getSearchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event?_embed&per_page=100&search=" + search)
        .then(res => res.json())
        .then(handleData)
}

function getCategoryData(cat) {
    //console.log(cat)

    fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event?_embed&per_page=100&categories=" + cat)
        .then(res => res.json())
        .then(handleData)
}


function getFrontpageData() {
    fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event?_embed&per_page=100")
        .then(res => res.json())
        .then(handleData)
}

function handleData(myData) {
    myData.forEach(showPost);
}

function showPost(post) {
    // console.log(post);

    const template = document.querySelector(".postTemplate").content;
    const postCopy = template.cloneNode(true);

    postCopy.querySelector("h1").innerHTML = post.title.rendered;
    postCopy.querySelector(".date p").innerHTML = post.event_date;
    postCopy.querySelector("img").src = post.event_image.guid;
    postCopy.querySelector(".description p").innerHTML = post.content.rendered;

    postCopy.querySelector("section.description p:nth-child(2)").innerHTML = "Price :" + post.price + " DKK";
    showMore();

    function showMore() {

        postCopy.querySelector("button.SM").addEventListener("click", (clickEvent) => {
          //  console.log(clickEvent)
            //console.log(clickEvent.target.parentNode)
            clickEvent.target.previousElementSibling.classList.remove("hide")
            // e.target.textContent = "Show Less"
            clickEvent.target.classList.add("hide")
        })

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
