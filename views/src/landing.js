let navbar = document.querySelector('#navbar')
let register_navbar = document.querySelector('#register-navbar')
let login_navbar = document.querySelector('#login-navbar')
let name_feedback = document.querySelector('#name-feedback')
let email_feedback = document.querySelector('#email-feedback')
let subject_feedback = document.querySelector('#subject-feedback')
let contact_us_form = document.querySelector('#contact-us-form')
let contact_us_h1 = document.querySelector('#contact-us-h1')

let profile_navbar = document.querySelector('.profile-navbar')
let profile_thumbnail = document.querySelector('.user-picture')
let profile_username = document.querySelector('.user-info h3')
let profile_image = document.querySelector('.user-info img')


function openProfileNavbar(){
    profile_navbar.classList.toggle('open-menu')
}

function logout(){
    localStorage.removeItem('Refresh_Token')
    window.location.href = '/v2/api/users/logout'
}

async function loadProfiledata(){
    let response = await fetch('/v2/api/users/inspect')


    if(response.status == 200){
        let body = await response.json()

        register_navbar.remove()
        login_navbar.remove()
        
        let application_li = document.createElement('li')
        application_li.id = 'application-navbar'

        let application_a = document.createElement('a')
        application_a.href = '/try'
        application_a.innerText = 'Open Application'

        application_li.appendChild(application_a)
        navbar.appendChild(application_li)


        profile_image.src = body.user.profile_picture
        profile_thumbnail.src = body.user.profile_picture
        profile_username.innerText = body.user.username
    }else{
        profile_thumbnail.remove()
        profile_navbar.remove()
    }
}

loadProfiledata()


async function sendFeedback(){
    let response = await fetch(
        '/v2/api/users/feedback',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name_feedback.value,
                email: email_feedback.value,
                subject: subject_feedback.value
            })
        }
    )


    if(response.status == 200){
        contact_us_form.remove()
        contact_us_h1.innerText = 'Feedback were sent Successfully !'
    }
}