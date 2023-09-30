import request from '@/utils/request'

// 查询文章列表
export function listArticle(query) {
  return request({
    url: '/cms/article/list',
    method: 'get',
    params: query
  })
}

// 查询分类树
export function categoryTree(query) {
  return request({
    url: '/cms/article/categoryTree',
    method: 'get',
    params: query
  })
}

// 查询文章详细
export function getArticle(articleId) {
  return request({
    url: '/cms/article/' + articleId,
    method: 'get'
  })
}

// 新增文章
export function addArticle(data) {
  return request({
    url: '/cms/article',
    method: 'post',
    data: data
  })
}

// 修改文章
export function updateArticle(data) {
  return request({
    url: '/cms/article',
    method: 'put',
    data: data
  })
}

// 删除文章
export function delArticle(articleId) {
  return request({
    url: '/cms/article/' + articleId,
    method: 'delete'
  })
}


// 批量修改状态
export function batchArticleVisible(articleIds,visible) {
  return request({
    url: '/cms/article/batchArticleVisible/'+articleIds+"/"+visible,
    method: 'put'
  })
}

// 批量修改顶置
export function batchArticleTop(articleIds,articleTop){
  return request({
    url: '/cms/article/batchArticleTop/'+articleIds+"/"+articleTop,
    method: 'put'
  })
}


// 批量修改标签
export function batchArticleTag(articleIds,tagIds) {
  return request({
    url: '/cms/article/batchArticleTag/'+articleIds+"/"+tagIds,
    method: 'put'
  })
}

// 批量修改分类
export function batchArticleCategory(articleIds,categoryIds) {
  return request({
    url: '/cms/article/batchArticleCategory/'+articleIds+"/"+categoryIds,
    method: 'put'
  })
}



