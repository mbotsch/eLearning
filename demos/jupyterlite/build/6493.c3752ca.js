(self.webpackChunk_JUPYTERLAB_CORE_OUTPUT=self.webpackChunk_JUPYTERLAB_CORE_OUTPUT||[]).push([[6493],{49160:(e,t,s)=>{var o={"./3024-day.css":[97380,7380],"./3024-night.css":[60237,237],"./abbott.css":[64569,4569],"./abcdef.css":[97858,7858],"./ambiance-mobile.css":[74690,4690],"./ambiance.css":[27334,7334,1483],"./ayu-dark.css":[5213,5213],"./ayu-mirage.css":[27692,7692],"./base16-dark.css":[28427,8427],"./base16-light.css":[59621,9621],"./bespin.css":[60451,451],"./blackboard.css":[20554,554],"./cobalt.css":[15227,5227],"./colorforth.css":[87359,7359],"./darcula.css":[91320,1320],"./dracula.css":[9156,9156],"./duotone-dark.css":[87509,7509],"./duotone-light.css":[29647,9647],"./eclipse.css":[16612,6612],"./elegant.css":[30489,489],"./erlang-dark.css":[20406,406],"./gruvbox-dark.css":[42834,2834],"./hopscotch.css":[8028,8028],"./icecoder.css":[4262,4262],"./idea.css":[4207,4207],"./isotope.css":[82359,2359],"./lesser-dark.css":[37808,7808],"./liquibyte.css":[60582,582],"./lucario.css":[36870,6870],"./material-darker.css":[89196,9196],"./material-ocean.css":[26576,6576],"./material-palenight.css":[24182,4182],"./material.css":[83051,3051],"./mbo.css":[2303,2303],"./mdn-like.css":[66664,6664],"./midnight.css":[92956,2956],"./monokai.css":[14750,4750],"./moxer.css":[63970,3970],"./neat.css":[52118,2118],"./neo.css":[38412,8412],"./night.css":[53037,3037],"./nord.css":[51989,1989],"./oceanic-next.css":[29077,9077],"./panda-syntax.css":[10330,330],"./paraiso-dark.css":[42169,2169],"./paraiso-light.css":[5823,5823],"./pastel-on-dark.css":[76952,6952],"./railscasts.css":[63004,3004],"./rubyblue.css":[92351,2351],"./seti.css":[9602,9602],"./shadowfox.css":[44749,4749],"./solarized.css":[70217,217],"./ssms.css":[45153,5153],"./the-matrix.css":[20160,160],"./tomorrow-night-bright.css":[45710,5710],"./tomorrow-night-eighties.css":[71272,1272],"./ttcn.css":[65489,5489],"./twilight.css":[68976,8976],"./vibrant-ink.css":[51261,1261],"./xq-dark.css":[40400,400],"./xq-light.css":[53546,3546],"./yeti.css":[12629,2629],"./yonce.css":[44018,4018],"./zenburn.css":[84206,4206]};function n(e){if(!s.o(o,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=o[e],n=t[0];return Promise.all(t.slice(1).map(s.e)).then((()=>s(n)))}n.keys=()=>Object.keys(o),n.id=49160,e.exports=n},66493:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>b,editorSyntaxStatus:()=>v});var o,n=s(12867),r=s(51972),i=s(97951),c=s(83160),a=s(55101),d=s(53979),l=s(89934),m=s(61345),u=s(41981),g=s.n(u);!function(e){e.changeKeyMap="codemirror:change-keymap",e.changeTheme="codemirror:change-theme",e.changeMode="codemirror:change-mode",e.find="codemirror:find",e.goToLine="codemirror:go-to-line"}(o||(o={}));const h={id:"@jupyterlab/codemirror-extension:codemirror",provides:i.ICodeMirror,activate:function(e){return new k}},p={id:"@jupyterlab/codemirror-extension:services",provides:r.IEditorServices,activate:function(e){return g().prototype.save=()=>{e.commands.execute("docmanager:save")},i.editorServices}},y={id:"@jupyterlab/codemirror-extension:commands",requires:[c.IEditorTracker,d.ISettingRegistry,m.ITranslator,i.ICodeMirror],optional:[a.IMainMenu],activate:function(e,t,n,r,c,a){var d;const l=r.load("jupyterlab"),{commands:m,restored:u}=e;let{theme:g,keyMap:h,scrollPastEnd:p,styleActiveLine:y,styleSelectedText:v,selectionPointer:b,lineWiseCopyCut:k}=i.CodeMirrorEditor.defaultConfig;async function x(e){var t,o,n,r,i;if(h=e.get("keyMap").composite||h,"vim"===h&&await c.ensureVimKeymap(),g=e.get("theme").composite||g,"jupyter"!==g&&"default"!==g){const e="solarized light"===g||"solarized dark"===g?"solarized":g;await s(49160)(`./${e}.css`)}p=null!==(t=e.get("scrollPastEnd").composite)&&void 0!==t?t:p,y=null!==(o=e.get("styleActiveLine").composite)&&void 0!==o?o:y,v=null!==(n=e.get("styleSelectedText").composite)&&void 0!==n?n:v,b=null!==(r=e.get("selectionPointer").composite)&&void 0!==r?r:b,k=null!==(i=e.get("lineWiseCopyCut").composite)&&void 0!==i?i:k}function C(){const e={keyMap:h,theme:g,scrollPastEnd:p,styleActiveLine:y,styleSelectedText:v,selectionPointer:b,lineWiseCopyCut:k};t.forEach((t=>{t.content.editor instanceof i.CodeMirrorEditor&&t.content.editor.setOptions(e)}))}function M(){return null!==t.currentWidget&&t.currentWidget===e.shell.currentWidget}if(Promise.all([n.load(f),u]).then((async([e])=>{await x(e),C(),e.changed.connect((async()=>{await x(e),C()}))})).catch((e=>{console.error(e.message),C()})),t.widgetAdded.connect(((e,t)=>{const s={keyMap:h,theme:g,scrollPastEnd:p,styleActiveLine:y,styleSelectedText:v,selectionPointer:b,lineWiseCopyCut:k};t.content.editor instanceof i.CodeMirrorEditor&&t.content.editor.setOptions(s)})),m.addCommand(o.changeTheme,{label:e=>{var t;return"default"===e.theme?l.__("codemirror"):l.__(null!==(t=e.theme)&&void 0!==t?t:g)},execute:e=>{var t;const s="theme",o=g=null!==(t=e.theme)&&void 0!==t?t:g;return n.set(f,s,o).catch((e=>{console.error(`Failed to set ${f}:${s} - ${e.message}`)}))},isToggled:e=>e.theme===g}),m.addCommand(o.changeKeyMap,{label:e=>{var t;const s=null!==(t=e.keyMap)&&void 0!==t?t:h;return"sublime"===s?l.__("Sublime Text"):l.__(s)},execute:e=>{var t;const s="keyMap",o=h=null!==(t=e.keyMap)&&void 0!==t?t:h;return n.set(f,s,o).catch((e=>{console.error(`Failed to set ${f}:${s} - ${e.message}`)}))},isToggled:e=>e.keyMap===h}),m.addCommand(o.find,{label:l.__("Find…"),execute:()=>{const e=t.currentWidget;e&&e.content.editor.execCommand("find")},isEnabled:M}),m.addCommand(o.goToLine,{label:l.__("Go to Line…"),execute:e=>{const s=t.currentWidget;if(!s)return;const o=e.line,n=e.column,r=s.content.editor;void 0!==o||void 0!==n?r.setCursorPosition({line:(null!=o?o:1)-1,column:(null!=n?n:1)-1}):r.execCommand("jumpToLine"),r.focus()},isEnabled:M}),m.addCommand(o.changeMode,{label:e=>e.name,execute:e=>{const s=e.name,o=t.currentWidget;if(s&&o){const e=i.Mode.findByName(s);e&&(o.content.model.mimeType=e.mime)}},isEnabled:M,isToggled:e=>{const s=t.currentWidget;if(!s)return!1;const o=s.content.model.mimeType,n=i.Mode.findByMIME(o),r=n&&n.name;return e.name===r}}),a){const e=null===(d=a.viewMenu.items.find((e=>{var t;return"submenu"===e.type&&"jp-mainmenu-view-codemirror-theme"===(null===(t=e.submenu)||void 0===t?void 0:t.id)})))||void 0===d?void 0:d.submenu;e&&i.Mode.getModeInfo().sort(((e,t)=>{const s=e.name||"",o=t.name||"";return s.localeCompare(o)})).forEach((t=>{0!==t.mode.indexOf("brainf")&&e.addItem({command:o.changeMode,args:Object.assign({},t)})})),a.editMenu.goToLiners.add({tracker:t,goToLine:e=>{e.content.editor.execCommand("jumpToLine")}})}},autoStart:!0},v={id:"@jupyterlab/codemirror-extension:editor-syntax-status",autoStart:!0,requires:[c.IEditorTracker,n.ILabShell,m.ITranslator],optional:[l.IStatusBar],activate:(e,t,s,o,n)=>{if(!n)return;const r=new i.EditorSyntaxStatus({commands:e.commands,translator:o});s.currentChanged.connect((()=>{const e=s.currentWidget;e&&t.has(e)&&r.model&&(r.model.editor=e.content.editor)})),n.registerStatusItem("@jupyterlab/codemirror-extension:editor-syntax-status",{item:r,align:"left",rank:0,isActive:()=>!!s.currentWidget&&!!t.currentWidget&&s.currentWidget===t.currentWidget})}},b=[y,p,v,h],f=y.id;class k{get CodeMirror(){return g()}async ensureVimKeymap(){"Vim"in g()||await Promise.all([s.e(5747),s.e(8373),s.e(3413)]).then(s.t.bind(s,83413,23))}}}}]);
//# sourceMappingURL=6493.c3752ca.js.map