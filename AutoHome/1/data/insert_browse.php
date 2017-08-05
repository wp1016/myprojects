<?php
    header('Content-Type:application/json');
    @$uid=$_REQUEST['uid'];
    @$carId=$_REQUEST['carId'];
    @$carName=$_REQUEST['carName'];
    require('init.php');
    $sql="SELECT carId FROM user_browse WHERE userId=$uid AND carId=$carId";
    $result=mysqli_query($conn,$sql);
    if($result==null){
    $sql="INSERT INTO user_browse VALUES(NULL,$uid,$carId,'$carName')";
    $result=mysqli_query($conn,$sql);
    }
?>