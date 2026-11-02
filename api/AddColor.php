<?php
	$inData = getRequestInfo();
	
	$color = $inData["color"];
	$userId = $inData["userId"];

	$dbHost = getenv('COLORS_DB_HOST');
	$dbUser = getenv('COLORS_DB_USER');
	$dbPassword = getenv('COLORS_DB_PASSWORD');
	$dbName = getenv('COLORS_DB_NAME');

	if (!$dbHost || !$dbUser || !$dbPassword || !$dbName)
	{
		returnWithError("Database configuration is missing");
		exit;
	}

	$conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);
	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("INSERT into Colors (UserId,Name) VALUES(?,?)");
		$stmt->bind_param("ss", $userId, $color);
		$stmt->execute();
		$stmt->close();
		$conn->close();
		returnWithError("");
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>