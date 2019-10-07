<?php

function autoload( $className )
	{
		$file = "class/$className.class.php" ;
		
		if( file_exists( $file ) )
		{
			include $file ;
		}
	}
	
	spl_autoload_register( "autoload" );
?>