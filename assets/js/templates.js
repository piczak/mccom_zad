function movieTemplate(responseData, data)
{
    var poster = ''
    if(responseData.Poster && responseData.Website) {
        poster =
            "<a href='" + responseData.Website + "'>\n" +
            "<div class='poster-container float-right img-fluid'>\n" +
            "<div class='poster'>\n" +
            "<img class='img-fluid' src='" + responseData.Poster + "'/>\n" +
            "<span id='border-bottom-right-first'></span>\n" +
            "<span id='border-bottom-right-second'></span>\n" +
            "<span id='border-bottom-right-third'></span>\n" +
            "<span id='border-top-left-first'></span>\n" +
            "<span id='border-top-left-second'></span>\n" +
            "<span id='border-top-left-third'></span>\n" +
            "</div>\n" +
            "</div>\n" +
            "</a>"
    } else if (responseData.Poster && !responseData.Website) {
        poster =
            "<div class='poster-container float-right img-fluid'>\n" +
            "<div class='poster'>\n" +
            "<img class='img-fluid' src='" + responseData.Poster + "'/>\n" +
            "<span id='border-bottom-right-first'></span>\n" +
            "<span id='border-bottom-right-second'></span>\n" +
            "<span id='border-bottom-right-third'></span>\n" +
            "<span id='border-top-left-first'></span>\n" +
            "<span id='border-top-left-second'></span>\n" +
            "<span id='border-top-left-third'></span>\n" +
            "</div>\n" +
            "</div>"
    }

    return "<div class='col-12 col-sm-12 col-md-12'>\n" +
        "<div class='title'>\n" +
        "<div class='row'>\n" +
        "<div class='col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9'>\n" +
        "<div>" + (( responseData.Type !== 'N/A') ? responseData.Type : '' ) + "(" + (( responseData.Year !== 'N/A') ? responseData.Year : '' ) + ")" + "</div>\n" +
        "<div id='title'>" + (( responseData.Title !== 'N/A') ? responseData.Title : '' ) + "</div>\n" +
        "</div>\n" +
        "<div class='col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3'>" + poster + "</div>\n" +
        "<div class='col-9 col-sm-9 col-md-3 col-lg-3 col-xl-3'>\n" +
        "<div class='rating-box '>\n" +
        "<p>" + (( responseData.imdbRating !== 'N/A') ? '<img src=\'assets/img/12.png\' />ImdbRating: ' + responseData.imdbRating : '' ) + "</p>\n" +
        "<p>" + (( responseData.imdbVotes !== 'N/A') ? 'ImdbVotes: ' + responseData.imdbVotes : '' ) + "</p>\n" +
        "</div>\n" +
        "</div>\n" +
        "</div>\n" +
        "<div class='movie-info'>\n" +
        "<div class='movie-genere'>\n" +
        "<div class='row'>\n" +
        "<span class='col-md-auto'>" + (( responseData.Genre !== 'N/A') ? 'Genre: ' + responseData.Genre : '' ) + "</span>\n" +
        "</div>\n" +
        "</div>\n" +
        "<div class='separator'></div>\n" +
        "<div class='row'>\n" +
        "<div class='col-9 col-sm-9 col-md-9 col-lg-9 col-xl-9'>\n" +
        "<p>" + (( responseData.Plot !== 'N/A') ? responseData.Plot : '' ) + "</p>\n" +
        "</div>\n" +
        "<div class='movie-info-topic col-12 col-sm-12 col-md-4 lg-3'>\n" +
        (( responseData.Runtime !== 'N/A') ? "<p><span>Runtime:</span> " + responseData.Runtime + "</p>" : '' ) +
        (( responseData.Released !== 'N/A') ? "<p><span>Released:</span> " + responseData.Released + "</p>" : '') +
        (( responseData.Rated !== 'N/A') ? "<p><span>Rated:</span> " + responseData.Rated + "</p>" : '') +
        (( responseData.Language !== 'N/A') ? "<p><span>Language:</span> " + responseData.Language + "</p>" : '') +
        (( responseData.Country !== 'N/A') ? "<p><span>Country:</span> " + responseData.Country + "</p>" : '') +
        "</div>\n" +
        "</div>\n" +
        "<div class='separator'></div>\n" +
        "<div class='row'>\n" +
        "<div class='col-lg-12'>\n" +
        (( responseData.Actors !== 'N/A') ? "<p>Actors: " + responseData.Actors + "</p>" : '') +
        "</div>\n" +
        "</div>\n" +
        "</div>\n" +
        "</div>\n" +
        "</div>"
}

function moviesTemplate(responseData, data) {

    var paginator = pagination(responseData, data)

    var moviesTemplate = ''
    for(var i = 0; i < responseData.Search.length; i++) {
        if (responseData.Search[i].Type !== 'game'){
            moviesTemplate += "<div class='movies col-12 col-sm-6 col-md-4 col-lg-3'>\n" +
                "<div class='row'>\n" +
                "<div class='col-12 col-sm-12 col-md-12 col-lg-12'>\n" +
                "<img onclick='setMovie(" + "\"" + responseData.Search[i].imdbID + "\"" + ")' class='img-fluid' src='" + (( responseData.Search[i].Poster !== 'N/A') ? responseData.Search[i].Poster : 'assets/img/no_poster.png' ) + "' />\n" +
                "<p onclick='setMovie(" + "\"" + responseData.Search[i].imdbID + "\"" + ")'>" + responseData.Search[i].Title + " - " + responseData.Search[i].Type + " (" + responseData.Search[i].Year + ") " + "</p>\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>"
        }
    }
    return "<div class='col-lg-12'><div class='row'>" + moviesTemplate + "</div></div>" + paginator
}

function pagination(responseData, data) {
    var recordsPerPage = 10
    var pagesAmount = parseInt(responseData.totalResults/10)
    var paginationPages = ''
    if(responseData.totalResults > recordsPerPage) {
        if (pagesAmount * recordsPerPage < responseData.totalResults) {
            pagesAmount += 1
        }
        if (!data.pageNo) {
            data.pageNo = '1'
        }

        if(responseData.totalResults > 40) {

            for (var i = 1; i <= 4; i++) {
                if (i == data.pageNo) {
                    paginationPages += "<li id='pag-pages-" + i + "' onclick='setPage(" + "\"" + i + "\"" + ", " + "\"" + data.search + "\"" + ")' class='active page-block page-item'><a class='page-link'>" + i + "</a></li>"
                } else {
                    paginationPages += "<li id='pag-pages-" + i + "' onclick='setPage(" + "\"" + i + "\"" + ", " + "\"" + data.search + "\"" + ")' class='page-block page-item'><a class='page-link'>" + i + "</a></li>"
                }
            }

            return "<div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>\n" +
                "<nav aria-label='Page navigation example'>\n" +
                "<ul class='pagination'>\n" +
                "<li class='page-item' onclick='setPage(\"prev\"," + "\"" + data.search + "\")'><a class='page-link'>Previous</a></li>" + paginationPages +
                "<li class='page-item'  onclick='setPage(\"next\"," + "\"" + data.search + "\")'><a class='page-link'>Next</a></li>\n" +
                "</ul>\n" +
                "</nav>\n" +
                "</div>"
        } else {
            return "<div class='col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'>\n" +
                "<nav aria-label='Page navigation example'>\n" +
                "<ul class='pagination'>\n" +
                "<li class='page-item' onclick='setPage(\"prev\"," + "\"" + data.search + "\")'><a class='page-link'>Previous</a></li>" + paginationPages +
                "<li class='page-item'  onclick='setPage(\"next\"," + "\"" + data.search + "\")'><a class='page-link'>Next</a></li>\n" +
                "</ul>\n" +
                "</nav>\n" +
                "</div>"
        }
    }
}