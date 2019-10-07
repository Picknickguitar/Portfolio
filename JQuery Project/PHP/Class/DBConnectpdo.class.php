<?php

	class DBConnectpdo
	{
		private $db_host = "localhost" ;
		private $db_user = "root" ;
		private $db_pwd = "" ;
		private $db_database = "test" ;
		private static $con ;
		
		private function __construct()
		{
			
		}
		
		static function getConnect( )
		{
			if( !self::$con )
			{
				try
				{
					self::$con = new PDO( "mysql:host=localhost; dbname=pirate", "root", "" ) ;
				}
				
				catch( PDOexception $e )									
				{
					echo "CONNECT-Error: " . $e->getMessage();
				}
			}
			return self::$con ;
		}
	}
