
$(function(){
	
	$('#search_triggers').find('span').click(function(){
		
		$('#search_triggers').find('span').attr('class','search_text fl');
		$('#search_pane').find('.search_pane_input').css('display','none');
		
		$(this).attr('class','search_text_orange fl');
		$('#search_pane').find('.search_pane_input').eq( $(this).index() ).css('display','block');
		
	});
	
	$('.extra_head').find('li').mouseenter(function(){
		
		$('.extra_head').find('li').attr('class','fl');
		$('.notice').find('.notice_div').css('display','none');
		
		$(this).attr('class','selected fl');
		$('.notice').find('.notice_div').eq( $(this).index() ).css('display','block');
		
	});
	
	$('.tb_servies').find('.sidebar_store').mouseenter(function(){
		
		$('.tb_servies').find('.sidebar_store').attr('class','sidebar_store');
		$('.left_thene_store').find('.sidebar').css('display','none');
		
		$(this).attr('class','sidebar_store cha_bor');
		$('.left_thene_store').find('.sidebar').eq( $(this).index() ).css('display','block');
		
	});
	
	$('.rect_warp').mouseleave(function(){
		$('.sidebar').css('display','none');
		$('.tb_servies').find('.sidebar_store').attr('class','sidebar_store');
	});
	
	$('.hot_point_part2').mouseenter(function(){
		$('.hot_point_part2').css('border','1px solid #ff4400');
		$('.hot_point_part2').find('.qunar').css('display','block');
		$('.hot_point_part2').find('.qunar').css('transition','3s');
	});
	$('.hot_point_part2').mouseleave(function(){
		$('.hot_point_part2').css('border','1px solid #E8E8E8');
		$('.hot_point_part2').find('.qunar').css('display','none');
	});
	
// 户外运动
	
	function display_change(className){
		$(className).mouseenter(function(){
			$(className).eq($(this).index(className)).css('border','1px solid #ff4400');
			$(className).eq($(this).index(className)).find('.qunar').css('display','block');
			$(className).eq($(this).index(className)).find('.gengduo').css('display','block');
		});
		$(className).mouseleave(function(){
			$(className).eq($(this).index(className)).css('border','1px solid #E8E8E8');
			$(className).eq($(this).index(className)).find('.qunar').css('display','none');
			$(className).eq($(this).index(className)).find('.gengduo').css('display','none');
		});
	}
	
	display_change('.display_change');
	

	function border_change(className){
		$(className).mouseenter(function(){
			$(className).eq($(this).index(className)).css('border','1px solid #ff4400');
		});
		$(className).mouseleave(function(){
			$(className).eq($(this).index(className)).css('border','1px solid #E8E8E8');
		});
	}

	border_change('.border_show');

	function show(className,className2){
		$(className2).mouseenter(function(){
			$(className2).eq($(this).index(className2)).find(className).css('display','block');
		});
		$(className2).mouseleave(function(){
			$(className2).eq($(this).index(className2)).find(className).css('display','none');
		});
	}
	
	show('.sscroll','.js_picshow');
	show('.sscroll1','.js_picshow1');
	
	$(window).scroll(function(){
		var scrolltop = $(document).scrollTop();
		console.log(scrolltop)
		if (scrolltop > 36) {
			$('.header').addClass('header_fixed');
		}else if (scrolltop < 36) {
			$('.header').removeClass('header_fixed');
		}
	});
	
});


