window.addEventListener("DOMContentLoaded", getJSON);


function getJSON() {
    fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/posts")
        .then(res => res.json())
        .then(handleData)
}

function handleData(data) {
    const id =
        console.log(data);

    // preloader.hide();
    data.forEach(showPost)
}


function showPost(post) {
    //console.log(post.title.rendered);
    const template = document.querySelector(".postTemplate").content;
    const postCopy = template.cloneNode(true);
    const title = postCopy.querySelector("h1");
    title.textContent = post.title.rendered;
    document.querySelector("#posts").appendChild(postCopy)
}
