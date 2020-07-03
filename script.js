$(document).ready(function(){

  // CLICK
  $(document).on("click", "#btn-ricerca",function() {
    var valoreInput = $("#ricerca-film").val();
    stampaFilm(valoreInput);
    stampaSerie(valoreInput);
  });

  //KEYPRESS INVIO
  $("#ricerca-film").keypress(function(event){
    if (event.which===13 || event.keycode===13) {
      $("#stampa-ricerca").text("");
      var valoreInput = $("#ricerca-film").val();
      stampaFilm(valoreInput);
      stampaSerie(valoreInput);
      // svuoto la input
      $("#ricerca-film").val("");
    }
  });

  // FUNZIONE STAMPAFILM

    function stampaFilm(queryRicerca){
      reset();

      // API
      var myApi = "https://api.themoviedb.org/3/search/movie";
      // APIKEY
      var apiKey = "3d9bfe6a800fbc971aaeadf6850c76f4";
      // CHIAMATA AJAX
      $.ajax({
        url:myApi, // <== API themoviedb
        method:"GET",
        data:{
          api_key:apiKey, // <== Chiave API
          query: queryRicerca,
          language:"it-IT"   // <== lingua
        },
        success: function(data){
          var risultatoRicerca = data.results;
          generaFilm(risultatoRicerca);

        },
        error: function(){
          alert("ERRORE");
        }
      });
    };
});


// FUNZIONE RESET
function reset(){
  // svuoto li generata
  $("#stampa-ricerca").text("");
  // svuoto la input
  $("#ricerca-film").val("");
}

// FUNZIONE GENERAFILM

function generaFilm(arrayRicerca){

  // handlebars setup
  var source = $("#film-template").html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < arrayRicerca.length; i++) {

    // singolofilm
    var filmSingolo = arrayRicerca[i];
    //  titolo film
    var titoloFilm = filmSingolo.title;
    var titoloOriginale = filmSingolo.original_title;
    var linguaOriginale = filmSingolo.original_language;
    var rating = filmSingolo.vote_average;
    var titoloSerieTv = filmSingolo.name;
    var copertinaFilm =  filmSingolo.poster_path;
    var descrizioneFilm = filmSingolo.overview;
    var titoloOriginale_SerieTv = filmSingolo.original_name;
    var arrotondaNum = arrotondaNumero(rating);
    var html_stelline = stelline(arrotondaNum);

    // handlebars
    var context = {
      title: titoloFilm,
      original_title: titoloOriginale,
      original_language: creaLingua(linguaOriginale),
      vote_average: html_stelline,
      name: titoloSerieTv,
      original_name: titoloOriginale_SerieTv,
      poster_path: '<img src="https://image.tmdb.org/t/p/w342' + copertinaFilm + '">',
      overview: descrizioneFilm
    };
    var html = template(context);

    // APPENDO I FILM
    $("#stampa-ricerca").append(html);

  }
};
// FINE FUNZIONE GENERAFILM

// FUNZIONE PER ARROTONDARE I VOTI
function arrotondaNumero(numero) {
  var arrotondato = Math.ceil(numero);
  var stella = arrotondato / 2;
  if(stella % 2 != 0) {
     var test = Math.ceil(stella);
     return test;
  }  else if (stella == 0) {
    return test = "senza voto";
  }
   else {
    return stella;
  }
}

// funzione per convertire i voti in get_numero_stelline
function stelline(numerostelline){
  var stars = '';
// ciclo for per creare stelline piene e vuote
  for(var i=0; i<5; i++){
    if(i<numerostelline){
      stars+='<i class="fas fa-star"></i>';
    }else{
      stars+='<i class="far fa-star"></i>';
    }
  }
  return stars;
}

// FUNZIONE STAMPA SERIE TV
function stampaSerie(ricercaSerie){
  reset();

  // API
  var myApi = "https://api.themoviedb.org/3/search/tv";
  // APIKEY
  var apiKey = "3d9bfe6a800fbc971aaeadf6850c76f4";

  // CHIAMATA AJAX
  $.ajax({
    url:myApi, // <== API themoviedb
    method:"GET",
    data:{
      api_key:apiKey, // <== Chiave API
      query: ricercaSerie,
      language:"it-IT"   // <== lingua
    },
    success: function(data){
      var risultatoRicerca = data.results;
      generaFilm(risultatoRicerca);

    },
    error: function(){
      alert("ERRORE");
    }
  });
};

// FUNZIONE CREA BANDIERE
function creaLingua(linguaOriginale) {

  var bandiere = ['es', 'it','de','en','fr'];

  if (bandiere.includes(linguaOriginale)) {

    return '<img src="img/' + linguaOriginale + '.png">'

  } else {

    return linguaOriginale;
  }
}
