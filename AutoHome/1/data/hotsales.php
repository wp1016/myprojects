<?php
    header("Content-Type:application/json");
    require('init.php');
    @$cateId=$_REQUEST['cateId'];
    $saleCount=45000;
    if(empty($cateId)){
        $sql="SELECT carId,facName,bId,carName,pic,price FROM car_detail WHERE saleCount > $saleCount";
        $result=mysqli_query($conn,$sql);
        $carList=mysqli_fetch_all($result,MYSQLI_ASSOC);
        $output=[
            'carList'=>$carList
        ];
        echo json_encode($output);
    }else{
        $sql="SELECT carId,facName,bId,carName,pic,price FROM car_detail WHERE saleCount > $saleCount AND cateId=$cateId";
        $result=mysqli_query($conn,$sql);
        $carList=mysqli_fetch_all($result,MYSQLI_ASSOC);
        $output=[
            'carList'=>$carList
        ];
        echo json_encode($output);
    }
?>