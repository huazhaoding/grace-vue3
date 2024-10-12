import request from '@/utils/request'

// 查询邮件列表
export function listMail(query) {
  return request({
    url: '/server/mail/list',
    method: 'get',
    params: query
  })
}

// 查询邮件详细
export function getMail(mailId) {
  return request({
    url: '/server/mail/' + mailId,
    method: 'get'
  })
}

// 新增邮件
export function addMail(data) {
  return request({
    url: '/server/mail',
    method: 'post',
    data: data
  })
}

// 修改邮件
export function updateMail(data) {
  return request({
    url: '/server/mail',
    method: 'put',
    data: data
  })
}

// 停止定时任务邮件
export function stopOnTimeMail(mailId) {
  return request({
    url: '/server/mail/stopOnTimeMail/'+mailId,
    method: 'put'
  })
}

// 发送邮件
export function sendMail(data) {
  return request({
    url: '/server/mail/send',
    method: 'post',
    data: data
  })
}

// 删除邮件
export function delMail(mailId) {
  return request({
    url: '/server/mail/' + mailId,
    method: 'delete'
  })
}

// 更新配置
export function updateConfig(data) {
  return request({
    url: '/server/mail/updateConfig',
    method: 'post',
    data: data
  })
}
