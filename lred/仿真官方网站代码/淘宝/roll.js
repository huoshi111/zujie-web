
$(function(){
	
	var oUl = $('#ul1'); 
	var oDiv = $('#div1');
	var aLi = oUl.find('li');
	var olLi = $('#ol li');
	var aA = oDiv.find('a');
	var timer = null;
//	
	var oW = aLi.eq(0).width();
	
	//计算UL的宽度；
	oUl.width(oW*aLi.length);
	
	//点击右边
	var n = 0;//点了多少次；
	aA.eq(1).click(function(){
		n++;
		fn1();
	});

	//点击左边
	aA.eq(0).click(function(){
		n--;
		fn1();
	});

	olLi.click(function(){
		n = $(this).index();
		fn1();
	})



	timer = setInterval(go,2400);
	
	function go(){
		n++;
		fn1();
	}
	
	oDiv.hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(go,2400);
	});
	
	
	function fn1(){
		if(n == 0){
			aLi.eq(0).css('position','static');
		}
		if(n == aLi.length-1){
			aLi.eq(aLi.length-1).css('position','static');
		}
		
		if(n == aLi.length){
			aLi.eq(0).css('position','relative');
			aLi.eq(0).css('left',oW * aLi.length);
		}
		if(n > aLi.length){
			aLi.eq(0).css('position','static');
			oUl.css('left','0');
			n = 1;
		}
		if(n == -1){
			aLi.eq(aLi.length-1).css('position','relative');
			aLi.eq(aLi.length-1).css('left', -oW * (aLi.length-1) );
		}
		if(n < -1){
			aLi.eq(aLi.length-1).css('position','static');
			oUl.css('left', -oW * (aLi.length-1) );
			n = aLi.length-2;
		}
		
//		for(var i=0;i<olLi.length;i++){
//			olLi[i].className = '';
//		}
		
		
		/*
			n -1  5   4     5 + -1  4  % 5   4
			n  0  1   0     5 + 0   5  % 5   0
			n  1  2   1     5 + 1   6  % 5   1
			n  2  3   2     
			n  3  4   3
			n  4  5   4
			n  5  0   0
			
			(aLi.length + n) % aLi.length
		*/
		
		
		olLi.eq((aLi.length + n) % aLi.length).addClass('orange').siblings().removeClass('orange');
		
		
		
	//	alert(oUl.style.left)
		
		
		
		move(oUl,600,{
			left : -n * oW
		});
	}
	
});


$(function(){
	
	var oUl = $('.ul1'); 
	var oDiv = $('.div1');
	var aLi = oUl.find('li');
	var olLi = $('.ol li');
	var aA = oDiv.find('a');
	var timer = null;
//	
	var oW = aLi.eq(0).width();
	
	//计算UL的宽度；
	oUl.width(oW*aLi.length);
	
	//点击右边
	var n = 0;//点了多少次；
	aA.eq(1).click(function(){
		n++;
		fn1();
	});

	//点击左边
	aA.eq(0).click(function(){
		n--;
		fn1();
	});

	olLi.click(function(){
		n = $(this).index();
		fn1();
	})



	timer = setInterval(go,1600);
	
	function go(){
		n++;
		fn1();
	}
	
	oDiv.hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(go,1600);
	});
	
	
	function fn1(){
		if(n == 0){
			aLi.eq(0).css('position','static');
		}
		if(n == aLi.length-1){
			aLi.eq(aLi.length-1).css('position','static');
		}
		
		if(n == aLi.length){
			aLi.eq(0).css('position','relative');
			aLi.eq(0).css('left',oW * aLi.length);
		}
		if(n > aLi.length){
			aLi.eq(0).css('position','static');
			oUl.css('left','0');
			n = 1;
		}
		if(n == -1){
			aLi.eq(aLi.length-1).css('position','relative');
			aLi.eq(aLi.length-1).css('left', -oW * (aLi.length-1) );
		}
		if(n < -1){
			aLi.eq(aLi.length-1).css('position','static');
			oUl.css('left', -oW * (aLi.length-1) );
			n = aLi.length-2;
		}
		
//		for(var i=0;i<olLi.length;i++){
//			olLi[i].className = '';
//		}
		
		
		/*
			n -1  5   4     5 + -1  4  % 5   4
			n  0  1   0     5 + 0   5  % 5   0
			n  1  2   1     5 + 1   6  % 5   1
			n  2  3   2     
			n  3  4   3
			n  4  5   4
			n  5  0   0
			
			(aLi.length + n) % aLi.length
		*/
		
		
		olLi.eq((aLi.length + n) % aLi.length).addClass('orange').siblings().removeClass('orange');
		
		
		
	//	alert(oUl.style.left)
		
		
		
		move(oUl,500,{
			left : -n * oW
		});
	}
	
});