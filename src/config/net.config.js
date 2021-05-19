const network = {
    // baseURL: 'http://192.168.1.197:16888',
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    // baseURL: 'http://127.0.0.1:16888',
    // 配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
    contentType: 'application/json;charset=UTF-8',
    // 消息框消失时间
    messageDuration: 3000,
    // 最长请求时间
    requestTimeout: 5000,
    // 操作正常code，支持String、Array、int多种类型
    successCode: [200, 0, 1],
    // 登录失效code
    invalidCode: 402,
    // 无权限code
    noPermissionCode: 401,
  }
  module.exports = network