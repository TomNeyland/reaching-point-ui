var emptyConsole = {
    log: function () {
    }
  },
  noFunk = function () {
  };
var console = console || emptyConsole;

/*
 * Change to true to point local to production / mii
 * NOTE: This is only to be used for debugging a production issue temporarily
 */
var localToRBM = false; // Point to RBM Prod
var localToMII = false; // Point to MI Prod
var localToLocal = false; // Point local to local applications (mostly used for backend/UI testing before to goes to DEV)

// If all 3 are false then it will default to loading data from DEV.
/*
 * window.location Sets
 */
var localLocations = [
  '//localhost',
  '//0.0.0.0',
  '//127.0.0.1'
];
var devLocations = [
  'https://dev-ui.rbmtv.com'
];
var prodRBMLocations = [
  'https://manage.rbmtv.com'
];
var prodMIILocations = [
  'https://publisher.mirror-image.com'
];

/*
 * Helper Function to loop through a location set
 */
function isInLocations (locations) {
  for (var i = 0; i < locations.length; i++) {
    if (window.location.href.indexOf(locations[i]) != -1) {
      return true;
    }
  }
  return false;
}

/*
 * Determine which environment we are on
 */
var env = 'dev';
var getENV = function () {

  if (isInLocations(prodRBMLocations)) {
    env = 'production';
  } else if (isInLocations(localLocations)) {
    env = 'local';
  } else if (isInLocations(prodMIILocations)) {
    env = 'mii';
  }

  console.log('ENV: ', env);
  return env;
};

/*
 * Config App settings depending on ENV
 */
var v5Config = {};
if (getENV() == 'dev') {
  setEnvToDEV();
} else if (getENV() == 'local') {
  if (localToRBM) {
    setEnvToRBM();
  } else if (localToMII) {
    setEnvToMII();
  } else if (localToLocal) {
    setEnvToLocal();
  } else {
    setEnvToDEV();
  }
} else {
  if (getENV() == 'production') {
    setEnvToRBM();
  } else if (getENV() == 'mii') {
    setEnvToMII();
  }
}

function setEnvToLocal () {
  // DEV
  v5Config.ALLOW_DEBUG = true;
  v5Config.AUTH_URL = 'http://localhost/rbmv5/public/v5/int';
  v5Config.BASE_URL = 'http://localhost/rbmv5/public/v5/int/';
  v5Config.EXT_URL = 'http://localhost/rbmv5/public/v5/';
  v5Config.UPLOADER_URL = 'http://localhost/v5_uploader/';
  v5Config.PLAYERVERSION = 'V5 Player Local';
  v5Config.showRegister = true;
  v5Config.rootTitle = 'RBMtv Local';
  v5Config.rootLogo = 'content/images/logo_rbmtv.png';
  v5Config.rootDomain = 'manage.rbmtv.com';
  v5Config.loginLogo = 'images/logo_login.png';
  v5Config.rootSupportLink = 'mailto:support@rightbrainmedia.com';
  favIcon('favicon.ico');

  Stripe.setPublishableKey('pk_test_BdhngmE8FuDADsTXhpzQwLVF');
}

function setEnvToDEV () {
  // DEV
  v5Config.ALLOW_DEBUG = true;
  v5Config.AUTH_URL = 'https://dev-api.rbmtv.com/v5/int';
  v5Config.BASE_URL = 'https://dev-api.rbmtv.com/v5/int/';
  v5Config.EXT_URL = 'https://dev-api.rbmtv.com/v5/';
  v5Config.UPLOADER_URL = 'https://dev-uploader.rbmtv.com/';
  v5Config.PLAYERVERSION = 'V5 Player Dev';
  v5Config.showRegister = true;
  v5Config.rootTitle = 'RBMtv Dev';
  v5Config.rootLogo = 'content/images/logo_rbmtv.png';
  v5Config.rootDomain = 'manage.rbmtv.com';
  v5Config.loginLogo = 'images/logo_login.png';
  v5Config.rootSupportLink = 'mailto:support@rightbrainmedia.com';
  favIcon('favicon.ico');

  Stripe.setPublishableKey('pk_test_BdhngmE8FuDADsTXhpzQwLVF');
}

function setEnvToRBM () {
  // PRODUCTION RBMtv
  v5Config.ALLOW_DEBUG = false;
  v5Config.AUTH_URL = 'https://api.rbmtv.com/v5/int';
  v5Config.BASE_URL = 'https://api.rbmtv.com/v5/int/';
  v5Config.EXT_URL = 'https://api.rbmtv.com/v5/';
  v5Config.UPLOADER_URL = 'https://uploader.rbmtv.com/';
  v5Config.PLAYERVERSION = 'RBM V5 Player';
  v5Config.showRegister = true;
  v5Config.rootTitle = 'RBMtv';
  v5Config.rootLogo = 'content/images/logo_rbmtv.png';
  v5Config.rootDomain = 'manage.rbmtv.com';
  v5Config.loginLogo = 'images/logo_login.png';
  v5Config.rootSupportLink = 'mailto:support@rightbrainmedia.com';
  favIcon('favicon.ico');

  Stripe.setPublishableKey('pk_live_zJFFNWawEtO5xCByeY52YHul');
}

function setEnvToMII () {
  // PRODUCTION MIIPub
  v5Config.ALLOW_DEBUG = false;
  v5Config.AUTH_URL = 'https://api-private-publisher.mirror-image.com/v5/int';
  v5Config.BASE_URL = 'https://api-private-publisher.mirror-image.com/v5/int/';
  v5Config.EXT_URL = 'https://api-private-publisher.mirror-image.com/v5/';
  v5Config.UPLOADER_URL = 'https://uploader-publisher.mirror-image.com/';
  v5Config.PLAYERVERSION = 'MI V5 Player';
  v5Config.showRegister = false;
  v5Config.rootTitle = 'MI Publisher';
  v5Config.rootLogo = 'images/logo_MI2.png';
  v5Config.rootDomain = 'publisher.mirror-image.com';
  v5Config.loginLogo = 'images/logo_login_MI.png';
  v5Config.rootSupportLink = 'mailto:support@mirror-image.com';
  favIcon('favicon-mii.ico');
}

function favIcon (iconUrl) {
  console.log('iconUrl', iconUrl);
  var link = document.getElementById('favicon');
  if (link) {
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = iconUrl;
    link.id = 'favicon';
  } else {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = iconUrl;
    link.id = 'favicon';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/*
 * Remove console in production
 */
console.log = v5Config.ALLOW_DEBUG ? console.log || noFunk : noFunk;
