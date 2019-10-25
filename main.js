window.addEventListener("DOMContentLoaded", getJSON);


function getJSON(){
    fetch("https://huset-kbh.dk/wp-json/wp/v2/posts")
    .then (res=>res.json())
    .then(handleData)
}
function handleData(data){
    console.log(data);
   // preloader.hide();
   // data.forEach(showPost)
}

/*
function showPost(post){
    post._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
    const Template= document.querySelector(".postTemplate").content;
    const postCopy= Template.cloneNode(true);
    const title=postCopy.querySelector("h1");
    h1.textContent=
}
*/


