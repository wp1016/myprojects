<?php
     header('Content-Type:application/json');
    @$cid=$_REQUEST['carId'];
    require('init.php');
    $sql="SELECT score,scoreCount FROM car_impression WHERE carId=$cid";
    $result=mysqli_query($conn,$sql);
    $score=mysqli_fetch_assoc($result);
    $sql="SELECT * FROM car_model_detail WHERE carId=$cid";
    $result=mysqli_query($conn,$sql);
    $carModel=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $sql="SELECT * FROM car_comments WHERE carId=$cid";
    $result=mysqli_query($conn,$sql);
    $comments=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $output=[
        'score'=>$score,
        'carModel'=>$carModel,
        'comments'=>$comments
    ];
    echo json_encode($output);
?>