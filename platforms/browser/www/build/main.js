webpackJsonp([0],{

/***/ 163:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 163;

/***/ }),

/***/ 208:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 208;

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_server_service__ = __webpack_require__(255);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { Headers, Http, Response } from '@angular/http';
//import { Observable } from 'rxjs/Observable';

var HomePage = (function () {
    function HomePage(navCtrl, menuCtrl, platform, localNotifications, alertCtrl, serverService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.platform = platform;
        this.localNotifications = localNotifications;
        this.serverService = serverService;
        this.message = [];
        this.platform.ready().then(function (readySource) {
            if (_this.platform.is('cordova')) {
                console.log("Platform is cordova");
            }
            else if (_this.platform.is('android') || _this.platform.is('ios')) {
                _this.localNotifications.on('click', function (notification, state) {
                    var json = JSON.parse(notification.data);
                    var alert = alertCtrl.create({
                        title: notification.title,
                        subTitle: json.mydata
                    });
                    alert.present();
                });
            }
        });
    }
    HomePage.prototype.postCall = function () {
        var _this = this;
        console.log("Inside Post call");
        this.serverService.userInfoService()
            .subscribe(function (data) {
            console.log("Inside the data");
            console.log("Inside the data" + data._body);
            if (data.status === 200) {
                console.log("Success" + data._body);
                _this.serverText = data._body;
                _this.serverNotification();
            }
            else {
                console.log("Failure" + data.status);
            }
        }, function (error) {
            console.log("Failed Data to show");
        });
    };
    HomePage.prototype.getNotificationList = function () {
        var _this = this;
        this.serverService.getListOfNotificationMessage()
            .subscribe(function (data) {
            _this.allMessage = data;
            // console.log("title::"+data.title)  ;           
        }, function (error) {
            console.error("There is some error to get the data");
        });
    };
    HomePage.prototype.getNotification = function () {
        var _this = this;
        this.serverService.getNotificationMessage()
            .subscribe(function (data) {
            _this.message = data;
            console.log("title::" + _this.message[0].id);
            console.log("title::" + _this.message[0].title);
            _this.serverNotification();
        }, function (error) {
            console.error("There is some error to get the data");
        });
    };
    HomePage.prototype.serverNotification = function () {
        this.localNotifications.schedule({
            id: this.message.id,
            title: this.message.title,
            text: this.message.text,
            data: { mydata: 'My hidden message this is' },
            at: new Date(new Date().getTime() + 5 * 1000)
        });
    };
    HomePage.prototype.scheduleNotification = function () {
        this.localNotifications.schedule({
            id: 1,
            title: 'Attention',
            text: 'Bugtreat Notification',
            data: { mydata: 'My hidden message this is' },
            at: new Date(new Date().getTime() + 5 * 1000)
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/usr/local/MohanaProjects/ionicsample/knafapplication/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Home</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  This is the example project of Local and Push Notification in Ionic 2.\n   \n  <button ion-button full primary (click)="scheduleNotification()">Schedule User Time</button>\n  <button ion-button color="primary" (click)="postCall()" > Post Request</button>\n  <button ion-button color="danger" (click)="getNotificationList()" > Send Notification List</button>\n  <button ion-button color="primary" (click)="getNotification()" > Send Notification</button>\n  <ul>\n    <li *ngFor="let messages of allMessage">\n      {{ messages.id }}\n      {{ messages.title }}\n      {{ messages.text }}\n      </li>\n  </ul>\n\n  <ion-option *ngFor="let messages of message" >{{messages.title}}</ion-option>\n  \n</ion-content>\n'/*ion-inline-end:"/usr/local/MohanaProjects/ionicsample/knafapplication/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* MenuController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* MenuController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__["a" /* LocalNotifications */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__["a" /* LocalNotifications */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__app_server_service__["a" /* ServerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__app_server_service__["a" /* ServerService */]) === "function" && _f || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ServerService = (function () {
    function ServerService(http) {
        this.http = http;
        //baseURL =  '/ionic';
        this.baseURL = 'http://192.168.0.24:80/ionic';
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
    }
    /**UserInfo Service */
    ServerService.prototype.userInfoService = function () {
        var userData = JSON.stringify({
            username: "raja"
        });
        return this.http.post(this.baseURL + '/user.php', userData, { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    ServerService.prototype.extractData = function (res) {
        // let body = res.json();
        // let data = body;
        // return data;        
        console.log("test  1 " + res.json());
        (function (res) { return res.json(); });
        console.log("test  2 " + res);
        return res;
    };
    ServerService.prototype.getListOfNotificationMessage = function () {
        return this.http.get(this.baseURL + '/userMessageList.php')
            .map(this.extractDoctorObjectData)
            .catch(this.handleError);
    };
    ServerService.prototype.getNotificationMessage = function () {
        return this.http.get(this.baseURL + '/sendnotification.php')
            .map(this.extractDoctorObjectData)
            .catch(this.handleError);
    };
    ServerService.prototype.extractDoctorObjectData = function (res) {
        var body = res.json();
        return body;
    };
    ServerService.prototype.handleError = function (error) {
        console.error(error.message || error);
        console.error("Error Type" + error.type);
        console.error("Error Status" + error.status);
        console.error("body content for error" + error._body);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].throw(error.status);
    };
    ServerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], ServerService);
    return ServerService;
}());

//# sourceMappingURL=server.service.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// For date/time

/**
 * Generated class for the LocalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LocalPage = (function () {
    function LocalPage(navCtrl, navParams, platform, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.notifications = [];
        this.giveAlert();
        // Get the Date/Time in ISO Format
        this.time = __WEBPACK_IMPORTED_MODULE_3_moment__(new Date()).format();
        this.hours = new Date().getHours();
        this.minutes = new Date().getMinutes();
        this.days = [
            { title: 'Monday', day: 1, checked: false },
            { title: 'Tuesday', day: 2, checked: false },
            { title: 'Wednesday', day: 3, checked: false },
            { title: 'Thursday', day: 4, checked: false },
            { title: 'Friday', day: 5, checked: false },
            { title: 'Saturday', day: 6, checked: false },
            { title: 'Sunday', day: 0, checked: false }
        ];
    }
    LocalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LocalPage');
        console.log('ionViewDidLoad About2');
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* LocalNotifications */].schedule({
            id: 1,
            text: 'Single ILocalNotification',
            data: 'test'
        });
    };
    LocalPage.prototype.schedule = function () {
        // Schedule a single notification
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* LocalNotifications */].schedule({
            id: 1,
            title: "Test Single Notification",
            text: 'Hello, World!',
            sound: null
        });
    };
    // 5 seconds from now, one time notification!
    LocalPage.prototype.scheduleDelay = function () {
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* LocalNotifications */].schedule({
            id: 1,
            title: "Test Delayed Notification (5 seconds)",
            text: "Hey!",
            at: new Date(new Date().getTime() + 5 * 1000),
            sound: null,
            // Let's use an icon from external source
            icon: "https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png"
        });
    };
    LocalPage.prototype.scheduleDelayNotify = function () {
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* LocalNotifications */].schedule({
            id: 1,
            title: "User Scheduled time Notification",
            text: "Hey!",
            at: this.time,
            sound: null,
            // Let's use an icon from external source
            icon: "https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png"
        });
    };
    LocalPage.prototype.scheduleMultiple = function () {
        // Schedule multiple notifications
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* LocalNotifications */].schedule([{
                id: 1,
                title: "Test Multiple Notification 1",
                text: 'Cheer up!',
                sound: null,
            }, {
                id: 2,
                title: "Test Multiple Notification 2",
                text: 'Beautiful People!'
            }]);
    };
    LocalPage.prototype.giveAlert = function () {
        var _this = this;
        // Give the alert once the notification is clicked/scheduled
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* LocalNotifications */].on("click", function (notifications, state) {
            var alert = _this.alertCtrl.create({
                title: "Notification Clicked",
                subTitle: "You just clicked the scheduled notification",
                buttons: ["OK"]
            });
            alert.present();
        });
    };
    LocalPage.prototype.setTimeChange = function (time) {
        this.hours = time.hour.value;
        this.minutes = time.minute.value;
    };
    LocalPage.prototype.addNotifications = function () {
        var _this = this;
        var currentDate = new Date();
        var currentDay = currentDate.getDay();
        for (var _i = 0, _a = this.days; _i < _a.length; _i++) {
            var day = _a[_i];
            if (day.checked) {
                var firstNotificationTime = new Date();
                var dayDifference = day.day - currentDay;
                if (dayDifference < 0) {
                    dayDifference = dayDifference + 7;
                }
                firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
                firstNotificationTime.setHours(this.hours);
                firstNotificationTime.setMinutes(this.minutes);
                var notification = {
                    id: day.day,
                    title: 'Hey!',
                    text: 'You just got notified :)',
                    at: firstNotificationTime,
                    every: 'week'
                };
                this.notifications.push(notification);
            }
        }
        console.log("Notifications to be scheduled: ", this.notifications);
        if (this.platform.is('cordova')) {
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* LocalNotifications */].cancelAll().then(function () {
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* LocalNotifications */].schedule(_this.notifications);
                _this.notifications = [];
                var alert = _this.alertCtrl.create({
                    title: 'Notifications set',
                    buttons: ['Ok']
                });
                alert.present();
            });
        }
    };
    LocalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-local',template:/*ion-inline-start:"/usr/local/MohanaProjects/ionicsample/knafapplication/src/pages/local/local.html"*/'<!--\n  Generated template for the LocalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Local</ion-title>\n  </ion-navbar>\n </ion-header>\n\n <ion-content padding>\n  This is a local notification page. You need to set the app to background to get the Scheduled notification. One time notification can be received while the app is running in the foreground.\n  \n   \n  \n  <div>\n  <br>\n  <h2>Schedule</h2>\n  <button ion-button full primary (click)="schedule()">Schedule Single</button>\n  <button ion-button full primary (click)="scheduleDelay()">Schedule Delay</button>\n  <button ion-button full primary (click)="scheduleMultiple()">Schedule Multiple</button>\n  <button ion-button full primary (click)="scheduleDelayNotify()">Schedule User Time</button>\n  </div>\n  \n  <div>\n  <br>\n  <h2>Schedule With Date and Time</h2>\n  <ion-list no-lines>\n  \n  <ion-item>\n      <ion-label>Notify me at: </ion-label>\n   <ion-datetime displayFormat="h:mm A" pickerFormat="h mm A" [(ngModel)]="time" (ionChange)="setTimeChange($event)"></ion-datetime>\n  </ion-item>\n  <ion-item>\n      <ion-label>on the following days:</ion-label>\n  </ion-item>\n  <ion-item *ngFor="let day of days">\n  <ion-label>{{day.title}}</ion-label>\n  <ion-checkbox [(ngModel)]="day.checked" color="primary"></ion-checkbox>\n  </ion-item>\n  \n  </ion-list>\n  <button (click)="addNotifications()" ion-button full>Schedule</button>\n  <button (click)="cancelAll()" ion-button color="danger" full>Leave me alone!</button>\n  </div>\n  </ion-content>\n'/*ion-inline-end:"/usr/local/MohanaProjects/ionicsample/knafapplication/src/pages/local/local.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], LocalPage);
    return LocalPage;
}());

//# sourceMappingURL=local.js.map

/***/ }),

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PushPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(348);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the PushPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PushPage = (function () {
    function PushPage(navCtrl, navParams, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.initializeApp();
        console.log('constructor for push page');
    }
    PushPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PushPage');
    };
    PushPage.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            if (_this.platform.is('android') || _this.platform.is('ios')) {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["b" /* StatusBar */].styleDefault();
                console.log("Platform is " + _this.platform.is('android'));
                if (typeof FCMPlugin != 'undefined') {
                    //  debugger;
                    FCMPlugin.getToken(function (token) {
                        //    debugger;
                        console.log("FCM Token" + token);
                        alert("FCM Token" + token);
                    }, function (err) {
                        console.log('error retrieving token: ' + err);
                    });
                }
                // Notifications is supposed to be received on device tray
                FCMPlugin.onNotification(function (data) {
                    if (data.wasTapped) {
                        // Notification is tapped by the user on device tray
                        alert(JSON.stringify(data));
                    }
                    else {
                        //Notification is received in foreground
                        alert(JSON.stringify(data));
                    }
                }, function (msg) {
                    console.log('onNotification callback successfully registered: ' + msg);
                }, function (err) {
                    console.log('Error registering onNotification callback: ' + err);
                });
            }
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], PushPage.prototype, "nav", void 0);
    PushPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-push',template:/*ion-inline-start:"/usr/local/MohanaProjects/ionicsample/knafapplication/src/pages/push/push.html"*/'<ion-content padding>\n  <ion-header>\n<ion-navbar>\n  <button ion-button menuToggle>\n    <ion-icon name="menu"></ion-icon>\n  </button>\n  <ion-title>Push</ion-title>\n</ion-navbar>\n</ion-header>\n\n<ion-content padding>\n This is a push notification page. You can close the app now and send the message from the Firebase console, \n and you will receive the notification on your device. Clicking on the notification will open the application again. \n Unlike local notifications, you are receiving messages from a server instead of a device itself.   \n    \n   \n   </ion-content>'/*ion-inline-end:"/usr/local/MohanaProjects/ionicsample/knafapplication/src/pages/push/push.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
    ], PushPage);
    return PushPage;
}());

//# sourceMappingURL=push.js.map

/***/ }),

/***/ 601:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConfirmPage = (function () {
    function ConfirmPage(alerCtrl) {
        this.alerCtrl = alerCtrl;
    }
    ConfirmPage.prototype.doConfirm = function () {
        var confirm = this.alerCtrl.create({
            title: 'Use this lightsaber?',
            message: 'Do you agree to use this lightsaber to do good across the intergalactic galaxy?',
            buttons: [
                {
                    text: 'Disagree',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Agree',
                    handler: function () {
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    ConfirmPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-confirm',template:/*ion-inline-start:"/usr/local/MohanaProjects/ionicsample/knafapplication/src/pages/confirm/confirm.html"*/'<!--\n  Generated template for the ConfirmPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Confirm</ion-title>\n  </ion-navbar>\n </ion-header>\n\n<ion-content padding>\n  <button ion-button color="primary" block (click)="doConfirm()">Show Confirm Alert</button>\n</ion-content>\n'/*ion-inline-end:"/usr/local/MohanaProjects/ionicsample/knafapplication/src/pages/confirm/confirm.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ConfirmPage);
    return ConfirmPage;
}());

//# sourceMappingURL=confirm.js.map

/***/ }),

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IpushPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { Push, PushObject, PushOptions } from '@ionic-native/push';
/**
 * Generated class for the IpushPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var IpushPage = (function () {
    function IpushPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    IpushPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IpushPage');
    };
    IpushPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ipush',template:/*ion-inline-start:"/usr/local/MohanaProjects/ionicsample/knafapplication/src/pages/ipush/ipush.html"*/'<!--\n  Generated template for the IpushPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>ipush</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/usr/local/MohanaProjects/ionicsample/knafapplication/src/pages/ipush/ipush.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], IpushPage);
    return IpushPage;
}());

//# sourceMappingURL=ipush.js.map

/***/ }),

/***/ 604:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);



Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_14" /* enableProdMode */])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(652);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_push_push__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_local_local__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_local_notifications__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_confirm_confirm__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_push__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__server_service__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_ipush_ipush__ = __webpack_require__(603);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










//import { LocalNotifications } from 'ionic-native';





var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_local_local__["a" /* LocalPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_confirm_confirm__["a" /* ConfirmPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_push_push__["a" /* PushPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_ipush_ipush__["a" /* IpushPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_local_local__["a" /* LocalPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_confirm_confirm__["a" /* ConfirmPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_push_push__["a" /* PushPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_ipush_ipush__["a" /* IpushPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_8__pages_push_push__["a" /* PushPage */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_push__["a" /* Push */],
                __WEBPACK_IMPORTED_MODULE_13__server_service__["a" /* ServerService */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_local_notifications__["a" /* LocalNotifications */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 652:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_local_local__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_push_push__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_confirm_confirm__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_push__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_ipush_ipush__ = __webpack_require__(603);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, push, alertCtrl) {
        var _this = this;
        this.push = push;
        this.alertCtrl = alertCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            console.log("Hi Device is ready");
            statusBar.styleLightContent();
            splashScreen.hide();
            _this.initPushNotification();
        });
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'Local', component: __WEBPACK_IMPORTED_MODULE_5__pages_local_local__["a" /* LocalPage */] },
            { title: 'Confirm', component: __WEBPACK_IMPORTED_MODULE_7__pages_confirm_confirm__["a" /* ConfirmPage */] },
            { title: 'Push', component: __WEBPACK_IMPORTED_MODULE_6__pages_push_push__["a" /* PushPage */] },
            { title: 'IPush', component: __WEBPACK_IMPORTED_MODULE_9__pages_ipush_ipush__["a" /* IpushPage */] }
        ];
    }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.initPushNotification = function () {
        var _this = this;
        // to check if we have permission
        this.push.hasPermission()
            .then(function (res) {
            if (res.isEnabled) {
                console.log('We have permission to send push notifications');
            }
            else {
                console.log('We don\'t have permission to send push notifications');
            }
        });
        // to initialize push notifications
        var options = {
            android: {
                senderID: '709609223040'
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: 'false'
            },
            windows: {}
        };
        var pushObject = this.push.init(options);
        pushObject.on('notification').subscribe(function (notification) {
            console.log('Received a notification', notification);
            //Notification Display Section
            var confirmAlert = _this.alertCtrl.create({
                title: 'New Notification',
                message: JSON.stringify(notification),
                buttons: [{
                        text: 'Ignore',
                        role: 'cancel'
                    }, {
                        text: 'View',
                        handler: function () {
                            //TODO: Your logic here
                            //self.nav.push(DetailsPage, {message: data.message});
                        }
                    }]
            });
            confirmAlert.present();
            //
        });
        pushObject.on('registration').
            subscribe(function (registration) {
            return console.log('Device registered', registration);
        });
        pushObject.on('error').
            subscribe(function (error) {
            return console.error('Error with Push plugin', error);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/usr/local/MohanaProjects/ionicsample/knafapplication/src/app/app.html"*/'<ion-menu [content]="content">\n    <ion-header>\n      <ion-toolbar>\n        <ion-title>Menu</ion-title>\n      </ion-toolbar>\n    </ion-header>\n  \n    <ion-content>\n      <ion-list>\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n          {{p.title}}\n        </button>\n      </ion-list>\n    </ion-content>\n  \n  </ion-menu>\n  \n  <!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/usr/local/MohanaProjects/ionicsample/knafapplication/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_push__["a" /* Push */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 936:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 481,
	"./af.js": 481,
	"./ar": 482,
	"./ar-dz": 483,
	"./ar-dz.js": 483,
	"./ar-kw": 484,
	"./ar-kw.js": 484,
	"./ar-ly": 485,
	"./ar-ly.js": 485,
	"./ar-ma": 486,
	"./ar-ma.js": 486,
	"./ar-sa": 487,
	"./ar-sa.js": 487,
	"./ar-tn": 488,
	"./ar-tn.js": 488,
	"./ar.js": 482,
	"./az": 489,
	"./az.js": 489,
	"./be": 490,
	"./be.js": 490,
	"./bg": 491,
	"./bg.js": 491,
	"./bm": 492,
	"./bm.js": 492,
	"./bn": 493,
	"./bn.js": 493,
	"./bo": 494,
	"./bo.js": 494,
	"./br": 495,
	"./br.js": 495,
	"./bs": 496,
	"./bs.js": 496,
	"./ca": 497,
	"./ca.js": 497,
	"./cs": 498,
	"./cs.js": 498,
	"./cv": 499,
	"./cv.js": 499,
	"./cy": 500,
	"./cy.js": 500,
	"./da": 501,
	"./da.js": 501,
	"./de": 502,
	"./de-at": 503,
	"./de-at.js": 503,
	"./de-ch": 504,
	"./de-ch.js": 504,
	"./de.js": 502,
	"./dv": 505,
	"./dv.js": 505,
	"./el": 506,
	"./el.js": 506,
	"./en-au": 507,
	"./en-au.js": 507,
	"./en-ca": 508,
	"./en-ca.js": 508,
	"./en-gb": 509,
	"./en-gb.js": 509,
	"./en-ie": 510,
	"./en-ie.js": 510,
	"./en-nz": 511,
	"./en-nz.js": 511,
	"./eo": 512,
	"./eo.js": 512,
	"./es": 513,
	"./es-do": 514,
	"./es-do.js": 514,
	"./es-us": 515,
	"./es-us.js": 515,
	"./es.js": 513,
	"./et": 516,
	"./et.js": 516,
	"./eu": 517,
	"./eu.js": 517,
	"./fa": 518,
	"./fa.js": 518,
	"./fi": 519,
	"./fi.js": 519,
	"./fo": 520,
	"./fo.js": 520,
	"./fr": 521,
	"./fr-ca": 522,
	"./fr-ca.js": 522,
	"./fr-ch": 523,
	"./fr-ch.js": 523,
	"./fr.js": 521,
	"./fy": 524,
	"./fy.js": 524,
	"./gd": 525,
	"./gd.js": 525,
	"./gl": 526,
	"./gl.js": 526,
	"./gom-latn": 527,
	"./gom-latn.js": 527,
	"./gu": 528,
	"./gu.js": 528,
	"./he": 529,
	"./he.js": 529,
	"./hi": 530,
	"./hi.js": 530,
	"./hr": 531,
	"./hr.js": 531,
	"./hu": 532,
	"./hu.js": 532,
	"./hy-am": 533,
	"./hy-am.js": 533,
	"./id": 534,
	"./id.js": 534,
	"./is": 535,
	"./is.js": 535,
	"./it": 536,
	"./it.js": 536,
	"./ja": 537,
	"./ja.js": 537,
	"./jv": 538,
	"./jv.js": 538,
	"./ka": 539,
	"./ka.js": 539,
	"./kk": 540,
	"./kk.js": 540,
	"./km": 541,
	"./km.js": 541,
	"./kn": 542,
	"./kn.js": 542,
	"./ko": 543,
	"./ko.js": 543,
	"./ky": 544,
	"./ky.js": 544,
	"./lb": 545,
	"./lb.js": 545,
	"./lo": 546,
	"./lo.js": 546,
	"./lt": 547,
	"./lt.js": 547,
	"./lv": 548,
	"./lv.js": 548,
	"./me": 549,
	"./me.js": 549,
	"./mi": 550,
	"./mi.js": 550,
	"./mk": 551,
	"./mk.js": 551,
	"./ml": 552,
	"./ml.js": 552,
	"./mr": 553,
	"./mr.js": 553,
	"./ms": 554,
	"./ms-my": 555,
	"./ms-my.js": 555,
	"./ms.js": 554,
	"./mt": 556,
	"./mt.js": 556,
	"./my": 557,
	"./my.js": 557,
	"./nb": 558,
	"./nb.js": 558,
	"./ne": 559,
	"./ne.js": 559,
	"./nl": 560,
	"./nl-be": 561,
	"./nl-be.js": 561,
	"./nl.js": 560,
	"./nn": 562,
	"./nn.js": 562,
	"./pa-in": 563,
	"./pa-in.js": 563,
	"./pl": 564,
	"./pl.js": 564,
	"./pt": 565,
	"./pt-br": 566,
	"./pt-br.js": 566,
	"./pt.js": 565,
	"./ro": 567,
	"./ro.js": 567,
	"./ru": 568,
	"./ru.js": 568,
	"./sd": 569,
	"./sd.js": 569,
	"./se": 570,
	"./se.js": 570,
	"./si": 571,
	"./si.js": 571,
	"./sk": 572,
	"./sk.js": 572,
	"./sl": 573,
	"./sl.js": 573,
	"./sq": 574,
	"./sq.js": 574,
	"./sr": 575,
	"./sr-cyrl": 576,
	"./sr-cyrl.js": 576,
	"./sr.js": 575,
	"./ss": 577,
	"./ss.js": 577,
	"./sv": 578,
	"./sv.js": 578,
	"./sw": 579,
	"./sw.js": 579,
	"./ta": 580,
	"./ta.js": 580,
	"./te": 581,
	"./te.js": 581,
	"./tet": 582,
	"./tet.js": 582,
	"./th": 583,
	"./th.js": 583,
	"./tl-ph": 584,
	"./tl-ph.js": 584,
	"./tlh": 585,
	"./tlh.js": 585,
	"./tr": 586,
	"./tr.js": 586,
	"./tzl": 587,
	"./tzl.js": 587,
	"./tzm": 588,
	"./tzm-latn": 589,
	"./tzm-latn.js": 589,
	"./tzm.js": 588,
	"./uk": 590,
	"./uk.js": 590,
	"./ur": 591,
	"./ur.js": 591,
	"./uz": 592,
	"./uz-latn": 593,
	"./uz-latn.js": 593,
	"./uz.js": 592,
	"./vi": 594,
	"./vi.js": 594,
	"./x-pseudo": 595,
	"./x-pseudo.js": 595,
	"./yo": 596,
	"./yo.js": 596,
	"./zh-cn": 597,
	"./zh-cn.js": 597,
	"./zh-hk": 598,
	"./zh-hk.js": 598,
	"./zh-tw": 599,
	"./zh-tw.js": 599
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 936;

/***/ })

},[604]);
//# sourceMappingURL=main.js.map