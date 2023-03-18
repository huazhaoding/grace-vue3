import request from '@/utils/request'

// 查询友情链接列表
export function listLink(query) {
  return request({
    url: '/cms/link/list',
    method: 'get',
    params: query
  })
}

// 查询友情链接列表
export function listLinkGroupNames() {
  return request({
    url: '/cms/link/listLinkGroupNames',
    method: 'get'
  })
}

// 查询友情链接详细
export function getLink(linkId) {
  return request({
    url: '/cms/link/' + linkId,
    method: 'get'
  })
}

// 新增友情链接
export function addLink(data) {
  return request({
    url: '/cms/link',
    method: 'post',
    data: data
  })
}

// 修改友情链接
export function updateLink(data) {
  return request({
    url: '/cms/link',
    method: 'put',
    data: data
  })
}

// 批量修改友情链接状态
export function updateLinkVisible(visible,ids) {
  return request({
    url: '/cms/link/visible/'+visible+"/"+ids,
    method: 'put'
  })
}

// 批量修改友情链接打开方式
export function updateLinkOpenType(openType,ids) {
  return request({
    url: '/cms/link/openType/'+openType+"/"+ids,
    method: 'put'
  })
}

// 删除友情链接
export function delLink(linkId) {
  return request({
    url: '/cms/link/' + linkId,
    method: 'delete'
  })
}
