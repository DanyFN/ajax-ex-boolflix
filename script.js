$(document).ready(function(){

  // CLICK
  $(document).on("click", "#btn-ricerca",function() {
    // svuoto li generata
    $("#stampa-ricerca").text("");
    var valoreInput = $("#ricerca-film").val();
    stampaFilm(valoreInput);
    // svuoto la input
    $("#ricerca-film").val("");

  });

  //KEYPRESS INVIO
  $("#ricerca-film").keypress(function(event){
    if (event.which===13 || event.keycode===13) {
      $("#stampa-ricerca").text("");
      var valoreInput = $("#ricerca-film").val();
      stampaFilm(valoreInput);
      // svuoto la input
      $("#ricerca-film").val("");
    }
  });

  // FUNZIONE STAMPAFILM

    function stampaFilm(queryRicerca){

      // CHIAMATA AJAX
      $.ajax({
        url:"https://api.themoviedb.org/3/search/movie", // <== API themoviedb
        method:"GET",
        data:{
          api_key:"3d9bfe6a800fbc971aaeadf6850c76f4", // <== Chiave API
          query: queryRicerca,
          language:"it-IT"   // <== lingua
        },
        success: function(data){

          // handlebars setup
          var source = $("#film-template").html();
          var template = Handlebars.compile(source);

          // restituisce l'array della ricerca(query)
          var arrayRicerca = data.results;

          for (var i = 0; i < arrayRicerca.length; i++) {

            // singolofilm
            var filmSingolo = arrayRicerca[i];
            //  titolo film
            var titoloFilm = filmSingolo.title;
            var titoloOriginale = filmSingolo.original_title;
            var linguaOriginale = filmSingolo.original_language;
            var rating = filmSingolo.vote_average;

            // handlebars
            var context = {
              title: titoloFilm,
              original_title: titoloOriginale,
              original_language: linguaOriginale,
              vote_average: rating
            };
            var html = template(context);

            // APPENDO I FILM
            $("#stampa-ricerca").append(html);

          }
        },
        error: function(data){
          alert("ERRORE");
        }
      });
    };

  // FINE FUNZIONE STAMPAFILM

});
