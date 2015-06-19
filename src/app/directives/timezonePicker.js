/**
 * @class timezonePicker Directive
 *
 */
app.directive('timezonePicker', function () {

  var zones = [
    {value: 'US/Hawaii', display: "(GMT-10:00) Hawaii"},
    {value: 'US/Alaska', display: "(GMT-09:00) Alaska"},
    {value: 'US/Pacific', display: "(GMT-08:00) Pacific Time (US & Canada)"},
    {value: 'US/Mountain', display: "(GMT-07:00) Mountain Time (US & Canada)"},
    {value: 'US/Central', display: "(GMT-06:00) Central Time (US & Canada)"},
    {value: 'US/Eastern', display: "(GMT-05:00) Eastern Time (US & Canada)"},
    {value: 'America/Caracas', display: "(GMT-04:30) Caracas"},
    {value: 'Canada/Atlantic', display: "(GMT-04:00) Atlantic Time (Canada)"},
    {value: 'Canada/Newfoundland', display: "(GMT-03:30) Newfoundland"},
    {value: 'America/Buenos_Aires', display: "(GMT-03:00) Buenos Aires"},
    {value: 'Atlantic/Stanley', display: "(GMT-02:00) Stanley"},
    {value: 'Atlantic/Cape_Verde', display: "(GMT-01:00) Cape Verde Is."},
    {value: 'Europe/London', display: "(GMT) London"},
    {value: 'Europe/Amsterdam', display: "(GMT+01:00) Amsterdam"},
    {value: 'Europe/Istanbul', display: "(GMT+02:00) Istanbul"},
    {value: 'Asia/Kuwait', display: "(GMT+03:00) Kuwait"},
    {value: 'Asia/Tehran', display: "(GMT+03:30) Tehran"},
    {value: 'Europe/Moscow', display: "(GMT+04:00) Moscow"},
    {value: 'Asia/Kabul', display: "(GMT+04:30) Kabul"},
    {value: 'Asia/Karachi', display: "(GMT+05:00) Karachi"},
    {value: 'Asia/Kolkata', display: "(GMT+05:30) Kolkata"},
    {value: 'Asia/Kathmandu', display: "(GMT+05:45) Kathmandu"},
    {value: 'Asia/Yekaterinburg', display: "(GMT+06:00) Ekaterinburg"},
    {value: 'Asia/Bangkok', display: "(GMT+07:00) Bangkok"},
    {value: 'Asia/Hong_Kong', display: "(GMT+08:00) Hong Kong"},
    {value: 'Asia/Tokyo', display: "(GMT+09:00) Tokyo"},
    {value: 'Australia/Adelaide', display: "(GMT+09:30) Adelaide"},
    {value: 'Australia/Sydney', display: "(GMT+10:00) Sydney"},
    {value: 'Pacific/Fiji', display: "(GMT+12:00) Fiji"}
  ];

  return {
    restrict: 'E',
    require: 'ngModel',
    templateUrl: 'views/templates/timezone-picker.html',
    link: function (scope, element, attrs, ngModelCtrl) {
      scope.zones = zones;

      scope.$watch(function () {
        return ngModelCtrl.$modelValue
      }, function () {
        // if (!ngModelCtrl.$modelValue){
        //     ngModelCtrl.$setViewValue('Pacific/Wallis');
        // }
        scope.model = ngModelCtrl.$modelValue;
      });

      element.bind('change', function () {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(scope.model);
          ngModelCtrl.$render();
        });
      })
    }
  }
});