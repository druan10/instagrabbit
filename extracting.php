<?php
if (isset($_POST["instagram_url"])===true){
    $url=$_POST["instagram_url"];
    preg_match('/^(https:\/\/www.instagram.com\/p\/)[a-zA-Z-_\d]{1,40}(\/)?((\?taken-by=)[a-z._\d]{1,30})?$/',$url,$matches);
    if (count($matches)>0){
        $url=$matches[0];
        
        #CURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
        $data = curl_exec($ch);
        curl_close($ch);
        $htmlsource = $data;
        
        #search through file contents using regex match
        preg_match('/(https:\/\/scontent.cdninstagram.com\/t51.2885-15\/e35\/)[\d_n]{1,37}(.jpg)/',$htmlsource,$matches2);
        if (count($matches2)>0){
            echo $matches2[0];    
        }else{
            echo "error";
        }}else{
            echo "Invalid URL";}
}
?>