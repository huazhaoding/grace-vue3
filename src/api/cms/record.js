import request from '@/utils/request'

// 查询文章列表
export function listArticleCount(query) {
  return request({
    url: '/cms/articleCount/article',
    method: 'get',
    params: query
  })
}

// 查询文章浏览记录
export function listArticleLook(query) {
  return request({
    url: '/cms/articleCount/look',
    method: 'get',
    params: query
  })
}

// 查询文章点赞记录
export function listArticleLike(query) {
  return request({
    url: '/cms/articleCount/like',
    method: 'get',
    params: query
  })
}

// 查询文章踩记录
export function listArticleNasty(query) {
  return request({
    url: '/cms/articleCount/nasty',
    method: 'get',
    params: query
  })
}

// 查询文章收藏记录
export function listArticleCollect(query) {
  return request({
    url: '/cms/articleCount/collect',
    method: 'get',
    params: query
  })
}

// 查询文章分享记录
export function listArticleShare(query) {
  return request({
    url: '/cms/articleCount/share',
    method: 'get',
    params: query
  })
}

// 查询文章评分记录
export function listArticleScore(query) {
  return request({
    url: '/cms/articleCount/score',
    method: 'get',
    params: query
  })
}