var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
}

const button = document.getElementById('btn');

const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
'((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
'(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
'(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

function discord_message(webHookURL, message, username, iconLink) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", webHookURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (iconLink != '') {
        xhr.send(JSON.stringify({
            'content': message,
            'username':username,
            'avatar_url' : iconLink
        }));
    } else {
        xhr.send(JSON.stringify({
            'content': message,
            'username':username
        }));
    }

}

button.onclick = function () {
    const webhook_url = document.getElementById('wurl').value;
    const bot_username = document.getElementById('user').value;
    const avatar_url = document.getElementById('aurl').value;
    const message = document.getElementById('msg').value;

    if (webhook_url == '' || bot_username == '' || message == '')
        return alert('You have\'nt filled all the mandatory fields.')

    if (avatar_url != '') {
        if (!isValidUrl(webhook_url) || !isValidUrl(avatar_url))
            return alert('You have\'nt used a URL when you need to.');


        for (let i = 0 ; i < slider.value ; i++)
            discord_message(webhook_url, message, bot_username, avatar_url);
        
    } else {
        if (!isValidUrl(webhook_url)) return alert('You have\'nt used a URL when you need to.');
        
        for (let i = 0 ; i < slider.value ; i++)
            discord_message(webhook_url, message, bot_username, avatar_url);

    }

}