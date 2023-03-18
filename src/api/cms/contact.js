import request from '@/utils/request'

// 查询反馈|建议列表
export function listContact(query) {
  return request({
    url: '/cms/contact/list',
    method: 'get',
    params: query
  })
}

// 查询反馈|建议详细
export function getContact(contactId) {
  return request({
    url: '/cms/contact/' + contactId,
    method: 'get'
  })
}

// 新增反馈|建议
export function addContact(data) {
  return request({
    url: '/cms/contact',
    method: 'post',
    data: data
  })
}

// 修改反馈|建议
export function updateContact(data) {
  return request({
    url: '/cms/contact',
    method: 'put',
    data: data
  })
}

// 删除反馈|建议
export function delContact(contactId) {
  return request({
    url: '/cms/contact/' + contactId,
    method: 'delete'
  })
}
