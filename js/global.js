$(function(){
	pageHeader();
	var $top=$("#back-to-top");
	backToTop($top,700,600);
	navToggle();
	rotate();
});

// 页面跳转时页面标题动画
function pageHeader(){
	var a=$("#nav-link a");
	var ph=$("#content>.page>.page-header");
	for(var i=0;i<a.length;i++){
		a[i].index=i;
		ph[i].index=i;
		$(a[i]).click(function(event) {
			$(ph[this.index]).delay(200).fadeOut().fadeIn();
		});
	}
}

// 回到顶部按钮显示与隐藏
function backToTop(elem,y,time){
	elem.hide();
	$(window).scroll(function() {
        if ($(window).scrollTop() > y) {
          elem.fadeIn(time);
        } else {
          elem.fadeOut(time);
        }
    });
}
// 首页
// 首页导航栏动画
function navToggle(){
	var li=$("#home-out li");
	var content=$("#home-out>.home-content");
	var about=$("#home-out>.home-about");
	for(var i=0;i<li.length;i++){
		$(li[i]).hover(function() {
			$(about).removeClass('active');
			var index=$(this).index();    //获取下标
			$(this).addClass('li-active');
			$(content[index]).addClass('active');
		}, function(event) {
			var nextElem=$(event.relatedTarget);
			if(!nextElem.hasClass('home-content')){
				$(about).addClass('active');
				var index=$(this).index();
				$(this).removeClass('li-active');
				$(content[index]).removeClass('active');
			}
		});
		$(content[i]).mouseleave(function(event) {
			var nextElem=$(event.relatedTarget);
			if(!nextElem.hasClass('li-active')){
				$(about).addClass('active');
				var index=$(this).index()-2;
				$(this).removeClass('active');
				$(li[index]).removeClass('li-active');
			}
		});			
	}
}

//技巧标志旋转
function rotate(){
	var icon=$("#skill-out>.skill-list>.skill-icon");
	var flag=$("#skill-out>.skill-list>.skill-flag");
	var content=$("#skill-out>.skill-list>.skill-content");
	for(var i=0;i<icon.length;i++){
		icon[i].index=i;
		$(icon[i]).click(function(event) {
			// 判断是否处于显示状态
			if($(content[this.index]).css("display")=="block"){
				$(flag[this.index]).removeClass('skill-flag-rotate');
				$(content[this.index]).slideUp();
			}else{
				// 先把所有的标志向上和把所有详细介绍隐藏
				for(var j=0;j<icon.length;j++){
					$(flag[j]).removeClass('skill-flag-rotate');
					$(content[j]).slideUp();
				}
				$(flag[this.index]).addClass('skill-flag-rotate');
				$(content[this.index]).slideDown();
			}

		});
	}
}
// 项目经历
// 轮播图
$(function () {
    var container = $('#container');
    var list = $('#list');
    var buttons = $('#buttons span');
    var prev = $('#prev');
    var next = $('#next');
    var index = 1;
    var len = 4;
    // 切换图片动画
    function animate (offset) {
        var left = parseInt(list.css('left')) + offset;
        if (offset>0) {
            offset = '+=' + offset;
        }
        else {
            offset = '-=' + Math.abs(offset);
        }
        list.animate({'left': offset}, 300, function () {
            if(left > 0){
                list.css('left', -600 * (len-1));
            }
            if(left < (-600 * (len-1))) {
                list.css('left', 0);
            }
        });
    }
    // 切换按钮样式
    function showButton() {
        buttons.eq(index-1).addClass('on').siblings().removeClass('on');
    }
    // 换下一张图片
    next.bind('click', function () {
        if (list.is(':animated')) {
            return;
        }
        if (index == 4) {
            index = 1;
            animate(1800);
	        showButton();
        }
        else {
            index += 1;            
	        animate(-600);
	        showButton();
        }
    });
    // 换上一张图片
    prev.bind('click', function () {
        if (list.is(':animated')) {
            return;
        }
        if (index == 1) {
            index = 4;            
            animate(-1800);
            showButton();
        }
        else {
            index -= 1;
            animate(600);
        	showButton();
        }
    });
    // 按钮切换图片
    buttons.each(function () {
         $(this).bind('click', function () {
             if (list.is(':animated') || $(this).attr('class')=='on') {
                 return;
             }
             var myIndex = parseInt($(this).attr('index'));
             var offset = -600 * (myIndex - index);
             animate(offset);
             index = myIndex;
             showButton();
         })
    });
});