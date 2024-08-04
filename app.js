$(document).ready(function () {
    var gen =  "kfc";
    document.title = gen + " Generator";
    $("#bot").text(gen);

    $("#generar").click(function () {
       var cant = $("#cant").val();
       var dias = $("#dias").val();
       var fol = $("#folio").val();
       var year = $("#fecha").val();
       var tienda = $("#tienda").val();
       var fech = $("#dias option:selected").text();
       var shop = $("#tienda option:selected").text();

        $("#datos").text("");
        var p= $("#folio").val();
        for (var i = 1; i <= cant; i++) {
            $("#datos").append(gen+"|" + tienda + rnd(0, 5) + fol + rnd(0, 9) + rnd(0, 9) + year + dias + rnd(0, 9) + rnd(0, 9) +"|"+ fech +"|" + shop.replace(/ /g,"_") +"\n");
           }
    }); 

            

    });

function rnd(x, a) {
    return Math.floor(Math.random() * (a + 1 - x)) + x
}

function copiarAlPortapapeles(id_elemento) {
    var input = document.getElementById(id_elemento);
               input.select();
               document.execCommand("copy");
   }

