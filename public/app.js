//failo užlaudinimo funkcija
function loadScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script);
}

//patikrina ar browseris supportina localstorage, tuomet paleidžia appsą
try {
    localStorage.setItem('mod', 'mod');
    localStorage.removeItem('mod');
        loadScript('build/ClientRecorder.js');
} catch(e) {// local storage is not supported
    window.alert("your browser doesnt support localstorage");
}
