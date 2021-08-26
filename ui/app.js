const urlInput = document.getElementById('url-input');
const actionButton = document.getElementById('btn');
const display = document.getElementById('display');
const copyBtn = document.getElementById('copy-btn');

const apiUrl = 'http://localhost:4000';

urlInput.addEventListener('keydown', (e) => {
    urlInput.classList.remove('red');
});

actionButton.addEventListener('click', async(e) => {
    if(!urlInput.value) {
        urlInput.placeholder = 'URl is required';
        urlInput.classList.add('red');
        return;
    };

    display.innerHTML = '';

    let data;
    try {

        const res = await fetch(`${apiUrl}/short`, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({url: urlInput.value})
        });
        if(res.status > 201) {
            urlInput.value = '';
            urlInput.placeholder = 'URl appears invalid, please check and try again';
            urlInput.classList.add('red');
            return;
        }
        data = await res.json();
    }catch(e) {
        console.log(e.message);
    }

    const urlLink = document.createElement('a');
    urlLink.setAttribute('href', `${data.short}`);
    urlLink.setAttribute('target', '_blank');
    urlLink.innerText = `${apiUrl}/${data.short}`;

    copyBtn.style.display = 'block';

    display.appendChild(urlLink);
});

copyBtn.addEventListener('click', (e) => {
    const link = display.innerText;

    const copied = document.createElement("textarea");
    document.body.appendChild(copied);
    copied.value = link;
    copied.select();
    document.execCommand("copy");
    document.body.removeChild(copied);
});