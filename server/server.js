var http=require("http");
var user=[
    {phone:"15734079958",password:"1234zhou"},
    {phone:"17610768768",password:"1234zhou"},
    {phone:"15504059738",password:"1234zhou"},
    {phone:"18600006100",password:"1234zhou"},
    {phone:"18600006101",password:"1234zhou"}
];
var server=http.createServer(function (req,res) {
    var data="";
    req.on("data",function (d) {
        data+=d;
    });
    req.on("end",function () {
        var obj=JSON.parse(decodeURIComponent(data));
        console.log(obj);
        //如果type是0，那么久判断手机号是否被注册
        if(obj.type===0){
            for(var i=0;i<user.length;i++){
                if(user[i].phone===obj.phone){
                    obj.msg="success";
                    break;
                }else{
                    obj.msg="false";
                    continue;
                }
            }
        }else if(obj.type===1){//type=1为注册
            console.log(obj.type);
            var length=user.length;
            var arrObj={};
            user[length]=arrObj;
            user[length].phone=obj.phone;
            user[length].password=obj.password;
            console.log(user);
            obj.msg="registerSuccess";
        }else{
            obj.error="error";
        }
        res.writeHead(200,{"Content-Type":"text/html","Access-Control-Allow-Origin":"*"});
        res.write(encodeURIComponent(JSON.stringify(obj)));
        res.end();
    })
});
server.listen(3005,"10.9.48.182",function () {
   console.log("koloa已为您开启服务！")
});