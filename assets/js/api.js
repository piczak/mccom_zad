const url = 'http://www.omdbapi.com/'
const apiKey = '51d581f'
const baseURL = url + '?apikey=' +apiKey

var XMLHttpRequest  = new XMLHttpRequest();

function ajax(data) {
    XMLHttpRequest.open(data.method, baseURL + data.url);
    XMLHttpRequest.onload = function() {
        if (XMLHttpRequest.status == 200) {
            templateSelector(JSON.parse(XMLHttpRequest.response), data)
        }
    }
    XMLHttpRequest.send();
}

function templateSelector(responseData, data) {
    switch(data.type){
        case 'movie':
            getMovie(responseData, data)
            break;
        case 'search':
            getMovies(responseData, data)
            break;
    }
}