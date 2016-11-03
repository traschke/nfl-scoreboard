/**
 * Created by Timo on 11.10.2016.
 */
/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'lib:': 'lib/'

        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': 'lib:@angular/core.umd.min.js',
            '@angular/common': 'lib:@angular/common.umd.min.js',
            '@angular/compiler': 'lib:@angular/compiler.umd.min.js',
            '@angular/platform-browser': 'lib:@angular/platform-browser.umd.min.js',
            '@angular/platform-browser-dynamic': 'lib:@angular/platform-browser-dynamic.umd.min.js',
            '@angular/http': 'lib:@angular/http.umd.min.js',
            '@angular/router': 'lib:@angular/router.umd.min.js',
            '@angular/forms': 'lib:@angular/forms.umd.min.js',
            // other libraries
            'rxjs': 'lib:rxjs'
            //'angular-in-memory-web-api': 'lib:angular-in-memory-web-api',
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            }
            // 'angular-in-memory-web-api': {
            //     main: './index.js',
            //     defaultExtension: 'js'
            // }
        }
    });
})(this);
