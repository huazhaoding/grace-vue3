import request from '@/utils/request'

// 查询分类列表
export function listCat(query) {
  return request({
    url: '/cms/category/list',
    method: 'get',
    params: query
  })
}

// 查询分类详细
export function getCat(catId) {
  return request({
    url: '/cms/category/' + catId,
    method: 'get'
  })
}

// 新增分类
export function addCat(data) {
  return request({
    url: '/cms/category',
    method: 'post',
    data: data
  })
}

// 修改分类
export function updateCat(data) {
  return request({
    url: '/cms/category',
    method: 'put',
    data: data
  })
}


// 删除分类
export function delCat(catId) {
  return request({
    url: '/cms/category/' + catId,
    method: 'delete'
  })
}
