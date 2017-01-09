// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova','pascalprecht.translate', 'starter.controllers'])

.run(function($ionicPlatform,$cordovaFlashlight,$cordovaGlobalization,$translate) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    $cordovaFlashlight.available().then(function(availability) {

        $cordovaFlashlight.switchOn().then(
          function (success) {
              console.log("Flashlight is on !");
          },
          function (error) {
            console.log('Error while switching Flashlight on')
          }
        );

    }, function () {

      alert('Flashlight is not available');

    });
    
    $cordovaGlobalization.getPreferredLanguage().then(
            function(result) {
              console.log("the language " + angular.toJson(result));
              var parts = result.value.split('-');
              if(parts.length > 0)
              {
                var lang = parts[0];
                $translate.use(lang);
              }else
              {
                $translate.use('en');
              }
            },
            function(error) {

    });
    
    window.plugins.AdMob.setOptions( {
        publisherId: 'ca-app-pub-9293763250492023/8573028797',
        interstitialAdId: '',
        bannerAtTop: false,   // set to true, to put banner at top
        overlap: false,       // set to true, to allow banner overlap webview
        offsetTopBar: false,  // set to true to avoid ios7 status bar overlap
        isTesting: true,      // receiving test ad
        autoShow: true        // auto show interstitial ad when loaded
        });

    window.plugins.AdMob.createBannerView();
  
  });
})

.config(function($stateProvider, $urlRouterProvider,$translateProvider) {
	
	  var en_translations = {
			    app_title : "EasyLight",
			    app_desc : "EasyLight lets you use your mobile as a flashlight",
			    app_author : "Built by Ahmed Bouchefra",
			    light_on : "Switch the light on",
			    light_off : "Switch the light off",
			    enable_accelo : "Enable/Disable the accelometer",
			    menu_home: "Home",
			    menu_about: "About",
			    rate: "Rate"
			  };
			  var fr_translations = {
			    app_title : "TorcheSimple",
			    app_desc : "TorcheSimple vous permets d'utiliser votre phone comme une torche ",
			    app_author : "Crée par Ahmed Bouchefra",    
			    light_on : "Activer/Désactiver l'éclairage",
			    light_off : "Éteindre l'éclairage ",
			    enable_accelo : "Activer l'accéléromètre" ,
			    menu_home: "Principal",
			    menu_about: "A Propos",
			    rate: "Rate"
			  };
			  
			var ar_translations = {
			  app_title : "شعلة",
			  app_desc : "شعلة تطبيق يسمح لك باستعمال المحمول كمصباح يدوي بكل سهولة",
			  app_author : "المبرمج : احمد بوشفرة",
			  light_on : "أشعل النور",
			  light_off : "أطفئ النور",
			  enable_accelo : "تمكين التسارع",
			  menu_home: "الصفحة الرئيسية",
			  menu_about: "حول",
			  rate: "Rate"
			  };

			    $translateProvider
			        .translations('en', en_translations) // we provide English translations
			        .translations('fr',fr_translations)  // Frensh translations
			        .translations('ar',ar_translations)  // Arabic translations
			        .preferredLanguage('en');            // we set the default language
			    
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
  })
  
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
  //$urlRouterProvider.otherwise('/app/home');
});
