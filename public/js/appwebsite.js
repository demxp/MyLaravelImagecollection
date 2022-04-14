webpackJsonp([0],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/front/AudioPlayer.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//import { mapState } from 'vuex'
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["url", "playerid"],
  /**
   * playbackTime = local var that syncs to audio.currentTime
   * audioDuration = duration of audio file in seconds
   * isPlaying = boolean (true if audio is playing)
   *
   **/
  data: function data() {
    return {
      playbackTime: 0,
      audioDuration: 100,
      audioLoaded: false,
      isPlaying: false
    };
  },

  methods: {
    //Set the range slider max value equal to audio duration
    initSlider: function initSlider() {
      var audio = this.$refs.player;
      if (audio) {
        this.audioDuration = Math.round(audio.duration);
        audio.volume = '0.85';
        audio.preload = 'auto';
      }
    },

    //Convert audio current time from seconds to min:sec display
    convertTime: function convertTime(seconds) {
      var format = function format(val) {
        return ("0" + Math.floor(val)).slice(-2);
      };
      var hours = seconds / 3600;
      var minutes = seconds % 3600 / 60;
      return [minutes, seconds % 60].map(format).join(":");
    },

    //Show the total duration of audio file
    totalTime: function totalTime() {
      var audio = this.$refs.player;
      if (audio) {
        var seconds = audio.duration;
        return this.convertTime(seconds);
      } else {
        return '00:00';
      }
    },

    //Display the audio time elapsed so far
    elapsedTime: function elapsedTime() {
      var audio = this.$refs.player;
      if (audio) {
        var seconds = audio.currentTime;
        return this.convertTime(seconds);
      } else {
        return '00:00';
      }
    },

    //Playback listener function runs every 100ms while audio is playing
    playbackListener: function playbackListener(e) {
      var audio = this.$refs.player;
      //Sync local 'playbackTime' var to audio.currentTime and update global state
      this.playbackTime = audio.currentTime;

      //console.log("update: " + audio.currentTime);
      //Add listeners for audio pause and audio end events
      audio.addEventListener("ended", this.endListener);
      audio.addEventListener("pause", this.pauseListener);
    },

    //Function to run when audio is paused by user
    pauseListener: function pauseListener() {
      this.isPlaying = false;
      this.listenerActive = false;
      this.cleanupListeners();
    },

    //Function to run when audio play reaches the end of file
    endListener: function endListener() {
      this.isPlaying = false;
      this.listenerActive = false;
      this.cleanupListeners();
    },

    //Remove listeners after audio play stops
    cleanupListeners: function cleanupListeners() {
      var audio = this.$refs.player;
      audio.removeEventListener(this.timeUpdateEvName, this.playbackListener);
      audio.removeEventListener("ended", this.endListener);
      audio.removeEventListener("pause", this.pauseListener);
      //console.log("All cleaned up!");
    },
    toggleAudio: function toggleAudio() {
      var audio = this.$refs.player;
      //var audio = document.getElementById("audio-player");
      if (audio.paused) {
        audio.play();
        this.isPlaying = true;
      } else {
        audio.pause();
        this.isPlaying = false;
      }
    }
  },
  mounted: function mounted() {
    this.timeUpdateEvName = "freqtimeupdate";
    // nextTick code will run only after the entire view has been rendered
    this.$nextTick(function () {
      var audio = this.$refs.player;
      installTimeupdateEvent(audio, this.timeUpdateEvName);
      //Wait for audio to load, then run initSlider() to get audio duration and set the max value of our slider 
      // "loademetadata" Event https://www.w3schools.com/tags/av_event_loadedmetadata.asp
      audio.addEventListener("loadedmetadata", function (e) {
        this.initSlider();
      }.bind(this));
      // "canplay" HTML Event lets us know audio is ready for play https://www.w3schools.com/tags/av_event_canplay.asp
      audio.addEventListener("canplay", function (e) {
        this.audioLoaded = true;
      }.bind(this));
      //Wait for audio to begin play, then start playback listener function
      this.$watch("isPlaying", function () {
        if (this.isPlaying) {
          var audio = this.$refs.player;
          this.initSlider();
          //console.log("Audio playback started.");
          //prevent starting multiple listeners at the same time
          if (!this.listenerActive) {
            this.listenerActive = true;
            //for a more consistent timeupdate, include freqtimeupdate.js and replace both instances of 'timeupdate' with 'freqtimeupdate'
            audio.addEventListener(this.timeUpdateEvName, this.playbackListener);
          }
        }
      });
      //Update current audio position when user drags progress slider
      this.$watch("playbackTime", function () {
        var audio = this.$refs.player;
        var diff = Math.abs(this.playbackTime - this.$refs.player.currentTime);

        //Throttle synchronization to prevent infinite loop between playback listener and this watcher
        if (diff > 0.01) {
          this.$refs.player.currentTime = this.playbackTime;
        }
      });
    });
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/front/BgSlider.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    imageLinks: {
      type: Array,
      required: true,
      default: []
    },
    changeTimeout: {
      type: Number,
      required: false,
      default: 10000,
      validator: function validator(value) {
        return value >= 2000;
      }
    }
  },
  data: function data() {
    return {
      divstyles: [{
        opacity: 0,
        zIndex: 0,
        transitionTimingFunction: '',
        backgroundImage: ''
      }, {
        opacity: 0,
        zIndex: 0,
        transitionTimingFunction: '',
        backgroundImage: ''
      }]
    };
  },
  mounted: function mounted() {
    this.cur = this.current();
    this.imgselect = this.images();
    this.changeTime = 2000;

    var id = this.cur();
    this.divstyles[id.c].backgroundImage = 'url(' + this.imgselect() + ')';
    this.divstyles[id.c].zIndex = -1;
    this.divstyles[id.c].opacity = 1;

    var proc = this.process;

    this.ticker = setInterval(function () {
      proc();
    }, this.changeTimeout);
  },

  methods: {
    current: function current() {
      var id = 1;
      return function () {
        if (id == 0) {
          id++;
          return { c: 0, p: 1 };
        } else {
          id--;
          return { c: 1, p: 0 };
        }
      };
    },
    getRandomNum: function getRandomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    images: function images() {
      var images = [];
      var rnd = this.getRandomNum;
      for (var i in this.imageLinks) {
        images.push({
          url: this.imageLinks[i],
          rate: 1
        });
      }

      return function () {
        var max = images.length - 1;
        var find_flag = false;
        var ret = '';
        for (var _i in images) {
          if (images[_i].rate >= max) {
            find_flag = true;
            images[_i].rate = 0;
            ret = images[_i].url;
          } else {
            images[_i].rate++;
          }
        }

        if (!find_flag) {
          for (var k in images) {
            var r_find = rnd(0, images.length);
            if (images[r_find].rate >= 2) {
              ret = images[r_find].url;
              images[r_find].rate = 0;
              break;
            }
          }
        }
        return ret;
      };
    },
    setup: function setup() {
      var id = this.cur();
      this.divstyles[id.c].transitionTimingFunction = 'cubic-bezier(1, .46, 1, .75)';
      this.divstyles[id.c].backgroundImage = 'url(' + this.imgselect() + ')';
      this.divstyles[id.c].zIndex = -1;
      this.divstyles[id.p].zIndex = -2;
      this.divstyles[id.p].transitionTimingFunction = 'cubic-bezier(.46, 0, .75, 0)';
      setTimeout(this.switchdivs(id), this.changeTime / 2);
    },
    switchdivs: function switchdivs(id) {
      this.divstyles[id.c].opacity = 1;
      this.divstyles[id.p].opacity = 0;
    },
    process: function process() {
      setTimeout(this.setup(), this.changeTime / 2);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/front/CommentArticle.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    comment: {
      type: Object,
      required: true,
      default: null
    },
    adminMode: {
      type: Boolean,
      required: false,
      default: false
    },
    replyClick: Function,
    editClick: Function,
    deleteClick: Function,
    allowClick: Function,
    markBlock: Function
  },
  data: function data() {
    return {
      isdeleted: false,
      blockId: null,
      editing: false
    };
  },
  mounted: function mounted() {
    var id = this.comment.id;
    this.blockId = this.markBlock(id);
  },

  methods: {
    hideDeleted: function hideDeleted() {
      this.isdeleted = true;
    },
    enableEdit: function enableEdit() {
      this.editing = true;
    },
    sendComment: function sendComment() {
      this.editClick({
        id: this.comment.id,
        allowEdit: this.comment.allowEdit,
        content: this.comment.content,
        callback: this.renewData
      });
    },
    sendAllow: function sendAllow() {
      this.allowClick({
        id: this.comment.id,
        commentStatus: this.comment.commentStatus == 0 ? 1 : 0,
        callback: this.renewData
      });
    },
    renewData: function renewData(req) {
      this.editing = false;
      this.comment.allowEdit = req.data.allowEdit;
      if ('commentStatus' in req.data) this.comment.commentStatus = req.data.commentStatus;
    }
  },
  computed: {
    allowEdit: function allowEdit() {
      var allowEdit = this.comment.allowEdit;
      return !!allowEdit && allowEdit.length > 0;
    },
    contentClass: function contentClass() {
      var base = ['comment-content'];
      if (this.editing) base.push('div-editable-enabled');
      return base;
    },
    articleClass: function articleClass() {
      var base = ['comment-body'];
      if (this.comment.fromAdmin) base.push('mark-from-admin');
      if ('commentStatus' in this.comment && this.comment.commentStatus == 0) base.push('mark-unallowed');
      return base;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/front/CommentsBlock.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    postId: {
      type: String,
      required: true,
      default: null
    },
    postSlug: {
      type: String,
      required: true,
      default: null
    },
    commentLimit: {
      type: String,
      required: true
    },
    adminMode: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function data() {
    return {
      formComment: {
        postId: null,
        content: '',
        name: '',
        email: '',
        topCommentId: 0,
        allowEdit: null,
        id: null,
        parent: null
      },
      comments: [],
      mode: {
        key: 'send',
        text: 'Ваш комментарий',
        reset: false
      },
      counterSymbols: 0
    };
  },
  mounted: function mounted() {
    this.formComment.postId = this.postId;
    this.counterSymbols = this.commentLimit;
    this.apiLink = (this.adminMode ? '/admin' : '') + '/post/' + this.postSlug + '/comments';
    this.getPostComments();
    this.loadTemp();
    this.insertWatch = true;
  },

  watch: {
    'formComment.content': function formCommentContent(value) {
      this.saveTemp();
      this.counterSymbols = this.commentLimit - value.split('').length;
    },
    'formComment.name': function formCommentName(value) {
      this.saveTemp();
    },
    'formComment.email': function formCommentEmail(value) {
      this.saveTemp();
    }
  },
  computed: {
    commentAreaClass: function commentAreaClass() {
      var ln = this.formComment.content.length;
      var check = ln != 0 && (ln < 10 || ln > this.commentLimit);
      return {
        border: '1px solid',
        borderColor: check ? 'red' : 'green'
      };
    },
    commentCounterClass: function commentCounterClass() {
      var ln = this.formComment.content.length;
      var check = ln != 0 && (ln < 10 || ln > this.commentLimit);
      return {
        fontWeight: check ? '700' : '400',
        color: check ? 'red' : 'green'
      };
    }
  },
  methods: {
    markNewComment: function markNewComment(id) {
      return 'CommentBlockId-' + id;
    },
    scrollToComment: function scrollToComment(id) {
      setTimeout(function () {
        var blockId = 'CommentBlockId-' + id;
        var elem = document.getElementById(blockId);
        if (!!elem) {
          elem.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 200);
    },
    validateEmail: function validateEmail(email) {
      return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    },
    saveTemp: function saveTemp() {
      if (this.insertWatch) localStorage.setItem('TemporaryCommentByPage_' + this.postSlug, JSON.stringify({
        content: this.formComment.content,
        name: this.formComment.name,
        email: this.formComment.email
      }));
    },
    contentNotWatch: function contentNotWatch(text) {
      this.insertWatch = false;
      this.formComment.content = text;
      this.insertWatch = true;
    },
    loadTemp: function loadTemp() {
      if (!!localStorage.getItem('TemporaryCommentByPage_' + this.postSlug)) {
        var saved = JSON.parse(localStorage.getItem('TemporaryCommentByPage_' + this.postSlug));
        for (var k in saved) {
          this.formComment[k] = saved[k];
        }
      }
    },
    replyTo: function replyTo(comment) {
      this.contentNotWatch(comment.name + ', ');
      this.formComment.topCommentId = comment.id;
      this.formComment.parent = comment;
      this.mode.text = 'Ваш ответ на комментарий';
      this.mode.reset = true;
      this.mode.key = 'reply';
      this.$refs['respondArea'].scrollIntoView({ behavior: "smooth" });
      this.$refs['InputCommentElem'].focus();
    },
    resetReply: function resetReply() {
      this.formComment.topCommentId = 0;
      this.formComment.content = '';
      this.formComment.parent = null;
      this.mode.text = 'Ваш комментарий';
      this.mode.reset = false;
      this.mode.key = 'send';
    },
    sendComment: function sendComment() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var input = data;
      var method = 'put';
      var afterfunc = function afterfunc(req) {
        if (req.status == 'error') return customAlert(req);
        input.callback(req);
        return req;
      };
      if (!input) {
        input = this.formComment;
        method = 'post';
        afterfunc = this.afterSendComment;

        if (!this.adminMode) {
          if (input.name.length < 3) {
            customAlert({ text: "Вы не назвались, введите ваше имя" });
            return false;
          }
          var valid = this.validateEmail(input.email);
          if (!!valid && (valid.constructor.name != "Array" || valid[0] != valid['input'])) {
            customAlert({ text: "Что-то неправильно в Email адресе..." });
            return false;
          }
        }
      }

      if (input.content.length < 10) {
        customAlert({ text: "Пустой комментарий, минимум 10 символов" });
        return false;
      }

      ajaxfun(this.apiLink, method, input, afterfunc);
    },
    afterSendComment: function afterSendComment(req) {
      if (req.status == 'error') return customAlert(req);
      switch (this.mode.key) {
        case 'send':
          this.comments.push(req);
          this.resetReply();
          break;
        case 'reply':
          this.formComment.parent.children.push(req);
          this.resetReply();
          break;
      }
      if (req.moderation === true) customAlert({ text: "Для этого поста включена модерация комментариев. Пока ваш комментарий видите только вы...", mode: 'warning' });
      this.scrollToComment(req.id);
    },
    deleteComment: function deleteComment(comment, hidefunc) {
      if (!confirm("Вы уверены?")) {
        return false;
      }
      ajaxfun(this.apiLink, 'delete', {
        id: comment.id,
        allowEdit: comment.allowEdit
      }, function (req) {
        if (req.status == 'ok') {
          hidefunc();
        } else {
          customAlert(req);
        }
      });
    },
    allowComment: function allowComment(data) {
      ajaxfun(this.apiLink, 'put', data, function (req) {
        if (req.status == 'error') return customAlert(req);
        data.callback(req);
        return req;
      });
    },
    getPostComments: function getPostComments() {
      var _this = this;
      var traverse = function traverse(arr, topComment) {
        return arr.filter(function (comment) {
          return comment.topComment === topComment;
        }).reduce(function (result, current) {
          return [].concat(_toConsumableArray(result), [_extends({}, current, {
            children: traverse(arr, current.id)
          })]);
        }, []);
      };

      var parseTree = function parseTree(arr) {
        return arr.filter(function (_ref) {
          var topComment = _ref.topComment;
          return !topComment;
        }).map(function (comment) {
          return _extends({}, comment, {
            children: traverse(arr, comment.id)
          });
        });
      };

      var link = this.adminMode;

      ajaxfun(this.apiLink, 'get', null, function (req) {
        _this.comments = parseTree(req.data);
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/reusable/DivEditable.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    value: {
      type: String,
      default: ''
    },
    enabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    listeners: function listeners() {
      return _extends({}, this.$listeners, { input: this.onInput });
    }
  },
  mounted: function mounted() {
    this.$refs.editable.innerText = this.value;
  },

  methods: {
    onInput: function onInput(e) {
      this.$emit('input', e.target.innerText);
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/reusable/LocalTime.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    utcTime: {
      required: false,
      default: null
    }
  },
  data: function data() {
    return {
      currTime: null
    };
  },
  mounted: function mounted() {
    if (this.utcTime && this.utcTime.length > 3) {
      var dt = moment(moment(this.utcTime).utc(true).format()).local();
      this.currTime = dt.format('DD MMMM YYYY HH:mm');
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6031462a\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/reusable/LocalTime.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.uploadbtn[data-v-6031462a] {\n  margin: 10px auto;\n  display: block;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-62e6346c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/front/AudioPlayer.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.player-main[data-v-62e6346c]{\n  line-height: 1.5;\n  text-indent: 0;\n}\n/* Play/Pause Button */\n.play-button[data-v-62e6346c]{\n  height: 45px\n}\ninput[type=\"range\"][data-v-62e6346c] {\n  margin: auto;\n  -webkit-appearance: none;\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n  cursor: pointer;\n  outline: none;\n  border-radius: 0; /* iOS */\n  background: transparent;\n}\ninput[type=\"range\"][data-v-62e6346c]:focus {\n  outline: none;\n}\n[data-v-62e6346c]::-webkit-slider-runnable-track {\n  background: #fff;\n}\n/*\n * 1. Set to 0 width and remove border for a slider without a thumb\n */\n[data-v-62e6346c]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  width: 0; /* 1 */\n  height: 40px;\n  background: #fff;\n  box-shadow: -100vw 0 0 100vw dodgerblue; \n  border: none; /* 2px solid #999; */\n}\n[data-v-62e6346c]::-moz-range-track {\n  height: 40px;\n  background: #ddd;\n}\n[data-v-62e6346c]::-moz-range-thumb {\n  background: #fff;\n  height: 40px;\n  width: 0; /* 20px; */\n  border: none; /* 3px solid #999; */\n  border-radius: 0 !important;\n  box-shadow: -100vw 0 0 100vw dodgerblue; \n  box-sizing: border-box;\n}\n[data-v-62e6346c]::-ms-fill-lower {\n  background: dodgerblue;\n}\n[data-v-62e6346c]::-ms-thumb {\n  background: #fff;\n  border: 2px solid #999;\n  height: 40px;\n  width: 20px;\n  box-sizing: border-box;\n}\n[data-v-62e6346c]::-ms-ticks-after {\n  display: none;\n}\n[data-v-62e6346c]::-ms-ticks-before {\n  display: none;\n}\n[data-v-62e6346c]::-ms-track {\n  background: #ddd;\n  color: transparent;\n  height: 40px;\n  border: none;\n}\n[data-v-62e6346c]::-ms-tooltip {\n  display: none;\n}\n.w-3\\/4[data-v-62e6346c] {\n  width: 75%;\n}\n.shadow-md[data-v-62e6346c] {\n  box-shadow: 0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -1px rgba(0,0,0,.06);\n}\n.pt-2[data-v-62e6346c] {\n  padding-top: .5rem;\n}\n.px-2[data-v-62e6346c] {\n  padding-left: .5rem;\n  padding-right: .5rem;\n}\n.max-w-5xl[data-v-62e6346c] {\n  max-width: 64rem;\n}\n.mt-4[data-v-62e6346c] {\n  margin-top: 1rem;\n}\n.border[data-v-62e6346c] {\n  border-width: 1px;\n}\n.border-gray-300[data-v-62e6346c] {\n  --border-opacity: 1;\n  border-color: #e2e8f0;\n  border-color: rgba(226,232,240,var(--border-opacity));\n}\n.bg-gray-200[data-v-62e6346c] {\n  --bg-opacity: 1;\n  background-color: #edf2f7;\n  background-color: rgba(237,242,247,var(--bg-opacity));\n}\n*[data-v-62e6346c],[data-v-62e6346c] ::after,[data-v-62e6346c] ::before {\n  box-sizing: border-box;\n  border-width: 0;\n  border-style: solid;\n  border-color: #e2e8f0;\n}\n.w-full[data-v-62e6346c] {\n  width: 100%;\n}\n.flex-wrap[data-v-62e6346c] {\n  flex-wrap: wrap;\n}\n.inline-flex[data-v-62e6346c] {\n  display: inline-flex;\n}\n.pr-3[data-v-62e6346c] {\n  padding-right: .75rem;\n}\n.flex-initial[data-v-62e6346c] {\n  flex: 0 1 auto;\n}\n.play-button[data-v-62e6346c] {\n  height: 45px;\n}\n.text-orange-600[data-v-62e6346c] {\n  --text-opacity: 1;\n  color: #dd6b20;\n  color: rgba(221,107,32,var(--text-opacity));\n}\n.text-gray-400[data-v-62e6346c] {\n  --text-opacity: 1;\n  color: #cbd5e0;\n  color: rgba(203,213,224,var(--text-opacity));\n}\n.cursor-pointer[data-v-62e6346c] {\n  cursor: pointer;\n}\naudio[data-v-62e6346c], canvas[data-v-62e6346c], embed[data-v-62e6346c], iframe[data-v-62e6346c], img[data-v-62e6346c], object[data-v-62e6346c], svg[data-v-62e6346c], video[data-v-62e6346c] {\n  display: block;\n  vertical-align: middle;\n}\n.flex-grow[data-v-62e6346c] {\n  flex-grow: 1;\n}\n.border-blue-200[data-v-62e6346c] {\n  --border-opacity: 1;\n  border-color: #bee3f8;\n  border-color: rgba(190,227,248,var(--border-opacity));\n}\n.bg-white[data-v-62e6346c] {\n  --bg-opacity: 1;\n  background-color: #fff;\n  background-color: rgba(255,255,255,var(--bg-opacity));\n}\n.relative[data-v-62e6346c] {\n  position: relative;\n}\n.h-full[data-v-62e6346c] {\n  height: 100%;\n}\ninput[type=range][data-v-62e6346c] {\n  margin: auto;\n  -webkit-appearance: none;\n  position: relative;\n  overflow: hidden;\n  width: 100%;\n  cursor: pointer;\n  outline: none;\n  border-radius: 0;\n  background: transparent;\n}\nbutton[data-v-62e6346c], input[data-v-62e6346c], optgroup[data-v-62e6346c], select[data-v-62e6346c], textarea[data-v-62e6346c] {\n  padding: 0;\n  line-height: inherit;\n  color: inherit;\n}\n.left-0[data-v-62e6346c] {\n  left: 0;\n}\n.bottom-0[data-v-62e6346c] {\n  bottom: 0;\n}\n.right-0[data-v-62e6346c] {\n  right: 0;\n}\n.top-0[data-v-62e6346c] {\n  top: 0;\n}\n.absolute[data-v-62e6346c] {\n  position: absolute;\n}\n.pointer-events-none[data-v-62e6346c] {\n  pointer-events: none;\n}\n.justify-between[data-v-62e6346c] {\n  justify-content: space-between;\n}\n.flex[data-v-62e6346c] {\n  display: flex;\n}\n.text-sm[data-v-62e6346c] {\n  font-size: .875rem;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-777e7e74\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/front/CommentArticle.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.div-editable-enabled[data-v-777e7e74]{\n  border: 1px solid green;\n  background-image: url('/img/icon/pencil.png');\n  background-repeat: no-repeat;\n  background-size: 30px Auto;\n}\n.comment-reply-link[data-v-777e7e74]{\n  cursor: pointer;\n}\n.mark-from-admin[data-v-777e7e74]{\n  background-color: #fff0fe;\n  border: 1px solid red;\n}\n.mark-unallowed[data-v-777e7e74]{\n  background-color: #ffaeae;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e7841aba\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/front/BgSlider.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\ndiv.slide-bg[data-v-e7841aba] {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    z-index: -3;\n}\ndiv.slide-bg div[data-v-e7841aba] {\n    width: 100%;\n    height: 100%;\n    position: fixed;\n    background-color: black;\n    background-size: cover;\n    -webkit-transition: opacity 1s;\n    -o-transition: opacity 1s;\n    transition: opacity 1s;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/vue-loader/lib/component-normalizer.js":
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-39e27e30\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/reusable/DivEditable.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    _vm._g(
      { ref: "editable", attrs: { contenteditable: _vm.enabled } },
      _vm.listeners
    )
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-39e27e30", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6031462a\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/reusable/LocalTime.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("span", { staticClass: "entry-time" }, [
    _vm._v(_vm._s(_vm.currTime))
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6031462a", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-62e6346c\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/front/AudioPlayer.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "player-main", attrs: { id: "audio-player-root" } },
    [
      _c("div", [
        _c(
          "audio",
          {
            ref: "player",
            staticStyle: { display: "none" },
            attrs: { id: _vm.playerid }
          },
          [_c("source", { attrs: { src: _vm.url, type: "audio/mpeg" } })]
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass:
            "w-3/4 bg-gray-200 border border-gray-300 px-2 pt-2 mt-4 shadow-md",
          staticStyle: { margin: "auto" }
        },
        [
          _c(
            "div",
            {
              staticClass: "inline-flex flex-wrap w-full max-w-5xl",
              attrs: { id: "player-row" }
            },
            [
              _c(
                "div",
                {
                  staticClass: "flex-initial pr-3",
                  attrs: { id: "button-div" }
                },
                [
                  _c(
                    "svg",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: !_vm.isPlaying,
                          expression: "!isPlaying"
                        }
                      ],
                      staticClass: "play-button text-gray-400",
                      class: {
                        "text-orange-600": _vm.audioLoaded,
                        "hover:text-orange-400": _vm.audioLoaded,
                        "cursor-pointer": _vm.audioLoaded
                      },
                      attrs: {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor"
                      },
                      on: {
                        click: function($event) {
                          _vm.toggleAudio()
                        }
                      }
                    },
                    [
                      _c("path", {
                        attrs: {
                          "fill-rule": "evenodd",
                          d:
                            "M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",
                          "clip-rule": "evenodd"
                        }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "svg",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.isPlaying,
                          expression: "isPlaying"
                        }
                      ],
                      staticClass:
                        "play-button text-orange-400 hover:text-orange-400 cursor-pointer",
                      attrs: {
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 20 20",
                        fill: "currentColor"
                      },
                      on: {
                        click: function($event) {
                          _vm.toggleAudio()
                        }
                      }
                    },
                    [
                      _c("path", {
                        attrs: {
                          "fill-rule": "evenodd",
                          d:
                            "M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z",
                          "clip-rule": "evenodd"
                        }
                      })
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "flex-grow bg-white border border-blue-200",
                  attrs: { id: "progress-bar" }
                },
                [
                  _c(
                    "div",
                    { staticClass: "overlay-container relative w-full h-full" },
                    [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.playbackTime,
                            expression: "playbackTime"
                          }
                        ],
                        staticClass: "slider w-full h-full",
                        attrs: {
                          type: "range",
                          min: "0",
                          max: _vm.audioDuration,
                          id: "position",
                          name: "position"
                        },
                        domProps: { value: _vm.playbackTime },
                        on: {
                          __r: function($event) {
                            _vm.playbackTime = $event.target.value
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: !_vm.audioLoaded,
                              expression: "!audioLoaded"
                            }
                          ],
                          staticClass:
                            "w-full absolute top-0 bottom-0 right-0 left-0 px-2 pointer-events-none",
                          staticStyle: { color: "#94bcec" }
                        },
                        [
                          _vm._v(
                            "\n            Loading please wait...\n            "
                          )
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.audioLoaded,
                              expression: "audioLoaded"
                            }
                          ],
                          staticClass:
                            "flex w-full justify-between absolute top-0 bottom-0 right-0 left-0 px-2 pointer-events-none"
                        },
                        [
                          _c(
                            "span",
                            {
                              staticClass: "text-sm",
                              staticStyle: { color: "#94bcec" },
                              domProps: { innerHTML: _vm._s(_vm.elapsedTime()) }
                            },
                            [_vm._v(" 00:00 ")]
                          ),
                          _vm._v(" "),
                          _c(
                            "span",
                            {
                              staticClass: "text-sm",
                              staticStyle: { color: "#94bcec" },
                              domProps: { innerHTML: _vm._s(_vm.totalTime()) }
                            },
                            [_vm._v(" 00:00 ")]
                          )
                        ]
                      )
                    ]
                  )
                ]
              )
            ]
          )
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-62e6346c", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-777e7e74\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/front/CommentArticle.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return !_vm.isdeleted
    ? _c("li", { attrs: { id: _vm.blockId } }, [
        _c(
          "article",
          { class: _vm.articleClass },
          [
            !_vm.editing
              ? _c("div", { staticClass: "comment-meta" }, [
                  _c("div", { staticClass: "comment-author" }, [
                    _c("img", {
                      attrs: { src: "/img/no_avatar.jpg", alt: "images" }
                    }),
                    _vm._v(" "),
                    _c("b", { staticClass: "fn" }, [
                      _c("a", { staticClass: "url", attrs: { href: "#" } }, [
                        _vm._v(_vm._s(_vm.comment.name))
                      ])
                    ]),
                    _vm._v(" "),
                    _c("span", { staticClass: "says" }, [_vm._v("написал:")])
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div-editable", {
              class: _vm.contentClass,
              attrs: { enabled: _vm.editing },
              model: {
                value: _vm.comment.content,
                callback: function($$v) {
                  _vm.$set(_vm.comment, "content", $$v)
                },
                expression: "comment.content"
              }
            }),
            _vm._v(" "),
            _c("div", { staticClass: "reply" }, [
              !_vm.adminMode
                ? _c("span", [
                    !_vm.allowEdit
                      ? _c(
                          "a",
                          {
                            staticClass: "comment-reply-link",
                            on: {
                              click: function($event) {
                                _vm.replyClick(_vm.comment)
                              }
                            }
                          },
                          [_vm._v("Ответить")]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.allowEdit && !_vm.editing
                      ? _c(
                          "a",
                          {
                            staticClass: "comment-reply-link",
                            staticStyle: { color: "green" },
                            on: {
                              click: function($event) {
                                _vm.enableEdit()
                              }
                            }
                          },
                          [_vm._v("Редактировать")]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.allowEdit
                      ? _c(
                          "a",
                          {
                            staticClass: "comment-reply-link",
                            staticStyle: { color: "red" },
                            on: {
                              click: function($event) {
                                _vm.deleteClick(_vm.comment, _vm.hideDeleted)
                              }
                            }
                          },
                          [_vm._v("Удалить")]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.allowEdit && _vm.editing
                      ? _c(
                          "a",
                          {
                            staticClass: "comment-reply-link",
                            staticStyle: { color: "green" },
                            on: {
                              click: function($event) {
                                _vm.sendComment()
                              }
                            }
                          },
                          [_vm._v("Отправить")]
                        )
                      : _vm._e()
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.adminMode
                ? _c("span", [
                    _c(
                      "a",
                      {
                        staticClass: "comment-reply-link",
                        on: {
                          click: function($event) {
                            _vm.replyClick(_vm.comment)
                          }
                        }
                      },
                      [_vm._v("Ответить")]
                    ),
                    _vm._v(" "),
                    !_vm.editing
                      ? _c(
                          "a",
                          {
                            staticClass: "comment-reply-link",
                            staticStyle: { color: "green" },
                            on: {
                              click: function($event) {
                                _vm.enableEdit()
                              }
                            }
                          },
                          [_vm._v("Редактировать")]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _c(
                      "a",
                      {
                        staticClass: "comment-reply-link",
                        staticStyle: { color: "red" },
                        on: {
                          click: function($event) {
                            _vm.deleteClick(_vm.comment, _vm.hideDeleted)
                          }
                        }
                      },
                      [_vm._v("Удалить")]
                    ),
                    _vm._v(" "),
                    _vm.editing
                      ? _c(
                          "a",
                          {
                            staticClass: "comment-reply-link",
                            staticStyle: { color: "green" },
                            on: {
                              click: function($event) {
                                _vm.sendComment()
                              }
                            }
                          },
                          [_vm._v("Отправить")]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.comment.commentStatus == 0
                      ? _c(
                          "a",
                          {
                            staticClass: "comment-reply-link",
                            staticStyle: { color: "blue" },
                            on: {
                              click: function($event) {
                                _vm.sendAllow()
                              }
                            }
                          },
                          [_vm._v("Одобрить")]
                        )
                      : _vm._e()
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c(
                "span",
                { staticClass: "comment-date-updated" },
                [
                  _c("local-time", {
                    attrs: { "utc-time": _vm.comment.updated_at }
                  })
                ],
                1
              )
            ])
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "ul",
          { staticClass: "children" },
          _vm._l(_vm.comment.children, function(child) {
            return _c("comment-article", {
              key: child.id,
              attrs: {
                comment: child,
                "reply-click": _vm.replyClick,
                "edit-click": _vm.editClick,
                "delete-click": _vm.deleteClick,
                "allow-click": _vm.allowClick,
                "mark-block": _vm.markBlock,
                "admin-mode": _vm.adminMode
              }
            })
          })
        )
      ])
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-777e7e74", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-e7841aba\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/front/BgSlider.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "slide-bg" }, [
    _c("div", { style: _vm.divstyles[0] }),
    _vm._v(" "),
    _c("div", { style: _vm.divstyles[1] })
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e7841aba", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-ef0982a8\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/front/CommentsBlock.vue":
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "comments-area", attrs: { id: "comments" } },
    [
      _c("h4", { staticClass: "comments-title" }, [
        _vm._v("Комментарии к посту")
      ]),
      _vm._v(" "),
      _c(
        "ul",
        { staticClass: "comment-list" },
        _vm._l(_vm.comments, function(comment) {
          return _c("comment-article", {
            key: comment.id,
            attrs: {
              comment: comment,
              "reply-click": _vm.replyTo,
              "edit-click": _vm.sendComment,
              "delete-click": _vm.deleteComment,
              "allow-click": _vm.allowComment,
              "mark-block": _vm.markNewComment,
              "admin-mode": _vm.adminMode
            }
          })
        })
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          ref: "respondArea",
          staticClass: "comment-respond",
          attrs: { id: "respond" }
        },
        [
          _c(
            "h4",
            {
              staticClass: "comment-reply-title",
              attrs: { id: "reply-title" }
            },
            [_vm._v("Оставьте комментарий")]
          ),
          _vm._v(" "),
          _c(
            "form",
            { staticClass: "comment-form", attrs: { id: "commentform" } },
            [
              _vm._m(0),
              _vm._v(" "),
              _c("p", { staticClass: "comment-form-comment" }, [
                _c("label", [
                  _vm._v(_vm._s(_vm.mode.text) + "\n                "),
                  _vm.mode.reset
                    ? _c(
                        "span",
                        {
                          staticClass: "reset-reply",
                          on: {
                            click: function($event) {
                              _vm.resetReply()
                            }
                          }
                        },
                        [_vm._v("СБРОС")]
                      )
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.formComment.content,
                      expression: "formComment.content"
                    }
                  ],
                  ref: "InputCommentElem",
                  style: _vm.commentAreaClass,
                  attrs: { name: "comment", required: "required" },
                  domProps: { value: _vm.formComment.content },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.formComment, "content", $event.target.value)
                    }
                  }
                }),
                _vm._v(" "),
                _c("span", [
                  _vm._v("Счетчик символов: "),
                  _c("span", { style: _vm.commentCounterClass }, [
                    _vm._v(_vm._s(_vm.counterSymbols))
                  ])
                ])
              ]),
              _vm._v(" "),
              !_vm.adminMode
                ? _c("p", { staticClass: "comment-form-author" }, [
                    _vm._m(1),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.formComment.name,
                          expression: "formComment.name"
                        }
                      ],
                      attrs: {
                        name: "author",
                        type: "text",
                        required: "required"
                      },
                      domProps: { value: _vm.formComment.name },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(_vm.formComment, "name", $event.target.value)
                        }
                      }
                    })
                  ])
                : _vm._e(),
              _vm._v(" "),
              !_vm.adminMode
                ? _c("p", { staticClass: "comment-form-email" }, [
                    _vm._m(2),
                    _vm._v(" "),
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.formComment.email,
                          expression: "formComment.email"
                        }
                      ],
                      attrs: {
                        name: "email",
                        type: "email",
                        required: "required"
                      },
                      domProps: { value: _vm.formComment.email },
                      on: {
                        input: function($event) {
                          if ($event.target.composing) {
                            return
                          }
                          _vm.$set(
                            _vm.formComment,
                            "email",
                            $event.target.value
                          )
                        }
                      }
                    })
                  ])
                : _vm._e(),
              _vm._v(" "),
              _c("p", { staticClass: "form-submit" }, [
                _c("input", {
                  staticClass: "submit",
                  attrs: { name: "submit", type: "button", value: "Отправить" },
                  on: {
                    click: function($event) {
                      _vm.sendComment()
                    }
                  }
                })
              ])
            ]
          )
        ]
      )
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "comment-notes" }, [
      _c("span", { attrs: { id: "email-notes" } }, [
        _vm._v("Ваш адрес Email не будет опубликован.")
      ]),
      _vm._v(" Обязательные поля отмечены звездочками "),
      _c("span", { staticClass: "required" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Ваше имя "),
      _c("span", { staticClass: "required" }, [_vm._v("*")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("label", [
      _vm._v("Ваш Email "),
      _c("span", { staticClass: "required" }, [_vm._v("*")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ef0982a8", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6031462a\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/reusable/LocalTime.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6031462a\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/reusable/LocalTime.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("210f3fbc", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6031462a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./LocalTime.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6031462a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./LocalTime.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-62e6346c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/front/AudioPlayer.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-62e6346c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/front/AudioPlayer.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("55b35c74", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-62e6346c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AudioPlayer.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-62e6346c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./AudioPlayer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-777e7e74\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/front/CommentArticle.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-777e7e74\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/front/CommentArticle.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("3ec4cb74", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-777e7e74\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CommentArticle.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-777e7e74\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./CommentArticle.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e7841aba\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/front/BgSlider.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e7841aba\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/front/BgSlider.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("a7978a14", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e7841aba\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BgSlider.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e7841aba\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BgSlider.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/lib/addStylesClient.js":
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__("./node_modules/vue-style-loader/lib/listToStyles.js")

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "./node_modules/vue-style-loader/lib/listToStyles.js":
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ "./resources/assets/js/appwebsite.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sweetalert__ = __webpack_require__("./node_modules/sweetalert/dist/sweetalert.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_sweetalert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_sweetalert__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_window_functions_module_js__ = __webpack_require__("./resources/assets/js/components/window.functions.module.js");
window.Vue = __webpack_require__("./node_modules/vue/dist/vue.common.js");





global.jQuery = __WEBPACK_IMPORTED_MODULE_1_jquery___default.a;
global.$ = __WEBPACK_IMPORTED_MODULE_1_jquery___default.a;

Object(__WEBPACK_IMPORTED_MODULE_2__components_window_functions_module_js__["a" /* WindowInstallCustom */])();

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('LocalTime', __webpack_require__("./resources/assets/js/components/reusable/LocalTime.vue"));
Vue.component('DivEditable', __webpack_require__("./resources/assets/js/components/reusable/DivEditable.vue"));

Vue.component('BgSlider', __webpack_require__("./resources/assets/js/components/front/BgSlider.vue"));
Vue.component('AudioPlayer', __webpack_require__("./resources/assets/js/components/front/AudioPlayer.vue"));
Vue.component('CommentsBlock', __webpack_require__("./resources/assets/js/components/front/CommentsBlock.vue"));
Vue.component('CommentArticle', __webpack_require__("./resources/assets/js/components/front/CommentArticle.vue"));

var app = new Vue({
  el: '#vueapp',
  data: function data() {
    return {};
  },
  mounted: function mounted() {}
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./resources/assets/js/components/front/AudioPlayer.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-62e6346c\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/front/AudioPlayer.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/front/AudioPlayer.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-62e6346c\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/front/AudioPlayer.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-62e6346c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/front/AudioPlayer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-62e6346c", Component.options)
  } else {
    hotAPI.reload("data-v-62e6346c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/front/BgSlider.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-e7841aba\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/front/BgSlider.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/front/BgSlider.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-e7841aba\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/front/BgSlider.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e7841aba"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/front/BgSlider.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e7841aba", Component.options)
  } else {
    hotAPI.reload("data-v-e7841aba", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/front/CommentArticle.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-777e7e74\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/front/CommentArticle.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/front/CommentArticle.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-777e7e74\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/front/CommentArticle.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-777e7e74"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/front/CommentArticle.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-777e7e74", Component.options)
  } else {
    hotAPI.reload("data-v-777e7e74", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/front/CommentsBlock.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/front/CommentsBlock.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-ef0982a8\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/front/CommentsBlock.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/front/CommentsBlock.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ef0982a8", Component.options)
  } else {
    hotAPI.reload("data-v-ef0982a8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/reusable/DivEditable.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/reusable/DivEditable.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-39e27e30\",\"hasScoped\":false,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/reusable/DivEditable.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/reusable/DivEditable.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-39e27e30", Component.options)
  } else {
    hotAPI.reload("data-v-39e27e30", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/reusable/LocalTime.vue":
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6031462a\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/reusable/LocalTime.vue")
}
var normalizeComponent = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")
/* script */
var __vue_script__ = __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]],\"plugins\":[\"transform-object-rest-spread\",[\"transform-runtime\",{\"polyfill\":false,\"helpers\":false}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/reusable/LocalTime.vue")
/* template */
var __vue_template__ = __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-6031462a\",\"hasScoped\":true,\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/reusable/LocalTime.vue")
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6031462a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/reusable/LocalTime.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6031462a", Component.options)
  } else {
    hotAPI.reload("data-v-6031462a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/window.functions.module.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (immutable) */ __webpack_exports__["a"] = WindowInstallCustom;
function WindowInstallCustom() {
  window.customAlert = function (resp) {
    var text = '';
    var mode = false;
    var errors = {
      'IncorrectInputData': function IncorrectInputData(resp) {
        return "Некорректные данные";
      },
      'NotEnoughRights': function NotEnoughRights(resp) {
        return "Не хватает прав для выполнения";
      },
      'ValidateError': function ValidateError(resp) {
        return resp.errors.reduce(function (acc, item) {
          return acc += item + '\n';
        }, "");
      }
    };

    if (!!errors[resp.message]) {
      text = errors[resp.message](resp);
    } else if (!!resp.text) {
      text = resp.text;
      mode = 'mode' in resp ? resp.mode : false;
    } else if (!!resp.message) {
      text = resp.message;
    } else if (!!resp) {
      text = "Неизвестная ошибка!";
      console.log(resp);
    }

    if (mode) {
      swal('', text, mode);
    } else {
      swal("Oops!", text, "error");
    }
    return;
  };
  window.moment = __webpack_require__("./node_modules/moment/moment.js");
  window.moment.locale('ru');
  window.cyrb53 = function (str) {
    var seed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (var i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
    h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };
  window.ajaxfun = function (url, method) {
    var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var callback = arguments[3];

    fetch(url, {
      method: method,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content
      },
      body: body !== null ? JSON.stringify(body) : null
    }).then(function (response) {
      if (response.status != 200 && response.status != 201) {
        throw { name: 'StatusError', message: response };
      }
      return response.json();
    }).then(function (req) {
      if (!!req) return callback(req);
    }).catch(function (e) {
      if (e.name == 'StatusError') {
        e.message.json().then(function (json) {
          callback(json);
          customAlert(json);
        }).catch(function (e) {
          throw e;
        });
      } else if (e.name == 'SyntaxError') {
        customAlert({ text: 'Некорректный ответ сервера' });
        console.log(e);
      } else {
        customAlert({ text: 'Непонятная ошибка' });
        console.log(e);
      }
    });
  };
  window.localCache = {
    data: {},
    get: function get(url, callback) {
      if (this.data[url] && !this.data[url].wait) {
        return callback(this.data[url].data);
      }
      if (!this.data[url]) {
        this.data[url] = {
          wait: true,
          started: false,
          cbArray: [],
          data: null
        };
      }
      if (this.data[url].wait) {
        this.data[url].cbArray.push(callback);
      }
      if (!this.data[url].started) {
        this.data[url].started = true;
        var _this = this;
        this.request(url, function (json) {
          _this.data[url].data = json;
          _this.data[url].wait = false;
          _this.data[url].cbArray.map(function (item, i) {
            item(json);
          });
          _this.data[url].cbArray = [];
        });
      }
    },
    request: function request(url, callback) {
      console.log('Request in cache for url' + url);
      new Promise(function (resolve, reject) {
        fetch(url, { method: 'get' }).then(function (response) {
          if (response.status != 200) {
            console.log('Error from LocalCache - Request');
            return reject();
          };
          return response.json();
        }).then(function (json) {
          resolve(json);
          callback(json);
        });
      });
    }
  };
  window.installTimeupdateEvent = function (elem, eventName) {
    'use strict';

    // Create the new `freqtimeupdate` event

    var freqtimeupdate = new CustomEvent(eventName),


    // The event frequency in milliseconds
    frequency = 100,


    // Wrappers around setInterval and clearInterval to ensure one interval per audio
    setInterval = function setInterval() {
      if (!this.hasOwnProperty('_interval')) {
        this._interval = global.setInterval(intervalFunc.bind(this), frequency);
      }
    },
        clearInterval = function clearInterval() {
      global.clearInterval(this._interval);
      delete this._interval;
    },


    // The actual interval function that dispatches the event
    intervalFunc = function intervalFunc() {
      this.dispatchEvent(freqtimeupdate);
    };

    if (!elem.paused) {
      setInterval.call(elem);
    }

    elem.addEventListener('play', setInterval);
    elem.addEventListener('playing', setInterval);
    elem.addEventListener('seeked', setInterval);

    elem.addEventListener('abort', clearInterval);
    elem.addEventListener('emptied', clearInterval);
    elem.addEventListener('ended', clearInterval);
    elem.addEventListener('pause', clearInterval);
  };
  var fallback = function fallback(text, debugFn) {
    var textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      debugFn('Fallback: Copying text command was ' + msg);
    } catch (err) {
      debugFn('Fallback: Oops, unable to copy', true);
    }

    document.body.removeChild(textArea);
  };
  window.copyTextToClipboard = function (text) {
    var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var debugFn = function debugFn(txt) {
      var err = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (debug) {
        if (err) {
          swal('Oops!', txt, 'error');
        } else {
          swal('', txt, 'success');
        }
      } else {
        console.log(txt);
      }
    };
    if (!navigator.clipboard) {
      fallback(text, debugFn);
      return;
    }
    navigator.clipboard.writeText(text).then(function () {
      debugFn('Async: Copying to clipboard was successful!');
    }, function (err) {
      debugFn('Async: Could not copy text: ', true);
    });
  };
  window.ajaxfun_new = function (url, method, args) {
    var params = {
      body: args.body || null,
      downloadCallback: args.downloadCallback || null,
      uploadCallback: args.uploadCallback || null,
      bodyAsForm: args.bodyAsForm || false,
      headers: args.headers || null,
      resetWithConfirm: args.resetWithConfirm || false
    },
        xhr = new XMLHttpRequest(),
        bodyToSend;

    xhr.open(method, url);
    xhr.setRequestHeader('X-CSRF-TOKEN', document.head.querySelector('meta[name="csrf-token"]').content);

    if (!!params.headers) for (var i in params.headers) {
      xhr.setRequestHeader(i, params.headers[i]);
    }if (!!params.body) {
      if (params.bodyAsForm) {
        bodyToSend = new FormData();
        for (var _i in params.body) {
          bodyToSend.append(_i, params.body[_i]);
        } //if(!(params.headers && ('Content-Type' in params.headers))) xhr.setRequestHeader('Content-type','multipart/form-data; charset=UTF-8; boundary=' + Math.random().toString().substr(2));
      } else {
        bodyToSend = JSON.stringify(params.body);
        if (!(params.headers && 'Content-type' in params.headers)) xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
      }
    } else {
      bodyToSend = null;
    }

    return {
      reset: function reset() {
        if (params.resetWithConfirm && !confirm("Прервать загрузку?")) return false;
        xhr.abort();
        return true;
      },
      request: new Promise(function (resolve, reject) {
        xhr.onload = function () {
          if (xhr.status != 200 && xhr.status != 201) {
            return reject({ name: 'StatusError', message: xhr.response });
          } else {
            return resolve(xhr.response);
          }
        };
        xhr.onerror = function (e) {
          return reject({ name: 'RequestError', message: e.message });
        };
        xhr.upload.onprogress = function (e) {
          if (!!params.uploadCallback) params.uploadCallback(e);
        };
        xhr.upload.onerror = function (e) {
          if (!!params.uploadCallback) {
            return reject({ name: 'UploadError', message: e.message });
          }
        };
        xhr.send(bodyToSend);
      }).catch(function (e) {
        if (e.name == 'StatusError') {
          try {
            var json = JSON.parse(e.message);
            params.downloadCallback(json);
            customAlert(json);
          } catch (e) {
            throw e;
          }
        }
      }).then(function (data) {
        var json = JSON.parse(data);
        if (!!json) return params.downloadCallback(json);
      }).catch(function (e) {
        if (e.name == 'StatusError') {
          customAlert({ text: 'Некорректный ответ сервера' });
        } else {
          customAlert({ text: 'Непонятная ошибка' });
        }
        console.log(e);
      })
    };
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/assets/js/appwebsite.js");


/***/ })

},[0]);