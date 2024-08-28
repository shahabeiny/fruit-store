import parser from 'ua-parser-js';
import { Request, Response } from 'express';

class CommonService {
  getAgentInfo(userAgent:string) {
    let { os, browser } = parser(userAgent);

    return {
      os: os?.name?.toLowerCase() ?? '',
      browser: browser.name?.toLowerCase() ?? '',
      versionOs: os.version ?? '',
      versionBrowser: browser.version ?? ''
    };
  }

  getIPUser(req:Request) {
    return req.header('x-forwarded-for');
  }

  slug(titleStr:string) {
    titleStr = titleStr.replace(/^\s+|\s+$/g, '');
    titleStr = titleStr.toLowerCase();
    titleStr = titleStr
      .replace(/[^a-z0-9_\s-ءاأإآؤئبتثجحخدذرزسشصضطظعغفقكلمنهويةى]#u/, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    return titleStr;
  }
}

export default new CommonService();