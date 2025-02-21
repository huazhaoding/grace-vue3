import cache from "@/plugins/cache";
import {
  getConfigValueMap
} from "@/api/system/config";
let sysConfig;
function getSystemConfig(){
  if(!cache.local.getJSON('sysConfig')){
    flushSettingConfig()
  }
 sysConfig=cache.local.getJSON('sysConfig');  
}

export function flushSettingConfig() {
  return getConfigValueMap('sysConfig').then((response) => {
    cache.local.setJSON('sysConfig',response.data);
 })
}

export function getWebConfig() {
  getSystemConfig()
  const webConfig = {
    'title':  sysConfig['sys.common.title']||'止戈内容管理系统',
    'author': sysConfig['sys.common.author']||'止戈',
    'keywords': sysConfig['sys.common.keywords']||'',
    'description':sysConfig['sys.common.description']||'',
    'ico': sysConfig['sys.common.ico']||'',
    'logo' :sysConfig['sys.common.logo']||'',
    'bgImg' : sysConfig['sys.login.back']||'',
    'footer' : sysConfig['sys.common.footer']||'',
    'registerUser' : sysConfig['sys.account.registerUser']||true,
    'captchaEnabled' : sysConfig['sys.account.captchaEnabled']||true
  }
  return webConfig;
}





const loginConfig = {
    'back': 'application/json;charset=UTF-8',
    'notice': 'Bearer ' + localStorage.getItem('token'),
    'keywords': 'Bearer ' + localStorage.getItem('token'),
    'description':'Bearer ' + localStorage.getItem('token'),
    'icon': 'https://avatars.githubusercontent.com/u/26362587?s=200&v=4'
  }

const footerConfig = {
    'back': 'application/json;charset=UTF-8',
    'notice': 'Bearer ' + localStorage.getItem('token'),
    'keywords': 'Bearer ' + localStorage.getItem('token'),
    'description':'Bearer ' + localStorage.getItem('token'),
    'icon': 'https://avatars.githubusercontent.com/u/26362587?s=200&v=4'
  }