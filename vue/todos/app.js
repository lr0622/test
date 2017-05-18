
var store = {
	save(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}

/*var lis = [
	{
		title:'吃饭',
		isChecked:false
	},
	{
		title:'打豆豆',
		isChecked:true //选中 已完成
	}
	
];*/

var lis = store.fetch('miaov');//所有值
var filter = {//分类
	all:function(list){
		return list;
	},
	finished:function(list){
		return list.filter(function(item){
			return item.isChecked;
		})
	},
	unfinished:function(list){
		return list.filter(function(item){
			return !item.isChecked;
		})
	}
}

var vm = new Vue({//实例化
	el:'.main',//挂载点
	data:{
		list:lis,
		todo:'', //双向数据绑定，获取input的value值
		edtorTodos:'',//记录正在编辑的数据
		beforeTitle:'',//记录正在编辑的数据的title
		visibility:'all'//通过属性值的变化，筛选数据
	},
	watch:{//监控list这个属性，当它发生变化就会执行函数
		/*list:function(){//浅监控
			store.save('miaov',this.list);
		}*/
		list:{//深监控
			handler:function(){
				store.save('miaov',this.list);
			},
			deep:true
		}
	},
	computed:{
		noCheckeLength(){
			return this.list.filter(function(item){
                return !item.isChecked;
            }).length
		},
		filteredList:function(){//过滤数据
			return filter[this.visibility]?filter[this.visibility](this.list):this.list;
		}
	},
	methods:{
		addTodo(){//添加任务 
			//事件处理函数中的this指向当前new的根实例
			this.list.push({
				// title:ev.target.value
				title:this.todo,
				isChecked:false
			});
			this.todo = '';
		},
		deleteTodo(todo){//删除任务
			var index = this.list.indexOf(todo);
			this.list.splice(index,1)
		},
		edtorTodo(todo){//编辑任务
			this.edtorTodos = todo;
			//编辑任务时，记录下这条任务的title，方便取消编辑时重新赋值
			this.beforeTitle = todo.title;
		},
		edtorTodoed(todo){//失焦或按enter确定编辑
			this.edtorTodos = '';//div显示，input隐藏
		},
		cancelTodo(todo){//取消编辑
			todo.title = this.beforeTitle;
			this.edtorTodos = '';
		}
	},
	directives:{
		'foucs':{
			update(el,binding){
				// console.log(el)
				// console.log(binding)  //binding.value=true
				if(binding.value){
					el.focus();
				}
			}
		}
	}
});

function watchHashChange(){
	var hash = window.location.hash.slice(1);
	console.log(hash)
	vm.visibility = hash;
}
watchHashChange();
window.addEventListener('hashchange',watchHashChange)










