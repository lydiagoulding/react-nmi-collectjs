export default function injectCollectJS(collectJsUrl, tokenizationKey) {
    const script = document.createElement('script');

    script.setAttribute('src', collectJsUrl);
    script.setAttribute('data-tokenization-key', tokenizationKey);
    script.setAttribute('data-variant', 'inline');

    document.querySelector('body').appendChild(script)

    return new Promise((resolve, reject) => {
        script.onload = function() {
            resolve(window.CollectJS);
        }
    })
}