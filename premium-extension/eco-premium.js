async function getData(id) {
    const url = `https://eco.sapo.pt/wp-json/eco/v1/items/id/${id}`;
    try {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Eco/68'
            }
        });
        if (!response.ok) {
            console.error(`Response status: ${response.status}`);
            throw new Error(`Response status: ${response.status}`);
        }
  
        const json = await response.json();
        return json['body'];
    } catch (error) {
        console.error(error.message);
    }
    return '';
}

function getArticleId(subscribeElement) {
    var parentNode = subscribeElement.parentNode;
    while (parentNode && parentNode.nodeName !== 'ARTICLE') {
        parentNode = parentNode.parentNode;
    }
    return parentNode.id.split('post-')[1];
}

async function allowPremium() {
    const contentClasses = document.getElementsByClassName('entry__content');
    if (contentClasses.length < 1) {
        return;
    }
    clearInterval(intervalTimer);

    const subscribeElement = document.getElementsByClassName('content-trimmer--restricted');
    const isPremium = subscribeElement.length != 0;
    if (!isPremium) {
        return;
    }
    
    const articleId = getArticleId(subscribeElement[0]);
    // Remove fade-out
    subscribeElement[0].classList.remove('content-trimmer--restricted');

    const markdownBody = await getData(articleId);
    var converter = new showdown.Converter();
    const htmlBody = converter.makeHtml(markdownBody);

    const contentDiv = contentClasses[0];
    contentDiv.innerHTML = htmlBody;

    // Remove subscribe box
    const infoboxClasses = document.getElementsByClassName('infobox');
    if (infoboxClasses.length < 1) {
        return;
    }
    infoboxClasses[0].remove();
}

var intervalTimer = setInterval(allowPremium, 500);
