import request from '@/utils/request'

// 查询资源数据映射列表
export function listHold(query) {
  return request({
    url: '/system/hold/list',
    method: 'get',
    params: query
  })
}

// 查询资源数据映射详细
export function getHold(holdCode) {
  return request({
    url: '/system/hold/' + holdCode,
    method: 'get'
  })
}

// 新增资源数据映射
export function addHold(hold) {
  return request({
    url: '/system/hold',
    method: 'post',
    data: hold
  })
}

// 修改资源数据映射
export function updateHold(hold) {
  return request({
    url: '/system/hold',
    method: 'put',
    data: hold
  })
}

// 删除资源数据映射
export function delHold(holdCode) {
  return request({
    url: '/system/hold/' + holdCode,
    method: 'delete'
  })
}
