<?php
    header('Content-Type:application/json');
    @$uid=$_REQUEST['uid'];
    @$carId=$_REQUEST['carId'];
    require('init.php');
    if(empty($carId)){
    $sql="SELECT collectionId,carId,carName FROM user_collection WHERE userId=$uid";
    }else{
    $sql="SELECT collectionId,carId,carName FROM user_collection WHERE userId=$uid AND carId=$carId";
    }
    $result=mysqli_query($conn,$sql);
    if($result==null){
        echo '[]';
        return;
    }else{
        $carList=mysqli_fetch_all($result,MYSQLI_ASSOC);
        echo json_encode($carList);
    }
?>