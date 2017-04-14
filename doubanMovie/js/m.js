function createData(hash){//拿到数据
	var Storage = sessionStorage.getItem($tex.val());
	obj = JSON.parse(Storage) || {};
	obj[$tex.val()] = obj[$tex.val()] || {};
	if(Storage && obj[hash]){
		var html = template('test',obj[hash]);
//		console.log(html);
		$box.html(html);
	}else{
		$.ajax({
			url:'https://api.douban.com/v2/movie/search?callback=?',
			dataType:'jsonp',
			data:{
				q:$tex.val(),
				start:num,//起始位置 0:0-7,1:8-15...  
				count:8//一次给8条数据
			},
			success:function(data){
				//找到总数据能够生成多少页。
				data.len = Math.ceil(data.total / data.count);
				//记录当前点击的页码
				data.active = window.location.hash.split('=')[1];
				//金刚狼下添加一个id等于对象
				obj[hash] = {
					subjects:data.subjects,
					len:data.len,
					total:data.total,
					title:data.title,
					active:data.active
				} 
				//把存好的数据放到sessionStorage下，以便下次使用。
				sessionStorage.setItem($tex.val(),JSON.stringify(obj));
				//$('#test').html(v());
				var html = template('test',data);
				$box.html(html);
			}
		});
	}
};