$(document).ready(function(){

  // CLICK
  $(document).on("click", "#btn-ricerca",function() {

    var valoreInput = $("#ricerca-film").val();
    stampaFilm(valoreInput);
  });

    // FUNZIONE STAMPAFILM

    function stampaFilm(arrayRicerca){

      // CHIAMATA AJAX
      $.ajax({
        url:"https://api.themoviedb.org/3/search/movie", // <== API themoviedb
        method:"GET",
        data:{
          api_key:"3d9bfe6a800fbc971aaeadf6850c76f4", // <== Chiave API
          query: arrayRicerca,
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
