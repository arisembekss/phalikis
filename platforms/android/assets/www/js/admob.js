var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { 
    admobid = { // for Android
        banner: 'ca-app-pub-6611308189785883/4393736851',
        interstitial: ''
    };
} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
    admobid = { // for iOS
        banner: '',
        interstitial: ''
    };
} else {
    admobid = { // for Windows Phone
        banner: '',
        interstitial: ''
    };
}


if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
    //document.addEventListener('deviceready', initApp, false);
} else {
    //initApp();
}

function initApp() {
    //if (! AdMob ) { alert( 'admob plugin not ready' ); return; }

    AdMob.createBanner( {
        adId: admobid.banner, 
        isTesting: true,
        overlap: true, 
        offsetTopBar: false, 
        position: AdMob.AD_POSITION.TOP_CENTER,
        bgColor: 'black'
    } );
    
   /* AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        autoShow: true
    });*/
}

function showInters(){
    AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        autoShow: true
    });
}
