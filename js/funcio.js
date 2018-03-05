
function convert(){
    var tag = $('#tag').val();
    var etiq = tag.replace(/[ ]/gi,',');
    return etiq.toString();
    /*cridada ajax
    succes executa una funcio on a dedins hi haura Data.items i una fucnio. per cada item me fas una fila i depres hu afegim a una taula.
    si hi ha un error mos fara una altra funcio on sortira un alert...*/
}
function cercar(){
    $(".filaresultat").remove();
    var tag = convert();
    $.ajax({
        url: "https://api.flickr.com/services/feeds/photos_public.gne",
        type: 'GET',
        async: true,
        dataType: 'json',
        data: 'tags='+ $('#tag').val()+'&tagmode='+$('#tipus').val()+'&format=json&jsoncallback=?',
        success: mostrar,
        error: function(jqXHR, exception){
            alert(JSON.parse(jqXHR.responseText));
        }
    });
    return false;
}
function mostrar(data){
    $.each(data.items, function(i, item){
        var fila = $("<tr class='filaresultat' align='center'><td>"+
                    '<h4>'+item.title+'</h4></td>'+
                    '<td>'+item.link.substr(8)+'</td>'+
                    '<td><img src='+item.media.m+'></td>'+
                    '<td><p>'+item.published.substr(-10)+'</p></td>'+
                    '<td><p>'+item.author+'</p></td>'+
                    '<td><i>'+item.tags+'</i></td>'+
                    "</tr>");
        $('#esquema').append(fila);
    })
}