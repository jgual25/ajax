
function convert(){//funció que convertirà els espais de l'input de text en comes
    var tag = $('#tag').val();
    var etiq = tag.replace(/[ ]/gi,',');
    return etiq.toString();
    /*cridada ajax
    succes executa una funcio on a dedins hi haura Data.items i una fucnio. per cada item me fas una fila i depres hu afegim a una taula.
    si hi ha un error mos fara una altra funcio on sortira un alert...*/
}
function cercar(){
    $(".filaresultat").remove();//primer de tot borra la cerca anterior
    var tag = convert();//cridada de la funció anterior de conversió dels espais en comes
    $.ajax({//estructura d'ajax que proporciona la informació que apareixerà a la taula resultant després d'haver inserit un tema a l'input
        url: "https://api.flickr.com/services/feeds/photos_public.gne",
        type: 'GET',
        async: true,
        dataType: 'json',//format JSON de les dades 
        data: 'tags='+ $('#tag').val()+'&tagmode='+$('#tipus').val()+'&format=json&jsoncallback=?',//agafa el valor de totes o algunes fotografies i ho relaciona amb el resultat de la cridada json
        success: mostrar,//psi l a cridada té èxit dispara la funció mostrar
        error: function(jqXHR, exception){//si la cridada falla mostrarà un alert
            alert(JSON.parse(jqXHR.responseText));
        }
    });
    return false;
}
function mostrar(data){//funció que per a cada ítem del JSON que dona informació la insereix a la taula
    $.each(data.items, function(i, item){
        var fila = $("<tr class='filaresultat' align='center'><td>"+
                    '<h4>'+item.title+'</h4></td>'+
                    '<td>'+item.link.substr(8)+'</td>'+//al link se li lleven els primers 8 caràcters
                    '<td><img src='+item.media.m+'></td>'+
                    '<td><p><i>'+item.published.substr(-10)+'</i></p></td>'+//a la data de li lleven les hores, els minuts i els segons
                    '<td><p>'+item.author+'</p></td>'+
                    '<td><i>'+item.tags+'</i></td>'+
                    "</tr>");
        $('#esquema').append(fila);//tot l'anterior s'afegeix a una fila de la taula
    })
}