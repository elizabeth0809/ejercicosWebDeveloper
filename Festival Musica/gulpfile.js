const {series, src, dest, watch, parallel } = require('gulp');
//src: es del destino que quieres que busque
//dest: es el destino que quieres crear (almacenar) que es el compilado que hace sass
//watch: va aver y compilar cuando halla cambios en el archivo que esta "viendo"
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//utilidades
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');

/*function hola(done){
    console.log('Hola mundo en gulp');
    done();
}
function hola2(done){
    console.log('Hola mundo en gulp2');
    done();
}
exports.hola = hola; //esto sirve para exportar el codigo
exports.tareas = series(hola, hola2);*/

 // Funcion que compila sass

 const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}


 function css(){
  return src('src/scss/app.scss')
    .pipe(sass({
    outputStyle: 'expanded'
    }))
    .pipe(dest('./build/css'))
 }
 function minificarcss(){
    return src('src/scss/**/*.scss')
        .pipe(sass( {
            outputStyle: 'compressed'
        }))
        .pipe(dest('./build/css'))
   }
function javascript(){
    return src(paths.js)
    .pipe(concat('budle.js'))
    .pipe(dest('./build/js'))

}

function versionWebp (){
    return src(paths.imagenes)
        .pipe(webp())//las convierte en imagen webp
        .pipe(dest('./build/img'))//las guarda en el destino
        .pipe(notify({message: 'Imagen Webp lista'}));

}

function imagenes(){
    return src(paths.imagenes)//minifica las imagenes que encuentre en esta carpeta
        .pipe(imagemin())//iminifica
        .pipe(dest('./build/img'))//las guarda en el destino
        .pipe(notify({message: 'Imagen Minificada'}));

}

function verArchivos(){
    watch('src/scss/**/*.scss',css);    //el primer parametro es el archivo a editar automaticamente y el segundo es la funcion a la que pertenece
//el * hara que todos los archivos .scss se compilen automaticamente
    watch(paths.js, javascript); 
}
 exports.css = css;
 exports.minificarcss = minificarcss;
 exports.imagenes = imagenes;
 exports.verArchivos = verArchivos;
 exports.default = series(css,javascript ,imagenes, versionWebp , verArchivos);//esto al poner gulp su accion por defecto es ejecutar lo que esta en los parentesis
