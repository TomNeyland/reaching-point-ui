//
//var conlog = function () {
//  if (v5Config.ALLOW_DEBUG) {
//    if (console && arguments) {
//      var args = Array.prototype.slice.call(arguments, 0);
//      switch (args.length) {
//        case 0:
//
//          break;
//        case 1:
//
//          break;
//        case 2:
//
//          break;
//        case 3:
//
//          break;
//        case 4:
//
//          break;
//      }
//    }
//  }
//};

function ifNullReturnEmptyString (field) {
  if (field == null || field == 'null' || field == undefined || typeof(field) == 'undefined')
    return '';
  else return field;
}

/**
 * @method accessFieldByString
 * @description Receives an object and returns a string serialized from that object, in the format that is required for
 * form-data in Http 'POST' requests.
 * @param item Object to be accessed
 * @param fieldPathString a string representing the path of the desired field
 * @returns {Object}
 */
var accessFieldByString = function (item, fieldPathString) {

  if (fieldPathString) {
    var tempItem = {};

    // Split the path string into an array, separating at each .
    fieldPathString = fieldPathString.split('.');

    // Loop though each field found in the pathString
    for (var j = 0, len = fieldPathString.length; j < len; j++) {

      var field = fieldPathString[j];
      // If accessing the field on tempItem works, use that one.
      // Else access te field from the original item (should only happen the first time)
      if (tempItem) {
        tempItem = tempItem['pretty_' + field] || tempItem[field] || item['pretty_' + field] || item[field];
      }

      if (j + 1 == len && tempItem) {
        return tempItem;
      }
    }
  }
}

/**
 * @method getRatioPretty
 * @description Receives two integers that representing a video's resolution (width & height). Uses a gcd function to
 * simplify the ratio and returns a "Pretty "Ratio String
 * @param a width
 * @param b height
 * @returns {String} Pretty Ratio
 */
var getRatioPretty = function (a, b) {
  var divisor = gcd(a, b);
  return a / divisor + ":" + b / divisor;
};

function gcdRecursive (a, b) {
  return (!a || !b || b == 0) ? a : gcdRecursive(b, a % b);
};

function gcd (a, b) {
  while (a && b && b !== 0) {
    var aModB = a % b;
    a = b;
    b = aModB;
  }
  return a;
};

/**
 * @method convertArrayToCommaSeparatedList
 * @param array
 * @description converts an array of values into a String, with the values separated by commas
 * @returns {String}
 */
function convertArrayToCommaSeparatedList (array) {
  var stringOfValues = "";
  for (var i = 0, len = array.length; i < len; i++) {
    stringOfValues += array[i];
    if (i < len - 1) {
      stringOfValues += ", ";
    }
  }
  return stringOfValues;
}

/**
 * @method convertGigabytesToBytes
 * @param gigabytes
 * @description converts a number representing BG into B
 * @returns {float}
 */
function convertGigabytesToBytes (num) {
  num *= Math.pow(1000, 3);
  return num;
}

/**
 decimal_sep: character used as deciaml separtor, it defaults to '.' when omitted
 thousands_sep: char used as thousands separator, it defaults to ',' when omitted
 */
Number.prototype.toMoney = function (decimals, decimal_sep, thousands_sep) {
  var n = this,
    c = isNaN(decimals) ? 2 : Math.abs(decimals), //if decimal is zero we must take it, it means user does not want to show any decimal
    d = decimal_sep || '.', //if no decimal separator is passed we use the dot as default decimal separator (we MUST use a decimal separator)

  /*
   according to [http://stackoverflow.com/questions/411352/how-best-to-determine-if-an-argument-is-not-sent-to-the-javascript-function]
   the fastest way to check for not defined parameter is to use typeof value === 'undefined'
   rather than doing value === undefined.
   */
    t = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, //if you don't want to use a thousands separator you can pass empty string as thousands_sep value

    sign = (n < 0) ? '-' : '',

  //extracting the absolute value of the integer part of the number and converting to string
    i = parseInt(n = Math.abs(n).toFixed(c)) + '',

    j = ((j = i.length) > 3) ? j % 3 : 0;
  return sign + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
}

function convertCommaSeparatedListOfDaysToArray (string) {
  var days = string.split(',');
  var arrayOfDays = [];

  for (var i = 0; i < days.length; i++) {
    if (days[i] == 1) {
      switch (i) {
        case 0:
          arrayOfDays.push('Sun');
          break;
        case 1:
          arrayOfDays.push('Mon');
          break;
        case 2:
          arrayOfDays.push('Tue');
          break;
        case 3:
          arrayOfDays.push('Wed');
          break;
        case 4:
          arrayOfDays.push('Thu');
          break;
        case 5:
          arrayOfDays.push('Fri');
          break;
        case 6:
          arrayOfDays.push('Sat');
          break;
      }
    }
  }

  return arrayOfDays;
}


var fetchPrefs = function (tag) {
  if (supports_html5_storage()) {
    var savedPrefs = sessionStorage.getItem(tag + "searchControls");
    if (savedPrefs && savedPrefs != 'undefined') {
      try {
        savedPrefs = JSON.parse(savedPrefs);
        return savedPrefs;
      } catch (err) {

      }
    }
  }
};

var savePrefs = function (prefsToSave) {
  if (supports_html5_storage() && prefsToSave.controllerName) {
    sessionStorage.setItem(prefsToSave.controllerName + "searchControls", JSON.stringify(prefsToSave));
    //
    return true; // Return true to indicate success
  }
  return false; // Return false to indicate failure
};

var deletePrefs = function (tag) {
  if (supports_html5_storage()) {
    sessionStorage.removeItem(tag + "searchControls");

    return true; // Return true to indicate success
  }
  return false; // Return false to indicate failure
};

var deleteAllPrefs = function (tag) {
  if (supports_html5_storage()) {
    sessionStorage.clear();

    return true; // Return true to indicate success
  }
  return false; // Return false to indicate failure
};

/**
 * @method supports_html5_storage
 * @description Checks if the client's browser supports HTML5 local storage
 * @returns {Boolean} true if local_storage is supported, false otherwise
 */
function supports_html5_storage () {
  try {
    return 'sessionStorage' in window && window['sessionStorage'] !== null;
  } catch (e) {
    return false;
  }
};


function isEmptyObject (object) {
  for (var i in object) {
    return false;
  }
  return true;
}

function toTitleCase (str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/g, "");
};

String.prototype.toCamel = function () {
  return this.replace(/(\-[a-z])/g, function ($1) {
    return $1.toUpperCase().replace('-', '');
  });
};

String.prototype.toDash = function () {
  return this.replace(/([A-Z])/g, function ($1) {
    return "-" + $1.toLowerCase();
  });
};

String.prototype.toUnderscore = function () {
  return this.replace(/([A-Z])/g, function ($1) {
    return "_" + $1.toLowerCase();
  });
};

/**
 * @method serialiseObject
 * @description Receives an object and returns a string serialized from that object, in the format that is required for
 * form-data in Http 'POST' requests.
 * @param obj
 * @returns {string}
 */
var serialiseObject = function (obj) {
  var pairs = [];
  for (var prop in obj) {
    if (!obj.hasOwnProperty(prop)) {
      continue;
    }

    if (Object.prototype.toString.call(obj[prop]) == '[object Object]') {
      pairs.push(serialiseObject(obj[prop]));
      continue;
    }

    pairs.push(prop + '=' + obj[prop]);
  }
  return pairs.join('&');
};

/**
 * @method toJsonArrayOfIds
 * @param items
 * @returns {Array} arrayOfIds
 */
var toJsonArrayOfIds = function (items) {
  var arrayOfIds = [];
  angular.forEach(items, function (item) {
    arrayOfIds.push(item.id);
  });
  return(angular.toJson(arrayOfIds));
};

/**
 * This is a way to determine of an object is contained within an array of objects.
 * Must supply a field of the object(s) in order to determine equality.
 *
 *
 */
function doesArrayContain (myArray, myObject, field) {
  return (myArray.map(function (e) {
    return e[field];
  }).indexOf(myObject[field]) < 0);

}


function filterArray (src, filt) {
  var temp = {}, i, result = [];
  // load contents of filt into an object
  // for faster lookup
  for (i = 0; i < filt.length; i++) {
    temp[filt[i]] = true;
  }


  // go through each item in src
  for (i = 0; i < src.length; i++) {
    if (!(src[i] in temp)) {
      result.push(src[i]);
    }
  }
  return(result);
}

//if (!Array.prototype.removeArray) {
//  Array.prototype.removeArray = function (arrayToRemove) {
//    "use strict";
//
//    if (this == null)
//      throw new TypeError();
//
//    var t = Object(this);
//    var len = t.length >>> 0;
//    if (Object.prototype.toString.call(arrayToRemove) !== '[object Array]')
//      throw new TypeError('arrayToRemove was not a valid array');
//
//    var res = [];
//
//    for (var i = 0; i < len; i++) {
//
//      if (t[i] in arrayToRemove) {
//
//        //        if (arrayToRemove.call(thisp, val, i, t))
//        //          res.push(val);
//      }
//    }
//
//    return res;
//  };
//}
