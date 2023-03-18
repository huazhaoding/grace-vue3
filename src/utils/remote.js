
import request from '@/utils/request'
/**
 * @param {string} url
 * @param {*} query  
 */
export function remote(url,query){
    return request({
        url: url,
        method: 'get',
        params: query
      });
}