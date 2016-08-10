var path = require('path');
var sassTrue = require('sass-true');

// Components hendlers
var PluginBreakpoint = path.join(__dirname, 'plugin_breakpoint.scss'),
    ComponentHelper = path.join(__dirname, 'c_helper.scss'),
    ComponentTypography = path.join(__dirname, 'c_typography.scss'),
    ComponentShortcodes = path.join(__dirname, 'c_shortcodes.scss');


// Tests components
sassTrue.runSass({file: PluginBreakpoint}, describe, it); //breakpoint component
sassTrue.runSass({file: ComponentHelper}, describe, it); //helper component
sassTrue.runSass({file: ComponentTypography}, describe, it); //typography component
//sassTrue.runSass({file: ComponentShortcodes}, describe, it); //shortcodes component