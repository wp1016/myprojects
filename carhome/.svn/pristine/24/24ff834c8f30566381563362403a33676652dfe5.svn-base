<?php
    header('Content-Type:application/json');
    @$cid=$_REQUEST['carId'];
    require('init.php');
    $sql="SELECT carId,bId,carName,pic,price,cateId FROM car_detail WHERE carId=$cid";
    $result=mysqli_query($conn,$sql);
    $car=mysqli_fetch_assoc($result);
    $sql="SELECT cateName FROM car_cate WHERE cateId=$car[cateId]";
    $result=mysqli_query($conn,$sql);
    $cateName=mysqli_fetch_assoc($result);
    $output=[
        'car'=>$car,
        'cateName'=>$cateName
    ];
    echo json_encode($output);
?>