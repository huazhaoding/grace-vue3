import request from '@/utils/request'

// 查询内容标签列表
export function listTag(query) {
  return request({
    url: '/cms/tag/list',
    method: 'get',
    params: query
  })
}

// 查询内容标签详细
export function getTag(tagId) {
  return request({
    url: '/cms/tag/' + tagId,
    method: 'get'
  })
}

// 新增内容标签
export function addTag(data) {
  return request({
    url: '/cms/tag',
    method: 'post',
    data: data
  })
}

// 修改内容标签
export function updateTag(data) {
  return request({
    url: '/cms/tag',
    method: 'put',
    data: data
  })
}

// 批量更新标签状态
export function batchVisibleTag(tagIds,visible) {
  return request({
    url: '/cms/tag/batchVisible/'+tagIds+"/"+visible,
    method: 'put'
  })
}

// 批量更新标签排序
export function batchOrderNumTag(tagIds,orderNum) {
  return request({
    url: '/cms/tag/batchOrderNum/'+tagIds+"/"+orderNum,
    method: 'put'
  })
}

// 删除内容标签
export function delTag(tagId) {
  return request({
    url: '/cms/tag/' + tagId,
    method: 'delete'
  })
}
