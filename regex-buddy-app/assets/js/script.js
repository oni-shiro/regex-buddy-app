console.log("in script");
function handleSearch(event) {
    event.preventDefault();
    // Get the input element by its ID
    var input = document.getElementById("input-text");

    // Get the value of the input element
    var regex = input.value;
    console.log("You entered: " + regex);
    // Do something with the regex value
    var jsonString = createJson(regex);
    console.log("jsonObject" + jsonString);
    
    var resp = sendPostRequest(jsonString)
    .then(function(responseString) {
        const parsedJson = JSON.parse(responseString);
        const responseBody = parsedJson.response;
        console.log(responseBody);
        writeResponse(responseBody);
    })
    .catch(function(error) {
      console.log(error);
      // Handle the error
    });
    console.log("resp"+resp); // the response string from the server
    
    
    
}
function writeResponse(response){
    const parent = document.querySelector(".div-header");
    const oldElement = document.getElementById("my-element");
    if(oldElement){
      parent.removeChild(oldElement);
    }
    const myElement = document.createElement("p");
    myElement.innerHTML = response;
    myElement.classList.add("my-custom-class");
    myElement.id = "my-element";
    parent.appendChild(myElement)
    //delete the old one
    
}
function createJson(stringInput) {
    var jsonObject = { regularExpression: stringInput };
    return JSON.stringify(jsonObject);
}

async function sendPostRequest(jsonString) {
    var url = "http://localhost:8080/regex-helper/regex-buddy/regex/knowRegex";
  
    var response = await fetch(url, {
      method: "POST",
      body: jsonString,
      headers: {
        "Content-Type": "application/json"
      }
    });
  
    var responseString = await response.text();
    return responseString;
}

