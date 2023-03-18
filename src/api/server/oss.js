import request from '@/utils/request'

// 查询文件存储列表
export function listOss(query) {
  return request({
    url: '/server/oss/list',
    method: 'get',
    params: query
  })
}

// 查询文件存储详细
export function getOss(id) {
  return request({
    url: '/server/oss/' + id,
    method: 'get'
  })
}

// 更新配置
export function updateConfig(data) {
  return request({
    url: '/server/oss/updateConfig',
    method: 'post',
    data: data
  })
}

// 删除文件存储
export function delOss(ids) {
  return request({
    url: '/server/oss/' + ids,
    method: 'delete'
  })
}
