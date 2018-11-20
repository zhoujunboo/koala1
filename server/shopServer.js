var http=require("http");
var imgUrl="assets/img/";
var title1="【考拉自营 品牌授权 两盒装】妆蕾 RAY 金色补水面膜 10片/盒  .net防伪查验";
var shopData=[
    {id:"1001",img:imgUrl+"section_01.jpg",title:title1,subhead:"RAY 补水面膜",price:"154"},
    {id:"1002",img:imgUrl+"section_02.jpg",title:title1,subhead:"RAY 补水面膜",price:"154"},
    {id:"1003",img:imgUrl+"section_03.jpg",title:title1,subhead:"RAY 补水面膜",price:"154"},
    {id:"1004",img:imgUrl+"section_04.jpg",title:title1,subhead:"RAY 补水面膜",price:"154"},
    {id:"1005",img:imgUrl+"section_05.jpg",title:title1,subhead:"RAY 补水面膜",price:"154"},
    {id:"1006",img:imgUrl+"section_01.jpg",title:title1,subhead:"RAY 补水面膜",price:"154"},
    {id:"1007",img:imgUrl+"section_02.jpg",title:title1,subhead:"RAY 补水面膜",price:"154"},
    {id:"1008",img:imgUrl+"section_03.jpg",title:title1,subhead:"RAY 补水面膜",price:"154"},
    {id:"1009",img:imgUrl+"section_04.jpg",title:title1,subhead:"RAY 补水面膜",price:"154"},
    {id:"1010",img:imgUrl+"section_05.jpg",title:title1,subhead:"RAY 补水面膜",price:"154"}
];
var server=http.createServer(function (req,res) {
    var data="";
    req.on("data",function (d) {
        data+=d;
    });
    req.on("end",function () {
        var obj=JSON.parse(decodeURIComponent(data));
        if(obj.type===0){
            var resObj={};
            resObj.type=obj.type;
            resObj.result=shopData;
        }
        console.log(resObj);
        res.writeHead(200,{"Content-Type":"text/html","Access-Control-Allow-Origin":"*"});
        res.write(encodeURIComponent(JSON.stringify(resObj)));
        res.end();
    })
});
server.listen(3006,"10.9.48.182",function () {
    console.log("小koloa已为您开启服务！")
});