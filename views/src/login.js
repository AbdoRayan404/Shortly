let email_input = document.querySelector('#email-input')
let password_input = document.querySelector('#password-input')
let link_button = document.querySelector('.link-button')
let response_message = document.querySelector('#response-message')


async function login(){
    let response = await fetch(
        '/v2/api/users/login', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                email: email_input.value,
                password: password_input.value
            })
        }
        )

    let responseMessage = await response.text()

    if(response.status == 200){
        link_button.style.margin = '5px auto'
        response_message.innerHTML = 'Logged in successfully.'
        response_message.style.color = 'green'
    }else if(response.status == 400){
        link_button.style.margin = '5px auto'
        response_message.innerHTML = responseMessage
        response_message.style.color = 'red'
    }else{
        link_button.style.margin = '5px auto'
        response_message.innerHTML = 'Internal error'
        response_message.style.color = 'red'
    }
    return undefined
}