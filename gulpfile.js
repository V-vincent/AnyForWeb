var gulp=require('gulp');
var less=require('gulp-less');
var connect=require('gulp-connect');
var open=require('open');

//jquery
gulp.task("jquery",function(){
    gulp.src("bower_components/jquery/dist/**")   //读取文件
        .pipe(gulp.dest("build/lib/jquery"))  //复制到开发环境
        .pipe(gulp.dest("dev/lib/jquery"));  //复制到生产环境
});
//复制html
gulp.task('html',function () {
    gulp.src('src/*.html')//读取文件
        .pipe(gulp.dest("build/"))//复制到开发环境
        .pipe(gulp.dest("dev/"));//复制到生产环境
});
//复制css
gulp.task('css',function () {
    gulp.src('src/css/*.css')//读取文件
        .pipe(gulp.dest("build/css/"))//复制到开发环境
        .pipe(gulp.dest("dev/css/"));//复制到生产环境
});
//复制js
gulp.task('js',function () {
    gulp.src('src/js/*.js')//读取文件
        .pipe(gulp.dest("build/js/"))//复制到开发环境
        .pipe(gulp.dest("dev/js/"));//复制到生产环境
});
//复制img
gulp.task('images',function () {
    gulp.src('src/images/**')//读取文件
        .pipe(gulp.dest("build/images/"))//复制到开发环境
        .pipe(gulp.dest("dev/images/"));//复制到生产环境
});
//编译less
gulp.task('lessTask',function () {
    gulp.src('src/less/base.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});

//总的任务
gulp.task("build",["lessTask","images","html","css","jquery","js"]);

//监控自动刷新页面  自动编译  自动打包  自动压缩
//自动刷新，自动打开
gulp.task("server",function(){
    connect.server({
        root:"build/",
        port: 8000,
        livereload: true
    });

    open("http://localhost:8000");

    gulp.watch("src/*.html",["html"]);
    gulp.watch("src/images/**",["images"]);
    gulp.watch("src/css/*.css",["css"]);
    gulp.watch("src/js/*.js",["js"]);
    gulp.watch("src/less/*.less",["lessTask"]);
    //         (监控文件   ，  任务名字)
});

//默认任务
gulp.task('default', ['server']);