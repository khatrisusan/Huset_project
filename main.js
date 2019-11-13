/*

window.addEventListener("DOMContentLoaded", getJSON);


function getJSON() {
    fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event?")
        .then(res => res.json())
        .then(handleData)
}

function handleData(data) {
        console.log(data);

    // preloader.hide();
    //data.forEach(showPost)
}


function showPost(post) {
    console.log(post);
    //const template = document.querySelector(".postTemplate").content;
    //const postCopy = template.cloneNode(true);
    //const title = postCopy.querySelector("h1");
    //title.textContent = post.title.rendered;
   // document.querySelector("#posts").appendChild(postCopy);
}
*/





window.addEventListener("DOMContentLoaded", getData);

function getData() {
	const urlParams = new URLSearchParams(window.location.search);
	const search = urlParams.get("search");
	const id = urlParams.get("id");

	if (search) {
		console.log("this is searching")
		getSearchData();
	} else if (id) {
		console.log("hi mom")
		getSingleBook();
	} else {
		console.log("Not searching")
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



function getFrontpageData() {
	fetch("http://cosmicstryder.dk/wordpress/wp-json/wp/v2/event?_embed")
		.then(res => res.json())
		.then(handleData)
}
    function handleData(myData) {
	myData.forEach(showPost);
}

function showPost(post) {
	console.log(post);

	const template = document.querySelector(".postTemplate").content;
	const postCopy = template.cloneNode(true);

	postCopy.querySelector("h1").innerHTML = post.title.rendered;
    postCopy.querySelector("img").src = post.event_image.guid;
    postCopy.querySelector("section.description p").innerHTML = post.content.rendered;


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
