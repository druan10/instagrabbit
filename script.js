$(document).ready(function(){
    $("body").fadeIn(1000,function(){
    });
})

function warning(text){
    $("#error").html("<strong>ERROR</strong> "+text);
    $("#warning").fadeIn(500,function(){
        $("#warning").delay(3000).fadeOut(500);
    });
}

function extract(picurl){
    $.ajax({ url: 'extracting.php',
         data: {url: picurl},
         type: 'post',
         success: function(output) {
                      console.log(output);
                  }
});
}

$("#target").submit(function(event){
    event.preventDefault();
    if ($("#imagefield").val()!=""){
        var url=$("#imagefield").val();
        $("#preview").attr("src",'#');
        $(".imagedownload").css("display","hidden");
        $("#link").attr("href",'#');
        $("#loader").css("visibility","visible");
        $.post('extracting.php',{instagram_url:url},function(data){
            $("#loader").css("visibility","hidden");
            if (data=="Invalid URL"){
                warning("Invalid URL");}else if(data=="error"){
                warning("Could not find image url");}else{
                console.log(data);
                $("#preview").attr("src",data);
                $(".imagedownload").css("display","block");
                $("#link").attr("href",data);
            }
        }).fail(function(){
            $("#loader").css("visibility","hidden");
            warning("Unable to connect. Check your internet Connection and try again");
        });
        console.log("Form Submitted");
    }else{
        warning("URL field is empty");
    }
});

