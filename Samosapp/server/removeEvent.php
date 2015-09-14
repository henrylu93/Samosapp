<?php
$username = "mcgillu4_henry";
$password = "samosapp";
$hostname = "localhost"; 
$dbname = "mcgillu4_samosa";

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'];

//connection to the database
$mysqli = new mysqli($hostname, $username, $password, $dbname); 
if (mysqli_connect_errno()) {
	printf("Connect failed: %s\n", mysqli_connect_error());
	exit();
}

//execute the SQL query and return records
$query = 	"DELETE FROM samosa_events
			WHERE event_id='".$id."'";
$result = $mysqli->query($query)
	or die($mysqli->error.__LINE__);

echo $query;
	
//close the connection
mysqli_close($mysqli);
?>