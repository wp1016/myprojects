<?php
    header("Content-Type:application/json");
    require('init.php');
    @$cateId=$_REQUEST['cateId'];
    $hotCount=16000;
    if(empty($cateId)){
        $sql="SELECT carId,facName,bId,carName,pic,price FROM car_detail WHERE hotCount > $hotCount";
        $result=mysqli_query($conn,$sql);
        $carList=mysqli_fetch_all($result,MYSQLI_ASSOC);
        $output=[
            'carList'=>$carList
        ];
        echo json_encode($output);
    }else{
        $sql="SELECT carId,facName,bId,carName,pic,price FROM car_detail WHERE hotCount > $hotCount AND cateId=$cateId";
        $result=mysqli_query($conn,$sql);
        $carList=mysqli_fetch_all($result,MYSQLI_ASSOC);
        $output=[
            'carList'=>$carList
        ];
        echo json_encode($output);
    }
?>