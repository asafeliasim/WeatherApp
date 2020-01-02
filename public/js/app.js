console.log("Client side Javascript is loaded..")

//setup the elements to get the data from client
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

messageOne.textContent = "Loading..."
messageTwo.textContent=""
// the browser wait for event and data
weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = search.value
    //console.log(location)
    fetch('http://localhost:4000/weather?address=' + location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent= data.error
            }else{
                messageOne.textContent = "Location: " + data.location+"."
                messageTwo.textContent=  "Forecast: "+ data.forecast+"."
            }

        })
    })

})