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
            var length=user.length;
            var arrObj={};
            user[length]=arrObj;
            user[length].phone=obj.phone;
            user[length].password=obj.password;
            obj.msg="registerSuccess";
        }else if(obj.type===2){
            var arr=[];
            //先查找相同手机号，在查找相同手机号下的密码，前台传过来的和后台的一不一样
            for(var i=0;i<user.length;i++){
                arr.push(user[i].phone);
            }
            var index=arr.indexOf(obj.phone);
            console.log(index,arr);
            if(user[index].password===obj.password){
                obj.msg="passSuccess";
            }else {
                obj.msg="passFalse";
            }
        }
        else{
            obj.error="error";
        }
        console.log(obj.msg);
        res.writeHead(200,{"Content-Type":"text/html","Access-Control-Allow-Origin":"*"});
        res.write(encodeURIComponent(JSON.stringify(obj)));
        res.end();
    })
});
server.listen(3005,"10.9.48.182",function () {
    console.log("koloa已为您开启服务！")
});