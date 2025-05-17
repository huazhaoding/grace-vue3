import request from '@/utils/request'

// 查询分类列表
export function listCategory(query) {
  return request({
    url: '/cms/category/list',
    method: 'get',
    params: query
  })
}
// 查询分类ID列表
export function listCategoryIds(query) {
  return request({
    url: '/cms/category/listCategoryIds',
    method: 'get',
    params: query
  })
}

// 查询分类详细
export function getCategory(categoryId) {
  return request({
    url: '/cms/category/' + categoryId,
    method: 'get'
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

// 新增分类
export function addCategory(data) {
  return request({
    url: '/cms/category',
    method: 'post',
    data: data
  })
}

// 修改分类
export function updateCategory(data) {
  return request({
    url: '/cms/category',
    method: 'put',
    data: data
  })
}


// 删除分类
export function delCategory(categoryId) {
  return request({
    url: '/cms/category/' + categoryId,
    method: 'delete'
  })
}

//移除分类关联主题
export function removeCategoryTheme(themeName,categoryIds) {
  return request({
    url: '/cms/category/removeCategoryTheme/'+themeName+"/"+categoryIds,
    method: 'delete'
  })
}

//添加分类关联主题
export function addCategoryTheme(themeName,categoryIds) {
  return request({
    url: '/cms/category/addCategoryTheme/'+themeName+"/"+categoryIds,
    method: 'post'
  })
}

// 查询分类详细
export function listCategoryTheme(categoryId) {
  return request({
    url: '/cms/category/listCategoryTheme/' + categoryId,
    method: 'get'
  })
}

// 查询分类详细
export function listCategoryByArticleId(articleId,data) {
  return request({
    url: '/cms/category/listCategoryByArticleId/' + articleId,
    method: 'get',
    data: data
  })
}
