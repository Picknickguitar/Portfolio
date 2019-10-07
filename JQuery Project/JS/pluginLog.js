
jQuery.log = function(msg){
	
	if(window.console && window.console.log) {
	   console.log(msg);
	} else {
	   alert(msg);
	}

};