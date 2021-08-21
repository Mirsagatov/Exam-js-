//Lists
const elUsersList = document.querySelector(".users__list");
const elPostsList = document.querySelector(".posts__list");
const elCommentsList = document.querySelector(".comments__list");

//Templates
const elUserTemplate = document.querySelector("#user__template").content;
const elPostTemplate = document.querySelector("#post__template").content;
const elCommentTemplate = document.querySelector("#comment__template").content;


//Users
function renderUsers(arr, element) {
    element.innerHTML = null;
    
    const userFragment = document.createDocumentFragment();

    arr.forEach(row => {
        const userTemplate = elUserTemplate.cloneNode(true);

        userTemplate.querySelector('.user__name').textContent = row.name;
        userTemplate.querySelector('.user__id').textContent = `ID: ${row.id}`;

        userTemplate.querySelector('.user__company-name').textContent = row.company.name;
        userTemplate.querySelector('.user__company-catchphrase').textContent = row.company.catchPhrase;
        userTemplate.querySelector('.user__company-bs').textContent = row.company.bs;

        userTemplate.querySelector('.user__username').textContent = row.username;
        userTemplate.querySelector('.user__email').textContent = row.email;
        userTemplate.querySelector('.user__email').href = `mailto:${row.email}`;
        userTemplate.querySelector('.user__address').textContent = `${row.address.city}, ${row.address.street}, ${row.address.suite}`;
        userTemplate.querySelector('.user__address').href = `https://www.google.com/maps/place/${row.address.geo.lat},${row.address.geo.lng}`;
        userTemplate.querySelector('.user__website').textContent = row.website;
        userTemplate.querySelector('.user__website').href = `http://www.${row.website}`;

        userTemplate.querySelector('.user').dataset.userId = row.id;


        userFragment.appendChild(userTemplate);
    });
    element.appendChild(userFragment);
}


//Fetch Users
async function fetchUsers() {

    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    elPostsList.innerHTML = null;

    renderUsers(data, elUsersList);
}
fetchUsers();



//Render Posts
function renderPosts(arr, element) {

    element.innerHTML = null;

    const postFragment = document.createDocumentFragment();

    arr.forEach(row => {
        const postTemplate = elPostTemplate.cloneNode(true);

        postTemplate.querySelector('.post__id').textContent = `ID: ${row.id}`;
        postTemplate.querySelector('.post__userid').textContent = `User ID: ${row.userId}`;

        postTemplate.querySelector('.post__title').textContent = row.title;
        postTemplate.querySelector('.post__body').textContent = row.body;

        postTemplate.querySelector('.post').dataset.postId = row.userId;


        postFragment.appendChild(postTemplate);
    });
    element.appendChild(postFragment);

}


//Fetch Posts
async function fetchPosts() {

    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();

    renderPosts(data, elPostsList);
}
// fetchPosts();



//Render Comments
function renderComments(arr, element) {

    element.innerHTML = null;

    const commentFragment = document.createDocumentFragment();

    arr.forEach(row => {
        const commentTemplate = elCommentTemplate.cloneNode(true);

        commentTemplate.querySelector('.comment__id').textContent = `ID: ${row.id}`;
        commentTemplate.querySelector('.comment__postid').textContent = `Post ID: ${row.postId}`;

        commentTemplate.querySelector('.comment__email').textContent = row.email;
        commentTemplate.querySelector('.comment__name').href = `mailto:${row.email}`;
        commentTemplate.querySelector('.comment__name').textContent = row.name;
        commentTemplate.querySelector('.comment__body').textContent = row.body;

        commentTemplate.querySelector('.comment').dataset.postId = row.postId;


        commentFragment.appendChild(commentTemplate);
    });
    element.appendChild(commentFragment);

}


//Fetch Comments
async function fetchComments() {

    const response = await fetch("https://jsonplaceholder.typicode.com/comments");
    const data = await response.json();

    renderPosts(data, elCommentsList);
}
// fetchComments();



//Users List evt Delegation
elUsersList.addEventListener("click", (evt) =>{
    if(evt.target.matches(".user")) {
        const {userId} = evt.target.dataset;

    fetch("https://jsonplaceholder.typicode.com/posts?userId=" + userId)
    .then((response) => response.json())
    .then((postData) => { 
        renderPosts(postData, elPostsList);
    });
    }
}); 



//Post List evt Delegation
elPostsList.addEventListener("click", (evt) =>{
    if(evt.target.matches(".post")) {
        const {postId} = evt.target.dataset;

    fetch("https://jsonplaceholder.typicode.com/comments?postId=" + postId)
    .then((response) => response.json())
    .then((commentData) => { 
        renderComments(commentData, elCommentsList);
    });
    }
}); 