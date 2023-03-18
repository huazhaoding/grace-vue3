import request from '@/utils/request'

// 更新配置
export function updateConfig(data) {
    return request({
      url: '/cms/setting/updateConfig',
      method: 'post',
      data: data
    })
  }