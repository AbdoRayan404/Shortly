let button = document.querySelector('body > div.create_div > button');
let text = document.querySelector('body > div.create_div > input.text-box')

button.addEventListener('click', create)

async function create(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/v1/api/links/create', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        uqqwerl: text.value
    }));

   xhr.addEventListener('load', (event)=>{
        if(xhr.status){
            //successful request
            console.log(`${window.location.origin}/s/${JSON.parse(xhr.response).shortened}`)
        }else{
            //unsuccessful request
            console.log(xhr.status)
        }
   })
}