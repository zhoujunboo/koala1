var http=require("http");
var shoppingList=[];
var shopData;
var server=http.createServer(function (req,res) {
    var data="";
    req.on("data",function (d) {
        data+=d;
    });
    req.on("end",function () {
        var resObj={};
        var reqObj=JSON.parse(decodeURIComponent(data));
        if(!reqObj.type) shopData=reqObj;
        resObj.type=reqObj.type;
        switch (reqObj.type){
            case 0:
                resObj.result=addItemShop(reqObj.item);
                break;
            case 1:
                shoppingList=shoppingList.filter(function (t) {
                    return t.id!==reqObj.item.id;
                });
                resObj.result=shoppingList;
                break;
            case 2:
                resObj.result=changeItemNum(reqObj.item,reqObj.num);
                break;
            case 3:
                resObj.result=changeItemCheck(reqObj.item,reqObj.all,reqObj.select);
                break;
            case 4:
                resObj.result=shopData;
                break;
            case 5:
                resObj.result=shoppingList;
                break;
        }
        res.writeHead(200,{"Content-Type":"text/html","Access-Control-Allow-Origin":"*"});
        res.write(encodeURIComponent(JSON.stringify(resObj)));
        res.end();
    })
});
server.listen(3008,"10.9.48.182",function () {
    console.log("已为您开启服务")
});

function addItemShop(item) {
    var arr=shoppingList.filter(function (t) {
        return t.id===item.id;
    });
    if(arr.length===0){
        var obj={};
        Object.assign(obj,item);
        obj.sum=obj.detailMoney*obj.shopNum;
        shoppingList.push(obj);
    }else{
        arr[0].shopNum++;
        arr[0].sum=arr[0].shopNum*arr[0].detailMoney;
    }
    return shoppingList;
}

function changeItemNum(item,num) {
    shoppingList.map(function (t) {
        if(item.id===t.id){
            t.num=num;
            t.sum=t.num*t.price;
        }
    });
    return shoppingList;
}

function changeItemCheck(item,all,select) {
    if(all){
        shoppingList.map(function (t) {
            t.select=select;
        })
    }else{
        shoppingList.map(function (t) {
            if(t.id===item.id){
                t.select=select;
            }
        })
    }
    return shoppingList;
}
