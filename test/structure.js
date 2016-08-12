module.exports = function (gulp, plugins) {
    return function () {
        var expect = require('gulp-expect-file');

        // Directories
        var DirPlugins = 'vendor/',
            DirCompass = DirPlugins+'bower-compass-core/compass/stylesheets/',
            DirBreakpoint = DirPlugins+'breakpoint-sass/',
            DirFontAwesome = DirPlugins+'font-awesome/',
            DirGlyphicons = DirPlugins+'sass-bootstrap-gliphicons/',
            DirFlexibility = DirPlugins+'flexibility/',
            DirSASS = 'sass/',
            DirComponentsSASS = DirSASS+'components/',
            DirReferencesSASS = DirSASS+'references/',
            DirLayoutsSASS = DirSASS+'layouts/',
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
        var HelpersComponentSASS = DirComponentsSASS+'helper.scss',
            TypographyComponentSASS = DirComponentsSASS+'typography.scss',
            ShortcodesComponentSASS = DirComponentsSASS+'shortcodes.scss';


        // Reference SASS files
        var ColorReferenceSASS = DirComponentsSASS+'color.scss',
            MixinReferenceSASS = DirComponentsSASS+'mixin.scss',
            ResponseReferenceSASS = DirComponentsSASS+'response.scss';

        // Layouts SASS files
        var DefaultLayoutSASS = DirLayoutsSASS+'default.scss',
            HeaderLayoutSASS = DirLayoutsSASS+'header.scss',
            FooterLayoutSASS = DirLayoutsSASS+'footer.scss';

        // Sections SASS files
        var HomeSectionSASS = DirSectionsSASS+'home.scss';



        // Check *.min.css files
        gulp.src([MainMinCSS, SmallestMinCSS]).pipe(expect({ checkRealFile: true, verbose: true }, DirCSS+'**/*.css'));

        // Check *.css files
        gulp.src([MainCSS, SmallestCSS]).pipe(expect({ checkRealFile: true, verbose: true }, DirTemp+'**/*.css'));

        // Check plugins
        gulp.src([
            DirCompass+'**/*.scss', DirBreakpoint+'**/*.scss', DirFontAwesome+'**/*.scss', DirGlyphicons+'**/*.scss', DirFlexibility+'flexibility.js'
        ]).pipe(expect({ checkRealFile: true, verbose: true }, DirPlugins+'**/*.scss'));

        // Check main & smallest SASS
        gulp.src([MainSASS, SmallestSASS]).pipe(expect({ checkRealFile: true, verbose: true }, DirSASS+'**/*.scss'));

        // Check framework module
        gulp.src([
            HelpersComponentSASS, ShortcodesComponentSASS, TypographyComponentSASS,
            ColorReferenceSASS, ResponseReferenceSASS, MixinReferenceSASS,
            DefaultLayoutSASS, HeaderLayoutSASS, FooterLayoutSASS
        ]).pipe(expect({ checkRealFile: true, verbose: true }, DirSASS+'**/*.scss'));

        // Verify main SASS dependencies
        gulp.src([MainSASS]).pipe(expect({"sass/main.scss":
            '@import "compass/reset", "../vendor/breakpoint-sass/stylesheets/breakpoint","components/shortcodes","components/helper","components/typography", "layouts/default", "layouts/header", "layouts/footer";'
         }));
    };
};


