window.onload=function(){
	container();
	container5();
	container6();
	container9();
}
function container(){
	$("#container .left ul li").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
};
function container5(){
	$("#container5 .swiper-slide").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
}
function container6(){
	var a=0;
	$("#container6").ready(function(){
		$("#container6 .iconfont").on("touchstart",function(){
			var index=$(this).index(".iconfont");
			if(a==0){
				$($(".iconfont")[index]).html("&#xe625");
				a=1;
			}else{
				$($(".iconfont")[index]).html("&#xe61f");
				a=0;
			}
			$($("#container6 ol")[index]).children().toggle();
	})
})
}
function container9(){
	$("#container9").ready(function(){
		$("#container9 .change").on("click",function(){
			if(!$("#container9 .left_ul").is(":animated")){
				$(this).animate({"rotate":"+=360deg"},1000);
				// $("#container9 .left_ul").animate({"rotateY":"+=360deg"},1000);
				$("#container9 .left_ul li").eq(0).animate({"rotateY":"+=360deg"},1000);
				$("#container9 .right_ul").animate({"rotateY":"+=360deg"},1000);
			}
		});
    $("#container9 .nav ul li").on("click",function(){
    	var index=$(this).index();
    	$(this).addClass("active").siblings().removeClass("active");
    	$("#container9 .wraper>li").eq(index).show()
    									.siblings().hide();

		if($("#container9 .wraper>li")[0].style.display){
				var map = new AMap.Map("wrap", {
			    resizeEnable: true,
			    });
			    AMap.service(["AMap.PlaceSearch"], function() {
			        var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
			            pageSize:100,
			            pageIndex: 1,
			            city: "0512", //城市
			            map: map,
			            panel: "panel"
			        });
			        //关键字查询
			        placeSearch.search("苏州瑞鹏");
			    });
		}
    })
    if($("#container9 .wraper  .home .circle").css("display")=="block"){
    	var w=$("#container9 .wraper  .home .circle")[0];
    	var scw=w.offsetWidth/2;
    	var oleft=w.offsetLeft+w.offsetWidth/2;
    	var otop=w.offsetTop+w.offsetHeight/2;
    	var man_w=$("#container9 .wraper  .home .main")[0].offsetWidth/2;
    	var man_L=oleft-man_w;
    	var man_H=otop-man_w;
    	var or=scw*8/4;
    	var ir=scw;
    	var left_len=$("#container9 .wraper  .home .main .left_ul li").length;
    	var right_len=$("#container9 .wraper  .home .main .right_ul li").length;
    	var mleft=$("#container9 .wraper  .home .main li")[0].offsetLeft;
    	var mtop=$("#container9 .wraper  .home .main li")[0].offsetTop;
    	var mWidth=$("#container9 .wraper  .home .main li")[0].offsetWidth;
    	var mX,mY,mX2,mY2;
		$("#container9 .wraper  .home .main").css({"left":man_L,"top":man_H})
    	/*对每个菜单项进行定位*/
		for(var i=0;i<left_len;i++){
				mX=parseInt( (Math.cos( (-30*i-90)*Math.PI / 180 ) * ((or+ir)/2) ) + oleft-mWidth/2);
				mY= parseInt( (Math.sin( (-30*i-90)*Math.PI / 180 ) *  ((or+ir)/2) ) + otop-mWidth/2 );
				$("#container9 .wraper  .home .main .left_ul li").eq(i).offset( {top:mY,left:mX} );
		}
		for(var i=0;i<right_len;i++){
				mX2=parseInt( (Math.cos( (-30*i-180)*Math.PI / 180 ) * ((or+ir)/2) ) + oleft-mWidth/2);
				mY2= parseInt( (Math.sin( (-30*i-180)*Math.PI / 180 ) *  ((or+ir)/2) ) + otop-mWidth/2 );
				$("#container9 .wraper  .home .main .right_ul li").eq(i).offset( {top:mY2,left:mX2} );
		}
		var preX,preY;//上一次鼠标点的坐标
		var curX,curY;//本次鼠标点的坐标
		var preAngle;//上一次鼠标点与圆心(150,150)的X轴形成的角度(弧度单位)
		var transferAngle;//当前鼠标点与上一次preAngle之间变化的角度
		var a = 0;
		var liObj = $("#container9 .wraper  .home .main li");
		var ulObj = $("#container9 .wraper  .home .main");
    	var liLen = liObj.length;
	    ulObj[0].addEventListener('touchstart',touchstart,false);
	    ulObj[0].addEventListener('touchmove',touchmove,false);
	    // ulObj[0].addEventListener('touchend',touchend,false);
    	function touchstart(event){
    		if( event.targetTouches.length == 1 )
    		   {
    		       var touch = event.targetTouches[0];
    		       preX = touch.pageX;
    		       preY=touch.pageY;
    		       preAngle= Math.atan2(preY-otop, preX-oleft);
    		   }
    	}
    	function touchmove(event){
    		event.preventDefault();
    	    if( event.targetTouches.length == 1 )
    	    {
    	        var touch = event.targetTouches[0];
    	        curX=touch.pageX;
    	        curY=touch.pageY;
    	        curAngle=Math.atan2(curY-otop,curX-oleft)
    	        transferAngle=curAngle-preAngle;
    	        a += (transferAngle * 180 / Math.PI);
    	        for(var i=0;i < liLen;i++){
    	        	$('#container9 .wraper .home .main').css("rotate",a);
    	             $("#container9 .wraper  .home .main li").eq(i).css("rotate",-a);
    	            preX = curX;
					preY = curY;
					preAngle = curAngle;
    	        }
    	    }
    	}
    	// function touchend(){};
		$("#container9 .wraper  .home .main").mousedown(function(event){
			event.preventDefault();
			preX = event.pageX;
			preY = event.pageY;
			//计算当前点击的点与圆心(150,150)的X轴的夹角(弧度) --> 上半圆为负(0 ~ -180), 下半圆未正[0 ~ 180]
			preAngle = Math.atan2(preY - 150, preX - 150);
			//移动事件
			$(this).mousemove(function(event){
				event.preventDefault();
				curX = event.pageX;
				curY = event.pageY;
				//计算当前点击的点与圆心(150,150)的X轴的夹角(弧度) --> 上半圆为负(0 ~ -180), 下半圆未正[0 ~ 180]
				var curAngle = Math.atan2(curY - 150, curX - 150);
				transferAngle = curAngle - preAngle;
				a += (transferAngle * 180 / Math.PI);//因为后面的样式会替代前面的样式，所以必须 通过累加方式
				$('#container9 .wraper .home .main').css("rotate",-a);

				for( var i = 0 ; i <= 8 ; i++ ){
					$("#container9 .wraper  .home .main li").eq(i).css("rotate",a);
				}
				preX = curX;
				preY = curY;
				preAngle = curAngle;
			});
			//释放事件
			$(this).mouseup(function(event){
				event.preventDefault();
				$(this).unbind("mousemove");
			});
		});
		if(IsPC()){
			alert("aaa");
		}
		function IsPC()
		{
			var userAgentInfo = navigator.userAgent;
			var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
			var flag = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
			}
			return flag;
		}

	}
	})
}


