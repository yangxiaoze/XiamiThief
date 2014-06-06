(function() {
  'use strict';
  var config, execPath, fs, getProxyString, getSafeFilename, getSafeFoldername, mixin, parseLocation, path, replaceBat, replaceLast, safeFilter, toNum, user,
    __slice = [].slice;

  path = require('path');

  fs = require('fs');

  execPath = path.dirname(process.execPath);

  config = {
    savePath: execPath,
    foldernameFormat: '%NAME%',
    filenameFormat: '%NAME%',
    taskLimitMax: 3,
    cookie: '',
    hasLyric: false,
    hasCover: true,
    hasId3: true,
    useProxy: 'false',
    proxy: {
      host: '',
      port: 80,
      username: '',
      password: ''
    },
    id3: {
      hasTitle: true,
      hasArtist: true,
      hasAlbumArtist: true,
      hasAlbum: true,
      hasYear: true,
      hasTrack: true,
      hasGenre: true,
      hasDisc: true,
      hasCover: true,
      hasLyric: false,
      cover: {
        size: 'standard',
        maxSide: 640
      }
    },
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'zh-CN,zh;q=0.8',
      'Cache-Control': 'max-age=0',
      'Connection': 'keep-alive',
      'Host': 'www.xiami.com',
      'Origin': 'http://www.xiami.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.22 Safari/537.36'
    }
  };

  user = {};

  mixin = function() {
    var args, key, obj, result, value, _i, _len;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    result = {};
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      obj = args[_i];
      for (key in obj) {
        value = obj[key];
        result[key] = value;
      }
    }
    return result;
  };

  parseLocation = function(param1) {
    var _loc_10, _loc_2, _loc_3, _loc_4, _loc_5, _loc_6, _loc_7, _loc_8, _loc_9;
    _loc_10 = void 0;
    if (param1.indexOf("http://") !== -1) {
      return param1;
    }
    _loc_2 = Number(param1.charAt(0));
    _loc_3 = param1.substring(1);
    _loc_4 = Math.floor(_loc_3.length / _loc_2);
    _loc_5 = _loc_3.length % _loc_2;
    _loc_6 = new Array();
    _loc_7 = 0;
    while (_loc_7 < _loc_5) {
      if (_loc_6[_loc_7] === void 0) {
        _loc_6[_loc_7] = "";
      }
      _loc_6[_loc_7] = _loc_3.substr((_loc_4 + 1) * _loc_7, _loc_4 + 1);
      _loc_7 = _loc_7 + 1;
    }
    _loc_7 = _loc_5;
    while (_loc_7 < _loc_2) {
      _loc_6[_loc_7] = _loc_3.substr(_loc_4 * (_loc_7 - _loc_5) + (_loc_4 + 1) * _loc_5, _loc_4);
      _loc_7 = _loc_7 + 1;
    }
    _loc_8 = "";
    _loc_7 = 0;
    while (_loc_7 < _loc_6[0].length) {
      _loc_10 = 0;
      while (_loc_10 < _loc_6.length) {
        _loc_8 = _loc_8 + _loc_6[_loc_10].charAt(_loc_7);
        _loc_10 = _loc_10 + 1;
      }
      _loc_7 = _loc_7 + 1;
    }
    _loc_8 = unescape(_loc_8);
    _loc_9 = "";
    _loc_7 = 0;
    while (_loc_7 < _loc_8.length) {
      if (_loc_8.charAt(_loc_7) === "^") {
        _loc_9 = _loc_9 + "0";
      } else {
        _loc_9 = _loc_9 + _loc_8.charAt(_loc_7);
      }
      _loc_7 = _loc_7 + 1;
    }
    _loc_9 = _loc_9.replace("+", " ");
    return _loc_9;
    /*
    	try
    		a1 = parseInt(str.charAt(0))
    		a2 = str.substring(1)
    		a3 = Math.floor(a2.length / a1)
    		a4 = a2.length % a1
    		a5 = []
    		a6 = 0
    		a7 = ""
    		a8 = ""
    		while a6 < a4
    			a5[a6] = a2.substr((a3 + 1) * a6, (a3 + 1))
    			++a6
    		while a6 < a1
    			a5[a6] = a2.substr(a3 * (a6 - a4) + (a3 + 1) * a4, a3)
    			++a6
    		i = 0
    		a5_0_length = a5[0].length
    
    		while i < a5_0_length
    			j = 0
    			a5_length = a5.length
    
    			while j < a5_length
    				a7 += a5[j].charAt(i)
    				++j
    			++i
    		a7 = decodeURIComponent(a7)
    		i = 0
    		a7_length = a7.length
    
    		while i < a7_length
    			a8 += (if a7.charAt(i) is "^" then "0" else a7.charAt(i))
    			++i
    		return a8
    	catch e
    		console.log e
    		return false
    */

  };

  replaceLast = function(search, str, newStr) {
    console.log(RegExp(str + '$'));
    return search.replace(RegExp(str + '$'), newStr);
  };

  replaceBat = function() {
    var args, nv, str, sv, _i, _len, _ref;
    str = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      _ref = args[_i], sv = _ref[0], nv = _ref[1];
      if (!sv instanceof RegExp) {
        sv = RegExp(sv, g);
      }
      str = str.replace(sv, nv);
    }
    return str;
  };

  toNum = function(obj) {
    if (isNaN(obj)) {
      return Number(obj);
    } else {
      return obj;
    }
  };

  safeFilter = function(str) {
    var removeSpan, safeFilename;
    removeSpan = function(str) {
      return str.replace('<span>', ' ').replace('</span>', '');
    };
    safeFilename = function(str) {
      return str.replace(/(\/|\\|\:|\*|\?|\"|\<|\>|\||\s+)/g, ' ');
    };
    return safeFilename(removeSpan(str));
  };

  getSafeFoldername = function(str) {
    str = str.replace(/^\.+$/, '_');
    str = str.replace(/(\.)+$/, '');
    str = safeFilter(str);
    return str = str.slice(0, 229);
  };

  getSafeFilename = function(str) {
    str = safeFilter(str);
    return str = str.slice(0, 220);
  };

  getProxyString = function() {
    var options;
    if (config.useProxy === 'true') {
      options = config.proxy;
      return "" + options.username + ":" + options.password + "@" + options.host + ":" + options.port;
    } else {
      return false;
    }
  };

  module.exports = {
    execPath: execPath,
    config: config,
    user: user,
    mixin: mixin,
    parseLocation: parseLocation,
    replaceLast: replaceLast,
    replaceBat: replaceBat,
    toNum: toNum,
    safeFilter: safeFilter,
    getSafeFilename: getSafeFilename,
    getSafeFoldername: getSafeFoldername,
    getProxyString: getProxyString
  };

}).call(this);