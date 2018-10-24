// 导入配置文件，获取数据传输的地址
import {baseUrl} from '@/config/baseUrl'
// 加载数据
export function loadCategorys(successHandler){
	$.get(baseUrl+'/manager/category/findAllCategory',({status,data})=>{
		if(status == 200){
			successHandler(data);
		}else{
			alert('加载失败');
		}
	})
}
// 保存
export function saveOrUpdateCategory(category,{success,error}){
	var obj ={
		name:category.name,
		comment:category.comment
	}
	$.post(baseUrl+'/manager/user/saveOrUpdateCategory',obj,({status,message})=>{
		if(status == 200){
			$('.close').trigger('click');
			success('添加成功');
		} else{
			error('添加异常');
		}
	})
}