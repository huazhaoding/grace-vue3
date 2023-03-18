import request from '@/utils/request'

// 查询参数列表
export function listConfig(query) {
  return request({
    url: '/system/config/list',
    method: 'get',
    params: query
  })
}

// 查询参数详细
export function getConfig(configId) {
  return request({
    url: '/system/config/' + configId,
    method: 'get'
  })
}

// 根据分组名+key查询配置value
export function getConfigValue(configGroup, configKey) {
  return request({
    url: '/system/config/getConfigValue/' + configGroup + '/' + configKey,
    method: 'get'
  })
}

// 获取配置组
export function getConfigGroups() {
  return request({
    url: '/system/config/getConfigGroups',
    method: 'get'
  })
}

// 根据配置组查询配置Map
export function getConfigMap(configGroup) {
  return request({
    url: '/system/config/getConfigMap/' + configGroup,
    method: 'get'
  })
}

// 根据配置组查询配置valueMap
export function getConfigValueMap(configGroup) {
  return request({
    url: '/system/config/getConfigValueMap/' + configGroup,
    method: 'get'
  })
}

// 新增参数配置
export function addConfig(data) {
  return request({
    url: '/system/config',
    method: 'post',
    data: data
  })
}

// 修改参数配置
export function updateConfig(data) {
  return request({
    url: '/system/config',
    method: 'put',
    data: data
  })
}

// 删除参数配置
export function delConfig(configId) {
  return request({
    url: '/system/config/' + configId,
    method: 'delete'
  })
}

// 刷新参数缓存
export function refreshCache() {
  return request({
    url: '/system/config/refreshCache',
    method: 'delete'
  })
}
