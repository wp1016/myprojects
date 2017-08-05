<?php
header("Content-Type:application/json");
@$kw=$_REQUEST['kw'];
if(empty($kw)){
echo'[]';
return;
}
require('init.php');
$sql="SELECT carName FROM car_detail WHERE carName LIKE '%$kw%'";
$result=mysqli_query($conn,$sql);
$carName=mysqli_fetch_all($result,MYSQLI_ASSOC);
if($carName==null){
    echo'[]';
}else{
    echo json_encode($carName);
}
?>