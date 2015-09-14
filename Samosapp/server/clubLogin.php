<?php
$username = "mcgillu4_henry";
$password = "samosapp";
$hostname = "localhost"; 
$dbname = "mcgillu4_samosa";

$input = json_decode(file_get_contents('php://input'), true);
$loginName = $input['username'];
$loginPassword = $input['password'];

//connection to the database
$mysqli = new mysqli($hostname, $username, $password, $dbname); 
if (mysqli_connect_errno()) {
	printf("Connect failed: %s\n", mysqli_connect_error());
	exit();
}

//execute the SQL query and return records
$query = "SELECT * FROM samosa_clubs WHERE club_username='".$loginName."'";
$result = $mysqli->query($query)
	or die($mysqli->error.__LINE__);

$row = $result->fetch_assoc();
if($row['club_password'] == $loginPassword) {
	
	echo json_encode($row);
	
} else {
	echo 'Username and password do not match';	
}	
	
//close the connection
mysqli_close($mysqli);
?>