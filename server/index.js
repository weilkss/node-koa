const router = require('koa-router')();
const fetch = require('node-fetch');
const WXBizDataCrypt = require('./WXBizDataCrypt');
router.prefix('/api');

const getSessionkey = code => {
  console.log('code', code);
  return new Promise((resolve, reject) => {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=wx8b4e8a7f1d1e7192&secret=bee9aa87ae69eabe81b543d06d292254&js_code=${code}&grant_type=authorization_code`;
    fetch(url, {
      method: 'get'
    }).then(res => {
      console.log('res', res);
      resolve(res);
    });
  });
};

const getWXData = async data => {
  let pc = new WXBizDataCrypt('wx82ea21f4e06bd07e', data.session_key);
  let phoneData = await pc.decryptData(data.encryptedData, data.iv);
  return phoneData;
};

router.get('/test', async ctx => {
  ctx.body = 'test 111';
});

/** 获取openId */
router.get('/login/code2Session', async ctx => {
  await getSessionkey(ctx.query.code).then(result => {
    ctx.body = {
      code: 200,
      data:result,
      // data: {
      //   session_key: JSON.parse(result).session_key,
      //   openId: JSON.parse(result).openid
      // },
      msg: '成功'
    };
  });
});

/**
 * 授权手机号登录
 * 微信小程序 手机号解密
 */
router.get('/login/getPhoneNumber', async ctx => {
  let phoneData = await getWXData({ session_key: ctx.query.session_key, encryptedData: ctx.query.encryptedData, iv: ctx.query.iv });
  ctx.body = {
    code: 200,
    data: phoneData,
    msg: '成功'
  };
});

module.exports = router;
