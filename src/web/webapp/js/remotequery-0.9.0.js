var rQ = rQ || {};

(function() {

  var noSessionFn, parameterWrapperFn;

  rQ.url = 'remoteQuery';

  function call(serviceId, arg1, arg2, arg3) {
    var parameters, callback, errorCb;

    if (_.isArray(serviceId)) {
      return callRqMulti.apply(this, arguments);
    }

    if (typeof arg1 === 'function') {
      parameters = {};
      callback = arg1;
      errorCb = arg2;
    } else {
      parameters = arg1;
      callback = arg2;
      errorCb = arg3;
    }

    if (_.isFunction(parameterWrapperFn)) {
      parameters = parameterWrapperFn(parameters);
    }

    $.ajax({
      'url' : rQ.url + '/' + serviceId,
      'dataType' : 'json',
      'data' : parameters,
      'async' : true,
      'cache' : false,
      'type' : 'POST',
      'success' : function(arg0) {
        if (rQ.noSessionHandler(arg0)) {
          if (callback !== undefined) {
            callback.apply(this, arguments);
          }
        }
      },
      'error' : function(arg0) {
        if (_.isFunction(errorCb)) {
          errorCb.apply(this, arguments);
        }
      }
    });
  }
  rQ.call = call;

  /**
   * @memberOf rQ
   */
  function callForm(form$, serviceId, arg2, arg3) {
    var params, cb;
    if (typeof arg3 === 'function') {
      cb = arg3;
      params = arg2;
    } else {
      params = {};
      cb = arg2;
    }
    form$.attr('enctype', 'multipart/form-data');
    form$.ajaxSubmit({
      'url' : rQ.url + '/' + serviceId,
      'dataType' : 'json',
      'data' : params,
      'clearForm' : false,
      'type' : 'POST',
      'error' : function(e) {
        alert('error ' + e);
      },
      'success' : function(arg0) {
        if (rQ.noSessionHandler(arg0)) {
          cb.apply(this, arguments);
        }
      }
    });
  }
  rQ.callForm = callForm;

  /**
   * @memberOf rQ
   */
  function callRqMulti(requestArray, mainCb) {
    var requestArrayStr = JSON.stringify(requestArray);
    call('MultiService', {
      'requestArray' : requestArrayStr
    }, processSuccess);

    function processSuccess(data) {
      var resultArray = [];
      var requestCb, pr;
      if (data.table && data.table.length === requestArray.length) {
        $.each(data.table, function(i, row) {
          pr = JSON.parse(row[0]);
          resultArray.push(pr);
        });
        if (_.isFunction(mainCb)) {
          mainCb(resultArray);
        }
      }
    }
  }
  rQ.callRqMulti = callRqMulti;

  function noSessionHandler(arg0) {
    if (arg0 && arg0.exception === 'NOSESSION') {
      if (_.isFunction(noSessionFn)) {
        noSessionFn.apply(this, arguments);
        return false;
      }
      alert('No Session. Please refresh or relogin again.');
      return false;
    }
    return true;
  }
  rQ.noSessionHandler = noSessionHandler;

  /**
   * @memberOf rQ
   */
  function noSession(arg0) {
    if (_.isFunction(arg0)) {
      noSessionFn = arg0;
    }
    return noSessionFn;
  }
  rQ.noSession = noSession;

  function parameterWrapper(arg0) {
    if (_.isFunction(arg0)) {
      parameterWrapperFn = arg0;
    }
    return parameterWrapperFn;
  }
  rQ.parameterWrapper = parameterWrapper;

  /**
   * @memberOf rQ
   */
  function toList(serviceData) {
    var i, j, list = [], table, header, head, row, obj;
    if (_.isObject(serviceData) && _.isArray(serviceData.table)) {
      header = serviceData.header;
      table = serviceData.table;

      for (i = 0; i < table.length; i++) {
        obj = {};
        list.push(obj);
        row = table[i];
        for (j = 0; j < header.length; j++) {
          head = header[j];
          obj[head] = row[j];
        }
      }
    }
    return list;
  }
  rQ.toList = toList;

  function toMap(serviceData, keyColumns) {
    var map = {}, keys, keyIndexes = [], i;
    var rowCounter, row, currentMap;
    if (_.isArray(keyColumns)) {
      keys = keyColumns;
    } else {
      keys = keyColumns.split('.');
    }
    if (serviceData.table && serviceData.header) {
      for (i = 0; i < keys.length; i++) {
        var keyColumn = keys[i];
        $.each(serviceData.header, function(index, headerValue) {
          if (headerValue == keyColumn) {
            keyIndexes.push(index);
          }
        });
      }
      // new and fast
      for (rowCounter = 0; rowCounter < serviceData.table.length; rowCounter++) {
        row = serviceData.table[rowCounter];
        currentMap = map;
        for (i = 0; i < keys.length; i++) {
          var keyIndex = keyIndexes[i];
          var keyName = row[keyIndex];
          if (!currentMap[keyName]) {
            currentMap[keyName] = {};
          }
          currentMap = currentMap[keyName];
        }
        for (i = 0; i < serviceData.header.length; i++) {
          currentMap[serviceData.header[i]] = row[i];
        }
      }
    }
    return map;
  }
  rQ.toMap = toMap;

  function toMap2(list, attributeName) {
    var map = {}, i, o;
    for (i = 0; i < list.length; i++) {
      o = list[i];
      if (o && o[attributeName]) {
        map[o[attributeName]] = o;
      }
    }
    return map;
  }
  rQ.toMap2 = toMap2;

  function sortBy(serviceData, headerName, asc) {
    asc = _.isBoolean(asc) ? asc : true;
    var array, index;

    if (!_.isUndefined(serviceData.table)) {
      array = serviceData.table;
      index = _.indexOf(serviceData.header, headerName);
      array.sort(sortByHead);
    } else {
      array = serviceData;
      array.sort(sortByKey);
    }

    function sortByHead(e1, e2) {
      var r = 0;
      var v1 = e1[index];
      var v2 = e2[index];
      if (v1 < v2) {// sort string ascending
        r = -1;
      } else if (v1 > v2) {
        r = 1;
      }
      return asc ? r : -1 * r;
    }

    function sortByKey(e1, e2) {
      var r = 0;
      var v1 = e1[headerName];
      var v2 = e2[headerName];
      if (!_.isString(v1) || !_.isString(v2)) {
        return 0;
      }
      if (v1 < v2) {// sort string ascending
        r = -1;
      } else if (v1 > v2) {
        r = 1;
      }
      return asc ? r : -1 * r;
    }

  }
  rQ.sortBy = sortBy;

  function firstAsObject(serviceData) {
    var i, header, head, res = {};
    if (serviceData && serviceData.header && serviceData.table
        && serviceData.table.length) {
      header = serviceData.header;
      for (i = 0; i < header.length; i++) {
        head = serviceData.header[i];
        res[head] = serviceData.table[0][i];
      }
    }
    return res;
  }
  rQ.firstAsObject = firstAsObject;

  function toHierMap(serviceData, keyColumns) {
    var map = {}, keys, keyIndexes = [], i, j;
    var rowCounter, row, currentMap;
    var t, isFirst;
    if (_.isArray(keyColumns)) {
      keys = keyColumns;
    } else {
      keys = keyColumns.split('.');
    }
    if (serviceData.table && serviceData.header) {
      for (i = 0; i < keys.length; i++) {
        var keyColumn = keys[i];
        for (j = 0; j < serviceData.header.length; j++) {
          if (serviceData.header[j] == keyColumn) {
            keyIndexes.push(j);
          }
        }
      }
      // new and fast
      for (rowCounter = 0; rowCounter < serviceData.table.length; rowCounter++) {
        row = serviceData.table[rowCounter];
        currentMap = map;
        for (i = 0; i < keys.length; i++) {
          var keyIndex = keyIndexes[i];
          var keyName = row[keyIndex];
          if (!currentMap[keyName]) {
            currentMap[keyName] = {};
          }
          currentMap = currentMap[keyName];
        }
        if (_.size(currentMap) === 0) {
          t = currentMap;
          isFirst = true;
        } else {
          currentMap._list.push(t = {});
          isFirst = false;
        }
        for (i = 0; i < serviceData.header.length; i++) {
          t[serviceData.header[i]] = row[i];
        }
        if (isFirst) {
          t._list = [ _.clone(t) ];
        }
      }
    }
    return map;
  }
  rQ.toHierMap = toHierMap;

  function toListMap(arg0, name) {

    var list, i, o, map = {};

    if (_.isObject(arg0)) {
      list = toList(arg0);
    } else if (_.isArray(arg0)) {
      list = arg0;
    } else if (_.isFunction(arg0)) {
      list = arg0.apply(this, arguments);
    } else {
      list = [];
    }
    for (i = 0; i < list.length; i++) {
      o = list[i];
      if (o && o[name]) {
        map[o[name]] = map[o[name]] || [];
        map[o[name]].push(o);
      }
    }
    return map;
  }
  rQ.toListMap = toListMap;

  function camelCaseToTitle(camelCase) {
    var p;
    camelCase = camelCase.charAt(0).toUpperCase() + camelCase.substring(1);
    p = camelCase.match(/[A-Z][a-z0-9]*/g);
    return p.join(' ');
  }
  rQ.camelCaseToTitle = camelCaseToTitle;

  //
  // AJAX FILE UPLOAD
  //

  // https://stackoverflow.com/questions/2320069/jquery-ajax-file-upload

  function ajaxFileUpload(file, serviceId, parameters, progressCb, doneCb) {

    var Upload = function(file) {

      this.file = file;

    };

    Upload.prototype.doUpload = function() {

      var that = this;

      var formData = new FormData();

      // add assoc key values, this will be posts values

      if (this.file.length) {
        _.each(this.file, function(f, i) {
          formData.append('file' + i, f, f.name);
        })
      } else {
        formData.append("file", this.file, this.file.name);
      }
      formData.append("upload_file", true);

      if (parameters) {
        _.each(parameters, function(v, k) {
          formData.append(k, v);
        });
      }

      $.ajax({
        'type' : "POST",
        'url' : rQ.url + '/' + serviceId, // "script",

        'dataType' : 'json',

        'xhr' : function() {
          var myXhr = $.ajaxSettings.xhr();
          if (myXhr.upload) {
            myXhr.upload.addEventListener('progress', that.progressHandling,
                false);
          }
          return myXhr;
        },

        'success' : function(data) {
          if (_.isFunction(doneCb)) {
            doneCb(data);
          }
        },

        'error' : function(error) {
          // handle error
        },
        'async' : true,
        'data' : formData,
        'cache' : false,
        'contentType' : false,
        'processData' : false,
        'timeout' : 300000
      });

    };

    Upload.prototype.progressHandling = function(event) {

      var percent = 0;
      var position = event.loaded || event.position;
      var total = event.total;

      if (event.lengthComputable) {
        percent = Math.ceil(position / total * 100);
      }
      if (_.isFunction(progressCb)) {
        progressCb({
          'percent' : percent
        });
      }
    };

    // var file = $(this)[0].files[0];

    var upload = new Upload(file);

    upload.doUpload();
  }

  rQ.ajaxFileUpload = ajaxFileUpload;

})();
