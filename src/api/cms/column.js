import request from '@/utils/request'

// 查询内容菜单列表
export function listColumn(query) {
  return request({
    url: '/cms/column/list',
    method: 'get',
    params: query
  })
}

// 查询内容菜单详细
export function getColumn(columnId) {
  return request({
    url: '/cms/column/' + columnId,
    method: 'get'
  })
}

// 新增内容菜单
export function addColumn(data) {
  return request({
    url: '/cms/column',
    method: 'post',
    data: data
  })
}

// 修改内容菜单
export function updateColumn(data) {
  return request({
    url: '/cms/column',
    method: 'put',
    data: data
  })
}

// 删除内容菜单
export function delColumn(columnId) {
  return request({
    url: '/cms/column/' + columnId,
    method: 'delete'
  })
}
