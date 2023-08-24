import request from '@/utils/request'

// 查询分类列表
export function listCategory(query) {
  return request({
    url: '/cms/category/list',
    method: 'get',
    params: query
  })
}

// 查询分类详细
export function getCategory(categoryId) {
  return request({
    url: '/cms/category/' + categoryId,
    method: 'get'
  })
}

// 新增分类
export function addCategory(data) {
  return request({
    url: '/cms/category',
    method: 'post',
    data: data
  })
}

// 修改分类
export function updateCategory(data) {
  return request({
    url: '/cms/category',
    method: 'put',
    data: data
  })
}


// 删除分类
export function delCategory(categoryId) {
  return request({
    url: '/cms/category/' + categoryId,
    method: 'delete'
  })
}
