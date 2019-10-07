
var makeClick = false;

function init()
{
	/*Start Animation------------------------------------------------------------------*/
	
	$("nav li:first").animate({right: "20px"}, {duration: 500});
	$("nav li:eq(1)").delay(100).animate({right: "20px"}, {duration: 500});
	$("nav li:eq(2)").delay(500).animate({right: "20px"}, {duration: 500});
	$("nav li:eq(3)").delay(800).animate({right: "20px"}, {duration: 500});
	$("nav li:eq(4)").delay(900).animate({right: "20px"}, {duration: 500});
	
	clickLink();
	clickClose();
	anmelden();
	registration();
	
	//falls jemand zurück ins Hauptmenü kommt
	
	if(localStorage.getItem("login"))		
	{
		login();
	}
};


/* Menu Click------------------------------------------------------------------------*/

function clickLink()
{
	$(".clickSeite").click(function(ev)
	{
		//Für die animation Impressum/MakeMap
		for(var i = 0; i < 7; i++)
		{
			if($(ev.target).attr("id") != i)
			{
				switch ($(ev.target).attr("seite"))
				{
					case "login":
						$(".anmeldeFenster").css({"display": "block"});
						break;
					case "MakeMap":
						if(localStorage.getItem("login"))
						{
							$("nav li:eq(" + i + ")").animate(
							{right: "-400px"}, 
							{ duration: 500, complete: function()
							{
								window.location = "seiten/MakeMap.html";
							}
							});
							
						}
						else
						{
							makeClick = true;
							$(".anmeldeFenster").css({"display": "block"});
						}
						break;
					case "logout":
						localStorage.removeItem("login");
						localStorage.removeItem("loginname");				//localstorage löschen
						
						$("aside").css({"display": "none"});
						$("nav li").eq(1).css({"display": "block"});
						$("nav li").eq(5).css({"display": "none"});
						break;
					default:
						$("nav li:eq(" + i + ")").animate(
						{right: "-400px"}, 
						{ duration: 500, complete: function()
							{
								window.location = "seiten/" + $(ev.target).attr("seite") + ".html" ;
							}
						});
				}
			}
		}
	});
}

/*Registration und Anmeldung--------------------------------------------*/

function clickClose()
{
	$(".close").click(function()
	{
		$(".anmeldeFenster").css({"display": "none"});
	})
}

function anmelden()
{
	$(".anmelden").click(function(e)
	{
		e.preventDefault();
		
		var $pass = $("#pwL").val();
		var $name = $("#nameL").val();
		
		if($pass != "" && $name != "")
		{
			$.ajax(
			{
				type:'post',
				url:'php/login.php',
				data:{
					login: "yes",
					email: $name,
					password: $pass
				},
			  
				success:function(response) 
				{
					if(response=="success")
					{
						login($name);
						localStorage.setItem("loginname", $name);
						localStorage.setItem("login", true);
					}
					else
					{
						console.log(response);
						$(".fehlerL").css("display", "block").html(response);
					}
				}
			});
		}
		else
		{
			$(".fehlerL").css("display", "block").html("Bitte trage in jedes Feld etwas ein");
		}
	});
}

function registration()
{
	$(".registration").click(function(e)
	{
		e.preventDefault();
		
		var $pass = $("#pwR").val();
		var $pass2 = $("#pwR2").val();
		var $name = $("#nameR").val();
		var $mail = $("#mailR").val();
		
		console.log("klick");
		
		if($pass != "" && $name != "" && $pass2 != "" && $mail != "")
		{
			console.log("nicht leer");
			if($pass == $pass2)
			{
				console.log("gleich");
				$.ajax(
				{
					type:'post',
					url:'php/login.php',
					data:{
						regis: "yes",
						name: $name,
						email: $mail,
						password: $pass,
						password2: $pass2
					},
				  
					success:function(response) 
					{
						if(response=="success")
						{
							login($name);
							localStorage.setItem("loginname", $name);
							localStorage.setItem("login", true);
						}
						else
						{
							console.log(response);
							$(".fehlerR").css("display", "block").html(response);
						}
					}
				});
			}
			else
			{
				$(".fehlerR").css("display", "block").html("Passwörter stimmt nicht überein");
			}
		}
		else
		{
			$(".fehlerR").css("display", "block").html("Bitte trage in jedes Feld etwas ein");
		}
		
	});
}

function login($name)
{
	$(".anmeldeFenster").css({"display": "none"});
	$("aside").css({"display": "block"});
	$("#profname").html(localStorage.getItem("loginname")).css({"display": "block"});
	$("nav li").eq(1).css({"display": "none"});
	$("nav li").eq(5).css({"display": "block"});
	if(makeClick == true)
	{
		window.location = "seiten/MakeMap.html";
	}
}

$(init);