const elUserList = document.querySelector(".user-list");
const elPostList = document.querySelector(".post-list");
const elCommentList = document.querySelector(".comment-list");

const elModal = document.querySelector(".modal");

const elUserTemplate = document.querySelector(".user-template").content;
const elPostTemplate = document.querySelector(".post-template").content;
const elCommentTemplate = document.querySelector(".comment-template").content;

const renderUser = (arr, elem) => {
  elem.innerHTML = "";
  // console.log(1);
  const userFragment = document.createDocumentFragment();

  arr.forEach((element) => {
    const clonedTemplate = elUserTemplate.cloneNode(true);
    // console.log(clonedTemplate);
    clonedTemplate.querySelector(".user-item").dataset.userId = element.id;
    clonedTemplate.querySelector(".id").textContent = element.id;
    clonedTemplate.querySelector(".id").dataset.userId = element.id;
    clonedTemplate.querySelector(".username").textContent = element.username;
    clonedTemplate.querySelector(".name").textContent = element.name;
    clonedTemplate.querySelector(".street").textContent =
      element.address.street;
    clonedTemplate.querySelector(".suite").textContent = element.address.suite;
    clonedTemplate.querySelector(".city").textContent = element.address.city;
    clonedTemplate.querySelector(".zipcode").textContent =
      element.address.zipcode;
    clonedTemplate.querySelector(".company__name").textContent =
      element.company.name;
    clonedTemplate.querySelector(".catchPhrase").textContent =
      element.company.catchPhrase;
    clonedTemplate.querySelector(".bs").textContent = element.company.bs;
    clonedTemplate.querySelector(".link").href =
      "https://www.google.com/maps/place/" +
      element.address.geo.lat +
      "," +
      element.address.geo.lng;
    clonedTemplate.querySelector(".email").href = "mailto:" + element.email;
    clonedTemplate.querySelector(".email-span").textContent = element.email;
    clonedTemplate.querySelector(".tel").href =
      "tel:" + element.phone.split(" ")[0];
    clonedTemplate.querySelector(".tel-span").textContent =
      element.phone.split(" ")[0];
    clonedTemplate.querySelector(".website").href = "http://" + element.website;
    clonedTemplate.querySelector(".website-span").textContent = element.website;

    userFragment.appendChild(clonedTemplate);
  });
  elem.appendChild(userFragment);
  elModal.classList.remove("modal-show");
};

const renderPost = (arr, elem) => {
  elem.innerHTML = "";
  elCommentList.innerHTML = ""

  const postFragment = document.createDocumentFragment();
  arr.forEach((element) => {
    const clonedPostTemplate = elPostTemplate.cloneNode(true);

    clonedPostTemplate.querySelector(".post-item").dataset.postId = element.id;
    clonedPostTemplate.querySelector(".title").dataset.postId = element.id;
    clonedPostTemplate.querySelector(".body").dataset.postId = element.id;
    clonedPostTemplate.querySelector(".title").textContent = element.title;
    clonedPostTemplate.querySelector(".body").textContent = element.body;

    postFragment.appendChild(clonedPostTemplate);
  });
  elem.appendChild(postFragment);
  elModal.classList.remove("modal-show");
};

const renderComment = (arr, elem) => {
  elem.innerHTML = "";

  const commentFragment = document.createDocumentFragment();
  arr.forEach((element) => {
    const clonedCommentTemplate = elCommentTemplate.cloneNode(true);
    clonedCommentTemplate.querySelector(".comment-name").textContent =
      element.name;
    clonedCommentTemplate.querySelector(".comment-body").textContent =
      element.body;
    clonedCommentTemplate.querySelector(".comment-email-span").textContent =
      element.email;
    clonedCommentTemplate.querySelector(".comment-email").href =
      "mailto:" + element.email;
    commentFragment.appendChild(clonedCommentTemplate);
  });

  elem.appendChild(commentFragment);
  elModal.classList.remove("modal-show");
};

async function getUser() {
  elModal.classList.add("modal-show");

  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  console.log(data);
  renderUser(data, elUserList);
}
async function getPost(num) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  let arr = data.filter((elem) => elem.userId == num);
  renderPost(arr, elPostList);
}
async function getComment(num) {
  const res = await fetch("https://jsonplaceholder.typicode.com/comments");
  const data = await res.json();
  let arr = data.filter((elem) => elem.postId == num);
  renderComment(arr, elCommentList);
}

elUserList.addEventListener("click", (e) => {
  //   console.log(e.target);
  elModal.classList.add("modal-show");

  if (e.target.matches(".user-item")) {
    let num = e.target.dataset.userId;
    console.log(num);
    getPost(num);
  }
  if (e.target.matches(".id")) {
    let num = e.target.dataset.userId;
    getPost(num);
  }
});
elPostList.addEventListener("click", (e) => {
  //   console.log(e.target);
  elModal.classList.add("modal-show");

  if (e.target.matches(".post-item")) {
    let num = e.target.dataset.postId;
    console.log(num);
    getComment(num);
  }
  if (e.target.matches(".title")) {
    let num = e.target.dataset.postId;
    getComment(num);
  }
  if (e.target.matches(".body")) {
    let num = e.target.dataset.postId;
    getComment(num);
  }
});

getUser();
