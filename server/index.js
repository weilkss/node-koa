const router = require('koa-router')();
const fetch = require('node-fetch');
const WXBizDataCrypt = require('./WXBizDataCrypt');
router.prefix('/api');

const getSessionkey = code => {
  return new Promise((resolve, reject) => {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=wx82ea21f4e06bd07e&secret=b6d1eedd4de36a7e96b316a29b1d4f16&js_code=${code}&grant_type=authorization_code`;
    fetch.get(url, (error, response, data) => {
      if (error) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getWXData = async data => {
  let pc = new WXBizDataCrypt('wx82ea21f4e06bd07e', data.session_key);
  let phoneData = await pc.decryptData(data.encryptedData, data.iv);
  return phoneData;
};

router.get('/test', async ctx => {
  ctx.body = 'test';
});

/** 获取openId */
router.get('/login/code2Session', async ctx => {
  await getSessionkey(ctx.query.code).then(result => {
    ctx.body = {
      code: 200,
      data: {
        session_key: JSON.parse(result).session_key,
        openId: JSON.parse(result).openid
      },
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
