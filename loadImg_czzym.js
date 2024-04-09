//读取HongKong
//读取summary文件中指定的xml文件以获取图片名
//传入的参数xmlDile为xml文件url即文件路径，album是相册文件夹的名字
//例如对于9_HongKong.xml文件，其对应的相册名是9_HongKong
function getPhotos(xmlFile,albumName) {
 
    //生成xml对象。
    var xmlDoc = createXMLDoc(xmlFile);
 
    //检验xml对象
    if (xmlDoc == null) {
        alert('您的浏览器不支持该功能,推荐使用IE浏览器或Chrome可以解决此问题!');
    }
 
    //获取照片节点
    var photos= xmlDoc.getElementsByTagName("photo");
    // if($.browser.msie){ // 注意各个浏览器之间的区别
    //     photos = xmlDoc.documentElement.getElementsByTagName("photo"); //读取XML文件中需要显示的数据
    // }
    // else if (isFirefox=navigator.userAgent.indexOf("Firefox")>0){//Firefox
    //     photos = xmlDoc.getElementsByTagName('photo'); //读取XML文件中需要显示的数据
    // }
    // else{
    //     photos = xmlDoc.getElementsByTagName('photo');
    // }
    
    //图片数量
    var len = photos.length;
 
    //src图片src,alt 图片alt
    var destination = "/photos/" + albumName + "/";
    var src;
    var alt;
 
    //获取照片容器
    var container = document.getElementById('container');
    var czzymList = [
        {title: '我在财大画陶瓷！',tx_name: '多吃饭少睡觉',zan: '❤',url: 'https://www.xiaohongshu.com/explore/66129cd1000000001a00f3df'},
        {title: '在你财已经next level了',tx_name: '是旸不是肠',zan: '❤',url: ' https://www.xiaohongshu.com/explore/6612534a000000001b011e5b'},
        {title: '我在财大画陶瓷！',tx_name: '欢乐马',zan: '❤',url: 'https://www.xiaohongshu.com/explore/661114ff000000001a00ede5'},
        {title: '财大的uu快来 ',tx_name: '猜字谜',zan: '❤',url: ' https://www.xiaohongshu.com/explore/660d6237000000001a011231'},
        {title: '我在财大画陶瓷~',tx_name: '横竖都是蚊子',zan: '❤',url: 'https://www.xiaohongshu.com/explore/660cb851000000001b0091fb'},
        {title: '中南财新增一批神秘道具',tx_name: '桥边红药_',zan: '❤',url: ' https://www.xiaohongshu.com/explore/660ea110000000001b0103f5'},
        // {title: 'yyyyyyy',tx_name: 'uh',zan: '❤16k+',url: 'https://baidu.com'},
        // {title: 'vvvvvv',tx_name: '111111hh111',zan: '❤17k+',url: 'https://baidu.com'},
        // {title: 'ccccccccc',tx_name: 'gggg',zan: '❤12k+',url: 'https://baidu.com'},
    ];
    for (var i = 0; i < len; i++) {
 
        //构建图片src,alt
        photoName = photos[i].childNodes[0].nodeValue;//photos[i].childNodes[0].nodeValue
        src = destination + photoName;
        alt = photoName;
        // alert(photoName);
 
    // 图片元素格式
    //<a  class="strip thumbnail" href="../../../photos/9_HongKong/2.jpg" data-strip-caption="titleName" data-strip-group="gallery-name">
    //         <img src="../../../photos/9_HongKong/2.jpg" class="imgs">
    //   </a>
        var ele_img = document.createElement("img");
        var ele_a = document.createElement("a");
        var ele_div = document.createElement("div");
        var ele_span = document.createElement("span");
        var ele_p = document.createElement("p");
        var tx_img = document.createElement("img");
        var tx_span = document.createElement("span");
        var tx_div = document.createElement("div");
 
        tx_img.setAttribute("src",src);
        tx_img.setAttribute("alt",alt);
        tx_img.setAttribute("title",photoName.split(".")[0]);
        tx_img.setAttribute("class","img_tx");

        ele_img.setAttribute("src",src);
        ele_img.setAttribute("alt",alt);
        ele_img.setAttribute("title",photoName.split(".")[0]);
        ele_img.setAttribute("class","imgs");
 
        ele_a.setAttribute("class","strip thumbnail");
        ele_a.setAttribute('data-strip-caption',photoName.split(".")[0]);
        ele_a.setAttribute('href', czzymList[i].url);
        ele_a.setAttribute('data-strip-group',"gallery-name");

        ele_div.setAttribute("class","namebox");
        tx_div.setAttribute("class","txbox");
        tx_span.setAttribute("class","tx_span");
        ele_span.innerText = czzymList[i].title;
        tx_span.innerText = czzymList[i].tx_name;
        ele_p.innerText = czzymList[i].zan;
        // ele_div.setAttribute('href',src);
        // ele_div.setAttribute('data-strip-group',"gallery-name");
        
        ele_div.append(ele_img);
        ele_div.append(ele_span);
        // ele_div.append(ele_p);

        tx_div.append(tx_img);
        tx_div.append(tx_span);
        tx_div.append(ele_p);
        ele_div.append(tx_div);
        ele_a.append(ele_div);
        container.append(ele_a);
 
    }
    
    return len;//将图片数量返回，方便处理计数，分页等问题
}
 
 
//读取xml文件并生成XMLDocument对象
//针对不同浏览器，读取xml文件有不同操作。我使用的是谷歌浏览器
function createXMLDoc(xmlFile) {
    var xmlDoc;
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject('Microsoft.XMLDOM');//IE浏览器
        xmlDoc.async = false;
        xmlDoc.load(xmlFile);
    }
    //  else if (isFirefox=navigator.userAgent.indexOf("Firefox")>0) { //火狐浏览器
    // //  else if (document.implementation && document.implementation.createDocument) {//这里主要是对谷歌浏览器进行处理
    //     xmlDoc = document.implementation.createDocument('', '', null);
    //     xmlDoc.async=false;
    //     xmlDoc.load(xmlFile);
    // }
    else{ //谷歌浏览器
        var xmlhttp = new window.XMLHttpRequest();
        xmlhttp.open("GET",xmlFile,false);
        xmlhttp.send(null);
        if(xmlhttp.readyState == 4){
            xmlDoc = xmlhttp.responseXML.documentElement;
        }
    }
 
    return xmlDoc;
}