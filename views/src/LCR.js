let button = document.querySelector('body > div.create_div > button');
let text = document.querySelector('body > div.create_div > input.text-box')
let link = document.querySelector('body > div.create_div > a');

button.addEventListener('click', create)

async function create(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/v1/api/links/create', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        url: text.value
    }));

   xhr.addEventListener('load', (event)=>{
        if(xhr.status){
            link.style.visibility = 'visible';
            link.href = `${window.location.origin}/s/${JSON.parse(xhr.response).shortened}`
            link.innerHTML = `${window.location.origin}/s/${JSON.parse(xhr.response).shortened}`
        }else{
            //unsuccessful request
            console.log(xhr.status)
        }
   })
}