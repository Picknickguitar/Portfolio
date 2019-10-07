var ImpDatAbo = {

	init: function() {	

		var $pages = $("main div");
		
		if (!$pages.length) return;
		
		console.log($pages);
		
		$pages.addClass("tabs");
		$pages.first().show();
		
		$("nav a:not(:first)").click(function(e) {
			e.preventDefault();		
		});
		
		var items = $(".tab");
		
		items.first().addClass("current");
		
		items.click(function() {
			items.removeClass("current");
			$(this).addClass("current");
			$pages.hide();
			$pages.eq($(this).attr("id")).fadeIn("normal");
			console.log($(this).attr("id"));
		});
	}
};

$(ImpDatAbo.init);