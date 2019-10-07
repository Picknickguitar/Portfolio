function proof()
{
	
}

var kontakt = document.getElementById("kontakt");
var verweis = document.querySelector("a");
var formular = document.createElement("form");

//Hier das Namensfeld---------------------------------
var labelName = document.createElement("label");
labelName.setAttribute( "for" , "name" );
labelName.appendChild( document.createTextNode( "Name: " ) );

var inputName = document.createElement("input");
inputName.setAttribute( "type" , "text" );
inputName.setAttribute( "id" , "name" );
labelName.appendChild( inputName );

//Umbrüche----------------------------------------------
var br = document.createElement("br");
var br2 = document.createElement("br");
var br3 = document.createElement("br");
var br4 = document.createElement("br");

//Hier das Mailfeld-------------------------------------
var labelMail = document.createElement("label");
labelMail.setAttribute( "for" , "mail" );
labelMail.appendChild( document.createTextNode( "E-Mail: " ) );

var inputMail = document.createElement("input");
inputMail.setAttribute( "type" , "text" );
inputMail.setAttribute( "id" , "mail" );
labelMail.appendChild( inputMail );

//Und hier das Maisfeld :p---------------------------------
var labelText = document.createElement("label");
labelText.setAttribute( "for" , "text" );
labelText.appendChild( document.createTextNode( "Nachricht: " ) );

var textFeld = document.createElement("textarea");
textFeld.setAttribute( "id" , "text" );
labelText.appendChild( textFeld );
//Anhängen-----------------------------------------------
formular.appendChild( labelName );
formular.appendChild( br );
formular.appendChild( labelMail );
formular.appendChild( br3 );
formular.appendChild( labelText );
kontakt.insertBefore (formular, verweis);


