<?php
    header("Content-Type:application/json");
    @$bid=$_REQUEST['bid'];
    require('init.php');
    $sql="SELECT carId,facName,bId,carName,pic,price FROM car_detail WHERE bId=$bid";
    $result=mysqli_query($conn,$sql);
    $carList=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $output=[
        'carList'=>$carList
    ];
    echo json_encode($output);
?>