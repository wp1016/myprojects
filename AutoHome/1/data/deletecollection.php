<?php
header('Content-Type:application/json');
@$cid=$_REQUEST['cid'];
require('init.php');
$sql="DELETE FROM user_collection WHERE collectionId=$cid";
$result=mysqli_query($conn,$sql);
?>