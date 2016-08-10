var path = require('path');
var sassTrue = require('sass-true');

// Components hendlers
var ComponentHelper = path.join(__dirname, 'c_helper.scss');
var ComponentTypography = path.join(__dirname, 'c_typography.scss');
var PluginBreakpoint = path.join(__dirname, 'plugin_breakpoint.scss');

// Tests components
sassTrue.runSass({file: ComponentHelper}, describe, it); //helper component
sassTrue.runSass({file: ComponentTypography}, describe, it); //typography component
sassTrue.runSass({file: PluginBreakpoint}, describe, it); //breakpoint component