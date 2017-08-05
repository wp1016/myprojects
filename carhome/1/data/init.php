<?php
    header('Content-Type:application/json');
    $conn=mysqli_connect('127.0.0.1','root','','autohome',3306);
    // $conn=mysqli_connect('w.rdc.sae.sina.com.cn','l301jz2owx','zwkxkl3zyy5ixz4ykzwxkjj42zizjhizxj3x02kx','app_wangpan1016',3306);
    mysqli_query($conn,'SET NAMES UTF8');
?>