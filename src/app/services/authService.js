// /**
//  * @class AuthService
//  *
//  */
// angular.module('baseangular').service('AuthService', function ($http, $q, Base64, $dialog, toastr, $cookieStore, $filter, $rootScope, ApiService, UserService, $location) {
//
//   var self = this;
//
//   /**
//    * @method login
//    * @description If this login was triggered by an un-authorized error, the original request will be re-sent,
//    * and the prevRequest will be fired if passed in
//    * @param loginCredentials An object with 'username' and 'password' fields.
//    * @returns {Function|promise|Function|Function|promise|Function}
//    */
//   this.login = function (loginCredentials) {
//     var deferred = $q.defer();
//
//     var auth = "Basic " + Base64.encode(loginCredentials.username + ':' + loginCredentials.password);
//
//     var httpConfig = {
//       url: 'login',
//       headers: {'Authorization': auth}
//     };
//
//     if(loginCredentials.staff_user)
//     {
//       httpConfig.params = {
//         staff_user: loginCredentials.staff_user
//       }
//     }
//
//     ApiService.get(httpConfig)
//       .success(function (response) {
//
//         UserService.setUser(response.user);
//         UserService.setToken(response.token);
//         deferred.resolve(response);
//       }).error(function (data, status, headers, config) {
//         deferred.reject(data, status, headers);
//       });
//
//     return deferred.promise;
//   };
//
//   this.resetPassword = function (loginCredentials) {
//     var deferred = $q.defer();
//
//     var httpConfig = {
//       url: 'forgot_password_request',
//       params: {
//         username: loginCredentials.username,
//         email: loginCredentials.email
//       }
//     };
//
//     ApiService.post(httpConfig)
//       .success(function (response) {
//
//         deferred.resolve(response);
//       }).error(function (data, status, headers, config) {
//         deferred.reject(data, status, headers);
//       });
//
//     return deferred.promise;
//   };
//
//   this.updatePassword = function (loginCredentials) {
//     var deferred = $q.defer();
//
//     var httpConfig = {
//       url: 'forgot_password_update',
//       params: {
//         username: loginCredentials.username,
//         email: loginCredentials.email,
//         password: loginCredentials.password,
//         hash: loginCredentials.hash
//       }
//     };
//
//     ApiService.post(httpConfig)
//       .success(function (response) {
//
//         deferred.resolve(response);
//       }).error(function (data, status, headers, config) {
//         deferred.reject(data, status, headers);
//       });
//
//     return deferred.promise;
//   };
//
//   this.signupConfirmation = function (hash) {
//     var deferred = $q.defer();
//
//     var httpConfig = {
//       url: 'new_account/confirmation/'+hash
//     };
//
//     ApiService.post(httpConfig)
//       .success(function (response) {
//         deferred.resolve(response);
//       }).error(function (data, status, headers, config) {
//         deferred.reject(data, status, headers);
//       });
//
//     return deferred.promise;
//   };
//
//   this.logout = function () {
//     var deferred = $q.defer();
//
//     var httpConfig = {
//       url: 'logout',
//       hideErrorPopup: true
//     };
//
//     ApiService.get(httpConfig)
//       .success(function (response) {
//
//         UserService.setUser(null);
//         UserService.setToken(null);
//         deferred.resolve(response);
//       }).error(function (data, status, headers, config) {
//         UserService.setUser(null);
//         UserService.setToken(null);
//         deferred.reject(status, headers);
//       });
//
//     return deferred.promise;
//   };
//
//   this.checkSession = function () {
//     var deferred = $q.defer();
//
//     //    var httpConfig = {
//     //      url: 'logout',
//     //      hideErrorPopup: true
//     //    };
//     var httpConfig = {
//       url: 'user_info',
//       params: {
//         token: UserService.getToken()
//       }
//     };
//
//
// //FOR TESTING ONLY
// //     var tmpjson = {user: {
// //       id: "77",
// //       username: "rbmtv",
// //       email: "tech@rightbrainmedia.com",
// //       first_name: "RBMtv",
// //       last_name: "Test",
// //       role: "user",
// //       active: "1",
// //       ftp_user: "rbmtv",
// //       ftp_path: "",
// //       permissions: {
// //         "upload": 1,
// //         "global_read_only": 1,
// //         "media_management": 1,
// //         "re_encode": 1,
// //         "players": 1,
// //         "file_storage": 1,
// //         "playlist": 1,
// //         "encoding": 1,
// //         "live_streaming": 1,
// //         "player_templates": 1,
// //         "statistics": 1,
// //         "account_billing": 2,
// //         "account_stats": 2,
// //         "account_shared_users": 2
// //       },
// //       storage_type: "mii",
// //       account_type: "mii",
// //       parent_user_id: null,
// //       partner_id: null,
// //       third_party_id: "test",
// //       third_party_name: "testname",
// //       saas_type: null,
// //       last_login: "2015-02-26 17:11:21",
// //       remember_token: null,
// //       deleted_at: null,
// //       created_at: "2014-04-29 20:25:43",
// //       updated_at: "2015-02-26 17:11:21",
// //       partner: null,
// //       distribution: {
// //         download_domain: "https://rbmv5-o.secure.miisolutions.net/rbm/rbmtv/",
// //         streaming_domain: "rtmp://rbmv5.mpv.miisolutions.net/rbmv5-vod-1/_definst_",
// //         original_assets_directory: "original_assets"
// //       },
// //       provision: {
// //         ingress_primary: "rtmp://was.eap2.iad.miisolutions.net/rbmv5-live-1/_definst_/doPublish=8fIXTvio2OeI",
// //         ingress_secondary: null,
// //         ingress_primary_backup: null,
// //         ingress_secondary_backup: null
// //       },
// //       ftp_domain: "dev-ftp.rbmtv.com",
// //       partner_name: null,
// //       partner_logo: null,
// //       settings: {
// //         381: {
// //           name: "default_vod_player",
// //           value: "118"
// //         },
// //         382: {
// //           name: "default_live_player",
// //           value: "119"
// //         },
// //         383: {
// //           name: "default_playlist_player",
// //           value: "309"
// //         },
// //         384: {
// //           name: "encode_notification",
// //           value: "0"
// //         },
// //         385: {
// //           name: "google_analytics",
// //           value: null
// //         },
// //         386: {
// //           name: "package_id",
// //           value: "1"
// //         },
// //         387: {
// //           name: "stripe_customer_id",
// //           value: "cus_3wt9TZR4yMGG8n"
// //         },
// //         388: {
// //           name: "stripe_subscription_id",
// //           value: null
// //         },
// //         389: {
// //           name: "restriction_live_record",
// //           value: "0"
// //         },
// //         390: {
// //           name: "restriction_monitor",
// //           value: "0"
// //         },
// //         391: {
// //           name: "restriction_transcode",
// //           value: "0"
// //         },
// //         392: {
// //           name: "stripe_period_start",
// //           value: "Feb 01, 2015"
// //         },
// //         393: {
// //           name: "stripe_period_end",
// //           value: "Mar 01, 2015"
// //         },
// //         394: {
// //           name: "usage_storage",
// //           value: "5996.74"
// //         },
// //         395: {
// //           name: "usage_bandwidth",
// //           value: "1500.45"
// //         },
// //         396: {
// //           name: "overage_storage",
// //           value: "0.00"
// //         },
// //         397: {
// //           name: "overage_bandwidth",
// //           value: "0.00"
// //         },
// //         398: {
// //           name: "overage_storage_monetary",
// //           value: "0.00"
// //         },
// //         399: {
// //           name: "overage_bandwidth_monetary",
// //           value: "0.00"
// //         },
// //         447: {
// //           name: "upcoming_package_id",
// //           value: null
// //         }
// //       },
// //       plan: {
// //         id: "1",
// //         name: "Basic",
// //         fee: "49",
// //         bandwidth: "100",
// //         storage: "100",
// //         bandwidth_overage: "0.52",
// //         storage_overage: "0.52",
// //         hidden: "0",
// //         saas_type: null
// //       }
// //     }
// //     };
//
//
//
//     ApiService.get(httpConfig)
//       .success(function (response) {
//         UserService.setUser(response.user);
//         UserService.setToken(response.token);
//
//         // If trackJS, add metrics
//         if (trackJs) {
//           var trackJsParams = {
//             userId: response.user.id, // User ID
//             username: response.user.username, // Username
//             accountType: response.user.account_type, // Account Type
//             sessionId: response.token // User session token
//           };
//           trackJs.trackJsParams;
//         }
//
//         deferred.resolve(response);
//       }).error(function (data, status, headers, config) {
//         UserService.setUser(null);
//         UserService.setToken(null);
//         $location.path('/login');
//         deferred.reject(data, status, headers);
//       });
//
//     return deferred.promise;
//   };
//
//
// });
//
//
