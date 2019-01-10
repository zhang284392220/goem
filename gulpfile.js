const gulp = require("gulp");
gulp.task("copy-html", function(){
	return gulp.src("index.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload())
})
gulp.task("html", function(){
	return gulp.src(["*.html", "!index.html"])
	.pipe(gulp.dest("dist/html"))
	.pipe(connect.reload())
})
gulp.task("images",function(){
	return gulp.src("img/*.{jpg,png,gif}")
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload())
})
gulp.task("data", function(){
	return gulp.src(["*.json", "!package.json"])
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload())
})
gulp.task("build", ["copy-html", "html", "images", "data"],function(){
	console.log("编译成功");
})
//处理css
const scss = require("gulp-scss");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task("scss", function(){
	return gulp.src("*.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	.pipe(minifyCSS())
	.pipe(rename(function(path){
		path.basename += ".min";
		path.extname = ".css";
	}))
	.pipe(gulp.dest("dist/css"))
	.pipe(connect.reload())
})
//处理js
gulp.task("script",function(){
	return gulp.src(["*.js", "!gulpfile.js"])
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload())
})
//添加监听
gulp.task("watch", function(){
	gulp.watch("index.html", ["copy-html"]);
	gulp.watch("*.html", ["html"]);
	gulp.watch("img/*.{jpg,png,gif}", ["images"]);
	gulp.watch(["*.json", "!package.json"], ["data"]);
	gulp.watch("*.scss", ["scss"]);
	gulp.watch(["*.js", "!gulpfile.js"], ["script"]);
})
//启动服务
const connect = require("gulp-connect");
gulp.task("server", function(){
	connect.server({
		root:"dist",
		port:2222,
		livereload:true
	})
})
//设置默认任务
gulp.task("default", ["watch", "server"]);
