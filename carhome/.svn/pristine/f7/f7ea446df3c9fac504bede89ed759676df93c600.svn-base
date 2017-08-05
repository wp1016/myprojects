<?php
header('Content-Type:application/json');
@$uid=$_REQUEST['uid'];
@$carId=$_REQUEST['carId'];
@$carName=$_REQUEST['carName'];
require('init.php');
$sql="SELECT carId FROM user_collection WHERE userId=$uid AND carId=$carId";
$result=mysqli_query($conn,$sql);
$collect=mysqli_fetch_row($result);
if($collect==null){
    $sql="INSERT INTO user_collection VALUES(NULL,$uid,$carId,'$carName')";
    $result=mysqli_query($conn,$sql);
    $cid=mysqli_insert_id($conn);
    echo json_encode($cid);
    return;
}else{
    echo json_encode($collect);
    return;
}

?>