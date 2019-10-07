var zoo = 100;					//Startzoomstufe
var $auswahlFirst;				//Global für die Funktion onMouseUp
var $mapArray;

//Startfunctionen----------------------------------------------------------------

function init()
{
	if(localStorage.getItem("login") == "true")						//falls jemand den link ohne login betritt
	{
		itemsClick();
		zoom();
		prevDef();
		hamburger();
		login();
		menue();
		
		$("#plus").click(plus);
		$("#minus").click(minus);
		
		//on mouse down für merken des Divs
		
		$("#map div").on("mousedown", function(ev)
		{
			$auswahlFirst = $(ev.target).parent();
		});
	}
	else														//falls jemand auf die Seite kommt ohne anmeldung
	{
		$("body").empty();
		$("<h1>Bitte vorher anmelden</h1>").css({"color": "black"}).appendTo("body");
	}
}



//Map Generator----------------------------------------------------------------------

function gMap()
{
	//Wenn schon Map da, also für Zoom------------------------------------------
	
	if($("#map").has("img").length)								
	{
		var $map = $("#map img").toArray();						//Bilder speichern für den Zoom
		var $mapDiv = $("#map div").toArray();					//Divs speichern für Rotation
		
		$("#map").children().remove("div");						//Map auflösen
		
		for(var i= 0; i < 2500; i++)							//Map neu erstellen für Zoom
		{
			$("<div><img src='" + $($map[i]).attr("src") + "'></div>")				//alte Map beibehalten
			.click(chSrc)
			.css({																	//alte Rotation beibehalten
				"-webkit-transform": "rotate(" + $($mapDiv[i]).attr("rotation") + "deg)",
				"-moz-transform": "rotate(" + $($mapDiv[i]).attr("rotation") + "deg)",
				"transform": "rotate(" + $($mapDiv[i]).attr("rotation") + "deg)"
			})
			.attr({"rotation" : $($mapDiv[i]).attr("rotation"), "id": i})					//alte Rotation übergeben
			.appendTo("#map");
		}		
	}
	else
	{
		//Erstellung der Map zum Anfang-----------------------------------------------
		
		for(var i= 0; i < 2500; i++)							
		{
			$("<div><img src='../textures/water.gif'></div>")
			.click(chSrc)
			.attr({"rotation": 0, "id" : i})
			.on("mouseup", function(ev)
			{
				var $auswahlSecond = $(ev.target).parent();
				
				sumAuswahl($auswahlFirst, $auswahlSecond);
			})
			.appendTo("#map");
		}
	}
}

//Wechseln der Bilder und rotieren bei Click--------------------------------------------------------
//Funktion veraltet weil Auswahlbox möglich ist, allerdings ist noch keine Rotieren in der Auswahlbox implemetiert
function chSrc(e)
{
	if($("#mouseimg").has("img").length)						//Wenn die Maus einen Clone hat
	{
		var $newSrc = $("#mouseimg img").attr("src");			//Src wird aus Clone kopiert
		
		if($newSrc == $(e.target).attr("src"))					//Wenn das Bild gleich drehen
		{
			var $rotation = parseInt($(e.target).parent().attr("rotation"))+90;
			
			$(e.target).css({
			"-webkit-transform": "rotate(" + $rotation + "deg)",
			"-moz-transform": "rotate(" + $rotation + "deg)",
			"transform": "rotate(" + $rotation + "deg)"
			});
			$(e.target).parent().attr("rotation", $rotation);
		}
		else
		{
			$(e.target).attr("src", $newSrc);					//Neues Bild
		}
	}
}

//Bilder an der Maus---------------------------------------------------------------------

function itemsClick()
{
	$(".sidemenu img").click(cloneItem);						//die sidemenu bilder
}

function cloneItem(e)
{
	var $clonedItem = $(e.target).clone();						//bilder clonen
	
	$(document).mousemove(function(e)
	{
		var x = e.pageX - 35;									//position der Maus etwas versetzt
		var y = e.pageY + 15;
		
		$("#mouseimg").empty();									//altes Bild löschen
		$clonedItem.css({top: y, left: x, position:'absolute', height: '25px', width: '25px', opacity: '0.7'}).appendTo("#mouseimg");		//geklontes Bild anhängen
	});
}

//Zoomstufe der Karte---------------------------------------------------------------------

function zoom()
{
	gMap();															//Karte erstellen
	$("#map").css({
		"display": "grid", 
		"grid-template-columns": "repeat(50, " + zoo + "px)", 		//Größe der Gridkästchen je nach Zoom
		"grid-template-rows": "repeat(50, " + zoo + "px)"
		});
	$("#map img").css({"height": zoo + "px", "width" : zoo + "px"});
}

//Plusbutton Reinzoomen--------------------------------------------------------------------------------

function plus(e)			
{
	
	if(zoo >= 100)
	{
		$e.preventDefault();										//neu laden verhindern bei höheren stufen
	}
	else
	{
		zoo += 20;
	}
	zoom();
}

//Minusbutton Rauszoomen-----------------------------------------------------------------------------------
	
function minus(e)
{
	if(zoo <=40)
	{
		$e.preventDefault();										//neu laden verhindern bei niedrigeren stufen
	}
	else
	{
		zoo -= 20;
	}
	zoom();
}

//Kästchenauswahl-----------------------------------------------------------------------------------

function prevDef()
{
	$("body").on("dragstart", function(ev)
	{
		ev.preventDefault();										//normale Drag funktion verhindern (Browser würde Bild verschieben wollen)
	});
}

function sumAuswahl(af, as)
{
	
	if($("#mouseimg").has("img").length)						//Wenn die Maus einen Clone hat
	{
		var $newSrc = $("#mouseimg img").attr("src");
		
		var maxWert = Math.max(parseInt(af.attr("id")), parseInt(as.attr("id")));
		var minWert = Math.min(parseInt(af.attr("id")), parseInt(as.attr("id")));
		
		var anzZeileU = Math.floor(maxWert / 50) - Math.floor(minWert / 50);					//Zeilenunterschied
		
		var maxMax = Math.max(minWert, maxWert - anzZeileU * 50);						//falls von links unten bis rechts oben eine Auswahl stattfindet
		var minMin = Math.min(minWert, maxWert - anzZeileU * 50);
		
		for(var i = minMin; i <= maxMax; i++ )
		{
			$.log(i);
			$("#map img").eq(i).attr("src", $newSrc);
			for(var j = 1; j <= anzZeileU; j++)
			{
				$("#map img").eq(i+50*j).attr("src", $newSrc);
			}
		}
	}
	
}

/*Hamburger Menü-----------------------------------------------------------------------------*/

function hamburger()
{

	$(".cross").hide();
	$(".menu").hide();
	$(".menu ul").hide();
	$(".hamburger").click(function() 
	{
		$("#zoom").animate({width: "11vw"}, 400, "linear");
		$(".menu").animate( {width: "toggle"}, function() 
		{
			$(".hamburger").hide();
			$(".cross").show();
			$(".menu ul").show();
		});
	});

	$( ".cross" ).click(function() 
	{
		$(".menu ul").hide();
		$("#zoom").animate({width: "20px"}, 500, "linear");
		$(".menu").animate( {width: "toggle"}, function() 
		{
			$(".cross").hide();
			$(".hamburger").show();
			
		});
	});

};	

/* Links im Hamburger--------------------------------------------------------------------------*/

function menue()
{
	$(".clickMenu").click(function(ev)
	{
		switch ($(ev.target).html())
		{
			case "Logout":
				localStorage.removeItem("login");
				localStorage.removeItem("loginname");				//localstorage löschen
				
				window.location.href="../index.html";
				break;
			case "Main Menue":
				window.location.href="../index.html";
				break;
			default:
				$.log("default");
		}
	});
}

/*Login Profil------------------------------------------------------------------------------------*/

function login()
{
	$("#login").css({"display": "block"});
}
	
//Start on Load-----------------------------------------------------------------------------------

$( init );