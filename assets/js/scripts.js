function searchMovies() {
    var searchedPhrase = document.getElementById("search-input").value
    if(searchedPhrase.length >= 3) {
        setMovies(searchedPhrase)
    }
}

function setMovie(id) {
    var data = {
        method: 'GET',
        type: 'movie',
        parameter: 'i',
        id: id,
        get url(){ return '&' + this.parameter + '=' + this.id }
    }
    ajax(data)
}

function setMovies(search) {
    var data = {
        method: 'GET',
        parameter: 's',
        search: search,
        get url(){ return '&' + this.parameter + '=' + this.search },
        type: 'search'
    }
    ajax(data)
}

function setPage(pageNo, search) {

    var idNo = document.getElementsByClassName('active')[0].id.substr(10)
    var pagesNo = document.getElementsByClassName('page-block').length

    if(pageNo === 'prev') {
        if(idNo > 1) {
            pageNo = parseInt(idNo) - 1
        } else {
            pageNo = idNo
        }
    }
    if(pageNo === 'next') {
        if(idNo < pagesNo) {
            pageNo = parseInt(idNo) + 1
        } else {
            pageNo = idNo
        }
    }
    var data = {
        method: 'GET',
        parameter: 's',
        search: search,
        pageNo: pageNo,
        get url(){ return '&' + this.parameter + '=' + this.search + '&page=' + this.pageNo },
        type: 'search'
    }
    ajax(data)
}

function searchMoviesKey(event) {
    if(event.keyCode == 13) {
        searchMovies()
    }
}

setMovies('batman')
