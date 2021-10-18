const 
    bs            = require('browser-sync').create(),
    gulp          = require('gulp'),
    autoprefixer  = require('gulp-autoprefixer'),
    clean         = require('gulp-clean'),
    jshint        = require('gulp-jshint'),
    concat        = require('gulp-concat'),
    sass          = require('gulp-sass'),
    imagemin      = require('gulp-imagemin'),
    minimist      = require('minimist'),
    jsonEditor    = require('gulp-json-editor'),
    replace       = require('gulp-replace'),
    rename        = require('gulp-rename'),
    uglify        = require('gulp-uglify'),
    notify        = require('gulp-notify'),
    cleanCSS      = require('gulp-clean-css'),
    project       = require('./project-details.json');

// Set distribution folder/path
var dist = './wwwroot/';
if (__dirname.split("\\").pop() === 'Design') {
  dist = '../src/' + project.name + '.Web/wwwroot/'
}

const paths = {
  fonts: {
    src: './src/fonts/*',
    dest: dist + 'fonts/'
  },
  faFonts: {
    src: './node_modules/@fortawesome/fontawesome-free/webfonts/*',
    dest: dist + 'webfonts/'
  },
  faCss: {
    src: './node_modules/@fortawesome/fontawesome-free/css/all.min.css',
    dest: dist + 'css/'
  },
  bsJs: {
    src: './node_modules/bootstrap/dist/js/bootstrap.bundle.min.*',
    dest: dist + 'js/'
  },
  favicon: {
    src: './favicon.ico',
    dest: dist
  },
  images: {
    src: './src/images/**/*.{jpg,jpeg,png,gif,svg}',
    dest: dist + 'images/'
  },
  styles: {
    src: './src/scss/**/*.scss',
    dest: dist + 'css/'
  },
  scripts: {
    src: './src/js/*.js',
    dest: dist + 'js/'
  },
  assets: {
    src: './src/assets/*.js',
    dest: dist + 'js/'
  },
  jquery: {
    src: './node_modules/jquery/dist/jquery.min.js',
    dest: dist + 'js'
  },
  jqueryValidation: {
    src: './node_modules/jquery-validation/dist/*.min.js',
    dest: dist + 'js'
  },
  jqueryValidationUnobtrusive: {
    src: './node_modules/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.min.js',
    dest: dist + 'js'
  },
  jsImageZoom: {
    src: './node_modules/js-image-zoom/js-image-zoom.js',
    dest: dist + 'js'
  },
  clipboard: {
    src: './node_modules/clipboard/dist/clipboard.min.js',
    dest: dist + 'js'
  },
  select2: {
    srcjs: './node_modules/select2/dist/js/select2.min.js',
    destjs: dist + 'js',
    srccss: './node_modules/select2/dist/css/select2.min.css',
    destcss: dist + 'css'
  },
  datatables: {
    srcjs: [
      './node_modules/datatables.net/js/jquery.dataTables.min.js',
      './node_modules/datatables.net-dt/js/dataTables.dataTables.min.js',
      './node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js',
      './node_modules/datatables.net-responsive/js/dataTables.responsive.min.js',
      './node_modules/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js'
    ],
    srccss: [
      './node_modules/datatables.net-dt/css/jquery.dataTables.min.css',
      './node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css',
      './node_modules/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css'
    ],
    destjs: dist + 'js',
    destcss: dist + 'css'
  },
  gijgo: {
    srcjs: './node_modules/gijgo/js/gijgo.min.js',
    destjs: dist + 'js',
    srccss: './node_modules/gijgo/css/gijgo.min.css',
    destcss: dist + 'css'
  },
  chartjs: {
    srcjs: './node_modules/chart.js/dist/Chart.min.js',
    destjs: dist + 'js',
    srccss: './node_modules/chart.js/dist/Chart.min.css',
    destcss: dist + 'css'
  },
  monacoEditor: {
    srcpkg: './node_modules/monaco-editor/min/vs/**/*',
    destpkg: dist + 'js/monaco-editor'
  },
  timeElements: {
    srcjs: './node_modules/@github/time-elements/dist/time-elements.js',
    destjs: dist + 'js'
  },
  cleandist: {
    src: {
      root: dist + '*.*',
      css: dist + '/css',
      fonts: dist + '/fonts',
      images: dist + '/images',
      js: dist + '/js',
      webfonts: dist + '/webfonts'
    }
  }
};
    

/*------------------------------------------------------*/
/* INIT TASKS ------------------------------------------*/
/*------------------------------------------------------*/
// Copy fonts from src/fonts to dist/fonts
function fontsInit() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'fontsInit', sound: false}));
}

// Copy fontawesome-free fonts from node_modules to dist/fonts
function faFontsInit() {
  return gulp.src(paths.faFonts.src)
    .pipe(gulp.dest(paths.faFonts.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'faFontsInit', sound: false}));
}

// Copy fontawesome-free CSS from node_modules to dist/css/fontawesome-free
function faCssInit() {
  return gulp.src(paths.faCss.src)
    .pipe(gulp.dest(paths.faCss.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'faCssInit', sound: false}));
}

// Copy bootstrap JS from node_modules to dist/js
function bsJsInit() {
  return gulp.src(paths.bsJs.src)
    .pipe(gulp.dest(paths.bsJs.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'bsJsInit', sound: false}));
}

// Assets Init
function assetsInit() {
  return gulp.src(paths.assets.src)
    .pipe(gulp.dest(paths.assets.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'assetsInit', sound: false}));
}

// favicon Init
function faviconInit() {
  return gulp.src(paths.favicon.src)
    .pipe(gulp.dest(paths.favicon.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'faviconInit', sound: false}));
}

// jquery Init
function jqueryInit() {
  return gulp.src(paths.jquery.src)
    .pipe(gulp.dest(paths.jquery.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'jqueryInit', sound: false}));
}

// jquery-validation Init
function jqueryValidationInit() {
  return gulp.src(paths.jqueryValidation.src)
    .pipe(gulp.dest(paths.jqueryValidation.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'jqueryValidationInit', sound: false}));
}

// jquery-validation-unobtrusive Init
function jqueryValidationUnobtrusiveInit() {
  return gulp.src(paths.jqueryValidationUnobtrusive.src)
    .pipe(gulp.dest(paths.jqueryValidationUnobtrusive.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'jqueryValidationUnobtrusiveInit', sound: false}));
}

// Copy js-image-zoom from node_modules to dist/js
function jsImageZoomInit() {
  return gulp.src(paths.jsImageZoom.src)
    .pipe(gulp.dest(paths.jsImageZoom.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'jsImageZoomInit', sound: false}));
}

// Clipboard Init
function clipboardInit() {
  return gulp.src(paths.clipboard.src)
    .pipe(gulp.dest(paths.clipboard.dest))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'clipboardInit', sound: false}));
}

// Select2 JS Init
function select2JsInit() {
  return gulp.src(paths.select2.srcjs)
    .pipe(gulp.dest(paths.select2.destjs))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'select2JsInit', sound: false}));
}

// Select2 CSS Init
function select2CssInit() {
  return gulp.src(paths.select2.srccss)
    .pipe(gulp.dest(paths.select2.destcss))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'select2CssInit', sound: false}));
}

// Datatable JS Init
function datatablesJsInit() {
  return gulp.src(paths.datatables.srcjs)
    .pipe(gulp.dest(paths.datatables.destjs))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'datatablesJsInit', sound: false}));
}

// Datatable CSS Init
function datatablesCssInit() {
  return gulp.src(paths.datatables.srccss)
    .pipe(gulp.dest(paths.datatables.destcss))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'datatablesCssInit', sound: false}));
}

// Gijgo JS Init
function gijgoJsInit() {
  return gulp.src(paths.gijgo.srcjs)
    .pipe(gulp.dest(paths.gijgo.destjs))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'gijgoJsInit', sound: false}));
}

// Gijgo CSS Init
function gijgoCssInit() {
  return gulp.src(paths.gijgo.srccss)
    .pipe(gulp.dest(paths.gijgo.destcss))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'gijgoCssInit', sound: false}));
}

// Chart.js JS Init
function chartjsJsInit() {
  return gulp.src(paths.chartjs.srcjs)
    .pipe(gulp.dest(paths.chartjs.destjs))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'chartjsJsInit', sound: false}));
}

// Chart.js CSS Init
function chartjsCssInit() {
  return gulp.src(paths.chartjs.srccss)
    .pipe(gulp.dest(paths.chartjs.destcss))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'chartjsCssInit', sound: false}));
}

// Monaco Editor Pkg Init
function monacoEditorPkgInit() {
  return gulp.src(paths.monacoEditor.srcpkg)
    .pipe(gulp.dest(paths.monacoEditor.destpkg))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'monacoEditorPkgInit', sound: false}));
}

// time-elements JS Init
function timeElementsJsInit() {
  return gulp.src(paths.timeElements.srcjs)
    .pipe(gulp.dest(paths.timeElements.destjs))
    .pipe(notify({message: '<%= file.relative %> distributed!', title : 'timeElementsJsInit', sound: false}));
}

/*------------------------------------------------------*/
/* END INIT TASKS --------------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* IMAGE TASKS -----------------------------------------*/
/*------------------------------------------------------*/
// Optimize images and copy to dist/images
function images() {
  return gulp.src(paths.images.src, {since: gulp.lastRun(images)})
		.pipe(imagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [{removeViewBox: true}]
    }))
		.pipe(gulp.dest(paths.images.dest))
    .pipe(notify({message: '<%= file.relative %> optimized!', title : 'images', sound: false}));
}
/*------------------------------------------------------*/
/* END IMAGE TASKS -------------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* STYLES TASKS ----------------------------------------*/
/*------------------------------------------------------*/
// Compile custom SCSS to CSS and copy to dist/css
function styles() {
  return gulp.src(paths.styles.src, { sourcemaps: true })
  .pipe(sass({includePaths: ['./node_modules']},{outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(cleanCSS())
  .pipe(rename({suffix: '.min'}))
  .pipe(autoprefixer())
  .pipe(gulp.dest(paths.styles.dest, { sourcemaps: '.' }))
  .pipe(notify({message: '<%= file.relative %> compiled and distributed!', title : 'styles', sound: false}));
}
/*------------------------------------------------------*/
/* END STYLES TASKS ------------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* SCRIPTS TASKS ---------------------------------------*/
/*------------------------------------------------------*/
// Compile custom JS and copy to dist/js
function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.scripts.dest, { sourcemaps: '.' }))
    .pipe(notify({ message : '<%= file.relative %> minified!', title : "scripts", sound: false}));
}
/*------------------------------------------------------*/
/* END SCRIPTS TASKS -----------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* MAINTENANCE TASKS -----------------------------------*/
/*------------------------------------------------------*/
// Clean up dist folder
function cleandist() {
  return gulp.src([paths.cleandist.src.root, paths.cleandist.src.css, paths.cleandist.src.fonts, paths.cleandist.src.images, paths.cleandist.src.js, paths.cleandist.src.webfonts], { allowEmpty: true })
    .pipe(clean({force: true}))
    .pipe(notify({message: dist +  ' folder cleaned up!', title : 'cleandist', onLast: true, sound: false}));
}
/*------------------------------------------------------*/
/* END MAINTENANCE TASKS -------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* DEV TASKS -------------------------------------------*/
/*------------------------------------------------------*/
//gulp serve
function serve() {
  bs.init({
      server: true
  });
  watch();
  gulp.watch(['**/*.html', dist + '**/*']).on('change', bs.reload);
}

// gulp watch
function watch() {
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
}

// gulp init
function init(done) {
  gulp.series(fontsInit, faFontsInit, faCssInit, bsJsInit, assetsInit, faviconInit, jqueryInit, jqueryValidationInit, jqueryValidationUnobtrusiveInit, jsImageZoomInit, clipboardInit, select2JsInit, select2CssInit, datatablesJsInit, datatablesCssInit, gijgoJsInit, gijgoCssInit, chartjsJsInit, chartjsCssInit, monacoEditorPkgInit, timeElementsJsInit)(done);
}


// gulp build
function build(done) {
  gulp.series(cleandist, init, styles, scripts, images)(done);
}
/*------------------------------------------------------*/
/* END DEV TASKS ---------------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* PROJECT TASKS ---------------------------------------*/
/*------------------------------------------------------*/
// read args
var args = minimist(process.argv.slice(2), {
  string: 'name',
  default: { name: project.name }
});

// gulp newProject
function cleanProjectNew() {
  return gulp.src('./_newProject', { allowEmpty: true })
    .pipe(clean())
    .pipe(notify({message: './_newProject folder cleaned up!', title : 'cleanProjectNew', sound: false}));
}

function copyProjectNew() {
  return gulp.src([
    'src/**/*',
    '*.*',
    '.gitignore',
    '.jshintignore',
    '!index.html'
  ], {base: '.'})
    .pipe(gulp.dest('_newProject'));
}

function modifyIndexNew() {
  return gulp.src('./_newProject/index-rendered.html')
  .pipe(rename('./_newProject/index.html'))
  .pipe(replace('{ProjectName}', project.name))
  .pipe(gulp.dest("./"));
}

function cleanIndexNew() {
  return gulp.src('./_newProject/index-rendered.html', { force: true })
    .pipe(clean())
    .pipe(notify({message: './_newProject/index-rendered.html removed!', title : 'cleanIndexNew', sound: false}));
}

function setProjectNameNew() {
  project.name = args.name;
  return gulp.src('./project-details.json')
    .pipe(jsonEditor({'name': args.name}))
    .pipe(gulp.dest('./'))
    .pipe(notify({message: 'Project name set to ' + args.name + '!', title : 'setProjectNameNew', sound: false}));
}

function newProject(done) {
  gulp.series(setProjectNameNew, build, cleanProjectNew, copyProjectNew, modifyIndexNew, cleanIndexNew)(done);
}

// gulp updateProject
function copyProjectUpdate() {
  return gulp.src([
    'src/**/*',
    '*.*',
    '.gitignore',
    '.jshintignore',
    '!index.html',
    '!src/scss/variables/_bs-overrides.scss',
    '!favicon.ico'
], {base: '.'})
    .pipe(gulp.dest('_updateProject'));
}

function modifyIndexUpdate() {
  return gulp.src('./_updateProject/index-rendered.html')
  .pipe(rename('./_updateProject/index.html'))
  .pipe(replace('{ProjectName}', project.name))
  .pipe(gulp.dest("./"));
}

function cleanIndexUpdate() {
  return gulp.src('./_updateProject/index-rendered.html', { force: true })
    .pipe(clean())
    .pipe(notify({message: './_updateProject/index-rendered.html removed!', title : 'cleanIndexUpdate', sound: false}));
}

function setProjectNameUpdate() {
  project.name = args.name;
  return gulp.src('./project-details.json')
    .pipe(jsonEditor({'name': args.name}))
    .pipe(gulp.dest('./'))
    .pipe(notify({message: 'Project name set to ' + args.name + '!', title : 'setProjectNameUpdate', sound: false}));
}

function updateProject(done) {
  gulp.series(setProjectNameUpdate, build, copyProjectUpdate, modifyIndexUpdate, cleanIndexUpdate)(done);
}
/*------------------------------------------------------*/
/* END PROJECT TASKS -----------------------------------*/
/*------------------------------------------------------*/


/*------------------------------------------------------*/
/* EXPORT TASKS ----------------------------------------*/
/*------------------------------------------------------*/
// You can use CommonJS `exports` module notation to declare tasks
exports.fontsInit = fontsInit;
exports.faFontsInit = faFontsInit;
exports.faCssInit = faCssInit;
exports.bsJsInit = bsJsInit;
exports.assetsInit = assetsInit;
exports.faviconInit = faviconInit;
exports.jqueryInit = jqueryInit;
exports.jqueryValidationInit = jqueryValidationInit;
exports.jqueryValidationUnobtrusiveInit = jqueryValidationUnobtrusiveInit;
exports.jsImageZoomInit = jsImageZoomInit;
exports.clipboardInit = clipboardInit;
exports.select2JsInit = select2JsInit;
exports.select2CssInit = select2CssInit;
exports.datatablesJsInit = datatablesJsInit;
exports.datatablesCssInit = datatablesCssInit;
exports.gijgoJsInit = gijgoJsInit;
exports.gijgoCssInit = gijgoCssInit;
exports.monacoEditorPkgInit = monacoEditorPkgInit;
exports.timeElementsJsInit = timeElementsJsInit;
exports.cleanProjectNew = cleanProjectNew;
exports.copyProjectNew = copyProjectNew;
exports.modifyIndexNew = modifyIndexNew;
exports.cleanIndexNew = cleanIndexNew;
exports.setProjectNameNew = setProjectNameNew;
exports.newProject = newProject;
exports.copyProjectUpdate = copyProjectUpdate;
exports.modifyIndexUpdate = modifyIndexUpdate;
exports.cleanIndexUpdate = cleanIndexUpdate;
exports.setProjectNameUpdate = setProjectNameUpdate;
exports.updateProject = updateProject;
exports.images = images;
exports.styles = styles;
exports.scripts = scripts;
exports.cleandist = cleandist;
exports.serve = serve;
exports.watch = watch;
exports.init = init;
exports.build = build;

// Define default task that can be called by just running `gulp` from cli
exports.default = build;
/*------------------------------------------------------*/
/* END EXPORT TASKS ------------------------------------*/
/*------------------------------------------------------*/
