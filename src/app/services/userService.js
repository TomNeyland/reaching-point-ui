/**
 * @class UserService
 *
 */
//angular.module('baseangular').service('UserService', function ($cookieStore, MakePretty) {
angular.module('baseangular').service('UserService', function () {
  var self = this;

  var currentToken = null;
  var currentUser = null;
  var currentRememberMe = null;

  var TOKEN_KEY = "rbm-session-token";
  var REMEMBER_ME_KEY = "rbm-remember-me";
  var adminRoles = ['admin', 'editor'];
  var otherRoles = ['user'];

  this.getToken = function () {
    if (!currentToken) {
      currentToken = $cookieStore.get(TOKEN_KEY);
    }
    return currentToken;
  };

  this.setToken = function (token) {
    currentToken = token;
    $cookieStore.put(TOKEN_KEY, token);
  };

  this.getUser = function () {

    if (!currentUser) {

    }

    return currentUser;
  };

  this.setUser = function (user) {

    if (user) {
      if (user.settings) {
        angular.forEach(user.settings, function (setting, name) {
          user.settings[name].name = name;
          user.settings[name] = MakePretty.makeSettingPretty(setting);
        });
      }

      //New permissions - William Diaz
//      if (user.permissions) {
//        angular.forEach(user.permissions, function (permission, i) {
//          user.permissions[i] = permission == 1;
//        });
//      }
    }

    currentUser = user;
  };

  this.validateRoleAdmin = function () {
    return _.contains(adminRoles, currentUser.role);
  };

  this.validateRoleOther = function () {
    return _.contains(otherRoles, currentUser.role);
  };

  this.clearAll = function () {
    self.setToken(null);
    self.setUser(null);
  };
});
