window.onload = function(){
	/*
	1.拿数据渲染页面
	2.左侧li跳转list
	 */
	var oLeft = document.getElementsByClassName('left')[0];
	var oUl = oLeft.children[1];
	var aLi_left = oUl.children;
	var oRight = document.getElementsByClassName('right')[0];
	var oImg = oRight.children[0].children[0];//分类标题
	var oInfo = document.getElementsByClassName('info')[0];//招聘信息
	
	var search = location.search?location.search.split('=')[1]:'sh';
	var hash = location.hash?location.hash.split('=')[1]:'1';
	var data = aData[search].text[hash];

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
		if(d.lx == search){			
			oLi.className = 'focus';
		}
	}
	

	oImg.src = aData[search].img;
	
	var str = '';
	str = '<h2>'+data.zw+'</h2>'+
        '<div>'+
          '<span class="l">招聘公司：'+data.gs+'查看公司地理位置>></span>'+
          '<span>公司性质'+data.xz+'</span>'+
          '<span class="l">职位性质：'+data.gz+'</span>'+
          '<span>工作地点：'+data.dd+'</span>'+
          '<span class="l">工作经验：'+data.jy+'</span>'+
          '<span>学历要求：'+data.xl+'</span>'+
          '<span class="l">招聘人数：'+data.rs+'</span>'+
          '<span>薪资待遇：'+data.dy+'</span>'+
          '<span class="l">发布日期：'+aData.date(data.sj,1)+'</span>'+
          '<span>招聘类型：'+data.lx+'</span>'+
        '</div>'+        
       ' <div class="clear"></div>';
    for(var i=0;i<data.info.length;i++){
    	str +='<dl>'+
    	'<dt>'+data.info[i].t+'</dt>';
    	for(var j=0;j<data.info[i].l.length;j++){
    		str += '<dd>'+data.info[i].l[j]+'</dd>';
    	}
    	str +='</dl>';
    }
    str +='<p>有意者请投简历至 '+aData.email+'</p>';
    oInfo.innerHTML = str;
        

	

	
}






















