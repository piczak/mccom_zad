function getMovie(responseData, data) {
    document.getElementById("template").innerHTML = movieTemplate(responseData, data)
}

function getMovies(responseData, data) {
    document.getElementById("template").innerHTML = moviesTemplate(responseData, data)
}

function movie(data) {
    this.Title = data.Title
    this.Year = data.Year
    this.Rated = data.Rated
    this.Released = data.Released
    this.Runtime = data.Runtime
    this.Genre = data.Genre
    this.Director = data.Director
    this.Writer = data.Writer
    this.Actors = data.Actors
    this.Plot = data.Plot
    this.Language = data.Language
    this.Country = data.Country
    this.Awards = data.Awards
    this.Poster = data.Poster
    this.Metascore = data.Metascore
    this.imdbRating = data.imdbRating
    this.imdbVotes = data.imdbVotes
    this.imdbID = data.imdbID
    this.Type = data.Type
    this.DVD = data.DVD
    this.BoxOffice = data.BoxOffice
    this.Production = data.Production
    this.Website = data.Website
    this.Response = data.Response
}

function searchMovies() {
    var searchedPhrase = document.getElementById("search-input").value
    if(searchedPhrase.length >= 3) {
        setMovies(searchedPhrase)
    }
}

function getSearchTemplate(data) {
    // document.getElementById("template").innerHTML = moviesTemplate(data)
}

// setMovie('tt2975590')
// setMovies()

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
