<?php

	class Dbpdo
	{
		private $con ;
		public $errMsg = "" ;
		
		
		function __construct( )
		{
			$this->con = DBConnectpdo::getConnect( ) ;
		}
		
		function selectPw( $name )
		{
			if ( !$this->con )
			{
				$this->errMsg = "Server offline" ;
				return false ;
			}
			
			$sql = "SELECT PW FROM user WHERE Name = ?";
			
			$stmt = $this->con->prepare($sql);
			
			$ok = $stmt->execute( [$name] );
			
			
			
			if ( !$ok )
			{
				$this->errMsg = "Falscher inhalt" ;
				return false ;
			}
			
			for ($set = array (); $row = $stmt->fetch(PDO::FETCH_ASSOC); $set[] = $row['PW']);					//Nummerisches Array aus fetch mit Inhalt
			
			return $set;
		}
		
		function insertUser( $name, $pw )
		{ 
			
			$sql = "INSERT INTO user( Name, PW) VALUES ( ?, ? ) " ; 
			
			$stmt = $this->con->prepare($sql);
			
			$ok = $stmt->execute( [$name, $pw] ) ;
			
			if( $ok )
			{
				return $ok;	
			}
			else
			{
				$this->errMsg = "Befehl nicht richtig";
				return false;
			}

		}
	
	}