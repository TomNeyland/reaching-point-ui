var responseCodes = [

];

/**
 * @class ApiService
 *
 */
// angular.module('baseangular').service('ApiService', function ($http, $q, Base64, $dialog, toastr, $cookieStore, $filter, $rootScope, UserService, $location) {
angular.module('baseangular').service('ApiService', function ($http, $q, $filter, $rootScope, UserService, $location) {
  console.log('api service!!!');

  var self = this;

  var PUT_HEADERS = {'Content-Type': 'application/x-www-form-urlencoded'};

  var lastError = {};

  var getPartialUrl = function (fullUrl) {
    var partialUrl = fullUrl.replace(v5Config.BASE_URL, '');
    return partialUrl;
  };
  var getPrettyUrl = function (fullUrl) {
    var prettyUrl = $filter('inflector')(getPartialUrl(fullUrl), 'humanize');
    return prettyUrl;
  };

  function getErrorMsg (message) {

    for (var i in responseCodes) {
      if (message.message_code == responseCodes[i].code && responseCodes[i].show == true) {

        switch (message.message_code) {
          case '2':

            if ($location.path().indexOf('forgot-password') == 1) {
              return false;
            } else {
              return {code: '2', type: 'Error', show: true, message: message.error.fields, http_code: 400};
            }

            break;
          default:
            return responseCodes[i];
            break;
        }
      }
    }
  }

  /**
   * @method attachCallbacks
   * @description This allows us to intercept the callback chain, and make any adjustments (or re-try a request),
   * before the original caller receives it's success/error callbacks
   * @param promise
   * @returns {Object} callback
   */
  var attachCallbacksToPromise = function (promise) {
    var callback = {};
    promise.success = function (fn) {
      callback.success = fn;
      return promise;
    };
    promise.error = function (fn) {
      callback.error = fn;
      return promise;
    };
    return callback;
  };

  /**
   * @method registerDefaultListeners
   * @description Register Default Success and Error listeners
   * @param httpRequest httpRequest to register default listeners for
   * @param callback Callbacks for the original request maker (caller)
   */
  var registerDefaultListeners = function (httpRequest, callback) {
    httpRequest.success(function (data, status, headers, config) {
      //
      callback.success(data.response);
    });

    httpRequest.error(function (data, status, headers, config) {
      //

      var enoughTimeHasPassed = function () {
        if (lastError.time) {
          var timeDiff = (new Date().getTime() - lastError.time);
          return enoughTimeHasPassed = timeDiff > 300;
        } else {
          return enoughTimeHasPassed = true;
        }
      };

      var showPopup = function () {
        lastError = {status: status, time: new Date().getTime()};

        if (!config.hideErrorPopup) {
          var errMsg = getErrorMsg(data);
          if (errMsg) {
            if(errMsg.code == 2){
              toastr.pop({
                'type': 'error',
                'body': '[Validation Errors]: ' + data.error.fields
              });
            } else {
              toastr.pop({
                'type': 'error',
                'body': '[Error ' + errMsg.code + ']: ' + errMsg.message
                //              'title': '[Error ' + errMsg.code + ']: '
              });
            }
          }
        }
        callback.error(data, status, headers, config);
      };

      if (enoughTimeHasPassed()) {
        showPopup();
      } else if (lastError.status != status) {
        showPopup();
      }

    });
  };

  function urlContainsIn (url, array) {
    var retVal = false;
    angular.forEach(array, function (string) {
      if (url.indexOf(string) !== -1) {
        retVal = true;
      }
    });
    return retVal;
  }

  function addDefaultHttpConfigOptions (httpConfig, method) {
    // var EXT_URLS = ['forgot_password_request', 'forgot_password_update', 'packages', 'new_account', 'account/activate', 'reactivate_account', 'broadcasts'];
    // var AUTH_URLS = ['login'];
    // var RELATIVE_URLS = ['json_data'];
    // var UPLOADER_URLS = ['api/upload'];

    // if (urlContainsIn(httpConfig.url, EXT_URLS)) {
    //   httpConfig.url = v5Config.EXT_URL + httpConfig.url;
    // } else if (urlContainsIn(httpConfig.url, AUTH_URLS)) {
    //   httpConfig.url = v5Config.AUTH_URL;
    // } else if (urlContainsIn(httpConfig.url, UPLOADER_URLS)) {
    //   httpConfig.url = v5Config.UPLOADER_URL + httpConfig.url;
    // } else if (!urlContainsIn(httpConfig.url, RELATIVE_URLS)) {
      httpConfig.url = v5Config.CASS_FIREBASE_URL + httpConfig.url;
    // }

    httpConfig.headers = httpConfig.headers || {};
    httpConfig.method = method;
    // httpConfig.withCredentials = true;
    // var token = UserService.getToken();

    if (method === 'GET') {
      if (!httpConfig.params) {
        httpConfig.params = {};
      }
      // httpConfig.params.token = token;
    } else {
      if (!httpConfig.data) {
        httpConfig.data = {};
      }
      httpConfig.data.token = token;
    }
  }

  /**
   * @method get
   * @description A wrapper around the for the $http helper that auto-fills common parts of the RBM Api 'GET' calls.
   * It also intercepts the http callback chain in case we need to do any message parsing before the original caller
   * receives it's response.
   * @param httpConfig A configuration object for the $http method
   * @returns {Function|promise|Function|Function|promise|Function}
   */
  this.get = function (httpConfig) {

    var deferred = $q.defer();

    // Modify the Http Request config object
    addDefaultHttpConfigOptions(httpConfig, 'GET');

    // Make the Http request
    var httpRequest = $http(httpConfig);

    // Attach callbacks for the original request maker (caller)
    var callback = attachCallbacksToPromise(deferred.promise);

    // Register Default Success and Error listeners
    registerDefaultListeners(httpRequest, callback);

    return deferred.promise;
  };


  /**
   * @method post
   * @description A wrapper around the for the $http helper that auto-fills common parts of the RBM Api 'POST' calls.
   * It also intercepts the http callback chain in case we need to do any message parsing before the original caller
   * receives it's response.
   * @param httpConfig A configuration object for the $http method
   * @returns {Function|promise|Function|Function|promise|Function}
   */
  this.post = function (httpConfig) {

    var deferred = $q.defer();

    // Modify the Http Request config object
    addDefaultHttpConfigOptions(httpConfig, 'POST');
    httpConfig.headers = PUT_HEADERS;
    // Serializes a JavaScript object into http form data for HTTP-POST data payloads
    httpConfig.data = serialiseObject(httpConfig.data);

    // Make the Http request
    var httpRequest = $http(httpConfig);

    // Attach callbacks for the original request maker (caller)
    var callback = attachCallbacksToPromise(deferred.promise);

    // Register Default Success and Error listeners
    registerDefaultListeners(httpRequest, callback);

    return deferred.promise;

  };

  /**
   * @method postFile
   * @description A wrapper around the for the $http helper that auto-fills common parts of the RBM Api 'POST' calls.
   * It also intercepts the http callback chain in case we need to do any message parsing before the original caller
   * receives it's response.
   * @param httpConfig A configuration object for the $http method
   * @returns {Function|promise|Function|Function|promise|Function}
   */
  this.postFile = function (httpConfig) {

    var deferred = $q.defer();


    // Modify the Http Request config object
    addDefaultHttpConfigOptions(httpConfig, 'POST');
    httpConfig.headers = { 'Content-Type': undefined};
//    httpConfig.headers['Content-Type'] = undefined;

    // Serializes a JavaScript object into http form data for HTTP-POST data payloads
    httpConfig.transformRequest = function (obj) {
      var formData = new FormData();
      for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) {
          continue;
        }
        formData.append(prop, obj[prop]);
      }
      return formData;
    }

    // Make the Http request
    var httpRequest = $http(httpConfig);

    // Attach callbacks for the original request maker (caller)
    var callback = attachCallbacksToPromise(deferred.promise);

    // Register Default Success and Error listeners
    registerDefaultListeners(httpRequest, callback);

    return deferred.promise;
  };

  /**
   * @method put
   * @description A wrapper around the for the $http helper that auto-fills common parts of the RBM Api 'PUT' calls.
   * It also intercepts the http callback chain in case we need to do any message parsing before the original caller
   * receives it's response.
   * @param httpConfig A configuration object for the $http method
   * @returns {Function|promise|Function|Function|promise|Function}
   */
  this.put = function (httpConfig) {

    var deferred = $q.defer();

    // Modify the Http Request config object
    addDefaultHttpConfigOptions(httpConfig, 'PUT');
    httpConfig.headers = PUT_HEADERS;
    // Serializes a JavaScript object into http form data for HTTP-POST data payloads
    httpConfig.data = serialiseObject(httpConfig.data);

    // Make the Http request
    var httpRequest = $http(httpConfig);

    // Attach callbacks for the original request maker (caller)
    var callback = attachCallbacksToPromise(deferred.promise);

    // Register Default Success and Error listeners
    registerDefaultListeners(httpRequest, callback);

    return deferred.promise;

  };

  /**
   * @method delete
   * @description A wrapper around the for the $http helper that auto-fills common parts of the RBM Api 'DELETE' calls.
   * It also intercepts the http callback chain in case we need to do any message parsing before the original caller
   * receives it's response.
   * @param httpConfig A configuration object for the $http method
   * @returns {Function|promise|Function|Function|promise|Function}
   */
  this.delete = function (httpConfig) {

    var deferred = $q.defer();

    // Modify the Http Request config object
    addDefaultHttpConfigOptions(httpConfig, 'DELETE');
    httpConfig.headers = PUT_HEADERS;
    // Serializes a JavaScript object into http form data for HTTP-POST data payloads
    httpConfig.data = serialiseObject(httpConfig.data);

    // Make the Http request
    var httpRequest = $http(httpConfig);

    // Attach callbacks for the original request maker (caller)
    var callback = attachCallbacksToPromise(deferred.promise);

    // Register Default Success and Error listeners
    registerDefaultListeners(httpRequest, callback);

    return deferred.promise;

  };

});

