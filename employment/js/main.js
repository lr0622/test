window.onload = function(){
	/*
	1.渲染页面
		a:拿到数据，search，hash，aData，第一次打开时的默认值
		b:根据数据显示页面，计算页码
		
	2.左边校园和社会切换
		设置search
	3.右边
		上边  跳转到content
			a.跳转地址，社会还是校园，第几个数据
		下边页码，上一页，下一页，目标页
			显示上边对应内容
			目标页：a.设置hash   onhashchange,显示对应内容
			上一页，下一页：a.当前hash加减1
	 */
	var oLeft = document.getElementsByClassName('left')[0];
	var oUl = oLeft.children[1];
	var aLi_left = oUl.children;
	var oRight = document.getElementsByClassName('right')[0];
	var oImg = oRight.children[0].children[0];//分类标题
	var oInfo = document.getElementsByClassName('info')[0];//招聘信息
	var oPage = document.getElementsByClassName('pages')[0];
	var oPages = oPage.children[2];//页数
	var oPrev = oPage.children[0];
	var oNext = oPage.children[1];	
	var aPage = oPages.children;//所有页
	var search = location.search?location.search.split('=')[1]:'sh';
	var hash = location.hash?location.hash.split('=')[1]:'1';
	var data = aData[search];
	var aYq = document.getElementsByClassName('yq');
	var start = 0;
	var n = 2;
	var num = Math.ceil(data.text.length/n);
	//var hash2 = data.text.length;
	//console.log(hash)
	if (hash<1) {
		hash=1
	}
//	console.log(aData.search.text.length)
	if (hash>num){
		hash=num;
	}
//	生成左边类型
	for(var i=0;i<aData.list.length;i++){
		fnLeft(aData.list[i]);
	}
	
	function fnLeft(d){		
		var oLi = document.createElement('li');
		oUl.appendChild(oLi);
		var oA = document.createElement('a');
		oA.href = 'list.html?search='+d.lx;
		oA.innerHTML = d.text;
		oLi.appendChild(oA);		
		if(d.lx == search){	//点击oA,对应oLi改变		
			oLi.className = 'focus';
			location.hash = 'page='+hash;
			location.search = 'search='+d.lx;
		}
	}
	
//计算页数
	for(var i=0;i<num;i++){
		page(i);
	}
	function page(i){
		var oSpan = document.createElement('span');
		oPages.appendChild(oSpan);
		
		var oA = document.createElement('a');
		oA.href = 'javascript:;';
		oA.innerHTML = i+1;
		oSpan.appendChild(oA);
		oSpan.onclick = function(){
			hash = i+1;
			location.hash = 'page='+hash;
		}
	}
		
	oPrev.onclick = function(){
		hash--;	
		if(hash < 1){
			hash = 1;
		}
		location.hash = 'page='+hash;
	}
	oNext.onclick = function(){
		hash++;	
		if(hash>num){
			hash = num;
		}
		location.hash = 'page='+hash;
	}
	
	aPage[hash-1].className = 'focus';
	window.onhashchange = function(){	
		oInfo.innerHTML = '';
		for(var i=0;i<aPage.length;i++){
			aPage[i].className = '';
		}
		aPage[hash-1].className = 'focus';
		for(var i=0;i<n;i++){
			start = (hash-1)*n+i;
			fn(data.text[start]);
			
		}
	}
//右边	
	for(var i=0;i<n;i++){
		oImg.src = data.img;
		start = i;
		fn(data.text[i]);
	}	
	function fn(d){
		if(!d){
			return;
		}
		var oZp = document.createElement('p');
		oZp.className = 'zp';
		oInfo.appendChild(oZp);
		
		var oPost = document.createElement('span');//职位
		oZp.appendChild(oPost);
		var oA1 = document.createElement('a');
//		oA1.href = 'javascript:;';
		oA1.href = 'content.html?'+'search='+search+'#n='+start;
		
		oA1.innerHTML = '★ 职位需求：'+d.zw;
		oPost.appendChild(oA1);
		
		var oPerson = document.createElement('span');//人数
		oPerson.innerHTML = '需求人数：'+d.rs+'名';
		oZp.appendChild(oPerson);
		
		var oDate = document.createElement('span');
//		oDate.innerHTML = d.sj[0]+'年'+d.sj[1]+'月'+d.sj[2]+'日';
		oDate.innerHTML = aData.date(d.sj);
		oDate.className = 'date';
		oZp.appendChild(oDate);
		
		var oYq = document.createElement('p');//要求
		var val = d.info[0].l.join('');
		if(val.length>100){
			var val2 = val.slice(0,100);
		}
//		oYq.innerHTML = val2 + '··· [<a href = "javascript:;">查看详情</a>]';
		oYq.innerHTML = val2 + '··· [<a href = "content.html?'+'search='+search+'#n='+start+'">查看详情</a>]';
		
		oYq.className = 'yq';
		oInfo.appendChild(oYq);		
	}

	
}






















