var http=require("http");
var province=[
    {name:"山东",value:["济南","青岛","烟台","临沂","潍坊"]},
    {name:"山西",value:["太原","大同","临汾","晋中","运城"]},
    {name:"陕西",value:["西安","咸阳","宝鸡","延安","铜川","榆林"]},
    {name:"河北",value:["石家庄","唐山","保定","张家口","邯郸","廊坊"]},
    {name:"河南",value:["开封","郑州","洛阳","信阳","濮阳","驻马店"]}
];
var server=http.createServer(function (req,res) {
    var data="";
    req.on("data",function (d) {
        data+=d;
    });
    req.on("end",function () {
        var obj=JSON.parse(decodeURIComponent(data));
        var arr=[];
        if(obj.type===0){
            for(var i=0;i<province.length;i++){
                arr.push(province[i].name);
            }
        }else if(obj.type===1){
          arr= province.filter(function (t) {
                return t.name===obj.name
            });
          if(arr.length>0){
              arr=arr[0].value;
          }
        }
        res.writeHead(200,{"Content-Type":"text/html","Access-Control-Allow-Origin":"*"});

        res.write(encodeURIComponent(JSON.stringify({type:obj.type,arr:arr})));
        res.end();
    })
});
server.listen(3002,"10.9.170.40",function () {
   console.log("开启服务")
});