/**
 * 生产环境
 */
;(function () {
  window.SITE_CONFIG = {};

  if (window.location.hostname == "localhost") { // 本地
    window.SITE_CONFIG['baseUrl'] = "http://localhost:9101/wallet_dy_api";
  } else {
    window.SITE_CONFIG['baseUrl'] = "https://api." + document.domain.split('.').slice(-2).join('.') + "/wallet_dy_api";
  }

  // api接口请求地址
  // window.SITE_CONFIG['baseUrl'] = 'http://123.57.172.18:9101/wallet_dy_api';

  // dy1
  // window.SITE_CONFIG['baseUrl'] = 'https://api.imtoken.taxi/wallet_dy_api';
  // window.SITE_CONFIG['baseUrl'] = 'https://api.imtoken.haus/wallet_dy_api';

  // dy2
  // window.SITE_CONFIG['baseUrl'] = 'https://api.imtoken.faith/wallet_dy_api';

  // cdn地址 = 域名 + 版本号
  window.SITE_CONFIG['domain']  = './'; // 域名
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})();
