const userService = require('./../model/userDao.js');

let getUserContent = users => {}
let getUserinfo = async ctx => {
  let query = ctx.query;
  let userId = query.id;
  let users = await userService.getUserByIdModel(userId);
  let reaponseContent = '';
  let sex = users[0].sex === 0 ? '男' : '女';
  reaponseContent += '姓名：' + users[0].name + ' |';
  reaponseContent += '年龄：' + users[0].age + ' |';
  reaponseContent += '性别：' + sex + ' |';
  reaponseContent += '插入时间：' + users[0].create_time;
  reaponseContent += '<br />';
  
  let html = '<html><body><div> userinfo: ' + reaponseContent + '</div></body></html>';
  ctx.response.type = 'text/html';
  ctx.response.body = html;
};

let saveUserinfo = (ctx, next) => {
  const requestString = ctx.data;
  //TODO数据处理
  Console.log(requestString);
};

module.exports = {
  'GET /main': getUserinfo,
  'POST /saveUserinfo': saveUserinfo
};