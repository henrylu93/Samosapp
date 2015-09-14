<?php
$username = "mcgillu4_henry";
$password = "samosapp";
$hostname = "localhost"; 
$dbname = "mcgillu4_samosa";

$input = json_decode(file_get_contents('php://input'), true);
$type = $input['type'];
$data = $input['data'];

//connection to the database
$mysqli = new mysqli($hostname, $username, $password, $dbname); 
if (mysqli_connect_errno()) {
	printf("Connect failed: %s\n", mysqli_connect_error());
	exit();
}

//execute the SQL query and return records
if ($type == 'all') {
	$query = "SELECT * FROM samosa_events";
} else if ($type == 'current') {
	$query = "SELECT * FROM samosa_events WHERE date='".$data."'";
} else if ($type == 'upcoming'){
	$query = "SELECT * FROM samosa_events WHERE date > '".$data."'";
} else if ($type == 'club') {
	$query = "SELECT * FROM samosa_events WHERE club_name='".$data."'";
}

$result = $mysqli->query($query)
	or die($mysqli->error.__LINE__);
$table = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$index = $row['event_id'];
		$table[$index] = array();
		$table[$index]['product'] = $row['product'];
		$table[$index]['club_name'] = $row['club_name'];
		$table[$index]['location'] = $row['location'];
		$table[$index]['date'] = $row['date'];
		$table[$index]['time_start'] = $row['time_start'];
		$table[$index]['time_end'] = $row['time_end'];
		$table[$index]['description'] = $row['description'];
		
	};
	echo json_encode($table);
	
} else {
	echo 'NO RESULTS';	
}	
	
	
//fetch that data from the database 
//while ($row = mysql_fetch_array($result)) {
//   echo "event_id:".$row{'event_id'}." product:".$row{'product'}." location:".$row{'location'};
//}
//close the connection
mysqli_close($mysqli);
?>