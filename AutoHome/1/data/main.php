<?php
    header('Content-Type:application/json');
    require('init.php');
    $sql='SELECT bid,bName_sm,bName_lg,bSrc FROM car_brands';
    $result=mysqli_query($conn,$sql);
    $brandList=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $sql='SELECT COUNT(mid) FROM car_model_detail';
    $result=mysqli_query($conn,$sql);
    $count=mysqli_fetch_row($result);
    $sql='SELECT SUM(saleCount),bid FROM car_detail GROUP BY bId ORDER BY SUM(saleCount) DESC';
    $result=mysqli_query($conn,$sql);
    $sumSale=mysqli_fetch_all($result,MYSQLI_ASSOC);
    $hotbrands = [];
    foreach($sumSale as $list){
     $bid=intval($list['bid']);
     $sql="SELECT bid,bName_sm,bName_lg,bSrc FROM car_brands WHERE bid = $bid";
     $result=mysqli_query($conn,$sql);
     $row = mysqli_fetch_assoc($result);
     $hotbrands[] = $row;
    };
    $output=[
        'code'=>1,
        'count'=>$count,
        'hotbrands'=>$hotbrands,
        'brandList'=>$brandList
    ];
    echo(json_encode($output));
?>