let button = document.querySelector('.create_button');
let input = document.querySelector('.text-box')
let links_group = document.querySelector('.links-group')

async function create(){
    let response = await fetch(
            '/v2/api/links/create',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ url: input.value })
            }
            )

    if(response.status == 200){
        let body = await response.json()

        if(document.querySelector('.error-message')){
            document.querySelector('.error-message').remove()
        }
        links_group.style.visibility = 'visible';

        let container = document.createElement('div')
        container.className = 'links-container'

        let original_link = document.createElement('span')
        original_link.className = 'original-link'
        original_link.innerText = `${input.value.split('').splice(0, 30).join('')}...`

        let shortened_link = document.createElement('span')
        shortened_link.className = 'shortened-link'
        shortened_link.innerText = `${window.location.origin}/s/${body.shortened}`
        shortened_link.onclick = (x)=> {
            navigator.clipboard.writeText(`${window.location.origin}/s/${body.shortened}`)
        }

        let monitor_button = document.createElement('a')
        monitor_button.className = 'monitor-button'
        monitor_button.href = `/monitor/${body.shortened}`
        monitor_button.innerText = 'Monitor'


        container.appendChild(original_link)
        container.appendChild(shortened_link)
        container.appendChild(monitor_button)

        links_group.appendChild(container)
    }else{
        if(document.querySelector('.error-message')){
            return
        }

        links_group.style.visibility = 'visible';

        let message = document.createElement('p')
        message.innerText = 'Please insert a valid link'
        message.className = 'error-message'
        message.style.color = 'red'

        links_group.appendChild(message)
    }
}