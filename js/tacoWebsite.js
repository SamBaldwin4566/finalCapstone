//Create empty arrays to save data for later
let saveRecipes = [];
let saveImg = [];
let saveDetails = {};
let commentsList = [];
let saveData = [saveRecipes, saveImg, saveDetails, commentsList];


//Function to be executed when page loads to check if session storage is null
function myLoad() {
    if (sessionStorage.getItem("saveData") === null) {
        sessionStorage.setItem("saveData", JSON.stringify(saveData));
    } else {
        saveData = JSON.parse(sessionStorage.getItem("saveData"));
    };  
};



//Create variables for elements to manipulate webpage (Images and Recipes)
let saveList = document.getElementById("saveList");
let savedRecipeList = document.getElementById("savedRecipes");
let recipeList = document.getElementById("recipeList");
let images = document.querySelectorAll("img");


//Add event listener to recipe button, if clicked move recipe to saveData array
let recipeButton = document.querySelectorAll(".recipeButton");
for(i=0;i<recipeButton.length;i++) {
    recipeButton[i].addEventListener("click", (e) => {
        e.target.className = "hidden";
        saveData[0].push(e.target.parentElement.innerHTML);
        //Save to session storage
        sessionStorage.setItem("saveData", JSON.stringify(saveData));
        //Alert to show how many recipes are saved
        alert(`You have ${saveData[0].length} recipe(s) saved in your account`);
    }); 
};

//Create list for recipes
function createRecipeFolder() {
    saveRecipes = saveData[0];

    for(i=0;i<saveRecipes.length;i++) {
        let item = document.createElement("div");
        item.innerHTML = saveRecipes[i];
        item.className = "savedRecipes";
        savedRecipeList.appendChild(item); 
    };
};


//Add event listener to all images, if clicked move image to saveData array
for(i=0;i<images.length;i++) {
    images[i].addEventListener("click", (e) => {
        let q = prompt("Would you like to save image for later? y/n");
        if (q == "y") {
            saveData[1].push(e.target.currentSrc);
            //Save to session storage
            sessionStorage.setItem("saveData", JSON.stringify(saveData));
            //Alert to show how many images are saved
            alert(`You have ${saveData[1].length} image(s) saved in your account.`);
        };
    });
};


//Create list for image folder
function createImageFolder() {
    saveImg = saveData[1];

    for(i=0;i<saveImg.length;i++) {
        let item = document.createElement("img");
        item.src = saveImg[i];
        item.className = "saved";
        item.id = "";
        saveList.appendChild(item);     
    };
};

//Create array for all like buttons
let likeButtons = document.querySelectorAll(".like");

//Add event listener to all like buttons
for (let i=0;i<likeButtons.length;i++) {
    likeButtons[i].addEventListener("click", (e) => {
        e.target.onclick = like(e);
    });
};

//Function to change like button display
function like(e) {
    e.target.innerText = "❤️";
};


//Create variables to manipulate comment section
let post = document.getElementById("post");
let commentList = document.getElementById("commentList");

//Function to add comments and save to session storage
function comments(){
    commentsList = saveData[3];
    for(i=0;i<saveData[3].length;i++){
            let item = document.createElement("li");
            item.innerHTML = commentsList[i];
            commentList.appendChild(item);
    };
    //Add event listener to post button to print comment on the page
    post.addEventListener("click", () => {
        let commentBoxValue = document.getElementById("commentBox").value;
        saveData[3].push(document.getElementById("commentBox").value);
        let item = document.createElement("li");
        item.innerHTML = commentBoxValue;
        commentList.appendChild(item);
        sessionStorage.setItem("saveData", JSON.stringify(saveData));
        document.getElementById("commentBox").value = "";
    });
};


//Create variables for submit button and user details section of webpage
let submitForm = document.getElementById("submitForm");
let userName = document.getElementById("userName");
let userDetails = document.getElementById("userDetails");

//AddEventListener to submit form button to create an object with users information
submitForm.addEventListener("click", () => {
    user = {
        userName: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phone").value
    };
    saveData[2] = user;
    //Save to session storage
    sessionStorage.setItem("saveData", JSON.stringify(saveData));
    console.log(saveData);
});

//Function to update details on my account if user has subscribed
function updateDetails() {
    if (saveData[2].userName == undefined) {
        userName.innerHTML = "Subscribe to create an account"
        userDetails.innerHTML = ""
    }
    else {
        userName.innerHTML = "Welcome " + saveData[2].userName;
        
    }; 
};