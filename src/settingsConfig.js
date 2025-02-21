import {
  getConfigValueMap
} from "@/api/system/config";
import { getCurrentInstance } from "vue"
const proxy=getCurrentInstance()
let sysConfig;
function initSystemConfig(){
  if(!proxy.$cache.local.get('sysConfig'))
  return getConfigValueMap('sysConfig').then((response) => {
     proxy.$cache.setJSON('sysConfig',response.data);
  })
 sysConfig=proxy.$cache.getJSON('sysConfig');  
}

function getSettingConfig(params) {
  
}

function flushSettingConfig(params) {
  return getConfigValueMap('sysConfig').then((response) => {
  return  response.data
 })
}

function getWebConfig(params) {
  initSystemConfig()
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