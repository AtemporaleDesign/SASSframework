var path = require('path'),
    sassTrue = require('sass-true');

// Components hendlers
var PluginBreakpoint = path.join(__dirname, 'p_breakpoint.scss'),
    ReferenceMixinShape = path.join(__dirname, 'r_mixin_shapes.scss'),
    ReferenceMixinCentered = path.join(__dirname, 'r_mixin_centered.scss'),
    ReferenceMixinFlex = path.join(__dirname, 'r_mixin_flex.scss'),
    ComponentTypography = path.join(__dirname, 'c_typography.scss'),
    ComponentHelperFlex = path.join(__dirname, 'c_helper_flex.scss');


// Tests components
sassTrue.runSass({file: PluginBreakpoint}, describe, it); // breakpoint plugin

sassTrue.runSass({file: ReferenceMixinShape}, describe, it); // shape mixin reference
sassTrue.runSass({file: ReferenceMixinCentered}, describe, it); // center mixin reference
sassTrue.runSass({file: ReferenceMixinFlex}, describe, it); // flex mixin reference

sassTrue.runSass({file: ComponentTypography}, describe, it); // typography component
sassTrue.runSass({file: ComponentHelperFlex}, describe, it); // typography component
