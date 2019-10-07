var canvas = document.getElementById("canvas"),
ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//Public Variablen definieren--------------------------------------------------------------------------------------------------

var punkte = [], 																			// Array mit den allen Punkten
    FPS = 60, 																				// Frames per second
    AnzP = Math.floor(canvas.width * canvas.height / 10000 / 1.8)							// Anzahl der Hintergrundpunkte relativ zur Bildschirmgröße
	
	console.log (canvas.width);
	console.log (canvas.height);
	console.log (AnzP);
    

// Punkte erstellen und als Objektliteral in Array speichern-------------------------------------------------------

for (var i = 0; i < AnzP; i++) 
{
	punkte.push({
		x: Math.random() * (canvas.width / 12 * 11) + canvas.width / 30,						//Spawn nicht an Grenze wegen Radius und Rückstoß
		y: Math.random() * (canvas.height / 12 * 11) + canvas.height / 30,
		radius: Math.round(Math.random() * (((canvas.height + canvas.width) / 250) - ((canvas.height + canvas.width) / 150))) + ((canvas.height + canvas.width) / 250),
		vx: Math.floor(Math.random() * 10) - 5,
		vy: Math.floor(Math.random() * 15) - 5,
		blur: " blur(6px)"
	});
}

//Größere Punkte - für Vordergrund gedacht---------------------------------------------------------------------------------

for (var i = 0; i < AnzP; i++) 
{
	punkte.push({
		x: Math.random() * (canvas.width / 12 * 11) + canvas.width / 30,						//Spawn nicht an Grenze wegen Radius und Rückstoß
		y: Math.random() * (canvas.height / 12 * 11) + canvas.height / 30,
		radius: Math.round(Math.random() * (((canvas.height + canvas.width) / 200) - ((canvas.height + canvas.width) / 150))) + ((canvas.height + canvas.width) / 200),
		vx: Math.floor(Math.random() * 15) - 10,
		vy: Math.floor(Math.random() * 20) - 5,
		blur: "blur(3px)"
	});
}

//Linkobjekte--------------------------------------------------------------------------------------------------------------------

var linkTexte = ["Über Mich", "Lebenslauf", "Kontakt", "Impressum"]
var linkSeiten = ["../Game Statistik Sites/Gwent/index.html", "../JavaScript Game/menu.html", "#kontakt", "#impressum"]

for (var i = 0; i < linkSeiten.length; i++) 
{
	punkte.push({
		x: Math.floor((canvas.width / 6) + i  * canvas.width / 8) + canvas.width / 10,								//mittig spawnen
		y: Math.floor((canvas.height / 3) + i % 2 * 80),															//mittig spawnen, modulo für "Reihenanordnung"
		radius: Math.round(Math.random() * (((canvas.height + canvas.width) / 50) - ((canvas.height + canvas.width) / 60))) + ((canvas.height + canvas.width) / 60),	//Radius relative zu Bildschirmgröße
		vx: Math.floor(Math.random() * 8) - 3,
		vy: Math.floor(Math.random() * 7) - 2,
		linkText: linkTexte[i],
		linkLink : linkSeiten[i],
		blur: "blur(0px)"
	});
}

// Zeichnen-------------------------------------------------------------------------------------------

function draw() 
{
	ctx.clearRect(0,0,canvas.width,canvas.height);														//löscht jedes Mal das gemalte
	
	ctx.globalCompositeOperation = "lighter";
	  
	for (var i = 0; i < punkte.length; i++) 
	{
		var s = punkte[i];
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
		ctx.filter = s.blur;																			//Blur
		ctx.fill();
	}
	
	//Blur Ebene 1 Linien-----------------------------------------------------------------------------------------
	
	ctx.beginPath();
	
	for (var i = 0; i < Math.floor(AnzP - AnzP / 10); i++) 
	{
		var starI = punkte[i];
		
		ctx.moveTo(starI.x,starI.y);
	   
		for (var j = 0; j < Math.floor(AnzP - AnzP / 10); j++) 
		{
			var starII = punkte[j];
		  
			if(distance(starI, starII) < 160 && distance(starI, starII) > 0) 
			{
				ctx.lineTo(starII.x,starII.y);
				ctx.filter = "blur(6px)";
			}
		}
	}
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	ctx.stroke();
	
	//Blur Ebene 2 Linien-----------------------------------------------------------------------------------------
	
	ctx.beginPath();
	
	for (var i = Math.floor(AnzP - AnzP / 10); i < Math.floor(AnzP - AnzP / 10) + Math.floor(AnzP - AnzP / 10); i++) 
	{
		var starI = punkte[i];
		
		
		ctx.moveTo(starI.x,starI.y);
	   
		for (var j = Math.floor(AnzP - AnzP / 10); j < Math.floor(AnzP - AnzP / 10) + Math.floor(AnzP - AnzP / 10); j++) 
		{
			var starII = punkte[j];
		  
			if(distance(starI, starII) < 160 && distance(starI, starII) > 0) 
			{
				ctx.lineTo(starII.x,starII.y);
				ctx.filter = "blur(3px)";				
			}
		}
	}
	
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	ctx.stroke();
	
	//Blur Ebene 3 Links-----------------------------------------------------------------------------------------
	
	ctx.beginPath();
	
	for (var i = Math.floor(AnzP - AnzP / 6) + Math.floor(AnzP - AnzP / 6); i < punkte.length; i++) 								//Pfade zeichnen zwischen den Ebenen
	{
		var starI = punkte[i];
		
		
		ctx.moveTo(starI.x,starI.y);
	   
		for (var j = Math.floor(AnzP - AnzP / 6) + Math.floor(AnzP - AnzP / 6); j < punkte.length; j++) 							//Pfade zeichnen zwischen den Ebenen
		{
			var starII = punkte[j];
		  
			if(distance(starI, starII) < 160 && distance(starI, starII) > 0) 
			{
				ctx.lineTo(starII.x,starII.y);
				ctx.filter = "blur(0px)";				
			}
		}
	}
	
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	ctx.stroke();
	
	
}
//linktext zeichnen--------------------------------------------------------------------------------

function drawLink()
{
	for (var i = AnzP + AnzP; i < punkte.length; i++)
	{
		linkTextSize = Math.round((punkte[i].radius / 3) - (punkte[i].linkText.length / 6));								//Schriftgröße abhängig von Radius und Schriftlänge
		linkTextHeight = Math.round(punkte[i].radius / 6 );																	//Textposition Höhe
		
		ctx.font = linkTextSize + "px Segoe Ui";
		ctx.fillStyle = "white";
		linkWidth = ctx.measureText(punkte[i].linkText).width;
		ctx.fillText(punkte[i].linkText, punkte[i].x - (linkWidth/2), punkte[i].y + linkTextHeight);
	}
	
	canvas.addEventListener("mousemove", on_mousemove, false);
	canvas.addEventListener("click", on_click, false);
}


//Links Mouseovers------------------------------------------------------------------------------------------------------------

function on_mousemove (ev) 
{
	var xm1, ym1, xm2, ym2, xm3, ym3, xm4, ym4;
	var AnzPu = AnzP + AnzP;
	
	// Position der Maus
	if (ev.layerX || ev.layerX == 0) 
	{ 
		xm1 = ev.layerX;
		ym1 = ev.layerY;
		xm2 = ev.layerX;
		ym2 = ev.layerY;
		xm3 = ev.layerX;
		ym3 = ev.layerY;
		xm4 = ev.layerX;
		ym4 = ev.layerY;
	}
	
	xm1-=canvas.offsetLeft;			//falls das canvas nicht den ganzen Bildschirm einnimmt
	ym1-=canvas.offsetTop;
	xm2-=canvas.offsetLeft;			
	ym2-=canvas.offsetTop;
	xm3-=canvas.offsetLeft;			
	ym3-=canvas.offsetTop;
	xm4-=canvas.offsetLeft;			
	ym4-=canvas.offsetTop;

    
	//Ist die Maus über den Link?-------------------------------------------------------------Dynamisch mit for und Array?----------------------------------
	
	if(xm1 >= punkte[AnzPu].x - punkte[AnzPu].radius && xm1 <= (punkte[AnzPu].x + punkte[AnzPu].radius) && ym1 <= punkte[AnzPu].y + punkte[AnzPu].radius && ym1 >= (punkte[AnzPu].y - punkte[AnzPu].radius))
	{
		document.body.style.cursor = "pointer";
		inLink1=true;
		
	}else if(xm2 >= punkte[AnzPu + 1].x - punkte[AnzPu + 1].radius && xm2 <= (punkte[AnzPu + 1].x + punkte[AnzPu + 1].radius) && ym2 <= punkte[AnzPu + 1].y + punkte[AnzPu + 1].radius && ym2 >= (punkte[AnzPu + 1].y - punkte[AnzPu + 1].radius))
	{
		document.body.style.cursor = "pointer";
		inLink2=true;
	}
	else if(xm3 >= punkte[AnzPu + 2].x - punkte[AnzPu + 2].radius && xm3 <= (punkte[AnzPu + 2].x + punkte[AnzPu + 2].radius) && ym3 <= punkte[AnzPu + 2].y + punkte[AnzPu + 2].radius && ym3 >= (punkte[AnzPu + 2].y - punkte[AnzPu + 2].radius))
	{
		document.body.style.cursor = "pointer";
		inLink3=true;
	}
	else if(xm4 >= punkte[AnzPu + 3].x - punkte[AnzPu + 3].radius && xm4 <= (punkte[AnzPu + 3].x + punkte[AnzPu + 3].radius) && ym4 <= punkte[AnzPu + 3].y + punkte[AnzPu + 3].radius && ym4 >= (punkte[AnzPu + 3].y - punkte[AnzPu + 3].radius))
	{
		document.body.style.cursor = "pointer";
		inLink4=true;
	}
	else
	{
		inLink1 = false;
		inLink2 = false;
		inLink3 = false;
		inLink4 = false;
		document.body.style.cursor = "";
	}
}
 

//Link für die punkte------------------------------------------------------------------------------------------------------------Dynamisch mit For and Array-----------
function on_click(e) {

	var AnzPu = AnzP + AnzP;
	
	if (inLink1)  
	{
		window.location = punkte[AnzPu].linkLink;
	}
	if (inLink2)  
	{
		window.location = punkte[AnzPu + 1].linkLink;
	}
	if (inLink3)  
	{	
		window.location = punkte[AnzPu + 2].linkLink;
	}
	if (inLink4)  
	{
		window.location = punkte[AnzPu + 3].linkLink;
	}
}


//Distanz berechnen-------------------------------------------------------------------------------------------------------------------------

function distance( point1, point2 ){
	var xs = 0;
	var ys = 0;
 
	xs = point2.x - point1.x;
	xs = xs * xs;
 
	ys = point2.y - point1.y;
	ys = ys * ys;
 
	return Math.sqrt( xs + ys );
}

//Startwerte der Links speichern für die Grenzen der Links in Bewegung
var startPunkt = [];
for(j = AnzP + AnzP; j < punkte.length; j++)
{
startPunkt.push([
					punkte[j].x - punkte[j].radius, 											//PunktXLinks original
					punkte[j].x + punkte[j].radius, 											//PunktXRechts original
					punkte[j].y - punkte[j].radius, 											//PunktYOben original
					punkte[j].y + punkte[j].radius												//PunktYUnten original
				]);
}

//Animation der Punkte--------------------------------------------------------------------------------------------------------------------------
function update() {
	
	for (var i = 0; i < punkte.length; i++) 
	{
		var s = punkte[i];
		
		s.x += s.vx / FPS;																				//zuerst Bewegung, dann Punkt berechnen
		s.y += s.vy / FPS;
		
		var punktXLinks = s.x - s.radius;																//Berechnen
		var punktXRechts = s.x + s.radius;
		var punktYOben = s.y - s.radius;
		var punktXUnten = s.y + s.radius;
				
		if(i < AnzP + AnzP)																				//für alle nicht links
		{
			if (punktXLinks < 0 || punktXRechts > canvas.width ) 
			{
				s.vx = -s.vx;
			}
			if (punktYOben < 0 || punktXUnten > canvas.height) 
			{
				s.vy = -s.vy;
			}
		}
		else																									
		{	
			if (punktXLinks < startPunkt[i - (AnzP + AnzP)][0] - (canvas.width / 120) || punktXRechts > startPunkt[i - (AnzP + AnzP)][1] + (canvas.width / 120) )			//für alle Links mittig bleiben
			{
				s.vx = -s.vx;
			}
			
			if (punktYOben < startPunkt[i - (AnzP + AnzP)][2] - (canvas.height / 80) || punktXUnten > startPunkt[i - (AnzP + AnzP)][3] + (canvas.height / 80))
			{
				s.vy = -s.vy;
			}
			
		}
	}
}


// Update and draw

function tick() 
{
	draw();
	update();
	drawLink();
	requestAnimationFrame(tick);													//Ruft die Funktion auf bevor neu gezeichnet wird ähnlich setIntervall, 
																					//pausiert die Animation bei tab wechsel oder hintergrund, automatisch 60 mal die Sekunde
}

tick();