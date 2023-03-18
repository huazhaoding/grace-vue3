import request from '@/utils/request'

// 查询部门列表 可以按需要转换为树
export function selectOptions(query) {
    return request({
      url: '/system/setting/selectOptions',
      method: 'get',
      params: query
    })
  }

  // 更新配置
export function updateConfig(data) {
  return request({
    url: '/system/setting/updateConfig',
    method: 'post',
    data: data
  })
}


