<?php
    header('Content-Type:application/json');
    @$uid=$_REQUEST['uid'];
    require('init.php');
    $sql="SELECT carId,carName FROM user_browse WHERE userId=$uid";
    $result=mysqli_query($conn,$sql);
    if($result==null){
        echo '[]';
        return;
    }else{
        $carList=mysqli_fetch_all($result,MYSQLI_ASSOC);
        echo json_encode($carList);
    }
?>