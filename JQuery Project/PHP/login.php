<?php

//Einige Funktionen sind für den Wechsel auf die PHP Seite beim Login gedacht, aber werden derzeit nicht benötigt

session_start();

//Alle Klassen einladen--------------------------------------------------------------
include "class/autoload.php";


//Startvariablen initialisieren------------------------------------------------------
$log = "<!--";
$log2 = "-->";
$log3 = "";

$inhaltlogin = "";
$inhaltlogin2 = "";
$errMsgLogin = "";
$errMsgRegi = "";
$suc = "success";


//Wenn logout gedrückt alte Session schließen und neue öffnen------------------------
if(isset($_GET["logout"]))
{
	session_destroy();
	session_unset();
	session_start();
}

if(isset($_POST["login"]))
{
	$inhaltlogin = $_POST["email"];
	$inhaltlogin2 = $_POST["password"];
	
	if(!empty($_POST["email"]) && !empty($_POST["password"]))
	{
		$con = new Dbpdo();				//Db Verbindung und Methoden von Db
		
		$pw = $con->selectPw($_POST["email"]);						//ruft Methode auf mit Array als Rückgabewert aller PWs mit Namen
		
		
		if(!empty($pw))
		{
			foreach ($pw as $pwd)										//jedes Element aus num Array untersuchen ob hash stimmt
			{
				if( password_verify($_POST["password"], $pwd))				
				{
					$_SESSION["login"] = $_POST["email"];
					echo("success");
				}
				else
				{
					$errMsgLogin = "Passwort stimmt nicht";
					echo $errMsgLogin;
				}
			}
		}
		else
		{
			$errMsgLogin = "Falscher Login Name";
			echo $errMsgLogin;
		}
	}
	else
	{
		$errMsgLogin = "Bitte geben Sie etwas in jedes feld ein.";
		echo $errMsgLogin;
	}
}

//Registrierung

if(isset($_POST["regis"]))
{	
	$inhalt = $_POST["email"];
	$inhalt2 = $_POST["password"];
	$inhalt3 = $_POST["password2"];
	$suc = "success";
	
	//Wenn ein feld nicht ausgefüllt wurde----------------------------------------------
	
	if(!empty($_POST["email"]) && !empty($_POST["password"]) && !empty($_POST["password2"]))
	{
		//Wenn Passwort übereinstimmt---------------------------------------------------
		if($_POST["password"] == $_POST["password2"])
		{
			$hash = password_hash($_POST["password"], PASSWORD_DEFAULT);				//Passwort hash
							
			$con = new Dbpdo();															//Db commect und Methoden
			//Passwortüberprüfen---------------------------------------------------------
			$pw = $con->selectPw($_POST["email"]);										//ruft Methode auf mit Array als Rückgabewert aller PWs mit Namen
			//Wenn der Benutzer noch nicht existiert-------------------------------------
			if($pw == false)
			{
				$ok = $con->insertUser($_POST["email"] , $hash);								//Methode aufrufen einfügen in DB Rückgabe Bool
					
					if( $ok )
					{
						$_SESSION["login"] = $_POST["email"];
						echo("success");
						//header('Location: text.php');											//Weiterleiten
						//return $suc;
					}
					else
					{
						$errMsgRegi = "Nicht registriert";
						echo $errMsgRegi;
					}				
			}
			//Wenn der Benutzer schon existiert-------------------------------------
			else
			{
				foreach ($pw as $pwd)														//jedes Element aus num Array untersuchen ob hash stimmt
				{
					if( password_verify($_POST["password"], $pwd))				
					{
						$fehler = 1;
						break;
					}
				}
				if($fehler == 1)
				{
					$errMsgRegi = "Bitte ein anderen Benutzernamen oder ein anderes Passwort wählen";
					echo $errMsgRegi;
				}
				else
				{
					$ok = $con->insertUser($_POST["email"] , $hash);								//Methode aufrufen einfügen in DB Rückgabe Bool
					
					if( $ok )
					{
						$_SESSION["login"] = $_POST["email"];
						//header('Location: text.php');											//Weiterleiten
					}
					else
					{
						$errMsgRegi = "Nicht registriert";
						echo $errMsgRegi;
					}				
				}
			}
		}
		else
		{
			$errMsgRegi = "Passwort stimmt nicht überein";
			echo $errMsgRegi;
		}
		
	}
	else
	{
		$errMsgRegi = "Bitte geben Sie etwas in jedes feld ein.";
		echo $errMsgRegi;
	}
}


//Wenn noch eingeloggt-------------------------------------------------------------------
	
	//Ersetzt Marken in HTML Dokument und liefert HTML Dokumen zurück------------------------
	if(isset($_SESSION["login"]))
	{
		
		$login = file_get_contents( "../index.html" ) ;
		/*
		$login = str_replace( "{logout}" ,	$log ,  $login );
		$login = str_replace( "{logout2}" ,	$log2 ,  $login );
		$login = str_replace( "{login}" ,	$log3 ,  $login );
		$login = str_replace( "{login2}" ,	$log3 ,  $login );
		$login = str_replace( "{user}" ,	ucfirst($_SESSION["login"]) ,  $login );
		$login = str_replace( "{inhaltlogin}" ,	$inhaltlogin ,  $login );
		$login = str_replace( "{inhaltlogin2}" , $inhaltlogin2 , $login );
		$login = str_replace( "{ausgabe}", 	$errMsgLogin , $login );
		$login = str_replace( "{artikel}", 	$artikel->artikel->ausgabe , $login );				//Daten.txt ausgeben
			*/
		//echo $login;
	}
	else
	{
		$login = file_get_contents( "../index.html" ) ;
		/*
		$login = str_replace( "{logout}" ,	$log3 ,  $login );
		$login = str_replace( "{logout2}" ,	$log3 ,  $login );
		$login = str_replace( "{login}" ,	$log ,  $login );
		$login = str_replace( "{login2}" ,	$log2 ,  $login );
		$login = str_replace( "{inhaltlogin}" ,	$inhaltlogin ,  $login );
		$login = str_replace( "{inhaltlogin2}" , $inhaltlogin2 , $login );
		$login = str_replace( "{ausgabe}", 	$errMsgLogin , $login );
		$login = str_replace( "{ausgabe2}", $errMsgRegi , $login );
		$login = str_replace( "{artikel}", 	$artikel->artikel->ausgabe , $login );				//Daten.txt ausgeben
			*/
		//echo $login;
	}
?>