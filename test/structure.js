module.exports = function (gulp, plugins) {
    return function () {
        var expect = require('gulp-expect-file');

        // Directories
        var DirCompass = 'vendor/bower-compass-core/compass/stylesheets/',
            DirSASS = 'sass/',
            DirComponentsSASS = DirSASS+'components/',
            DirReferencesSASS = DirSASS+'references/',
            DirSectionsSASS = DirSASS+'sections/',
            DirCSS = 'dist/css/',
            DirTemp = 'temp/';

        // CSS Files
        var MainMinCSS = DirCSS+'main.min.css',
            SmallestMinCSS = DirCSS+'smallest/home.min.css',
            MainCSS = DirTemp+'main.css',
            SmallestCSS = DirTemp+'smallest/home.css',
            MainSASS = DirSASS+'main.scss',
            SmallestSASS = DirSASS+'smallest/home.scss';

        // Component SASS files
        var HelpersComponentSASS = DirComponentsSASS+'helper.scss',/*clear fix*/
            IconComponentSASS = DirComponentsSASS+'icon.scss',
            ButtonComponentSASS = DirComponentsSASS+'button.scss',
            LabelComponentSASS = DirComponentsSASS+'label.scss',
            TypographyComponentSASS = DirComponentsSASS+'typography.scss',
            FormComponentSASS = DirComponentsSASS+'form.scss';


        // Reference SASS files
        var VspacingReferenceSASS = DirComponentsSASS+'spacing.scss',
            ColorReferenceSASS = DirComponentsSASS+'color.scss',
            ResponseReferenceSASS = DirComponentsSASS+'response.scss',
            GridReferenceSASS = DirReferencesSASS+'grid.scss';

        // Pages SASS files
        var HomeSectionSASS = DirSectionsSASS+'home.scss',
            HeaderSectionSASS = DirSectionsSASS+'header.scss',
            FooterSectionSASS = DirSectionsSASS+'footer.scss';

        // Check *.min.css tests
        gulp.src([MainMinCSS, SmallestMinCSS]).pipe(expect({ checkRealFile: true, verbose: false }, DirCSS+'**/*.css'));

        // Check *.css tests
        gulp.src([MainCSS, SmallestCSS]).pipe(expect({ checkRealFile: true, verbose: false }, DirTemp+'**/*.css'));

        // Check compass test
        gulp.src([DirCompass+'**/*.scss']).pipe(expect({ checkRealFile: true, verbose: false }, DirCompass+'**/*.scss'));

        // Check main & smallest SASS
        gulp.src([MainSASS, SmallestSASS]).pipe(expect({ checkRealFile: true, verbose: false }, DirSASS+'**/*.scss'));

        // Check components SASS
        gulp.src([
            HelpersComponentSASS,
            IconComponentSASS,
            ButtonComponentSASS,
            LabelComponentSASS,
            TypographyComponentSASS,
            FormComponentSASS
        ]).pipe(expect({ checkRealFile: true, verbose: false }, DirComponentsSASS+'*.scss'));

        // Check references SASS
        gulp.src([
            ColorReferenceSASS,
            VspacingReferenceSASS,
            ResponseReferenceSASS,
            GridReferenceSASS
        ]).pipe(expect({ checkRealFile: true, verbose: false }, DirReferencesSASS+'*.scss'));

        // Check section SASS
        gulp.src([
            HeaderSectionSASS,
            FooterSectionSASS
        ]).pipe(expect({ checkRealFile: true, verbose: false }, DirSectionsSASS+'*.scss'));

        // Verify main SASS dependencies
        gulp.src([MainSASS]).pipe(expect({"sass/main.scss":
            '@import "compass/reset", "../vendor/breakpoint-sass/stylesheets/breakpoint","components/button","components/form","components/helper","components/icon","components/label","components/typography";'
         }));
    };
};


