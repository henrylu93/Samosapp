<?php
$username = "mcgillu4_henry";
$password = "samosapp";
$hostname = "localhost"; 
$dbname = "mcgillu4_samosa";

$input = json_decode(file_get_contents('php://input'), true);
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
$query = "INSERT INTO samosa_events (product, club_name, location, date, time_start, time_end, description)
			VALUES ('".$product."', '".$club."', '".$location."', '".$date."', '".$time_start."', '".$time_end."', '".$description."')";
$result = $mysqli->query($query)
	or die($mysqli->error.__LINE__);

echo $query;
/* $row = $result->fetch_assoc();
if($row['club_password'] == $loginPassword) {
	
	echo json_encode($row);
	
} else {
	echo 'Username and password do not match';	
}	 */
	
//close the connection
mysqli_close($mysqli);
?>