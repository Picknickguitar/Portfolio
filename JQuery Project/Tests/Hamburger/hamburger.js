
function init()
{

	$( ".cross" ).hide();
	$( ".menu" ).hide();
	$(".menu ul").hide();
	$( ".hamburger" ).click(function() 
	{
		$( ".menu" ).animate( {width: "toggle"}, function() 
		{
			$( ".hamburger" ).hide();
			$( ".cross" ).show();
			$(".menu ul").show();
		});
	});

	$( ".cross" ).click(function() 
	{
		$(".menu ul").hide();
		$( ".menu" ).animate( {width: "toggle"}, function() 
		{
			$( ".cross" ).hide();
			$( ".hamburger" ).show();
			
		});
	});

};

$(init);