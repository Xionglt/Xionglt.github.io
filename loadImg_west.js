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
 
        ele_img.setAttribute("src",src);
        ele_img.setAttribute("alt",alt);
        ele_img.setAttribute("title",photoName.split(".")[0]);
        ele_img.setAttribute("class","imgs");
 
        ele_a.setAttribute("class","strip thumbnail");
        ele_a.setAttribute('data-strip-caption',photoName.split(".")[0]);
        ele_a.setAttribute('href',src);
        ele_a.setAttribute('data-strip-group',"gallery-name");

        ele_div.setAttribute("class","namebox");
        // ele_span.innerText = photoName.split(".")[0];
        // ele_p.innerText = "US$ 128.00";
        // ele_div.setAttribute('href',src);
        // ele_div.setAttribute('data-strip-group',"gallery-name");
        ele_a.append(ele_img);
        ele_div.append(ele_a);
        ele_div.append(ele_span);
        ele_div.append(ele_p);

        container.append(ele_div);
 
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