webpackJsonp([0],{"+KU4":function(t,e,n){var a=n("cBpg");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("6b66a870",a,!0,{})},0:function(t,e,n){t.exports=n("XHAq")},"6DFg":function(t,e,n){var a=n("CPaC");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("bda147ca",a,!0,{})},"73/I":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};e.default={props:{value:{type:String,default:""},enabled:{type:Boolean,default:!1}},computed:{listeners:function(){return a({},this.$listeners,{input:this.onInput})}},mounted:function(){this.$refs.editable.innerText=this.value},methods:{onInput:function(t){this.$emit("input",t.target.innerText)}}}},"7NqJ":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.isdeleted?t._e():n("li",{attrs:{id:t.blockId}},[n("article",{class:t.articleClass},[t.editing?t._e():n("div",{staticClass:"comment-meta"},[n("div",{staticClass:"comment-author"},[n("img",{attrs:{src:"/img/no_avatar.jpg",alt:"images"}}),t._v(" "),n("b",{staticClass:"fn"},[n("a",{staticClass:"url",attrs:{href:"#"}},[t._v(t._s(t.comment.name))])]),t._v(" "),n("span",{staticClass:"says"},[t._v("написал:")])])]),t._v(" "),n("div-editable",{class:t.contentClass,attrs:{enabled:t.editing},model:{value:t.comment.content,callback:function(e){t.$set(t.comment,"content",e)},expression:"comment.content"}}),t._v(" "),n("div",{staticClass:"reply"},[t.adminMode?t._e():n("span",[t.allowEdit?t._e():n("a",{staticClass:"comment-reply-link",on:{click:function(e){t.replyClick(t.comment)}}},[t._v("Ответить")]),t._v(" "),t.allowEdit&&!t.editing?n("a",{staticClass:"comment-reply-link",staticStyle:{color:"green"},on:{click:function(e){t.enableEdit()}}},[t._v("Редактировать")]):t._e(),t._v(" "),t.allowEdit?n("a",{staticClass:"comment-reply-link",staticStyle:{color:"red"},on:{click:function(e){t.deleteClick(t.comment,t.hideDeleted)}}},[t._v("Удалить")]):t._e(),t._v(" "),t.allowEdit&&t.editing?n("a",{staticClass:"comment-reply-link",staticStyle:{color:"green"},on:{click:function(e){t.sendComment()}}},[t._v("Отправить")]):t._e()]),t._v(" "),t.adminMode?n("span",[n("a",{staticClass:"comment-reply-link",on:{click:function(e){t.replyClick(t.comment)}}},[t._v("Ответить")]),t._v(" "),t.editing?t._e():n("a",{staticClass:"comment-reply-link",staticStyle:{color:"green"},on:{click:function(e){t.enableEdit()}}},[t._v("Редактировать")]),t._v(" "),n("a",{staticClass:"comment-reply-link",staticStyle:{color:"red"},on:{click:function(e){t.deleteClick(t.comment,t.hideDeleted)}}},[t._v("Удалить")]),t._v(" "),t.editing?n("a",{staticClass:"comment-reply-link",staticStyle:{color:"green"},on:{click:function(e){t.sendComment()}}},[t._v("Отправить")]):t._e(),t._v(" "),0==t.comment.commentStatus?n("a",{staticClass:"comment-reply-link",staticStyle:{color:"blue"},on:{click:function(e){t.sendAllow()}}},[t._v("Одобрить")]):t._e()]):t._e(),t._v(" "),n("span",{staticClass:"comment-date-updated"},[n("local-time",{attrs:{"utc-time":t.comment.updated_at}})],1)])],1),t._v(" "),n("ul",{staticClass:"children"},t._l(t.comment.children,function(e){return n("comment-article",{key:e.id,attrs:{comment:e,"reply-click":t.replyClick,"edit-click":t.editClick,"delete-click":t.deleteClick,"allow-click":t.allowClick,"mark-block":t.markBlock,"admin-mode":t.adminMode}})}))])},staticRenderFns:[]}},"8+43":function(t,e){t.exports={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"slide-bg"},[e("div",{style:this.divstyles[0]}),this._v(" "),e("div",{style:this.divstyles[1]})])},staticRenderFns:[]}},"9sXH":function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,".player-main[data-v-3a3f6fb9]{line-height:1.5;text-indent:0}input[type=range][data-v-3a3f6fb9]:focus{outline:none}[data-v-3a3f6fb9]::-webkit-slider-runnable-track{background:#fff}[data-v-3a3f6fb9]::-webkit-slider-thumb{-webkit-appearance:none;width:0;height:40px;background:#fff;box-shadow:-100vw 0 0 100vw #1e90ff;border:none}[data-v-3a3f6fb9]::-moz-range-track{height:40px;background:#ddd}[data-v-3a3f6fb9]::-moz-range-thumb{background:#fff;height:40px;width:0;border:none;border-radius:0!important;box-shadow:-100vw 0 0 100vw #1e90ff;box-sizing:border-box}[data-v-3a3f6fb9]::-ms-fill-lower{background:#1e90ff}[data-v-3a3f6fb9]::-ms-thumb{background:#fff;border:2px solid #999;height:40px;width:20px;box-sizing:border-box}[data-v-3a3f6fb9]::-ms-ticks-after,[data-v-3a3f6fb9]::-ms-ticks-before{display:none}[data-v-3a3f6fb9]::-ms-track{background:#ddd;color:transparent;height:40px;border:none}[data-v-3a3f6fb9]::-ms-tooltip{display:none}.w-3\\/4[data-v-3a3f6fb9]{width:75%}.shadow-md[data-v-3a3f6fb9]{box-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -1px rgba(0,0,0,.06)}.pt-2[data-v-3a3f6fb9]{padding-top:.5rem}.px-2[data-v-3a3f6fb9]{padding-left:.5rem;padding-right:.5rem}.max-w-5xl[data-v-3a3f6fb9]{max-width:64rem}.mt-4[data-v-3a3f6fb9]{margin-top:1rem}.border[data-v-3a3f6fb9]{border-width:1px}.border-gray-300[data-v-3a3f6fb9]{--border-opacity:1;border-color:#e2e8f0;border-color:rgba(226,232,240,var(--border-opacity))}.bg-gray-200[data-v-3a3f6fb9]{--bg-opacity:1;background-color:#edf2f7;background-color:rgba(237,242,247,var(--bg-opacity))}[data-v-3a3f6fb9],[data-v-3a3f6fb9] :after,[data-v-3a3f6fb9] :before{box-sizing:border-box;border:0 solid #e2e8f0}.w-full[data-v-3a3f6fb9]{width:100%}.flex-wrap[data-v-3a3f6fb9]{flex-wrap:wrap}.inline-flex[data-v-3a3f6fb9]{display:inline-flex}.pr-3[data-v-3a3f6fb9]{padding-right:.75rem}.flex-initial[data-v-3a3f6fb9]{flex:0 1 auto}.play-button[data-v-3a3f6fb9]{height:45px}.text-orange-600[data-v-3a3f6fb9]{--text-opacity:1;color:#dd6b20;color:rgba(221,107,32,var(--text-opacity))}.text-gray-400[data-v-3a3f6fb9]{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}.cursor-pointer[data-v-3a3f6fb9]{cursor:pointer}audio[data-v-3a3f6fb9],canvas[data-v-3a3f6fb9],embed[data-v-3a3f6fb9],iframe[data-v-3a3f6fb9],img[data-v-3a3f6fb9],object[data-v-3a3f6fb9],svg[data-v-3a3f6fb9],video[data-v-3a3f6fb9]{display:block;vertical-align:middle}.flex-grow[data-v-3a3f6fb9]{flex-grow:1}.border-blue-200[data-v-3a3f6fb9]{--border-opacity:1;border-color:#bee3f8;border-color:rgba(190,227,248,var(--border-opacity))}.bg-white[data-v-3a3f6fb9]{--bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--bg-opacity))}.relative[data-v-3a3f6fb9]{position:relative}.h-full[data-v-3a3f6fb9]{height:100%}input[type=range][data-v-3a3f6fb9]{margin:auto;-webkit-appearance:none;position:relative;overflow:hidden;width:100%;cursor:pointer;outline:none;border-radius:0;background:transparent}button[data-v-3a3f6fb9],input[data-v-3a3f6fb9],optgroup[data-v-3a3f6fb9],select[data-v-3a3f6fb9],textarea[data-v-3a3f6fb9]{padding:0;line-height:inherit;color:inherit}.left-0[data-v-3a3f6fb9]{left:0}.bottom-0[data-v-3a3f6fb9]{bottom:0}.right-0[data-v-3a3f6fb9]{right:0}.top-0[data-v-3a3f6fb9]{top:0}.absolute[data-v-3a3f6fb9]{position:absolute}.pointer-events-none[data-v-3a3f6fb9]{pointer-events:none}.justify-between[data-v-3a3f6fb9]{justify-content:space-between}.flex[data-v-3a3f6fb9]{display:flex}.text-sm[data-v-3a3f6fb9]{font-size:.875rem}",""])},"9v/7":function(t,e,n){var a=n("VU/8")(n("AK9D"),n("C7ac"),!1,null,null,null);t.exports=a.exports},AK9D:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};e.default={props:{postId:{type:String,required:!0,default:null},postSlug:{type:String,required:!0,default:null},commentLimit:{type:String,required:!0},adminMode:{type:Boolean,required:!1,default:!1}},data:function(){return{formComment:{postId:null,content:"",name:"",email:"",topCommentId:0,allowEdit:null,id:null,parent:null},comments:[],mode:{key:"send",text:"Ваш комментарий",reset:!1},counterSymbols:0}},mounted:function(){this.formComment.postId=this.postId,this.counterSymbols=this.commentLimit,this.apiLink=(this.adminMode?"/admin":"")+"/post/"+this.postSlug+"/comments",this.getPostComments(),this.loadTemp(),this.insertWatch=!0},watch:{"formComment.content":function(t){this.saveTemp(),this.counterSymbols=this.commentLimit-t.split("").length},"formComment.name":function(t){this.saveTemp()},"formComment.email":function(t){this.saveTemp()}},computed:{commentAreaClass:function(){var t=this.formComment.content.length;return{border:"1px solid",borderColor:0!=t&&(t<10||t>this.commentLimit)?"red":"green"}},commentCounterClass:function(){var t=this.formComment.content.length,e=0!=t&&(t<10||t>this.commentLimit);return{fontWeight:e?"700":"400",color:e?"red":"green"}}},methods:{markNewComment:function(t){return"CommentBlockId-"+t},scrollToComment:function(t){setTimeout(function(){var e="CommentBlockId-"+t,n=document.getElementById(e);n&&n.scrollIntoView({behavior:"smooth",block:"center"})},200)},validateEmail:function(t){return t.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)},saveTemp:function(){this.insertWatch&&localStorage.setItem("TemporaryCommentByPage_"+this.postSlug,JSON.stringify({content:this.formComment.content,name:this.formComment.name,email:this.formComment.email}))},contentNotWatch:function(t){this.insertWatch=!1,this.formComment.content=t,this.insertWatch=!0},loadTemp:function(){if(localStorage.getItem("TemporaryCommentByPage_"+this.postSlug)){var t=JSON.parse(localStorage.getItem("TemporaryCommentByPage_"+this.postSlug));for(var e in t)this.formComment[e]=t[e]}},replyTo:function(t){this.contentNotWatch(t.name+", "),this.formComment.topCommentId=t.id,this.formComment.parent=t,this.mode.text="Ваш ответ на комментарий",this.mode.reset=!0,this.mode.key="reply",this.$refs.respondArea.scrollIntoView({behavior:"smooth"}),this.$refs.InputCommentElem.focus()},resetReply:function(){this.formComment.topCommentId=0,this.formComment.content="",this.formComment.parent=null,this.mode.text="Ваш комментарий",this.mode.reset=!1,this.mode.key="send"},sendComment:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,e="put",n=function(e){return"error"==e.status?customAlert(e):(t.callback(e),e)};if(!t&&(t=this.formComment,e="post",n=this.afterSendComment,!this.adminMode)){if(t.name.length<3)return customAlert({text:"Вы не назвались, введите ваше имя"}),!1;var a=this.validateEmail(t.email);if(a&&("Array"!=a.constructor.name||a[0]!=a.input))return customAlert({text:"Что-то неправильно в Email адресе..."}),!1}if(t.content.length<10)return customAlert({text:"Пустой комментарий, минимум 10 символов"}),!1;ajaxfun(this.apiLink,e,t,n)},afterSendComment:function(t){if("error"==t.status)return customAlert(t);switch(this.mode.key){case"send":this.comments.push(t),this.resetReply();break;case"reply":this.formComment.parent.children.push(t),this.resetReply()}!0===t.moderation&&customAlert({text:"Для этого поста включена модерация комментариев. Пока ваш комментарий видите только вы...",mode:"warning"}),this.scrollToComment(t.id)},deleteComment:function(t,e){if(!confirm("Вы уверены?"))return!1;ajaxfun(this.apiLink,"delete",{id:t.id,allowEdit:t.allowEdit},function(t){"ok"==t.status?e():customAlert(t)})},allowComment:function(t){ajaxfun(this.apiLink,"put",t,function(e){return"error"==e.status?customAlert(e):(t.callback(e),e)})},getPostComments:function(){var t=this,e=function t(e,n){return e.filter(function(t){return t.topComment===n}).reduce(function(n,i){return[].concat(function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}(n),[a({},i,{children:t(e,i.id)})])},[])};this.adminMode;ajaxfun(this.apiLink,"get",null,function(n){var i;t.comments=(i=n.data).filter(function(t){return!t.topComment}).map(function(t){return a({},t,{children:e(i,t.id)})})})}}}},AYxm:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{comment:{type:Object,required:!0,default:null},adminMode:{type:Boolean,required:!1,default:!1},replyClick:Function,editClick:Function,deleteClick:Function,allowClick:Function,markBlock:Function},data:function(){return{isdeleted:!1,blockId:null,editing:!1}},mounted:function(){var t=this.comment.id;this.blockId=this.markBlock(t)},methods:{hideDeleted:function(){this.isdeleted=!0},enableEdit:function(){this.editing=!0},sendComment:function(){this.editClick({id:this.comment.id,allowEdit:this.comment.allowEdit,content:this.comment.content,callback:this.renewData})},sendAllow:function(){this.allowClick({id:this.comment.id,commentStatus:0==this.comment.commentStatus?1:0,callback:this.renewData})},renewData:function(t){this.editing=!1,this.comment.allowEdit=t.data.allowEdit,"commentStatus"in t.data&&(this.comment.commentStatus=t.data.commentStatus)}},computed:{allowEdit:function(){var t=this.comment.allowEdit;return!!t&&t.length>0},contentClass:function(){var t=["comment-content"];return this.editing&&t.push("div-editable-enabled"),t},articleClass:function(){var t=["comment-body"];return this.comment.fromAdmin&&t.push("mark-from-admin"),"commentStatus"in this.comment&&0==this.comment.commentStatus&&t.push("mark-unallowed"),t}}}},C7ac:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"comments-area",attrs:{id:"comments"}},[n("h4",{staticClass:"comments-title"},[t._v("Комментарии к посту")]),t._v(" "),n("ul",{staticClass:"comment-list"},t._l(t.comments,function(e){return n("comment-article",{key:e.id,attrs:{comment:e,"reply-click":t.replyTo,"edit-click":t.sendComment,"delete-click":t.deleteComment,"allow-click":t.allowComment,"mark-block":t.markNewComment,"admin-mode":t.adminMode}})})),t._v(" "),n("div",{ref:"respondArea",staticClass:"comment-respond",attrs:{id:"respond"}},[n("h4",{staticClass:"comment-reply-title",attrs:{id:"reply-title"}},[t._v("Оставьте комментарий")]),t._v(" "),n("form",{staticClass:"comment-form",attrs:{id:"commentform"}},[t._m(0),t._v(" "),n("p",{staticClass:"comment-form-comment"},[n("label",[t._v(t._s(t.mode.text)+"\n                "),t.mode.reset?n("span",{staticClass:"reset-reply",on:{click:function(e){t.resetReply()}}},[t._v("СБРОС")]):t._e()]),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.formComment.content,expression:"formComment.content"}],ref:"InputCommentElem",style:t.commentAreaClass,attrs:{name:"comment",required:"required"},domProps:{value:t.formComment.content},on:{input:function(e){e.target.composing||t.$set(t.formComment,"content",e.target.value)}}}),t._v(" "),n("span",[t._v("Счетчик символов: "),n("span",{style:t.commentCounterClass},[t._v(t._s(t.counterSymbols))])])]),t._v(" "),t.adminMode?t._e():n("p",{staticClass:"comment-form-author"},[t._m(1),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.formComment.name,expression:"formComment.name"}],attrs:{name:"author",type:"text",required:"required"},domProps:{value:t.formComment.name},on:{input:function(e){e.target.composing||t.$set(t.formComment,"name",e.target.value)}}})]),t._v(" "),t.adminMode?t._e():n("p",{staticClass:"comment-form-email"},[t._m(2),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.formComment.email,expression:"formComment.email"}],attrs:{name:"email",type:"email",required:"required"},domProps:{value:t.formComment.email},on:{input:function(e){e.target.composing||t.$set(t.formComment,"email",e.target.value)}}})]),t._v(" "),n("p",{staticClass:"form-submit"},[n("input",{staticClass:"submit",attrs:{name:"submit",type:"button",value:"Отправить"},on:{click:function(e){t.sendComment()}}})])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("p",{staticClass:"comment-notes"},[e("span",{attrs:{id:"email-notes"}},[this._v("Ваш адрес Email не будет опубликован.")]),this._v(" Обязательные поля отмечены звездочками "),e("span",{staticClass:"required"},[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[this._v("Ваше имя "),e("span",{staticClass:"required"},[this._v("*")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("label",[this._v("Ваш Email "),e("span",{staticClass:"required"},[this._v("*")])])}]}},CPaC:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,'.div-editable-enabled[data-v-22f0e30e]{border:1px solid green;background-image:url("/img/icon/pencil.png");background-repeat:no-repeat;background-size:30px Auto}.comment-reply-link[data-v-22f0e30e]{cursor:pointer}.mark-from-admin[data-v-22f0e30e]{background-color:#fff0fe;border:1px solid red}.mark-unallowed[data-v-22f0e30e]{background-color:#ffaeae}',""])},"FZ+f":function(t,e){t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var n=function(t,e){var n=t[1]||"",a=t[3];if(!a)return n;if(e&&"function"==typeof btoa){var i=(r=a,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),o=a.sources.map(function(t){return"/*# sourceURL="+a.sourceRoot+t+" */"});return[n].concat(o).concat([i]).join("\n")}var r;return[n].join("\n")}(e,t);return e[2]?"@media "+e[2]+"{"+n+"}":n}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var a={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(a[o]=!0)}for(i=0;i<t.length;i++){var r=t[i];"number"==typeof r[0]&&a[r[0]]||(n&&!r[2]?r[2]=n:n&&(r[2]="("+r[2]+") and ("+n+")"),e.push(r))}},e}},HtZ2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{utcTime:{required:!1,default:null}},data:function(){return{currTime:null}},mounted:function(){if(this.utcTime&&this.utcTime.length>3){var t=moment(moment(this.utcTime).utc(!0).format()).local();this.currTime=t.format("DD MMMM YYYY HH:mm")}}}},IjaB:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,".uploadbtn[data-v-aeff46a0]{margin:10px auto;display:block}",""])},NJ2M:function(t,e,n){var a=n("IjaB");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("c12615ba",a,!0,{})},Qmbz:function(t,e,n){var a=n("VU/8")(n("rZT2"),n("8+43"),!1,function(t){n("+KU4")},"data-v-68c4e886",null);t.exports=a.exports},RSdU:function(t,e,n){var a=n("VU/8")(n("AYxm"),n("7NqJ"),!1,function(t){n("6DFg")},"data-v-22f0e30e",null);t.exports=a.exports},"VU/8":function(t,e){t.exports=function(t,e,n,a,i,o){var r,s=t=t||{},l=typeof t.default;"object"!==l&&"function"!==l||(r=t,s=t.default);var c,d="function"==typeof s?s.options:s;if(e&&(d.render=e.render,d.staticRenderFns=e.staticRenderFns,d._compiled=!0),n&&(d.functional=!0),i&&(d._scopeId=i),o?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},d._ssrRegister=c):a&&(c=a),c){var u=d.functional,m=u?d.render:d.beforeCreate;u?(d._injectStyles=c,d.render=function(t,e){return c.call(e),m(t,e)}):d.beforeCreate=m?[].concat(m,c):[c]}return{esModule:r,exports:s,options:d}}},XHAq:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){var e=n("thjQ"),a=(n.n(e),n("7t+N")),i=n.n(a),o=n("l75H");window.Vue=n("I3G/"),t.jQuery=i.a,t.$=i.a,Object(o.a)(),Vue.component("LocalTime",n("j7/k")),Vue.component("DivEditable",n("qy23")),Vue.component("BgSlider",n("Qmbz")),Vue.component("AudioPlayer",n("xBf0")),Vue.component("CommentsBlock",n("9v/7")),Vue.component("CommentArticle",n("RSdU"));new Vue({el:"#vueapp",data:function(){return{}},mounted:function(){}})}.call(e,n("DuR2"))},cBpg:function(t,e,n){(t.exports=n("FZ+f")(!1)).push([t.i,"div.slide-bg[data-v-68c4e886]{width:100%;height:100%;position:fixed;z-index:-3}div.slide-bg div[data-v-68c4e886]{width:100%;height:100%;position:fixed;background-color:#000;background-size:cover;-webkit-transition:opacity 1s;-o-transition:opacity 1s;transition:opacity 1s}",""])},cC4b:function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("div",this._g({ref:"editable",attrs:{contenteditable:this.enabled}},this.listeners))},staticRenderFns:[]}},eTr3:function(t,e,n){var a=n("9sXH");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("d85175f4",a,!0,{})},"j7/k":function(t,e,n){var a=n("VU/8")(n("HtZ2"),n("lp9L"),!1,function(t){n("NJ2M")},"data-v-aeff46a0",null);t.exports=a.exports},l75H:function(t,e,n){"use strict";(function(t){e.a=function(){window.customAlert=function(t){var e="",n=!1,a={IncorrectInputData:function(t){return"Некорректные данные"},NotEnoughRights:function(t){return"Не хватает прав для выполнения"},ValidateError:function(t){return t.errors.reduce(function(t,e){return t+=e+"\n"},"")}};a[t.message]?e=a[t.message](t):t.text?(e=t.text,n="mode"in t&&t.mode):t.message?e=t.message:t&&(e="Неизвестная ошибка!",console.log(t)),n?swal("",e,n):swal("Oops!",e,"error")},window.moment=n("PJh5"),window.moment.locale("ru"),window.cyrb53=function(t){for(var e,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=3735928559^n,i=1103547991^n,o=0;o<t.length;o++)e=t.charCodeAt(o),a=Math.imul(a^e,2654435761),i=Math.imul(i^e,1597334677);return a=Math.imul(a^a>>>16,2246822507)^Math.imul(i^i>>>13,3266489909),4294967296*(2097151&(i=Math.imul(i^i>>>16,2246822507)^Math.imul(a^a>>>13,3266489909)))+(a>>>0)},window.ajaxfun=function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments[3];fetch(t,{method:e,headers:{"Content-type":"application/json; charset=UTF-8","X-CSRF-TOKEN":document.head.querySelector('meta[name="csrf-token"]').content},body:null!==n?JSON.stringify(n):null}).then(function(t){if(200!=t.status&&201!=t.status)throw{name:"StatusError",message:t};return t.json()}).then(function(t){if(t)return a(t)}).catch(function(t){"StatusError"==t.name?t.message.json().then(function(t){a(t),customAlert(t)}).catch(function(t){throw t}):"SyntaxError"==t.name?(customAlert({text:"Некорректный ответ сервера"}),console.log(t)):(customAlert({text:"Непонятная ошибка"}),console.log(t))})},window.localCache={data:{},get:function(t,e){if(this.data[t]&&!this.data[t].wait)return e(this.data[t].data);if(this.data[t]||(this.data[t]={wait:!0,started:!1,cbArray:[],data:null}),this.data[t].wait&&this.data[t].cbArray.push(e),!this.data[t].started){this.data[t].started=!0;var n=this;this.request(t,function(e){n.data[t].data=e,n.data[t].wait=!1,n.data[t].cbArray.map(function(t,n){t(e)}),n.data[t].cbArray=[]})}},request:function(t,e){console.log("Request in cache for url"+t),new Promise(function(n,a){fetch(t,{method:"get"}).then(function(t){return 200!=t.status?(console.log("Error from LocalCache - Request"),a()):t.json()}).then(function(t){n(t),e(t)})})}},window.installTimeupdateEvent=function(e,n){var a=new CustomEvent(n),i=function(){this.hasOwnProperty("_interval")||(this._interval=t.setInterval(r.bind(this),100))},o=function(){t.clearInterval(this._interval),delete this._interval},r=function(){this.dispatchEvent(a)};e.paused||i.call(e),e.addEventListener("play",i),e.addEventListener("playing",i),e.addEventListener("seeked",i),e.addEventListener("abort",o),e.addEventListener("emptied",o),e.addEventListener("ended",o),e.addEventListener("pause",o)};window.copyTextToClipboard=function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e?n?swal("Oops!",t,"error"):swal("",t,"success"):console.log(t)};navigator.clipboard?navigator.clipboard.writeText(t).then(function(){n("Async: Copying to clipboard was successful!")},function(t){n("Async: Could not copy text: ",!0)}):function(t,e){var n=document.createElement("textarea");n.value=t,n.style.top="0",n.style.left="0",n.style.position="fixed",document.body.appendChild(n),n.focus(),n.select();try{var a=document.execCommand("copy"),i=a?"successful":"unsuccessful";e("Fallback: Copying text command was "+i)}catch(t){e("Fallback: Oops, unable to copy",!0)}document.body.removeChild(n)}(t,n)},window.ajaxfun_new=function(t,e,n){var a,i={body:n.body||null,downloadCallback:n.downloadCallback||null,uploadCallback:n.uploadCallback||null,bodyAsForm:n.bodyAsForm||!1,headers:n.headers||null,resetWithConfirm:n.resetWithConfirm||!1},o=new XMLHttpRequest;if(o.open(e,t),o.setRequestHeader("X-CSRF-TOKEN",document.head.querySelector('meta[name="csrf-token"]').content),i.headers)for(var r in i.headers)o.setRequestHeader(r,i.headers[r]);if(i.body)if(i.bodyAsForm)for(var s in a=new FormData,i.body)a.append(s,i.body[s]);else a=JSON.stringify(i.body),i.headers&&"Content-type"in i.headers||o.setRequestHeader("Content-type","application/json; charset=UTF-8");else a=null;return{reset:function(){return!(i.resetWithConfirm&&!confirm("Прервать загрузку?"))&&(o.abort(),!0)},request:new Promise(function(t,e){o.onload=function(){return 200!=o.status&&201!=o.status?e({name:"StatusError",message:o.response}):t(o.response)},o.onerror=function(t){return e({name:"RequestError",message:t.message})},o.upload.onprogress=function(t){i.uploadCallback&&i.uploadCallback(t)},o.upload.onerror=function(t){if(i.uploadCallback)return e({name:"UploadError",message:t.message})},o.send(a)}).catch(function(t){if("StatusError"==t.name)try{var e=JSON.parse(t.message);i.downloadCallback(e),customAlert(e)}catch(t){throw t}}).then(function(t){var e=JSON.parse(t);if(e)return i.downloadCallback(e)}).catch(function(t){"StatusError"==t.name?customAlert({text:"Некорректный ответ сервера"}):customAlert({text:"Непонятная ошибка"}),console.log(t)})}}}}).call(e,n("DuR2"))},lp9L:function(t,e){t.exports={render:function(){var t=this.$createElement;return(this._self._c||t)("span",{staticClass:"entry-time"},[this._v(this._s(this.currTime))])},staticRenderFns:[]}},qy23:function(t,e,n){var a=n("VU/8")(n("73/I"),n("cC4b"),!1,null,null,null);t.exports=a.exports},rZT2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{imageLinks:{type:Array,required:!0,default:[]},changeTimeout:{type:Number,required:!1,default:1e4,validator:function(t){return t>=2e3}}},data:function(){return{divstyles:[{opacity:0,zIndex:0,transitionTimingFunction:"",backgroundImage:""},{opacity:0,zIndex:0,transitionTimingFunction:"",backgroundImage:""}]}},mounted:function(){this.cur=this.current(),this.imgselect=this.images(),this.changeTime=2e3;var t=this.cur();this.divstyles[t.c].backgroundImage="url("+this.imgselect()+")",this.divstyles[t.c].zIndex=-1,this.divstyles[t.c].opacity=1;var e=this.process;this.ticker=setInterval(function(){e()},this.changeTimeout)},methods:{current:function(){var t=1;return function(){return 0==t?(t++,{c:0,p:1}):(t--,{c:1,p:0})}},getRandomNum:function(t,e){return Math.floor(Math.random()*(e-t)+t)},images:function(){var t=[],e=this.getRandomNum;for(var n in this.imageLinks)t.push({url:this.imageLinks[n],rate:1});return function(){var n=t.length-1,a=!1,i="";for(var o in t)t[o].rate>=n?(a=!0,t[o].rate=0,i=t[o].url):t[o].rate++;if(!a)for(var r in t){var s=e(0,t.length);if(t[s].rate>=2){i=t[s].url,t[s].rate=0;break}}return i}},setup:function(){var t=this.cur();this.divstyles[t.c].transitionTimingFunction="cubic-bezier(1, .46, 1, .75)",this.divstyles[t.c].backgroundImage="url("+this.imgselect()+")",this.divstyles[t.c].zIndex=-1,this.divstyles[t.p].zIndex=-2,this.divstyles[t.p].transitionTimingFunction="cubic-bezier(.46, 0, .75, 0)",setTimeout(this.switchdivs(t),this.changeTime/2)},switchdivs:function(t){this.divstyles[t.c].opacity=1,this.divstyles[t.p].opacity=0},process:function(){setTimeout(this.setup(),this.changeTime/2)}}}},rjj0:function(t,e,n){var a="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!a)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i=n("tTVk"),o={},r=a&&(document.head||document.getElementsByTagName("head")[0]),s=null,l=0,c=!1,d=function(){},u=null,m="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function p(t){for(var e=0;e<t.length;e++){var n=t[e],a=o[n.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](n.parts[i]);for(;i<n.parts.length;i++)a.parts.push(v(n.parts[i]));a.parts.length>n.parts.length&&(a.parts.length=n.parts.length)}else{var r=[];for(i=0;i<n.parts.length;i++)r.push(v(n.parts[i]));o[n.id]={id:n.id,refs:1,parts:r}}}}function h(){var t=document.createElement("style");return t.type="text/css",r.appendChild(t),t}function v(t){var e,n,a=document.querySelector("style["+m+'~="'+t.id+'"]');if(a){if(c)return d;a.parentNode.removeChild(a)}if(f){var i=l++;a=s||(s=h()),e=y.bind(null,a,i,!1),n=y.bind(null,a,i,!0)}else a=h(),e=function(t,e){var n=e.css,a=e.media,i=e.sourceMap;a&&t.setAttribute("media",a);u.ssrId&&t.setAttribute(m,e.id);i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");if(t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}.bind(null,a),n=function(){a.parentNode.removeChild(a)};return e(t),function(a){if(a){if(a.css===t.css&&a.media===t.media&&a.sourceMap===t.sourceMap)return;e(t=a)}else n()}}t.exports=function(t,e,n,a){c=n,u=a||{};var r=i(t,e);return p(r),function(e){for(var n=[],a=0;a<r.length;a++){var s=r[a];(l=o[s.id]).refs--,n.push(l)}e?p(r=i(t,e)):r=[];for(a=0;a<n.length;a++){var l;if(0===(l=n[a]).refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete o[l.id]}}}};var b,g=(b=[],function(t,e){return b[t]=e,b.filter(Boolean).join("\n")});function y(t,e,n,a){var i=n?"":a.css;if(t.styleSheet)t.styleSheet.cssText=g(e,i);else{var o=document.createTextNode(i),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(o,r[e]):t.appendChild(o)}}},sywn:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"player-main",attrs:{id:"audio-player-root"}},[n("div",[n("audio",{ref:"player",staticStyle:{display:"none"},attrs:{id:t.playerid}},[n("source",{attrs:{src:t.url,type:"audio/mpeg"}})])]),t._v(" "),n("div",{staticClass:"w-3/4 bg-gray-200 border border-gray-300 px-2 pt-2 mt-4 shadow-md",staticStyle:{margin:"auto"}},[n("div",{staticClass:"inline-flex flex-wrap w-full max-w-5xl",attrs:{id:"player-row"}},[n("div",{staticClass:"flex-initial pr-3",attrs:{id:"button-div"}},[n("svg",{directives:[{name:"show",rawName:"v-show",value:!t.isPlaying,expression:"!isPlaying"}],staticClass:"play-button text-gray-400",class:{"text-orange-600":t.audioLoaded,"hover:text-orange-400":t.audioLoaded,"cursor-pointer":t.audioLoaded},attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},on:{click:function(e){t.toggleAudio()}}},[n("path",{attrs:{"fill-rule":"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z","clip-rule":"evenodd"}})]),t._v(" "),n("svg",{directives:[{name:"show",rawName:"v-show",value:t.isPlaying,expression:"isPlaying"}],staticClass:"play-button text-orange-400 hover:text-orange-400 cursor-pointer",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},on:{click:function(e){t.toggleAudio()}}},[n("path",{attrs:{"fill-rule":"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z","clip-rule":"evenodd"}})])]),t._v(" "),n("div",{staticClass:"flex-grow bg-white border border-blue-200",attrs:{id:"progress-bar"}},[n("div",{staticClass:"overlay-container relative w-full h-full"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.playbackTime,expression:"playbackTime"}],staticClass:"slider w-full h-full",attrs:{type:"range",min:"0",max:t.audioDuration,id:"position",name:"position"},domProps:{value:t.playbackTime},on:{__r:function(e){t.playbackTime=e.target.value}}}),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.audioLoaded,expression:"!audioLoaded"}],staticClass:"w-full absolute top-0 bottom-0 right-0 left-0 px-2 pointer-events-none",staticStyle:{color:"#94bcec"}},[t._v("\n            Loading please wait...\n            ")]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.audioLoaded,expression:"audioLoaded"}],staticClass:"flex w-full justify-between absolute top-0 bottom-0 right-0 left-0 px-2 pointer-events-none"},[n("span",{staticClass:"text-sm",staticStyle:{color:"#94bcec"},domProps:{innerHTML:t._s(t.elapsedTime())}},[t._v(" 00:00 ")]),t._v(" "),n("span",{staticClass:"text-sm",staticStyle:{color:"#94bcec"},domProps:{innerHTML:t._s(t.totalTime())}},[t._v(" 00:00 ")])])])])])])])},staticRenderFns:[]}},tTVk:function(t,e){t.exports=function(t,e){for(var n=[],a={},i=0;i<e.length;i++){var o=e[i],r=o[0],s={id:t+":"+i,css:o[1],media:o[2],sourceMap:o[3]};a[r]?a[r].parts.push(s):n.push(a[r]={id:r,parts:[s]})}return n}},vnM4:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:["url","playerid"],data:function(){return{playbackTime:0,audioDuration:100,audioLoaded:!1,isPlaying:!1}},methods:{initSlider:function(){var t=this.$refs.player;t&&(this.audioDuration=Math.round(t.duration),t.volume="0.85",t.preload="auto")},convertTime:function(t){return[t%3600/60,t%60].map(function(t){return("0"+Math.floor(t)).slice(-2)}).join(":")},totalTime:function(){var t=this.$refs.player;if(t){var e=t.duration;return this.convertTime(e)}return"00:00"},elapsedTime:function(){var t=this.$refs.player;if(t){var e=t.currentTime;return this.convertTime(e)}return"00:00"},playbackListener:function(t){var e=this.$refs.player;this.playbackTime=e.currentTime,e.addEventListener("ended",this.endListener),e.addEventListener("pause",this.pauseListener)},pauseListener:function(){this.isPlaying=!1,this.listenerActive=!1,this.cleanupListeners()},endListener:function(){this.isPlaying=!1,this.listenerActive=!1,this.cleanupListeners()},cleanupListeners:function(){var t=this.$refs.player;t.removeEventListener(this.timeUpdateEvName,this.playbackListener),t.removeEventListener("ended",this.endListener),t.removeEventListener("pause",this.pauseListener)},toggleAudio:function(){var t=this.$refs.player;t.paused?(t.play(),this.isPlaying=!0):(t.pause(),this.isPlaying=!1)}},mounted:function(){this.timeUpdateEvName="freqtimeupdate",this.$nextTick(function(){var t=this.$refs.player;installTimeupdateEvent(t,this.timeUpdateEvName),t.addEventListener("loadedmetadata",function(t){this.initSlider()}.bind(this)),t.addEventListener("canplay",function(t){this.audioLoaded=!0}.bind(this)),this.$watch("isPlaying",function(){if(this.isPlaying){var t=this.$refs.player;this.initSlider(),this.listenerActive||(this.listenerActive=!0,t.addEventListener(this.timeUpdateEvName,this.playbackListener))}}),this.$watch("playbackTime",function(){this.$refs.player;Math.abs(this.playbackTime-this.$refs.player.currentTime)>.01&&(this.$refs.player.currentTime=this.playbackTime)})})}}},xBf0:function(t,e,n){var a=n("VU/8")(n("vnM4"),n("sywn"),!1,function(t){n("eTr3")},"data-v-3a3f6fb9",null);t.exports=a.exports}},[0]);