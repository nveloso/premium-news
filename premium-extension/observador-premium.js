var intervalTimer = setInterval(allowPremium, 500);


async function allowPremium() {
    var divElement = document.getElementsByClassName('article-body-wrapper');
    if (divElement.length < 1) {
        return;
    }
    
    clearInterval(intervalTimer);
    divElement[0].classList.remove('js-paywalled');
    articleBlocker = document.getElementById('piano-article-blocker').remove();
}
