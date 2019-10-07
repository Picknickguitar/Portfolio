function Impressum()
{
	var ajax = new XMLHttpRequest();

	ajax.open( "GET" , "Impressum/impressum.json" , true ) ; 
	
	ajax.addEventListener( "readystatechange" , function(){
	
		if( ajax.readyState == 4 )								//Status 4 ist fertig
		{
			if( ajax.status == 200 )							//200 ist erfolgreich
			{
				var impressum = JSON.parse( ajax.responseText );
				for (p in impressum.Paragraphen)
				{
					document.querySelector( "#impressum div" ).innerHTML +="<h3>§" + (parseInt(p) + 1) + "</h3><p>" + impressum.Paragraphen[p] + "<br></p>";
				}
				console.log (impressum);
			}
			else
			{
				alert( ajax.status + " " + ajax.statusText );
			}
		}
	} );

	ajax.send( null ) ;  // Anfrage wird versenden
}

window.addEventListener( "load" , Impressum );
