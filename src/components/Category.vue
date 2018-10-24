<template>
	<div class="category">
		<h2>栏目管理</h2>
		<div class="btns">
			<button class="btn btn-sm btn-primary" @click="toAdderCategory">新增</button>
			<button class="btn btn-sm btn-primary">批量删除</button>
			{{this.ids}}
		</div>
		<table class="table table-bordered table-hover text-center">
			<thead>
				<tr>
					<th class="col-sm-1 text-center">编号</th>
					<th class="col-sm-3 text-center">名称</th>
					<th class="col-sm-3 text-center">父栏目</th>
					<th class="col-sm-3 text-center">描述</th>
					<th class="col-sm-2 text-center">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="category in categories">
					<td>
						<input type="checkbox" :value="category.id" v-model="ids">
					</td>
					<td>{{category.name}}</td>
					<td>{{category.parent.name}}</td>
					<td>{{category.comment}}</td>
					<td>
						<button class="bt btn-sm btn-primary">修改</button>
						<button class="bt btn-sm btn-danger">删除</button>
					</td>
				</tr>
			</tbody>
		</table>
		<!-- 模态框 -->
		<div class="modal" id="categoryModal">
			<div class="modal-dialog">
				<div class="modal-content">
					<!-- 模态框头部 -->
					<div class="modal-header text-center">
						<button type="button" class="close" data-dismiss="modal" aria-label='close'><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title">{{title}}</h4>
					</div>
					<!-- 模态框体部 -->
					<div class="modal-body">
						{{this.category}}
						<form class="form">
							<div class="form-group">
								<label for="categoryname">栏目名称</label>
								<input type="text" name="categoryname" class="form-control" v-model="category.name">
							</div>
							<div class="form-group">
								<label for="parentname">父栏目</label>
								<select name="" id=""></select>
							</div>
							<div class="form-group">
								<label for="comment">描述</label>
								<input type="text" name="comment" class="form-control" v-model="category.comment">
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
    				<button type="button" class="btn btn-sm btn-primary" @click="_saveOrUpdateCategory(category)">保存</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		loadCategorys,
		saveOrUpdateCategory
	} from '@/http/Category'
	export default {
		data() {
			return {
				title:'',
				ids:[],
				category:{},
				categories:[]
			}
		},
		methods:{
			// 删除
			// 新增
			toAdderCategory(){
				this.title = '添加栏目';
				this.category = {};
				$("#categoryModal").modal("show");
			},
			_saveOrUpdateCategory(data){
				saveOrUpdateCategory(category,{
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
			}
		},
		// 在生命周期beforeMount加载数据
		beforeMount(){
			loadCategorys((data)=>{
				this.categories = data;
			});
		}
	}
</script>
<style>
	.category{
		width: 90%;
		margin: 0 auto;
	}
	.btns{
		margin: 5px 0;
	}
</style>