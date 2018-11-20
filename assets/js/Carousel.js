var Carousel=(function () {
    var liStyle={
        width: "8px",
        height: "8px",
        borderRadius:"8px",
        backgroundColor:"rgb(255,255,255)",
        border: "1px solid white",
        float: "left",
        lineHeight: "20px",
        textAlign: "center",
        marginLeft: "10px",
        color:"white"
    };
    var ulStyle={
        margin:0,
        paddingLeft:"20px",
        paddingTop:"9px",
        width:"150px",
        height:"19px",
        listStyle: "none",
        position: "absolute",
        bottom: "20px",
        borderRadius:"14px",
        backgroundColor:"rgba(68,61,62,0.3)"

    };
    var imgConStyle={
        position: "absolute",
        left:"0px"
    };
    var maskDivStyle={

        overflow: "hidden",
        position:"relative" ,
        margin: "auto",
        backgroundColor: "antiquewhite"
    };
    function Carousel(parent,list,bnList) {
        this.initCarousel(parent,bnList);
        this.source=list;

    }
    Carousel.prototype={
        //这个加载的图片可能以后会取消侦听处理其他内容
        carouselView:null,
        imageList:[],
        _width:0,
        _height:0,
        _source:[],
        position:0,
        direction:"",
        bool:false,
        autoBool:false,
        speed:20,
        preDot:null,
        time:270,
        set source(value){
            if(!value)return;
            if(!Array.isArray(value))return;
            if(value.length===0) return;
            this.width=0;
            this.height=0;

            if(this.imageList.length>0) {
                this.imageList[this.imageList.length-1].removeEventListener("load", this.loadImageHandler);
            }
            this.imageList.length=0;
            this._source=value;
            this.reloadImg(value);
            console.log(value);
        },
        get source(){
            return this._source;
        },
        set width(value){
            this._width=value;
            if(this.imageList.length===0)return;
            this.carouselView.style.width=value+"px";
            var ul=this.carouselView.lastElementChild;
            ul.style.left=(value-ul.offsetWidth)/2+"px";
        },
        get width(){
            return this._width;
        },
        set height(value){
            this._height=value;
            if(this.imageList.length===0)return;
            this.carouselView.style.height=value+"px";
            this.carouselView.firstElementChild.style.height=value+"px";
            this.carouselView.children[1].style.top=this.carouselView.children[2].style.top=(this.height-this.carouselView.children[1].offsetHeight)/2+"px";
        },
        get height(){
            return this._height;
        },
        reloadImg:function (list) {
            var img=new Image();
            img.addEventListener("load",this.loadImageHandler);
            img.list=list;
            img.self=this;
            img.num=0;
            img.imgList=[];
            img.src=list[img.num];
        },
        loadImageHandler:function (e) {
            this.imgList.push(this.cloneNode(false));
            this.num++;
            if(this.num>this.list.length-1){
                this.self.imgLoadFinish(this.imgList);
                return;
            }
            this.src=this.list[this.num];
        },
        imgLoadFinish:function (imgList) {
            this.imageList=imgList;
            var imgCon=this.carouselView.firstElementChild;
            var ul=this.carouselView.lastElementChild;
            this.clearCon(imgCon);
            this.clearCon(ul);
            imgCon.appendChild(this.imageList[0]);
            for(var i=0;i<this.imageList.length;i++){
                var li=document.createElement("li");
                Object.assign(li.style,liStyle);
                ul.appendChild(li);
            }
            if(this.width===0){
                this.width=this.imageList[0].width;
            }else{
                this.carouselView.style.width=this.width+"px";
                this.setWidth(imgCon,this.width);
            }
            if(this.height===0){
                this.height=this.imageList[0].height;
            }else{
                this.carouselView.style.height=this.height+"px";
                this.carouselView.firstElementChild.style.height=this.height+"px";
                this.setWidth(imgCon,0,this.height);
            }
            this.changeDot();
            this.carouselView.children[1].style.top=this.carouselView.children[2].style.top=(this.height-this.carouselView.children[1].offsetHeight)/2+"px";
            ul.style.left=(this.width-ul.offsetWidth)/2+"px";
        },
        setWidth:function (con,w,h) {
            for(var i=0;i<con.children.length;i++){
                if(w){
                    con.children[i].style.width=w+"px";
                }
                if(h){
                    con.children[i].style.height=h+"px";
                }
            }
        },
        clearCon:function (con) {
            var len=con.children.length;
            for(var i=0;i<len;i++){
                con.firstElementChild.remove();
            }
        },
        initCarousel:function (parent,bnList) {
            if(!this.carouselView){
                this.carouselView=document.createElement("div");
                Object.assign(this.carouselView.style,maskDivStyle);
                this.carouselView.self=this;
                this.carouselView.addEventListener("mouseenter",this.mouseCarouselHandler)
                this.carouselView.addEventListener("mouseleave",this.mouseCarouselHandler)
                var imgCon=document.createElement("div");
                this.carouselView.appendChild(imgCon);
                Object.assign(imgCon.style,imgConStyle);
                for(var i=0;i<bnList.length;i++){
                    var img=new Image();
                    img.self=this;
                    img.addEventListener("load",this.bnLoadHandler);
                    img.src=bnList[i];
                    var obj={position:"absolute"};
                    if(i===0){
                        obj.left="10px";
                    }else{
                        obj.right="10px";
                    }
                    Object.assign(img.style,obj);
                    img.addEventListener("click",this.bnClickHandler);
                    this.carouselView.appendChild(img);
                }

                var ul=document.createElement("ul");
                Object.assign(ul.style,ulStyle);
                this.carouselView.appendChild(ul);
                ul.self=this;
                ul.addEventListener("click",this.dotClickHandler);
                parent.appendChild(this.carouselView);
            }
            return this.carouselView;
        },
        bnLoadHandler:function (e) {
            this.style.top=(this.self.height-this.offsetHeight)/2+"px";
        },
        bnClickHandler:function (e) {
            if(this.self.bool)return;
            if(this.offsetLeft===10){
                this.self.direction="right";
                this.self.position--;
                if(this.self.position<0){
                    this.self.position=this.self.imageList.length-1;
                }
            }else{
                this.self.direction="left";
                this.self.position++;
                if(this.self.position>this.self.imageList.length-1){
                    this.self.position=0;
                }
            }
            this.self.createNextImg();
        },
        dotClickHandler:function (e) {
            if(this.self.bool)return;
            if(e.target instanceof HTMLUListElement) return;
            var arr=Array.from(this.children);
            var index=arr.indexOf(e.target);
            if(index===this.self.position)return;
            if(index>this.self.position){
                this.self.direction="left";
            }else{
                this.self.direction="right";
            }
            this.self.position=index;
            this.self.createNextImg();
        },
        createNextImg:function () {
            if(this.direction!=="left" && this.direction!=="right") return;
            var imgCon=this.carouselView.firstElementChild;
            if(this.direction==="left"){
                imgCon.appendChild(this.imageList[this.position]);
                imgCon.style.width=this.width*2+"px";
                imgCon.style.left="0px";
            }else{
                imgCon.insertBefore(this.imageList[this.position],imgCon.firstElementChild);
                imgCon.style.width=this.width*2+"px";
                imgCon.style.left=-this.width+"px";
            }
            if(this.width!==0){
                this.imageList[this.position].style.width=this.width+"px";
            }
            if(this.height!==0){
                this.imageList[this.position].style.height=this.height+"px";
            }
            this.changeDot();
            this.bool=true;
        },
        update:function () {
            this.autoPlay();
            this.imgCarousel();
        },
        autoPlay:function () {
            if(!this.autoBool)return;
            this.time--;
            if(this.time>0) return;
            this.time=270;
            this.direction="left";
            this.position++;
            if(this.position>this.imageList.length-1){
                this.position=0;
            }
            this.createNextImg();
        },
        imgCarousel:function () {
            if(!this.bool)return;
            if(this.direction!=="left" && this.direction!=="right"){
                this.bool=false;
                return;
            }
            var imgCon=this.carouselView.firstElementChild;
            if(this.direction==="left"){
                imgCon.style.left=imgCon.offsetLeft-this.speed+"px";
                if(imgCon.offsetLeft<=-this.width){
                    imgCon.firstElementChild.remove();
                    imgCon.style.left="0px";
                    this.bool=false;
                    this.direction="";
                }
            }else{
                imgCon.style.left=imgCon.offsetLeft+this.speed+"px";
                if(imgCon.offsetLeft>=0){
                    imgCon.style.left="0px";
                    imgCon.lastElementChild.remove();
                    this.bool=false;
                    this.direction="";
                }
            }
        },
        changeDot:function () {
            if(this.preDot){
                this.preDot.style.backgroundColor="rgb(255,255,255)";
            }
            this.preDot=this.carouselView.lastElementChild.children[this.position];
            this.preDot.style.backgroundColor="rgba(255,0,0,0.6)";
        },
        mouseCarouselHandler:function (e) {
            if(e.type==="mouseenter"){
                this.self.autoBool=false;
            }else if(e.type==="mouseleave"){
                this.self.autoBool=true;
            }
        }
    };
    Carousel.prototype.constructor=Carousel;
    return Carousel;
})();