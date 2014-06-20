// Making the icons
var PointIcon = L.Icon.extend({
    options: {
        iconSize: [22, 25],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
    },
    onEachFeature: function (feature, layer) {
        if (feature.properties) {
            layer.bindPopup(feature.properties.name, {
                autoPanPadding: new L.Point(5, $('.navbar').height()+5)
            });
        }
    }
});

var leantoIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/leanto.png'});
var campsiteIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/campsite.png'});
var trailRegisterIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/trailhead.png'});
var allPointsIcon = new PointIcon({iconUrl: 'assets/img/longlake/historic.png'});

var boatLaunchIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/boatLaunch.png'});
var campgroundIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/campground.png'});


var commentIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/comment-map-icon.png'});
var confectionIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/confection.png'});
var museumIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/museum.png'});
var historicIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/historic.png'});
var farmIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/farm.png'});
var boozeIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/booze.png'});
var furnitureIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/furniture.png'});
var boatingIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/boating.png'});
var theaterIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/theater.png'});
var trailHeadIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/trailhead.png'});
var golfIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/golf.png'})
var ecoCenterIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/ecoCenter.png'})
var artCenterIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/artCenter.png'})
var greatCampIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/greatCamp.png'})
var parkingIcon = new PointIcon({iconUrl: 'assets/img/adkwebmap/parking.png'})


/*Long Lake  Icons*/
var libraryIcon = new PointIcon({iconUrl: 'assets/img/longlake/library.png'});
var shoppingIcon = new PointIcon({iconUrl: 'assets/img/longlake/shopping.png'});
var lodgingIcon = new PointIcon({iconUrl: 'assets/img/longlake/lodging.png'});
var schoolIcon = new PointIcon({iconUrl: 'assets/img/longlake/school.png'});
var postOfficeIcon = new PointIcon({iconUrl: 'assets/img/longlake/postOffice.png'});
var townFacilityIcon = new PointIcon({iconUrl: 'assets/img/longlake/townFacility.png'});
var gasIcon = new PointIcon({iconUrl: 'assets/img/longlake/gas.png'});
var restaurantIcon = new PointIcon({iconUrl: 'assets/img/longlake/restaurant.png'});