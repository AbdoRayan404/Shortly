let navbar = document.querySelector('#navbar')
let register_navbar = document.querySelector('#register-navbar')
let login_navbar = document.querySelector('#login-navbar')

async function auth(){
    let response = await fetch('/v2/api/users/auth')

    if(response.status == 202){
        register_navbar.remove()
        login_navbar.remove()
        
        let application_li = document.createElement('li')
        application_li.id = 'application-navbar'

        let application_a = document.createElement('a')
        application_a.href = '/try'
        application_a.innerText = 'Open Application'

        application_li.appendChild(application_a)
        navbar.appendChild(application_li)
    }
}

auth()