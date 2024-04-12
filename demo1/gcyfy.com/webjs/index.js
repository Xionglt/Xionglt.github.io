$(function () {

    $(".nav ul li:last").addClass("last");
    $(".sex").click(function () {
        $(this).addClass("sexcur").siblings().removeClass("sexcur");
    });
    $(".explain label").click(function () {
        $(this).addClass("cur").siblings().removeClass("cur");
    });

    $(".Born").each(function () {

        //$(this).find("h3").click(function () {
        //    $(this).next().slideDown(300);
        //});

        //$(this).find("ul li").click(function () {
        //    $(this).parent("ul").prev().text($(this).text());
        //    $(this).parent("ul").next().val($(this).text());
        //    $(this).parent("ul").hide();
        //})

        $(this).on("click", "h3", function () {
            $(this).next().slideDown(300);
        });

        $(this).on("click", "ul li", function () {
            $(this).parent("ul").prev().text($(this).text());
            $(this).parent("ul").next().val($(this).text());
            $(this).parent("ul").hide();
        })
    });

    $(document).on("click", function (e) {
        if ($(e.target).closest(".Born").length == 0) {
            $(".Born ul").hide();
        };
        if ($(e.target).closest(".YearSearch").length == 0) {
            $(".YearSearch dl").hide();
        };
        if ($(e.target).closest(".searchTypes h3").length == 0) {
            $(".searchTypes p").hide();
        };
    });

    $(".YearSearch h3").click(function () {
        $(this).next().slideDown(300);
    });

    $(".setdef span").click(function () {
        if ($(this).hasClass("hookcur") == false) {
            $(this).addClass("hookcur");
            $(this).find("input").attr("checked", "checked").attr("value", 1);
        } else {
            $(this).removeClass("hookcur");
            $(this).find("input").removeAttr("checked").attr("value", 0);
        }
    });

    $(".memberclass li").click(function () {
        if ($(this).find("p").is(":hidden")) {
            $(this).find("p").slideDown(300);
            $(this).siblings().find("p").slideUp(300);
            $(this).addClass("cur1");
        } else {
            $(this).find("p").slideUp(300);
            $(this).removeClass("cur1");
        }
    });

    //$(".productclass dl dd h3").click(function () {
    //    if ($(this).next("p").is(":hidden")) {
    //        $(this).next("p").slideDown(300);
    //        $(this).siblings().next("p").slideUp(300);
    //        $(this).parent().addClass("cur").siblings().parent().removeClass("cur");
    //    } else {
    //        $(this).next("p").slideUp(300);
    //        $(this).removeClass("cur");
    //    }
    //});
    $(".productclass dl dd h3").click(function () {
        if ($(this).next("p").is(":hidden")) {
          
            $(this).next("p").slideDown(300);
            //$(this).parent().siblings().find("p").slideUp(300);
            $(this).parent().addClass("cur");
        } else {
            $(this).next("p").slideUp(300);
            $(this).parent().removeClass("cur");
        }
    });


  /* $(".productclass dd p a").each(function () {

        if ($(this).hasClass("cur")) {
            $(this).parents("dd").addClass("cur");
            $(this).parent().addClass("show")
        }
    });*/


    $(".Itsbrand dl:last-child").addClass("last");

    $(".Tablist li h4").click(function () {
        if ($(this).next("div.Tabcontent").is(":hidden")) {
            $("div.Tabcontent").slideUp(300);
            $(this).next("div.Tabcontent").slideDown(300);
        } else {
            $(this).next("div.Tabcontent").slideUp(300);
        }
    });

    $(".classdown span").click(function () {
        if ($(this).next("p").is(":hidden")) {
            $(".classdown p").slideUp(300);
            $(this).next("p").slideDown(300);
        } else {
            $(this).next("p").slideUp(300);
        }
    });

    $(".close,.Coverbg").click(function () {
        $(".Coverbg,.popupshopping").fadeOut(300);
    });

    //������
    //$(".addshopping").click(function(){
    //	$(".Coverbg,.popupshopping").fadeIn(300);	
    //});

    $(".recover").click(function () {
        $(".Tabcontent").slideUp(300)
    });

    $(".Loginmode span").click(function () {
        $(this).addClass("cur").siblings().removeClass("cur");
        var t = $(this).index();
        $(".loginint dl").hide().eq(t).show();
    });
    $(".newsIntegrated ul li").eq(0).addClass("newsone");
    $(".newsIntegrated ul li").eq(2).addClass("newsthree");
    $(".newsIntegrated ul li").eq(3).addClass("newsfour");
    $(".newsIntegrated ul li").eq(4).addClass("newsFives");
    $(".newsIntegrated ul li").eq(5).addClass("newssix");
    $(".ProductSeries dl dd").eq(1).addClass("ProductSeriesbig");

    $(".BrandHonorsTime ul li:nth-child(10n+7) div").addClass("rightdesc");
    $(".BrandHonorsTime ul li:nth-child(10n+8) div").addClass("rightdesc");
    $(".BrandHonorsTime ul li:nth-child(10n+9) div").addClass("rightdesc");
    $(".BrandHonorsTime ul li:nth-child(10n+10) div").addClass("rightdesc");

    $(".workposition ul li h5").click(function () {
        if ($(this).next("div.workpositionbox").is(":hidden")) {
            $(this).next().slideDown();
            $(this).parent().addClass("cur");
            $(this).parent().siblings().removeClass("cur");
            $(this).parent().siblings().find("div.workpositionbox").slideUp();
        } else {
            $(this).next().slideUp();
            $(this).parent().removeClass("cur");
        }
    })

    $(".PayClass dt span").click(function () {
        var t = $(this).index();
        $(this).addClass("cur").siblings().removeClass("cur");
        $(".PayClass dd").hide().eq(t).show();
    })


    $(".nav ul li").hover(function () {
        $(this).find(">div").stop().slideDown(150);
    }, function () {
        $(this).find(">div").stop().slideUp(150);
    })


    $(".searchTypes").each(function () {
        $(this).find("h3").click(function () {
            $(this).next("p").slideDown(200);
        })
    });

    $(".searchTypes").each(function () {
        $(this).find("p a").click(function () {
            $(this).parent().prev().text($(this).text());
        })
    });

    $(".navproduct dl dt div p a").hover(function () {
        var img = $(this).attr("rel");
        var url = $(this).attr("href");
        $(".navproduct dl dd").show();
        $(".navproduct dl dd").find("a img").attr("src", img);
        $(".navproduct dl dd").find("a").attr("href", url);

    }, function () {
        $(".navproduct dl dd").hide();
    });


    $(".Uploadimg").click(function () {
        $(this).next().click()
    });

    $(".deleteimg").click(function () {
        $(this).next().attr("src", "");
        $(this).parents("p").hide();
    });


    $(".shoppingcaraddress input").click(function () {
        var t = $(".shoppingcaraddress input").index($(this));
        $(".shoppingcaraddress dl").removeClass("cur").eq(t).addClass("cur");
    });

    //
    //$(".Setupaddr").click(function () {
    //    $(".defaddr").hide();
    //    $(this).prev().show();
    //    $(this).hide();
    //})

    $(".shoppingcaraddress dl").hover(function () {
        $(this).find("dd.Setupaddr").show();
    }, function () {
        $(this).find("dd.Setupaddr").hide();
    })

    //$(".shoppingcaraddress dl").hover(function () {
    //    if ($(this).find("dd.defaddr").is(":hidden")) {
    //        $(this).find("dd.Setupaddr").show();
    //    } else {
    //        $(this).find("dd.Setupaddr").hide();
    //    }
    //}, function () {
    //    $(this).find("dd.Setupaddr").hide();
    //})

    $('.procp ul').cycle({
          fx: 'fade',
          speed: 600
         

      });
    $('.newsbanner ul').cycle({
          fx: 'fade',
          speed: 600
         

    });
    //΢�Ŷ�ά��
    $('.share').find('.wechat').mouseenter(function () {
        $(this).find('img').stop(false, true).fadeIn(300);
    }).mouseleave(function () {
        $(this).find('img').stop(false, true).fadeOut(300);
    });

});