(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["activecalltemplate.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<li>\r\n    <a href=\"javascript:loadUserPage('";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "userid"), env.opts.autoescape);
output += "');\" class=\"item-link item-content\">\r\n        <div class=\"item-media\"><img src=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "pictureloc"), env.opts.autoescape);
output += "\" width=\"80\"></div>\r\n        <div class=\"item-inner\">\r\n            <div class=\"item-title-row\">\r\n                <div class=\"item-title\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "name"), env.opts.autoescape);
output += "</div>\r\n            </div>\r\n            <div class=\"item-subtitle\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "userid"), env.opts.autoescape);
output += "</div>\r\n        </div>\r\n    </a>\r\n</li>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

