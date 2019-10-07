<?php

$fehler = "Fuck";


if(isset($_POST["login"]))
{
	var_dump ($_POST);
	$login = file_get_contents( "php.html" ) ;
	echo $login;
}
else
{
	echo $fehler;
}


/*
if(isset($_POST["login"]))
{
	$inhaltlogin = $_POST["name"];
	$inhaltlogin2 = $_POST["password"];
	
	if(!empty($_POST["name"]) && !empty($_POST["password"]))
	{
		$con = new Dbpdo();				//Db Verbindung und Methoden von Db
		
		$pw = $con->selectPw($_POST["name"]);						//ruft Methode auf mit Array als Rückgabewert aller PWs mit Namen
		
		if(!empty($pw))
		{
			foreach ($pw as $pwd)										//jedes Element aus num Array untersuchen ob hash stimmt
			{
				if( password_verify($_POST["password"], $pwd))				
				{
					$_SESSION["login"] = $_POST["name"];
					header('Location: CMS.php');
				}
				else
				{
					$errMsgLogin = "Passwort stimmt nicht";
				}
			}
		}
		else
		{
			$errMsgLogin = "Falscher Login Name";
		}
	}
	else
	{
		$errMsgLogin = "Bitte geben Sie etwas in jedes feld ein.";
	}
}

//Registrierung

if(isset($_POST["regis"]))
{
	$inhalt = $_POST["name"];
	$inhalt2 = $_POST["password"];
	$inhalt3 = $_POST["password2"];
	
	//Wenn ein feld nicht ausgefüllt wurde----------------------------------------------
	
	if(!empty($_POST["name"]) && !empty($_POST["password"]) && !empty($_POST["password2"]))
	{
		//Wenn Passwort übereinstimmt---------------------------------------------------
		
		if($_POST["password"] == $_POST["password2"])
		{
			$hash = password_hash($_POST["password"], PASSWORD_DEFAULT);				//Passwort hash
							
			$con = new Dbpdo();															//Db commect und Methoden
			//Passwortüberprüfen---------------------------------------------------------
			$pw = $con->selectPw($_POST["name"]);										//ruft Methode auf mit Array als Rückgabewert aller PWs mit Namen
			//Wenn der Benutzer noch nicht existiert-------------------------------------
			if($pw == false)
			{
				$ok = $con->insertUser($_POST["name"] , $hash);								//Methode aufrufen einfügen in DB Rückgabe Bool
					
					if( $ok )
					{
						$_SESSION["login"] = $_POST["name"];
						header('Location: text.php');											//Weiterleiten
					}
					else
					{
						$errMsgRegi = "Nicht registriert";
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
					var_dump($_POST);
				}
				else
				{
					$ok = $con->insertUser($_POST["name"] , $hash);								//Methode aufrufen einfügen in DB Rückgabe Bool
					
					if( $ok )
					{
						$_SESSION["login"] = $_POST["name"];
						header('Location: text.php');											//Weiterleiten
					}
					else
					{
						$errMsgRegi = "Nicht registriert";
					}				
				}
			}
		}
		else
		{
			$errMsgRegi = "Passwort stimmt nicht überein";
		}
		
	}
	else
	{
		$errMsgRegi = "Bitte geben Sie etwas in jedes feld ein.";
	}
}
*/
?>