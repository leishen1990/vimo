/**
 * Created by Hsiang on 2017/2/9.
 *
 * @name Config类
 * @description
 *
 * Config初始化的实例能配置整个App, 也能根据使用的平台单独配置而互不影响.
 * 另外, 配置信息也能自定义
 *
 * 通过get/getBoolean/getNumber/set/settings方法设置当前平台的config
 *
 * 只有获取过的配置key会缓存到_c中, 清除_c缓冲可以使用:
 * settings({...})设置用户自定义配置
 *
 * config实例化后为单例对象,挂载点为: window.VM.config中
 *
 * Config的初始化不对外公开, 而是由setupConfig()函数执行Config的初始化
 *
 *
 *
 * Config使用的代码如下:
 * 初始化需要有平台信息, 故以下代码是依赖执行的.
 * @example
 *
 * import { providePlatformConfigs } from './platform/platform-registry'
 * import { setupPlatform } from './platform/platform'
 * import { setupConfig } from './config/config'
 * import { registerModeConfigs } from './config/mode-registry'
 * let platformConfigs = providePlatformConfigs();
 * // 初始化平台
 * let platform = setupPlatform(platformConfigs);
 * // config初始化
 * let config = setupConfig({},platform);
 * // 注册ios/md/wp三个平台的默认配置
 * registerModeConfigs(config)
 *
 *
 * 这里需要注意, 如果用户自定义对platform进行设置, 比如自定义在ios下tabsPlacement的值为top
 * 则需要这样写:
 * let config = setupConfig({
 *          tabsPlacement: 'bottom',
 *          platforms: {
 *              ios: {
 *                  tabsPlacement: 'top',
 *              }
 *          }
 * },platform);
 *
 *
 * 也可以在url中传入配置参数, 通过url配置App的前后缀, 例如htttp://xx.xx.com?vmMode=ios
 * 则配置mode将为ios, 改变mode并无法改变真实的mode环境, 因为平台验证有自己的isMatch方法, 切记!!
 *
 * 此配置将是最高优先级的配置(url获取配置信息 > 用户自定义配置 > 平台默认配置)
 * 因此这个方法将可以用于PC端测试
 *
 * 可通过set方法添加自定义的配置信息
 * config.set('ios', 'favoriteColor', 'green');
 * config.get('favoriteColor'); // 'green' when iOS
 *
 *
 *
 * | Config Property          | Type                | Details         |
 * | `activator`              | `string`            | Used for buttons, changes the effect of pressing on a button. Available options: `"ripple"`, `"highlight"`.                                      |
 * | `actionSheetEnter`       | `string`            | The name of the transition to use while an action sheet is presented.                                                                            |
 * | `actionSheetLeave`       | `string`            | The name of the transition to use while an action sheet is dismissed.                                                                            |
 * | `alertEnter`             | `string`            | The name of the transition to use while an alert is presented.                                                                                   |
 * | `alertLeave`             | `string`            | The name of the transition to use while an alert is dismissed.                                                                                   |
 * | `backButtonText`         | `string`            | The text to display by the back button icon in the navbar.                                                                                       |
 * | `backButtonIcon`         | `string`            | The icon to use as the back button icon.                                                                                                         |
 * | `iconMode`               | `string`            | The mode to use for all icons throughout the application. Available options: `"ios"`, `"md"`                                                     |
 * | `locationStrategy`       | `string`            | Set to 'path' to remove hashbangs when using Deeplinking.                                                                                        |
 * | `loadingEnter`           | `string`            | The name of the transition to use while a loading indicator is presented.                                                                        |
 * | `loadingLeave`           | `string`            | The name of the transition to use while a loading indicator is dismissed.                                                                        |
 * | `menuType`               | `string`            | Type of menu to display. Available options: `"overlay"`, `"reveal"`, `"push"`.                                                                   |
 * | `modalEnter`             | `string`            | The name of the transition to use while a modal is presented.                                                                                    |
 * | `modalLeave`             | `string`            | The name of the transition to use while a modal is dismiss.                                                                                      |
 * | `mode`                   | `string`            | The mode to use throughout the application.                                                                                                      |
 * | `pageTransition`         | `string`            | The name of the transition to use while changing pages.                                                                                          |
 * | `pickerEnter`            | `string`            | The name of the transition to use while a picker is presented.                                                                                   |
 * | `pickerLeave`            | `string`            | The name of the transition to use while a picker is dismissed.                                                                                   |
 * | `popoverEnter`           | `string`            | The name of the transition to use while a popover is presented.                                                                                  |
 * | `popoverLeave`           | `string`            | The name of the transition to use while a popover is dismissed.                                                                                  |
 * | `spinner`                | `string`            | The default spinner to use when a name is not defined.                                                                                           |
 * | `swipeBackEnabled`       | `boolean`           | Whether native iOS swipe to go back functionality is enabled.                                                                                    |
 * | `tabsHighlight`          | `boolean`           | Whether to show a highlight line under the tab when it is selected.                                                                              |
 * | `tabsLayout`             | `string`            | The layout to use for all tabs. Available options: `"icon-top"`, `"icon-left"`, `"icon-right"`, `"icon-bottom"`, `"icon-hide"`, `"title-hide"`.  |
 * | `tabsPlacement`          | `string`            | The position of the tabs relative to the content. Available options: `"top"`, `"bottom"`                                                         |
 * | `tabsHideOnSubPages`     | `boolean`           | Whether to hide the tabs on child pages or not. If `true` it will not show the tabs on child pages.                                              |
 * | `toastEnter`             | `string`            | The name of the transition to use while a toast is presented.                                                                                    |
 * | `toastLeave`             | `string`            | The name of the transition to use while a toast is dismissed.                                                                                    |
 *
 **/

import { Platform } from '../platform/platform';
import { isObject, isDefined, isFunction, isArray } from '../util/util';
import { registerModeConfigs } from '../config/mode-registry'


// 通过url配置App的前后缀, 例如htttp://xx.xx.com?vm_mode=ios
const URL_CONFIG_PREFIX = 'vm';

export class Config {
  /**
   * @private
   */
  _c = {}; // cache 获取配置的缓存对象, 可用的config只有调用的时候才知道!
  _s = {}; // superlative 最高级配置 用户在初始化时自己的配置config
  _modes = {}; // 三大基础平台:ios/md/wp的样式集

  constructor () {
    this.plt; // Platform 当前平台的实例
  }

  /**
   * 初始化
   * @private
   * @param {any} config - 初始化的config配置信息, 用户自定义的配置
   * @param {Platform} plt - 当前平台的platform实例
   */
  init (config, plt) {
    this._s = config && isObject(config) && !isArray(config) ? config : {};
    this.plt = plt;
  }

  /**
   * @name get
   * @description
   * 获取配置值
   *
   * @param {string} [key] - 查找的key
   * @param {any} [fallbackValue] - 没有找到key的被选择结果
   */
  get (key, fallbackValue = null) {
    const platform = this.plt;

    // 如果已缓存则取缓存值
    if (!isDefined(this._c[key])) {
      if (!isDefined(key)) {
        throw 'config key is not defined';
      }

      // if the value was already set this will all be skipped
      // if there was no user config then it'll check each of
      // the user config's platforms, which already contains
      // settings from default platform configs

      let userPlatformValue = undefined;
      let userDefaultValue = this._s[key];
      let userPlatformModeValue = undefined;
      let userDefaultModeValue = undefined;
      let platformValue = undefined;
      let platformModeValue = undefined;
      let configObj = null;

      if (platform) {
        // 如果配置信息是定义在queryParam中的话, 读取并注册到_c中, 查询的关键字key是小写
        var queryStringValue = platform.getQueryParam(URL_CONFIG_PREFIX + key);
        if (isDefined(queryStringValue)) {
          return this._c[key] = (queryStringValue === 'true' ? true : queryStringValue === 'false' ? false : queryStringValue);
        }

        // check the platform settings object for this value
        // loop though each of the active platforms

        // 获取激活的platform,此时已经知道层级关系,最后一个为最重要的, 例如: ['mobile','ios','mobileweb']
        var activePlatformKeys = platform.platforms();

        // loop through all of the active platforms we're on
        for (var i = 0, ilen = activePlatformKeys.length; i < ilen; i++) {

          // get user defined platform values
          if (this._s.platforms) {
            configObj = this._s.platforms[activePlatformKeys[i]];
            if (configObj) {
              if (isDefined(configObj[key])) {
                userPlatformValue = configObj[key];
              }
              // 从mode-registry.js获取配置
              configObj = this.getModeConfig(configObj.mode);
              if (configObj && isDefined(configObj[key])) {
                userPlatformModeValue = configObj[key];
              }
            }
          }

          // 获取平台的默认配置(platform-registry.js)
          configObj = platform.getPlatformConfig(activePlatformKeys[i]);
          if (configObj && configObj.settings) {

            if (isDefined(configObj.settings[key])) {
              // found a setting for this platform
              platformValue = configObj.settings[key];
            }

            configObj = this.getModeConfig(configObj.settings.mode);
            if (configObj && isDefined(configObj[key])) {
              // found setting for this platform's mode
              platformModeValue = configObj[key];
            }
          }
        }
      }

      configObj = this.getModeConfig(this._s.mode);
      if (configObj && isDefined(configObj[key])) {
        userDefaultModeValue = configObj[key];
      }

      // cache the value
      // 返回优先级: 用户自在platform中定义 >  用户在_s中定义 > mode中定义 > platform中定义
      // eg: _s.platform.md[key] > _s.platform[key] > mode_register.md[key] > platform_register.md.setting[key]
      this._c[key] = isDefined(userPlatformValue) ? userPlatformValue :
        isDefined(userDefaultValue) ? userDefaultValue :
          isDefined(userPlatformModeValue) ? userPlatformModeValue :
            isDefined(userDefaultModeValue) ? userDefaultModeValue :
              isDefined(platformValue) ? platformValue :
                isDefined(platformModeValue) ? platformModeValue :
                  null;
    }

    var rtnVal = this._c[key];
    // 如果返回函数则导入platform执行
    if (isFunction(rtnVal)) {
      rtnVal = rtnVal(platform);
    }

    return (rtnVal !== null ? rtnVal : fallbackValue);
  }

  /**
   * @name getBoolean
   * @description
   * 和get()方法类似, 不过只返回boolean类型, 比如"true"返回true
   *
   * @param {string} [key] - key值
   * @param {boolean} [fallbackValue] - 备选值
   * value was `null`. Fallback value defaults to `false`.
   */
  getBoolean (key, fallbackValue = false) {
    const val = this.get(key);
    if (val === null) {
      return fallbackValue;
    }
    if (typeof val === 'string') {
      return val === 'true';
    }
    return !!val;
  }

  /**
   * @name getNumber
   * @description
   * 和get()方法类似, 不过只返回number类型
   * @param {string} [key] - key值
   * @param {number} [fallbackValue] - 备选值
   * value turned out to be `NaN`. Fallback value defaults to `NaN`.
   */
  getNumber (key, fallbackValue = NaN) {
    const val = parseFloat(this.get(key));
    return isNaN(val) ? fallbackValue : val;
  }

  /**
   * @name set
   * @description
   * 对config设置键值, 可针对平台设置.
   *
   * @param {string} [platform] - 平台类型, 可以是(either 'ios' or 'android'). 如果不填将对所有平台生效.
   * @param {string} [key] - key值
   * @param {string} [value] - 设置的值
   */
  set (...args) {
    const arg0 = args[0];
    const arg1 = args[1];

    switch (args.length) {
      case 2:
        // set('key', 'value') = set key/value pair
        // arg1 = value
        this._s[arg0] = arg1;
        delete this._c[arg0]; // clear cache
        break;

      case 3:
        // setting('ios', 'key', 'value') = set key/value pair for platform
        // arg0 = platform
        // arg1 = key
        // arg2 = value
        this._s.platforms = this._s.platforms || {};
        this._s.platforms[arg0] = this._s.platforms[arg0] || {};
        this._s.platforms[arg0][arg1] = args[2];
        delete this._c[arg1]; // clear cache
        break;

    }

    return this;
  }

  /**
   * 设置用户自定义配置, 自定义配置缓存在_s中, 同时清空_c的缓存
   * @private
   * @name settings()
   * @description
   */
  settings (arg0, arg1) {
    switch (arguments.length) {

      case 0:
        return this._s;

      case 1:
        // settings({...})
        this._s = arg0;
        this._c = {}; // clear cache
        break;

      case 2:
        // settings('ios', {...})
        this._s.platforms = this._s.platforms || {};
        this._s.platforms[arg0] = arg1;
        this._c = {}; // clear cache
        break;
    }

    return this;
  }

  /**
   * @private
   * 内部使用
   * @param {string} modeName
   * @param {any} modeConfig
   */
  setModeConfig (modeName, modeConfig) {
    this._modes[modeName] = modeConfig;
  }

  /**
   * @private
   * 内部使用
   * @param {string} modeName
   */
  getModeConfig (modeName) {
    return this._modes[modeName] || null;
  }
}

/**
 * 初始化Config
 * @private
 * @param {object} userConfig
 * @param {Platform} plt
 * @return {Config}
 */
export function setupConfig (userConfig, plt) {
  // 保持单例对象
  if (!!window['VM'] && !!window['VM']['config']) {
    return window['VM']['config']
  } else {
    const config = new Config();

    registerModeConfigs(config);

    config.init(userConfig, plt);

    // 全局注册
    const win = window;
    win['VM'] = win['VM'] || {};
    win['VM']['config'] = config;

    return config;
  }
}
