const  $tex = $('#tex'),
	$btn = $('#btn'),
	$box = $('#box'),
	$ul = $('ul');
	
	$('#test').html(v());
	var num = null;
	var obj = {};
	
	
	
	//点击的时候看看有没有hash值，如果没有，就设置一个hash值为1，num是从0开始的。
	$btn.click(function(){
		num = 0;
		if(window.location.hash.split('=')[1] == 1){
			createData(1);
		}else{
			window.location.hash = 'page=1';
		}
	});
	
	//点击按钮的时候
	$box.click(function(ev){
		if(ev.target.tagName === 'SPAN'){
			//当点击span的时候，设置hash值，当hash值变化的时候，自动会走，hashchange。
			window.location.hash = 'page='+ $(ev.target).text();
		}
	});
	
	//当hash值改变的时候触发。
	window.onhashchange = function(){
		//获取hash值
		var hash = window.location.hash.split('=')[1];  //page=3
		//计算num
		num = (hash-1)*8;
		createData(hash);
	}
	
