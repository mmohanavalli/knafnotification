<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
//header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token', , 'X-CSRF-TOKEN');
 

if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
        

        $postdata = file_get_contents("php://input");
        $request = json_decode($postdata);
        $username=$request->username;
        echo json_encode("Username is ".$username);

}
// if($_SERVER['REQUEST_METHOD'] === 'GET'){

// 		$arr = array('id' => 1, 'title' => 'KNAF Notification', 'text' => 'Please download the KNAF App');

// 		echo json_encode($arr);
// }

else
{
    echo "Not allowed only allowed post method";
}

?>