<template>
	<div class="user">
		<h2>用户管理</h2>
		<div class="btns">
			<button class="btn btn-sm btn-primary" @click='toAdderUser'>新增</button>
			<button class="btn btn-sm btn-primary">批量删除</button>
		{{ids}}
		</div>
		<!-- 缩略图 -->
		<div class="col-sm-6 col-md-3" v-for="user in users">
			<div class="thumbnail">
				<input class="selectUser" type="checkbox"  :value='user.id' v-model='ids'>
				<button type="button" class="close" @click="_deleteUserById(user.id)"><span aria-hidden="true">&times;</span></button>
				<img class="img-circle" src="http://www.youlanw.com/static/images/man.jpg" alt="图片找不到了" style="width: 150px;height: 150px;"/> 
				<div class="caption">
					<div class="row">
						<div class="col-sm-4 col-sm-offset-2">用户名</div>
						<div class="col-sm-6">{{user.username}}</div>
					</div>
					<div class="row">
						<div class="col-sm-4 col-sm-offset-2">真实姓名</div>
						<div class="col-sm-6">{{user.nickname}}</div>
					</div>
					<div class="row">
						<div class="col-sm-4 col-sm-offset-2">注册时间</div>
						<div class="col-sm-6">{{user.regTime}}</div>
					</div>
					<div class="row">
						<div class="col-sm-4 col-sm-offset-2">email</div>
						<div class="col-sm-6">{{user.email}}</div>
					</div>
					<div class="row">
						<div class="col-sm-4 col-sm-offset-2">状态</div>
						<div class="col-sm-6">
			        		<input type="hidden" value="`+item.id+`">
			        		<div class="switch">
			        			<input type="checkbox"/>
			        		</div>
			        	</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 模态框 -->
		<div class="modal" id="userModal">
			<div class="modal-dialog">
				<div class="modal-content">
					<!-- 模态框头部 -->
					<div class="modal-header text-center">
						<button type="button" class="close" data-dismiss="modal" aria-label='close'><span aria-hidden="true">&times;</span></button>
						<!-- <div class="modal-title">添加用户</div> -->
						<h4 class="modal-title">{{title}}</h4>
					</div>
					<!-- 模态框体部 -->
					<div class="modal-body">
						{{this.user}}
						<form class="form">
							<div class="form-group">
								<label for="username">用户名</label>
								<input id="username" type="text" name="username" class="form-control" v-model="user.name">
							</div>
							<div class="form-group">
								<label for="password1">密码</label>
								<input id="password1" type="password" name="password1" class="form-control"v-model="user.password1">
							</div>
							<div class="form-group">
								<label for="password2">确认密码</label>
								<input id="password2" type="password" name="password2" class="form-control"
								v-model="user.password2">
							</div>
							<div class="form-group">
								<label for="nickname">真实姓名</label>
								<input id="nickname" type="text" name="nickname" class="form-control" v-model="user.nickname">
							</div>
							<div class="form-group">
								<label for="email">邮箱</label>
								<input id="email" type="email" name="email" class="form-control" v-model="user.email">
							</div>
							<div class="form-group">
								<button class="resetBtn" type="reset">重置</button>
							</div>
						</form>
					</div>
					<!-- 模态框底部 -->
					<div class="modal-footer">
						<span class="messageSpan"></span>
						<button type="button" class="btn btn-default btn-sm" data-dismiss="modal">取消</button>
    				<button type="button" class="btn btn-sm btn-primary" @click="_saveOrUpdateUser(user)">保存</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		deleteUserById,
		loadUsers,
		saveOrUpdateUser
	} from '@/http/User'
	export default {
		data(){
			return	{
				title:'',
				ids:[],
				user:{},
				users:[]
			}
		},
		methods:{
			// 通过id删除用户
			_deleteUserById(id){
				deleteUserById(id,{
					success:(msg)=>{
						// 打印信息
						alert(msg);
						// 刷新数据
						loadUsers((data)=>{
							this.users = data;
							console.log("刷新");
						});
					},
					error:function(msg){
						alert(msg);
					}
				});
			},
			// 新增
			toAdderUser(){
				this.title = '添加用户';
				this.user = {};
				$("#userModal").modal("show");
			},
			// 保存
			_saveOrUpdateUser(user){
				// this.user = {};
				//  如果校验通过就是 true  如果校验不通过 false
				let flag = true;
				if(!this.user.name){
					alert("用户名不能为空");
					flag = false;
					return;
				}
				if(!this.user.password1){
					alert("请输入密码");
					flag = false;
					return;
				}
				if(this.user.password1 != this.user.password2){
					alert("两次密码不一致");
					flag = false;
					return;
				}
				if(!this.user.nickname){
					alert("真实姓名不能为空");
					flag = false;
					return;
				}
				if(!this.user.email){
					alert("邮箱不能为空");
					flag = false;
					return;
				}
				saveOrUpdateUser(user,{
						success:(msg)=>{
						// 打印信息
						alert(msg);
						// 刷新数据
						loadUsers((data)=>{
							this.users = data;
							console.log("已更新...");
						});
					},
					error:function(msg){
						alert(msg);
					}
				});
			},
			// 修改
			updateUser(user){
				this.user = user;
				this.title = "修改用户"
				$('#userModal').modal('show');
			}
		},
		// 在生命周期beforeMount加载数据
		beforeMount(){
			loadUsers((data)=>{
				this.users = data;
			});
		}
	}
</script>
<style>
	html {
 		margin: 0 auto;
	} 
	.user{
		width: 90%;
 		margin: 0 auto;
	}
	.btns {
		margin: 1em 0;
	}
	.marginTop{
		margin-top: 10px;
	}
	.thumbnail{
		box-shadow: 3px 3px 10px #ccc;
		font-size: 14px;
		line-height: 30px;
		position: relative;
	}
	.backDiv{
		cursor: pointer;
		float: left;
	}
	.messageSpan{
		color: red;
	}
 	#userModal{
	/*设置背景*/
	background-color: rgba(0,0,0,0.1);
	} 
	.modal-dialog{
		width: 400px;
	}
</style>