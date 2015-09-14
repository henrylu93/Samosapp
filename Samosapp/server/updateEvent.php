<?php
$username = "mcgillu4_henry";
$password = "samosapp";
$hostname = "localhost"; 
$dbname = "mcgillu4_samosa";

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'];
$club = $input['club'];
$product = $input['product'];
$location = $input['location'];
$date = $input['date'];
$time_start = $input['time_start'];
$time_end = $input['time_end'];
$description = $input['description'];

//connection to the database
$mysqli = new mysqli($hostname, $username, $password, $dbname); 
if (mysqli_connect_errno()) {
	printf("Connect failed: %s\n", mysqli_connect_error());
	exit();
}

//execute the SQL query and return records
$query = 	"UPDATE samosa_events
			SET product='".$product."', club_name='".$club."', location='".$location."', 
			date='".$date."', time_start='".$time_start."', time_end='".$time_end."', description='".$description."'
			WHERE event_id='".$id."'";
$result = $mysqli->query($query)
	or die($mysqli->error.__LINE__);

echo $query;
	
//close the connection
mysqli_close($mysqli);
?>