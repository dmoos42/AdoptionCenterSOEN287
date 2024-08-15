

function displayTime() {
    setInterval(() => {
        const currentDate = new Date();
        let hours = currentDate.getHours().toString().padStart(2,"0");
        let minutes = currentDate.getMinutes().toString().padStart(2,"0");
        let seconds = currentDate.getSeconds().toString().padStart(2,"0"); 
        let date = currentDate.toDateString();
        
        
  
        const clock = date + "<br>" + hours + ":" + minutes + ":" + seconds;
        document.getElementById("time").innerHTML = clock;
    }, 1000);
  }
displayTime();


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("finderForm").addEventListener("submit", function(event){
    if(!validateFinderForm()){
      event.preventDefault();
    }
  })
})

function validateFinderForm(){
  
  const animalCheck = document.querySelector('input[name="animal"]:checked');
  const genderCheck = document.querySelector('input[name="gender"]:checked');
  const dogAlong = document.getElementById("dogs").checked;
  const catAlong = document.getElementById("cats").checked;
  const childAlong = document.getElementById("children").checked;
  if (!animalCheck) {
    document.getElementById("error").innerHTML = "Please make sure all sections are filled out!";
    return false;
  }
  if(document.getElementById("breed").value === "" && !document.getElementById("nomatter").checked){
    document.getElementById("error").innerHTML = "Please make sure all sections are filled out!";
    return false;
  }
  if(document.getElementById("age").value === ""){
    document.getElementById("error").innerHTML = "Please make sure all sections are filled out!";
    return false;
  }  
  if(!genderCheck){
    document.getElementById("error").innerHTML = "Please make sure all sections are filled out!";
    return false;
  }  
  if(!dogAlong && !catAlong && !childAlong){
    document.getElementById("error").innerHTML = "Please make sure all sections are filled out!";
    return false;
  }
}



document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("giveAwayForm").addEventListener("submit", function(event){
    if(!validateGiveAwayForm()){
      event.preventDefault();
    }
  })
})




function validateGiveAwayForm(){
  const animalCheck = document.querySelector('input[name="animal"]:checked');
  const genderCheck = document.querySelector('input[name="gender"]:checked');
  const getAlongCheck = document.querySelector('input[name="getalong"]:checked');
  const childrenCheck = document.querySelector('input[name="children"]:checked');
  const emailCheck = document.getElementById("email").value.trim();
  const textValue = document.getElementById("description").value.trim();

  if(!animalCheck){
    document.getElementById("error").innerHTML = "Please make sure all sections are filled out!";
    return false;
  }
  if(document.getElementById("breed").value === ""){
    document.getElementById("error").innerHTML = "Please make sure all sections are filled out!";
    return false;
  }
  if(document.getElementById("age").value === ""){
    document.getElementById("error").innerHTML = "Please make sure all sections are filled out!";
    return false;
  }
  if(!genderCheck){
    document.getElementById("error").innerHTML = "Please make sure all sections are filled out!";
    return false;
  }
  if(!getAlongCheck){
    document.getElementById("error").innerHTML = "Please make sure all sections are filled out!";
    return false;
  }
  if(!childrenCheck){
    document.getElementById("error").innerHTML = "Please make sure all sections are filled out!";
    return false;
  }
  if(textValue === ""){
    document.getElementById("error").innerHTML = "Please make sure all sections are filled out!";
    return false;
  }
  if(document.getElementById("name").value === ""){
    document.getElementById("error").innerHTML = "Please make sure all sections are filled out!";
    return false;
  }
  if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(emailCheck)){
    document.getElementById("error").innerHTML = "Please enter a valid email!";
    return false;
  }

  return true;

}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("accForm").addEventListener("submit", function(event){
    if(!validateaccForm()){
      event.preventDefault();
    }
  })
})

function validateaccForm(){
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if(/^[a-zA-Z0-9]+$/.test(user) && /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{4,}$/.test(pass)){
    return true;
  } else {
    document.getElementById("message").innerHTML = "<b>Please make sure both your username and password respect the requirements.</b>";
    return false;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("loginForm").addEventListener("submit", function(event){
    if(!validateaccForm()){
      event.preventDefault();
    }
  })
})
