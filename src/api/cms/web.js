import request from '@/utils/request'

// 查询站点列表
export function listWeb(query) {
  return request({
    url: '/cms/web/list',
    method: 'get',
    params: query
  })
}

// 查询站点详细
export function getWeb(webName) {
  return request({
    url: '/cms/web/' + webName,
    method: 'get'
  })
}

// 新增站点
export function addWeb(data) {
  return request({
    url: '/cms/web',
    method: 'post',
    data: data
  })
}

// 修改站点
export function updateWeb(data) {
  return request({
    url: '/cms/web',
    method: 'put',
    data: data
  })
}

// 删除站点
export function delWeb(webName) {
  return request({
    url: '/cms/web/' + webName,
    method: 'delete'
  })
}
