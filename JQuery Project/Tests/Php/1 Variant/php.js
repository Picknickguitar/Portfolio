
	//$(".fehler").css("display", "none");
	$(".submit").click(function(event){
		
		event.preventDefault(); //prevent default action 
		
		var post_url = $("#my_form").attr("action"); //get form action url
		var request_method = $("#my_form").attr("method"); //get form GET/POST method
		var form_data = $("#my_form").serialize(); //Encode form elements for submission
		
		$.ajax({
			url : post_url,
			type: request_method,
			data : form_data,
			
			success: function(result) 
			{   
				$(".fehlerL").css("display", "block");
		        $(".fehlerL").html(result);
		    },
			error: function()
			{
				$(".fehlerL").css("display", "block");
			    $(".fehlerL").html("Server nicht gefunden");
			}
		});
});
