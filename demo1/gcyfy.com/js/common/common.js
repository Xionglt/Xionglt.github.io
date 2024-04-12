define(function (require, exports) {
    exports.commonFun = function (par) {
        //var $ = require("jquery");
        require("layer");
        require("/ajax/PreCommonTool.ashx#");
        var common = PreCommonTool;
        par = par || {};
        par.btnoutlogin = par.btnoutlogin || $("#btnOutLogin");
        par.outlogin = par.outlogin || "outlogin";
        par.formsearch = par.formsearch || $("#formSearch");
        par.textsearch = par.textsearch || $("#textSearch");

        // 登出
        $("[rel='" + par.outlogin + "']").click(function () {
            layer.confirm("确定退出吗？", function () {
                if (!layerbtnProcess())
                    return false;
                common.OutLogin(function (data) {
                    if (data.value.res) {
                        // location.href = "/";
                        location.reload();
                    }
                });
            });
            return false;
        });

        // 搜索，跳转链接写在form表单的action属性中
        par.formsearch.submit(function () {
            if (par.textsearch.is(":visible")) {
                var searchValue = par.textsearch.val();
                if (searchValue.length < 1) {
                    layer.msg("请输入关键字");
                    return false;
                }
                par.textsearch.val(escape(searchValue));
            }
        });

        //第三方登录和绑定
        //$("[tp]").click(function () {
        //    window.open('/oauth/index.aspx?tp=' + $(this).attr("tp") + "&fromurl=" + window.location.href);
        //});
    }
});

// 获取指定对象
function SetModel(form) {
    var model = {};
    $.each(form.serializeArray(), function (i, item) {
        var _this = $("[name='" + item.name + "']", form);
        if (_this.attr("rel") == 'datetime') {
            model[item.name] = GetTimes(_this.val());
        } else if ($("select[name='" + item.name + "'][multiple='multiple']", form).length > 0) {
            if (typeof (model[item.name]) == "undefined")
                model[item.name] = item.value;
            else
                model[item.name] += "," + item.value;
        } else if (_this.attr("type") == "radio") {
            for (var i = 0; i < _this.length; i++) {
                if ($(_this[i]).prop("checked")) {
                    model[item.name] = $(_this[i]).val();
                    break;
                }
            }            
        } else {
            model[item.name] = _this.val();
        }
    });
    return model;
}

function isEmail(str) {
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,6})+$/;
    return reg.test(str);
}
function isPhone(str) {
    var reg = /^(13[0-9]|14[0-9]|15[0-9]|170|176|18[0-9])\d{8}$/;
    return reg.test(str);
}
function isNull(str) {
    if (str != null && str != undefined && str.length > 0) {
        return false;
    }
    return true;
}
function ChangeImgCode(opt) {
    opt = $.extend({ codeimg: $("#codeimg"), changecode: $("#changecode") }, opt);
    return opt.codeimg.each(function () {
        $this = $(this);
        var src = $this.attr("src");
        function changecodeimg() { $this.attr("src", src + "?" + new Date().getTime()) }
        $this.click(changecodeimg);
        opt["changecode"].click(changecodeimg);
    })
}

var islayersubmit = true;
function layerbtnProcess() {
    if (!islayersubmit)
        return false;
    islayersubmit = false;
    $(".layui-layer-btn0").text("处理中...")
    return true;
};

var tips = {};
var tipsstyle1 = {
    tips: [3, 'background:url(/js/layer/skin/default/icon62.png) no-repeat 0 -27px;margin-left:3px; padding-left:16px; color:#b01519;box-shadow:none;padding-top:2px'],
    time: 0,
    shift: -1
},


tipsstyle = {
    tips: [3, 'background:url(/js/layer/skin/default/icon62.png) no-repeat 0 7px;margin-left:3px; padding-left:16px; color:#b01519;box-shadow:none;padding-top:2px'],
    time: 0,
    shift: -1
};

function commontips(msg, jq, ts) {
    ts = ts || tipsstyle;
    return layer.tips(msg, jq, ts);
}

function cleartips() {
    for (var key in tips) {
        layer.close(tips[key]);
    }
}

function getDaysInMonth(year, month) {
    month = parseInt(month, 10); //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。 
    var temp = new Date(year, month, 0);
    return temp.getDate();
}

function pad(num, n) {
    var len = num.toString().length;
    while (len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}


function GetDateTime(Dtime) {
    var NewDtime = new Date(parseInt(Dtime.slice(6, 19)));
    return formatDate(NewDtime);
}

function formatDate(dt) {
    var year = dt.getFullYear();
    var month = dt.getMonth() + 1;
    var date = dt.getDate();
    var hour = dt.getHours();
    var minute = dt.getMinutes();
    var second = dt.getSeconds();
    return year + "-" + fd(month) + "-" + fd(date); //+ " " + fd(hour) + ":" + fd(minute) + ":" + fd(second);
}

function fd(v) {
    if (v < 10)
        return '0' + v;
    return v;
}