<?php
    header("Content-Type:application/json");
    require('init.php');
    $time=time()*1000;
    $sql="SELECT carId,facName,bId,carName,pic,price FROM car_detail WHERE listingTime > $time";
    $result=mysqli_query($conn,$sql);
    $carList=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $output=[
        'carList'=>$carList
    ];
    echo json_encode($output);
?>