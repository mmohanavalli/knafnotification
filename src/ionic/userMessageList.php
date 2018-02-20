<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
//header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token', , 'X-CSRF-TOKEN'); 

if($_SERVER['REQUEST_METHOD'] === 'GET'){

		// $arr = array('id' => 1, 'title' => 'KNAF Notification', 'text' => 'Please download the KNAF App');

		// echo json_encode($arr);

		$a = array(
			array('id' => 1, 'title' => 'KNAF Notification1', 'text' => 'Please download the KNAF App first time'),
			array('id' => 2, 'title' => 'KNAF Notification2', 'text' => 'Please download the KNAF App for second'));
	$json = json_encode($a);
	echo $json;
}

else
{
    echo "Not allowed only allowed post method";
}

?>