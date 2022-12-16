let email_input = document.querySelector('#email-input')
let password_input = document.querySelector('#password-input')
let link_button = document.querySelector('.link-button')
let response_message = document.querySelector('#response-message')


async function login(){
    let response = await fetch(
        '/v1/api/users/login', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
                email: email_input.value,
                password: password_input.value
            })
        }
        )

    

    if(response.status == 200){
        let responseObject = await response.json()
        localStorage.setItem('Refresh_Token', responseObject.refreshToken)

        link_button.style.margin = '5px auto'
        response_message.innerHTML = 'Logged in successfully.'
        response_message.style.color = 'green'

        setTimeout(redirect, 400)
    }else if(response.status == 400){
        let responseMessage = await response.text()

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

function redirect(){
    window.location.href = '/'
}