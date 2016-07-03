function container(){
	$("#container .swiper-slide").on("click",function(){
		$(this).addClass("active").siblings().removeClass("active");
	});
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 4,
		freeMode: true
	})
}
function container5(){
	$("#container5 .head").on("touchstart",function(){
		if($("#container5 .zhezhao").css("opacity")==0){
			$("#container5 .zhezhao").animate({"opacity":1,"z-index":5},100);
			$("#container5 .nav").slideDown(300);
			$("#container5 .head i").html("&#xe625");
		}else{
			$("#container5 .zhezhao").animate({"opacity":0,"z-index":-1},100);
			$("#container5 .nav").slideUp(300);
			$("#container5 .head i").html("&#xe61f");
		}
	})
	$("#container5 .nav ul li").on("touchstart",function(){
		$(this).addClass("active").siblings().removeClass("active");
	})
}
function container6(){
	var arr=$("ul>li");
	var len=arr.length;
	var w=$("ul")[0].offsetWidth;
	var preX,curX;
	var transferX=0;
	for(var i=0;i<len;i++){
		$(arr[i]).css("left",i*w);
		arr[i].addEventListener("touchstart",touchstart,false);
		arr[i].addEventListener("touchmove",touchmove,false);
		arr[i].addEventListener("touchend",touchend,false);
	}
	$(".right").on("click",slide_right);
	$(".left").on("click",slide_left);
	function slide_right(){
		event.preventDefault();
		for(var i=0;i<len;i++){
			if($(arr[i]).css("left")=="0px"){
				var $this=i;
			}
		}
		for(var i=0; i<len;i++){
			if($(arr[len-1]).css("left")=="0px"){
				for(var i=0;i<len;i++){
					$(arr[i]).animate({"left":i*w},400);
				}
			}else{
				$(arr[i]).animate({"left":(i-$this-1)*w},400);
			}
		}
	}
	function slide_left(){
		event.preventDefault();
		for(var i=0;i<len;i++){
			if($(arr[i]).css("left")=="0px"){
				var $this=i;
			}
		}
		if($(arr[0]).css("left")=="0px"){
			for(var i=0;i<len;i++){
				$(arr[i]).animate({"left":w*i},400);
			}
		}else{
			for(var i=0; i<len;i++){
				$(arr[i]).animate({"left":(i-$this+1)*w},400);
			}
		}
	}
	//触摸开始
	function touchstart(event){
		event.preventDefault();
		if(event.targetTouches.length==1){      //避免多手指触摸情况
			var touch=event.targetTouches[0];
			preX=touch.pageX;
		}
	}
	$("ul>li").mousedown(function(event){
		event.preventDefault();
		preX=event.pageX;
		$(this).mousemove(function(event){
			event.preventDefault();               //避免触发默认行为，特别在微信端；
			var $count=$(this);
			var $index2=$count.index();
			curX=event.pageX;
			transferX +=curX-preX;            //用累加是因为css的样式会叠加！！
			for(var i=0;i<len;i++){
				$(arr[i]).css("left",(i-$index2)*w+transferX);
			}
			preX=curX;
		})
	})
	$("ul>li").mouseup(function(event){
		event.preventDefault();
		$("ul>li").unbind("mousemove");
		transferX=0;                         //止transferX在下一次触摸中继续累加，导致下一次滑动幅度越来越大；
		var $this=$(this),
			$index=$(this).index(),
			$left1=parseInt($(this).css("left")),
			$left=Math.abs(parseInt($(this).css("left")));
		if($left<80){                         //设置手指滑动的距离，当小于80px的时候位置不变；
			for(var i=0;i<len;i++){
				var curL=parseInt($(arr[i]).css("left"));
				$(arr[i]).animate({"left":curL-$left1},400);
			}
		}else if($left>80){                  //当滑动的距离大于80px的时候，切换；
			if($left1>0){                    //当手指向右滑动的时候；
				if($index!=0){              //判断是不是第一张，如果不是则切换；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index+1)*w},400);
					}
				}else{                         //如果是第一张，则保持不变；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":i*w},400);
					}
				}
			}else{                          //当手指向左滑动的时候；
				if($index!=(len-1)){        //判断是不是最后一张，如果不是则切换；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index-1)*w},400);
					}
				}else{                    //如果是最后一张，则保持位置不变；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index)*w},400);
					}
				}
			}
		}
	})
	//手指拖动
	function touchmove(event){
		event.preventDefault();               //避免触发默认行为，特别在微信端；
		if(event.targetTouches.length==1){    //避免多手机触摸情况
			var $count=$(this);
			var $index2=$count.index();
			var touch=event.targetTouches[0];
			curX=touch.pageX;
			transferX +=curX-preX;            //用累加是因为css的样式会叠加！！
			for(var i=0;i<len;i++){
				$(arr[i]).css("left",(i-$index2)*w+transferX);
			}
			preX=curX;
		}
	}
	function touchend(event){
		event.preventDefault();
		transferX=0;                         //为了防止transferX在下一次触摸中继续累加，导致下一次滑动幅度越来越大；
		var $this=$(this),
			$index=$(this).index(),
			$left1=parseInt($(this).css("left")),
			$left=Math.abs(parseInt($(this).css("left")));
		if($left<80){                         //设置手指滑动的距离，当小于80px的时候位置不变；
			for(var i=0;i<len;i++){
				var curL=parseInt($(arr[i]).css("left"));
				$(arr[i]).animate({"left":curL-$left1},400);
			}
		}else if($left>80){                  //当滑动的距离大于80px的时候，切换；
			if($left1>0){                    //当手指向右滑动的时候；
				if($index!=0){              //判断是不是第一张，如果不是则切换；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index+1)*w},400);
					}
				}else{                         //如果是第一张，则保持不变；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":i*w},400);
					}
				}
			}else{                          //当手指向左滑动的时候；
				if($index!=(len-1)){        //判断是不是最后一张，如果不是则切换；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index-1)*w},400);
					}
				}else{                    //如果是最后一张，则保持位置不变；
					for(var i=0;i<len;i++){
						$(arr[i]).animate({"left":(i-$index)*w},400);
					}
				}
			}
		}
	}
}
function container9(){
	setTimeout(function(){
			var target=$("#container9 .wraper .guide .body #panel .amap_lib_placeSearch_list ul li.poibox");
			var len=target.length;
			for(var i=0;i<len;i++){
				target[i].addEventListener("click",function(){
					//content=$(this).find("span").html();
					window.location.href="guide_info.html";
				},false)
			}
	},3000);
	$("#container9 .nav ul li").on("click",function(){
		var index=$(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$("#container9 .wraper>li").eq(index).show()
			.siblings().hide();

		if($("#container9 .wraper>li")[0].style.display){
			var map = new AMap.Map("wrap", {
				resizeEnable: true
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
				placeSearch.search("苏州瑞鹏信息科技");
			});
		}
	})
}
function container10(){
	var map = new AMap.Map("wrap", {
				resizeEnable: true
			});
			AMap.service(["AMap.PlaceSearch"], function() {
				var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
					pageSize:100,
					pageIndex: 1,
					city: "0512", //城市
					map: map
					//panel: "panel"
				});
				//关键字查询
				placeSearch.search("苏州瑞鹏信息科技");
			});
}


