var gulp = require('gulp');
var gutil = require('gulp-util');

var raml2code = require("raml2code");
var genPojos = require("raml2code-groovy-pojo");
var genJaxRS = require("raml2code-jaxrs-interfaces");
var genRetrofitClient = require("raml2code-retrofit");
var genJsClient = require("raml2code-js-client-mulesoft");


var raml = require('gulp-raml');

var packagePojo = "gex.catapi.dto";
var packageClient = "gex.catapi.client";
var packageJersey = "gex.catapi.resources";

var ramlResource = 'raml/index.raml'

gulp.task('raml', function() {
  gulp.src(ramlResource)
    .pipe(raml())
    .pipe(raml.reporter('default'))
    .pipe(raml.reporter('fail'));

});


gulp.task("genPojos", ['raml'], function(){
  gulp.src(ramlResource)
    .pipe(raml2code({generator: genPojos, extra: {package: packagePojo}}))
    .on('error', gutil.log)
    .pipe(gulp.dest('./src/generated/groovy/gex/catapi/dto'));
});


gulp.task("genRetrofitClient" , ['raml'], function(){
  gulp.src(ramlResource)
    .pipe(raml2code({generator: genRetrofitClient, extra: {package: packageClient, importPojos: packagePojo}}))
    .on('error', gutil.log)
    .pipe(gulp.dest('./src/generated/java/gex/catapi/client'));
});


gulp.task("genJaxRS" , ['raml'], function(){
  gulp.src(ramlResource)
    .pipe(raml2code({generator: genJaxRS, extra: {package: packageJersey, importPojos: packagePojo}}))
    .on('error', gutil.log)
    .pipe(gulp.dest('./src/generated/groovy/gex/catapi/resources'));
});

gulp.task("genJsClient" , ['raml'], function(){
  gulp.src(ramlResource)
    .pipe(raml2code({generator: genJsClient}))
    .on('error', gutil.log)
    .pipe(gulp.dest('./src/generated/js-client'));
});



gulp.task('build', ['raml', 'genPojos',  'genJaxRS', 'genRetrofitClient', 'genJsClient']);

gulp.task('default', ['build']);
