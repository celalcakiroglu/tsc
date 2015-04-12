Polygon Meshing through Triangulation
===================================================

.. raw:: html

   <head>
      <meta charset="utf-8" />
      <title>Draw a blue rectangle (canvas version)</title>
   </head>
   <body onload="listen()">
      <canvas id="webgl" width ="650" height="650">
      Use html5 supporting browser
      </canvas>
      <p>
          <button id="bDefine" type="button">BOUNDARY DEFINED</button>
          <button id="reDefine" type="button">REDEFINE BOUNDARY</button>
      </p>
      How many interior points? <input type="text" id="iPoints">
      <button id="iPointsApply" type="button">Apply</button>
      <button id="meshBtn" type="button">Mesh</button>
      <button id="flipBtn" type="button">Flip</button>
      <script>
        function listen(){
        main();
        }
      </script>
      <script>
         /*
         * Copyright 2010, Google Inc.
         * All rights reserved.
         *
         * Redistribution and use in source and binary forms, with or without
         * modification, are permitted provided that the following conditions are
         * met:
         *
         *     * Redistributions of source code must retain the above copyright
         * notice, this list of conditions and the following disclaimer.
         *     * Redistributions in binary form must reproduce the above
         * copyright notice, this list of conditions and the following disclaimer
         * in the documentation and/or other materials provided with the
         * distribution.
         *     * Neither the name of Google Inc. nor the names of its
         * contributors may be used to endorse or promote products derived from
         * this software without specific prior written permission.
         *
         * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
         * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
         * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
         * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
         * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
         * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
         * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
         * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
         * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
         * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
         * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
         */
         /**
         * @fileoverview This file contains functions every webgl program will need
         * a version of one way or another.
         *
         * Instead of setting up a context manually it is recommended to
         * use. This will check for success or failure. On failure it
         * will attempt to present an approriate message to the user.
         *
         *       gl = WebGLUtils.setupWebGL(canvas);
         *
         * For animated WebGL apps use of setTimeout or setInterval are
         * discouraged. It is recommended you structure your rendering
         * loop like this.
         *
         *       function render() {
         *         window.requestAnimFrame(render, canvas);
         *
         *         // do rendering
         *         ...
         *       }
         *       render();
         *
         * This will call your rendering function up to the refresh rate
         * of your display but will stop rendering if your app is not
         * visible.
         */
         WebGLUtils = function() {
         /**
         * Creates the HTLM for a failure message
         * @param {string} canvasContainerId id of container of th
         *        canvas.
         * @return {string} The html.
         */
         var makeFailHTML = function(msg) {
         return '' +
            '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' +
            '<td align="center">' +
            '<div style="display: table-cell; vertical-align: middle;">' +
            '<div style="">' + msg + '</div>' +
            '</div>' +
            '</td></tr></table>';
         };
         /**
         * Mesasge for getting a webgl browser
         * @type {string}
         */
         var GET_A_WEBGL_BROWSER = '' +
         'This page requires a browser that supports WebGL.<br/>' +
         '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';
         /**
         * Mesasge for need better hardware
         * @type {string}
         */
         var OTHER_PROBLEM = '' +
         "It doesn't appear your computer can support WebGL.<br/>" +
         '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.         </a>';
         /**
         * Creates a webgl context. If creation fails it will
         * change the contents of the container of the <canvas>
         * tag to an error message with the correct links for WebGL.
         * @param {Element} canvas. The canvas element to create a
         *     context from.
         * @param {WebGLContextCreationAttirbutes} opt_attribs Any
         *     creation attributes you want to pass in.
         * @param {function:(msg)} opt_onError An function to call
         *     if there is an error during creation.
         * @return {WebGLRenderingContext} The created context.
         */
         var setupWebGL = function(canvas, opt_attribs, opt_onError) {
         function handleCreationError(msg) {
            var container = canvas.parentNode;
            if (container) {
               var str = window.WebGLRenderingContext ?
                  OTHER_PROBLEM :
                  GET_A_WEBGL_BROWSER;
               if (msg) {
               str += "<br/><br/>Status: " + msg;
               }
               container.innerHTML = makeFailHTML(str);
            }
         };
         opt_onError = opt_onError || handleCreationError;
         if (canvas.addEventListener) {
            canvas.addEventListener("webglcontextcreationerror", function(event) {
                  opt_onError(event.statusMessage);
               }, false);
         }
         var context = create3DContext(canvas, opt_attribs);
         if (!context) {
            if (!window.WebGLRenderingContext) {
               opt_onError("");
            }
         }
         return context;
         };
         /**
         * Creates a webgl context.
         * @param {!Canvas} canvas The canvas tag to get context
         *     from. If one is not passed in one will be created.
         * @return {!WebGLContext} The created context.
         */
         var create3DContext = function(canvas, opt_attribs) {
         var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
         var context = null;
         for (var ii = 0; ii < names.length; ++ii) {
            try {
               context = canvas.getContext(names[ii], opt_attribs);
            } catch(e) {}
            if (context) {
               break;
            }
         }
         return context;
         }
         return {
         create3DContext: create3DContext,
         setupWebGL: setupWebGL
         };
         }();
         /**
         * Provides requestAnimationFrame in a cross browser way.
         */
         window.requestAnimFrame = (function() {
         return window.requestAnimationFrame ||
                  window.webkitRequestAnimationFrame ||
                  window.mozRequestAnimationFrame ||
                  window.oRequestAnimationFrame ||
                  window.msRequestAnimationFrame ||
                  function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                  window.setTimeout(callback, 1000/60);
                  };
         })();
      </script>
      <script>
         //Copyright (c) 2009 The Chromium Authors. All rights reserved.
         //Use of this source code is governed by a BSD-style license that can be
         //found in the LICENSE file.

         // Various functions for helping debug WebGL apps.

         WebGLDebugUtils = function() {

         /**
          * Wrapped logging function.
          * @param {string} msg Message to log.
          */
         var log = function(msg) {
           if (window.console && window.console.log) {
             window.console.log(msg);
           }
         };

         /**
          * Which arguements are enums.
          * @type {!Object.<number, string>}
          */
         var glValidEnumContexts = {

           // Generic setters and getters

           'enable': { 0:true },
           'disable': { 0:true },
           'getParameter': { 0:true },

           // Rendering

           'drawArrays': { 0:true },
           'drawElements': { 0:true, 2:true },

           // Shaders

           'createShader': { 0:true },
           'getShaderParameter': { 1:true },
           'getProgramParameter': { 1:true },

           // Vertex attributes

           'getVertexAttrib': { 1:true },
           'vertexAttribPointer': { 2:true },

           // Textures

           'bindTexture': { 0:true },
           'activeTexture': { 0:true },
           'getTexParameter': { 0:true, 1:true },
           'texParameterf': { 0:true, 1:true },
           'texParameteri': { 0:true, 1:true, 2:true },
           'texImage2D': { 0:true, 2:true, 6:true, 7:true },
           'texSubImage2D': { 0:true, 6:true, 7:true },
           'copyTexImage2D': { 0:true, 2:true },
           'copyTexSubImage2D': { 0:true },
           'generateMipmap': { 0:true },

           // Buffer objects

           'bindBuffer': { 0:true },
           'bufferData': { 0:true, 2:true },
           'bufferSubData': { 0:true },
           'getBufferParameter': { 0:true, 1:true },

           // Renderbuffers and framebuffers

           'pixelStorei': { 0:true, 1:true },
           'readPixels': { 4:true, 5:true },
           'bindRenderbuffer': { 0:true },
           'bindFramebuffer': { 0:true },
           'checkFramebufferStatus': { 0:true },
           'framebufferRenderbuffer': { 0:true, 1:true, 2:true },
           'framebufferTexture2D': { 0:true, 1:true, 2:true },
           'getFramebufferAttachmentParameter': { 0:true, 1:true, 2:true },
           'getRenderbufferParameter': { 0:true, 1:true },
           'renderbufferStorage': { 0:true, 1:true },

           // Frame buffer operations (clear, blend, depth test, stencil)

           'clear': { 0:true },
           'depthFunc': { 0:true },
           'blendFunc': { 0:true, 1:true },
           'blendFuncSeparate': { 0:true, 1:true, 2:true, 3:true },
           'blendEquation': { 0:true },
           'blendEquationSeparate': { 0:true, 1:true },
           'stencilFunc': { 0:true },
           'stencilFuncSeparate': { 0:true, 1:true },
           'stencilMaskSeparate': { 0:true },
           'stencilOp': { 0:true, 1:true, 2:true },
           'stencilOpSeparate': { 0:true, 1:true, 2:true, 3:true },

           // Culling

           'cullFace': { 0:true },
           'frontFace': { 0:true },
         };

         /**
          * Map of numbers to names.
          * @type {Object}
          */
         var glEnums = null;

         /**
          * Initializes this module. Safe to call more than once.
          * @param {!WebGLRenderingContext} ctx A WebGL context. If
          *    you have more than one context it doesn't matter which one
          *    you pass in, it is only used to pull out constants.
          */
         function init(ctx) {
           if (glEnums == null) {
             glEnums = { };
             for (var propertyName in ctx) {
               if (typeof ctx[propertyName] == 'number') {
                 glEnums[ctx[propertyName]] = propertyName;
               }
             }
           }
         }

         /**
          * Checks the utils have been initialized.
          */
         function checkInit() {
           if (glEnums == null) {
             throw 'WebGLDebugUtils.init(ctx) not called';
           }
         }

         /**
          * Returns true or false if value matches any WebGL enum
          * @param {*} value Value to check if it might be an enum.
          * @return {boolean} True if value matches one of the WebGL defined enums
          */
         function mightBeEnum(value) {
           checkInit();
           return (glEnums[value] !== undefined);
         }

         /**
          * Gets an string version of an WebGL enum.
          *
          * Example:
          *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
          *
          * @param {number} value Value to return an enum for
          * @return {string} The string version of the enum.
          */
         function glEnumToString(value) {
           checkInit();
           var name = glEnums[value];
           return (name !== undefined) ? name :
               ("*UNKNOWN WebGL ENUM (0x" + value.toString(16) + ")");
         }

         /**
          * Returns the string version of a WebGL argument.
          * Attempts to convert enum arguments to strings.
          * @param {string} functionName the name of the WebGL function.
          * @param {number} argumentIndx the index of the argument.
          * @param {*} value The value of the argument.
          * @return {string} The value as a string.
          */
         function glFunctionArgToString(functionName, argumentIndex, value) {
           var funcInfo = glValidEnumContexts[functionName];
           if (funcInfo !== undefined) {
             if (funcInfo[argumentIndex]) {
               return glEnumToString(value);
             }
           }
           return value.toString();
         }

         /**
          * Given a WebGL context returns a wrapped context that calls
          * gl.getError after every command and calls a function if the
          * result is not gl.NO_ERROR.
          *
          * @param {!WebGLRenderingContext} ctx The webgl context to
          *        wrap.
          * @param {!function(err, funcName, args): void} opt_onErrorFunc
          *        The function to call when gl.getError returns an
          *        error. If not specified the default function calls
          *        console.log with a message.
          */
         function makeDebugContext(ctx, opt_onErrorFunc) {
           init(ctx);
           opt_onErrorFunc = opt_onErrorFunc || function(err, functionName, args) {
                 // apparently we can't do args.join(",");
                 var argStr = "";
                 for (var ii = 0; ii < args.length; ++ii) {
                   argStr += ((ii == 0) ? '' : ', ') +
                       glFunctionArgToString(functionName, ii, args[ii]);
                 }
                 log("WebGL error "+ glEnumToString(err) + " in "+ functionName +
                     "(" + argStr + ")");
               };

           // Holds booleans for each GL error so after we get the error ourselves
           // we can still return it to the client app.
           var glErrorShadow = { };

           // Makes a function that calls a WebGL function and then calls getError.
           function makeErrorWrapper(ctx, functionName) {
             return function() {
               var result = ctx[functionName].apply(ctx, arguments);
               var err = ctx.getError();
               if (err != 0) {
                 glErrorShadow[err] = true;
                 opt_onErrorFunc(err, functionName, arguments);
               }
               return result;
             };
           }

           // Make a an object that has a copy of every property of the WebGL context
           // but wraps all functions.
           var wrapper = {};
           for (var propertyName in ctx) {
             if (typeof ctx[propertyName] == 'function') {
                wrapper[propertyName] = makeErrorWrapper(ctx, propertyName);
              } else {
                wrapper[propertyName] = ctx[propertyName];
              }
           }

           // Override the getError function with one that returns our saved results.
           wrapper.getError = function() {
             for (var err in glErrorShadow) {
               if (glErrorShadow[err]) {
                 glErrorShadow[err] = false;
                 return err;
               }
             }
             return ctx.NO_ERROR;
           };

           return wrapper;
         }

         function resetToInitialState(ctx) {
           var numAttribs = ctx.getParameter(ctx.MAX_VERTEX_ATTRIBS);
           var tmp = ctx.createBuffer();
           ctx.bindBuffer(ctx.ARRAY_BUFFER, tmp);
           for (var ii = 0; ii < numAttribs; ++ii) {
             ctx.disableVertexAttribArray(ii);
             ctx.vertexAttribPointer(ii, 4, ctx.FLOAT, false, 0, 0);
             ctx.vertexAttrib1f(ii, 0);
           }
           ctx.deleteBuffer(tmp);

           var numTextureUnits = ctx.getParameter(ctx.MAX_TEXTURE_IMAGE_UNITS);
           for (var ii = 0; ii < numTextureUnits; ++ii) {
             ctx.activeTexture(ctx.TEXTURE0 + ii);
             ctx.bindTexture(ctx.TEXTURE_CUBE_MAP, null);
             ctx.bindTexture(ctx.TEXTURE_2D, null);
           }

           ctx.activeTexture(ctx.TEXTURE0);
           ctx.useProgram(null);
           ctx.bindBuffer(ctx.ARRAY_BUFFER, null);
           ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, null);
           ctx.bindFramebuffer(ctx.FRAMEBUFFER, null);
           ctx.bindRenderbuffer(ctx.RENDERBUFFER, null);
           ctx.disable(ctx.BLEND);
           ctx.disable(ctx.CULL_FACE);
           ctx.disable(ctx.DEPTH_TEST);
           ctx.disable(ctx.DITHER);
           ctx.disable(ctx.SCISSOR_TEST);
           ctx.blendColor(0, 0, 0, 0);
           ctx.blendEquation(ctx.FUNC_ADD);
           ctx.blendFunc(ctx.ONE, ctx.ZERO);
           ctx.clearColor(0, 0, 0, 0);
           ctx.clearDepth(1);
           ctx.clearStencil(-1);
           ctx.colorMask(true, true, true, true);
           ctx.cullFace(ctx.BACK);
           ctx.depthFunc(ctx.LESS);
           ctx.depthMask(true);
           ctx.depthRange(0, 1);
           ctx.frontFace(ctx.CCW);
           ctx.hint(ctx.GENERATE_MIPMAP_HINT, ctx.DONT_CARE);
           ctx.lineWidth(1);
           ctx.pixelStorei(ctx.PACK_ALIGNMENT, 4);
           ctx.pixelStorei(ctx.UNPACK_ALIGNMENT, 4);
           ctx.pixelStorei(ctx.UNPACK_FLIP_Y_WEBGL, false);
           ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
           // TODO: Delete this IF.
           if (ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL) {
             ctx.pixelStorei(ctx.UNPACK_COLORSPACE_CONVERSION_WEBGL, ctx.BROWSER_DEFAULT_WEBGL);
           }
           ctx.polygonOffset(0, 0);
           ctx.sampleCoverage(1, false);
           ctx.scissor(0, 0, ctx.canvas.width, ctx.canvas.height);
           ctx.stencilFunc(ctx.ALWAYS, 0, 0xFFFFFFFF);
           ctx.stencilMask(0xFFFFFFFF);
           ctx.stencilOp(ctx.KEEP, ctx.KEEP, ctx.KEEP);
           ctx.viewport(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
           ctx.clear(ctx.COLOR_BUFFER_BIT | ctx.DEPTH_BUFFER_BIT | ctx.STENCIL_BUFFER_BIT);

           // TODO: This should NOT be needed but Firefox fails with 'hint'
           while(ctx.getError());
         }

         function makeLostContextSimulatingContext(ctx) {
           var wrapper_ = {};
           var contextId_ = 1;
           var contextLost_ = false;
           var resourceId_ = 0;
           var resourceDb_ = [];
           var onLost_ = undefined;
           var onRestored_ = undefined;
           var nextOnRestored_ = undefined;

           // Holds booleans for each GL error so can simulate errors.
           var glErrorShadow_ = { };

           function isWebGLObject(obj) {
             //return false;
             return (obj instanceof WebGLBuffer ||
                     obj instanceof WebGLFramebuffer ||
                     obj instanceof WebGLProgram ||
                     obj instanceof WebGLRenderbuffer ||
                     obj instanceof WebGLShader ||
                     obj instanceof WebGLTexture);
           }

           function checkResources(args) {
             for (var ii = 0; ii < args.length; ++ii) {
               var arg = args[ii];
               if (isWebGLObject(arg)) {
                 return arg.__webglDebugContextLostId__ == contextId_;
               }
             }
             return true;
           }

           function clearErrors() {
             var k = Object.keys(glErrorShadow_);
             for (var ii = 0; ii < k.length; ++ii) {
               delete glErrorShdow_[k];
             }
           }

           // Makes a function that simulates WebGL when out of context.
           function makeLostContextWrapper(ctx, functionName) {
             var f = ctx[functionName];
             return function() {
               // Only call the functions if the context is not lost.
               if (!contextLost_) {
                 if (!checkResources(arguments)) {
                   glErrorShadow_[ctx.INVALID_OPERATION] = true;
                   return;
                 }
                 var result = f.apply(ctx, arguments);
                 return result;
               }
             };
           }

           for (var propertyName in ctx) {
             if (typeof ctx[propertyName] == 'function') {
                wrapper_[propertyName] = makeLostContextWrapper(ctx, propertyName);
              } else {
                wrapper_[propertyName] = ctx[propertyName];
              }
           }

           function makeWebGLContextEvent(statusMessage) {
             return {statusMessage: statusMessage};
           }

           function freeResources() {
             for (var ii = 0; ii < resourceDb_.length; ++ii) {
               var resource = resourceDb_[ii];
               if (resource instanceof WebGLBuffer) {
                 ctx.deleteBuffer(resource);
               } else if (resource instanceof WebctxFramebuffer) {
                 ctx.deleteFramebuffer(resource);
               } else if (resource instanceof WebctxProgram) {
                 ctx.deleteProgram(resource);
               } else if (resource instanceof WebctxRenderbuffer) {
                 ctx.deleteRenderbuffer(resource);
               } else if (resource instanceof WebctxShader) {
                 ctx.deleteShader(resource);
               } else if (resource instanceof WebctxTexture) {
                 ctx.deleteTexture(resource);
               }
             }
           }

           wrapper_.loseContext = function() {
             if (!contextLost_) {
               contextLost_ = true;
               ++contextId_;
               while (ctx.getError());
               clearErrors();
               glErrorShadow_[ctx.CONTEXT_LOST_WEBGL] = true;
               setTimeout(function() {
                   if (onLost_) {
                     onLost_(makeWebGLContextEvent("context lost"));
                   }
                 }, 0);
             }
           };

           wrapper_.restoreContext = function() {
             if (contextLost_) {
               if (onRestored_) {
                 setTimeout(function() {
                     freeResources();
                     resetToInitialState(ctx);
                     contextLost_ = false;
                     if (onRestored_) {
                       var callback = onRestored_;
                       onRestored_ = nextOnRestored_;
                       nextOnRestored_ = undefined;
                       callback(makeWebGLContextEvent("context restored"));
                     }
                   }, 0);
               } else {
                 throw "You can not restore the context without a listener"
               }
             }
           };

           // Wrap a few functions specially.
           wrapper_.getError = function() {
             if (!contextLost_) {
               var err;
               while (err = ctx.getError()) {
                 glErrorShadow_[err] = true;
               }
             }
             for (var err in glErrorShadow_) {
               if (glErrorShadow_[err]) {
                 delete glErrorShadow_[err];
                 return err;
               }
             }
             return ctx.NO_ERROR;
           };

           var creationFunctions = [
             "createBuffer",
             "createFramebuffer",
             "createProgram",
             "createRenderbuffer",
             "createShader",
             "createTexture"
           ];
           for (var ii = 0; ii < creationFunctions.length; ++ii) {
             var functionName = creationFunctions[ii];
             wrapper_[functionName] = function(f) {
               return function() {
                 if (contextLost_) {
                   return null;
                 }
                 var obj = f.apply(ctx, arguments);
                 obj.__webglDebugContextLostId__ = contextId_;
                 resourceDb_.push(obj);
                 return obj;
               };
             }(ctx[functionName]);
           }

           var functionsThatShouldReturnNull = [
             "getActiveAttrib",
             "getActiveUniform",
             "getBufferParameter",
             "getContextAttributes",
             "getAttachedShaders",
             "getFramebufferAttachmentParameter",
             "getParameter",
             "getProgramParameter",
             "getProgramInfoLog",
             "getRenderbufferParameter",
             "getShaderParameter",
             "getShaderInfoLog",
             "getShaderSource",
             "getTexParameter",
             "getUniform",
             "getUniformLocation",
             "getVertexAttrib"
           ];
           for (var ii = 0; ii < functionsThatShouldReturnNull.length; ++ii) {
             var functionName = functionsThatShouldReturnNull[ii];
             wrapper_[functionName] = function(f) {
               return function() {
                 if (contextLost_) {
                   return null;
                 }
                 return f.apply(ctx, arguments);
               }
             }(wrapper_[functionName]);
           }

           var isFunctions = [
             "isBuffer",
             "isEnabled",
             "isFramebuffer",
             "isProgram",
             "isRenderbuffer",
             "isShader",
             "isTexture"
           ];
           for (var ii = 0; ii < isFunctions.length; ++ii) {
             var functionName = isFunctions[ii];
             wrapper_[functionName] = function(f) {
               return function() {
                 if (contextLost_) {
                   return false;
                 }
                 return f.apply(ctx, arguments);
               }
             }(wrapper_[functionName]);
           }

           wrapper_.checkFramebufferStatus = function(f) {
             return function() {
               if (contextLost_) {
                 return ctx.FRAMEBUFFER_UNSUPPORTED;
               }
               return f.apply(ctx, arguments);
             };
           }(wrapper_.checkFramebufferStatus);

           wrapper_.getAttribLocation = function(f) {
             return function() {
               if (contextLost_) {
                 return -1;
               }
               return f.apply(ctx, arguments);
             };
           }(wrapper_.getAttribLocation);

           wrapper_.getVertexAttribOffset = function(f) {
             return function() {
               if (contextLost_) {
                 return 0;
               }
               return f.apply(ctx, arguments);
             };
           }(wrapper_.getVertexAttribOffset);

           wrapper_.isContextLost = function() {
             return contextLost_;
           };

           function wrapEvent(listener) {
             if (typeof(listener) == "function") {
               return listener;
             } else {
               return function(info) {
                 listener.handleEvent(info);
               }
             }
           }

           wrapper_.registerOnContextLostListener = function(listener) {
             onLost_ = wrapEvent(listener);
           };

           wrapper_.registerOnContextRestoredListener = function(listener) {
             if (contextLost_) {
               nextOnRestored_ = wrapEvent(listener);
             } else {
               onRestored_ = wrapEvent(listener);
             }
           }

           return wrapper_;
         }

         return {
           /**
            * Initializes this module. Safe to call more than once.
            * @param {!WebGLRenderingContext} ctx A WebGL context. If
            *    you have more than one context it doesn't matter which one
            *    you pass in, it is only used to pull out constants.
            */
           'init': init,

           /**
            * Returns true or false if value matches any WebGL enum
            * @param {*} value Value to check if it might be an enum.
            * @return {boolean} True if value matches one of the WebGL defined enums
            */
           'mightBeEnum': mightBeEnum,

           /**
            * Gets an string version of an WebGL enum.
            *
            * Example:
            *   WebGLDebugUtil.init(ctx);
            *   var str = WebGLDebugUtil.glEnumToString(ctx.getError());
            *
            * @param {number} value Value to return an enum for
            * @return {string} The string version of the enum.
            */
           'glEnumToString': glEnumToString,

           /**
            * Converts the argument of a WebGL function to a string.
            * Attempts to convert enum arguments to strings.
            *
            * Example:
            *   WebGLDebugUtil.init(ctx);
            *   var str = WebGLDebugUtil.glFunctionArgToString('bindTexture', 0, gl.TEXTURE_2D);
            *
            * would return 'TEXTURE_2D'
            *
            * @param {string} functionName the name of the WebGL function.
            * @param {number} argumentIndx the index of the argument.
            * @param {*} value The value of the argument.
            * @return {string} The value as a string.
            */
           'glFunctionArgToString': glFunctionArgToString,

           /**
            * Given a WebGL context returns a wrapped context that calls
            * gl.getError after every command and calls a function if the
            * result is not NO_ERROR.
            *
            * You can supply your own function if you want. For example, if you'd like
            * an exception thrown on any GL error you could do this
            *
            *    function throwOnGLError(err, funcName, args) {
            *      throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to" +
            *            funcName;
            *    };
            *
            *    ctx = WebGLDebugUtils.makeDebugContext(
            *        canvas.getContext("webgl"), throwOnGLError);
            *
            * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
            * @param {!function(err, funcName, args): void} opt_onErrorFunc The function
            *     to call when gl.getError returns an error. If not specified the default
            *     function calls console.log with a message.
            */
           'makeDebugContext': makeDebugContext,

           /**
            * Given a WebGL context returns a wrapped context that adds 4
            * functions.
            *
            * ctx.loseContext:
            *   simulates a lost context event.
            *
            * ctx.restoreContext:
            *   simulates the context being restored.
            *
            * ctx.registerOnContextLostListener(listener):
            *   lets you register a listener for context lost. Use instead
            *   of addEventListener('webglcontextlostevent', listener);
            *
            * ctx.registerOnContextRestoredListener(listener):
            *   lets you register a listener for context restored. Use
            *   instead of addEventListener('webglcontextrestored',
            *   listener);
            *
            * @param {!WebGLRenderingContext} ctx The webgl context to wrap.
            */
           'makeLostContextSimulatingContext': makeLostContextSimulatingContext,

           /**
            * Resets a context to the initial state.
            * @param {!WebGLRenderingContext} ctx The webgl context to
            *     reset.
            */
           'resetToInitialState': resetToInitialState
         };

         }();
      </script>
      <script>
         function initShaders(gl, vshader, fshader) {
         var program = createProgram(gl, vshader, fshader);
         if (!program) {
         console.log('failed to create program');
         return false;
         }
         gl.useProgram(program);
         gl.program = program;
         return true;
         }

         function createProgram(gl, vshader, fshader) {

         var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
         var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
         if (!vertexShader || !fragmentShader) {
         return null;
         }

         var program = gl.createProgram();
         if (!program) {
         return null;
         }

         gl.attachShader(program, vertexShader);
         gl.attachShader(program, fragmentShader);

         gl.linkProgram(program);

         var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
         if (!linked) {
         var error = gl.getProgramInfoLog(program);
         console.log('failed to link program: ' + error);
         gl.deleteProgram(program);
         gl.deleteShader(fragmentShader);
         gl.deleteShader(vertexShader);
         return null;
         }
         return program;
         }

         function loadShader(gl, type, source) {

         var shader = gl.createShader(type);
         if (shader == null) {
         console.log('unable to create shader');
         return null;
         }

         gl.shaderSource(shader, source);

         gl.compileShader(shader);

         var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
         if (!compiled) {
         var error = gl.getShaderInfoLog(shader);
         console.log('failed to compile shader: ' + error);
         gl.deleteShader(shader);
         return null;
         }
         return shader;
         }

         function loadVariableLocations(gl, program) {
         var i, name;

         var attribCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
         var uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

         var attribIndex = {};
         for (i = 0; i < attribCount; ++i) {
         name = gl.getActiveAttrib(program, i).name;
         attribIndex[name] = i;
         }

         var uniformLoc = {};
         for (i = 0; i < uniformCount; ++i) {
         name = gl.getActiveUniform(program, i).name;
         uniformLoc[name] = gl.getUniformLocation(program, name);
         }

         program.attribIndex = attribIndex;
         program.uniformLoc = uniformLoc;
         }

         function getWebGLContext(canvas, opt_debug) {
         var gl = WebGLUtils.setupWebGL(canvas);
         if (!gl) return null;
         if (arguments.length < 2 || opt_debug) {
         gl = WebGLDebugUtils.makeDebugContext(gl);
         }
         return gl;
         }
      </script>
      <script>
         //Vertex shader program
          var VSHADER_SOURCE=
          //Add an attribute here for clicking mode and 
          //Boundary drawing mode
          //Then write an if condition inside the shader
          'attribute vec4 a_Position;\n'+
          'void main(){\n'+
          'gl_Position=a_Position;\n'+
          'gl_PointSize=5.0;\n'+
          '}\n';
          //Fragment shader Program
          var FSHADER_SOURCE=
          'precision mediump float;\n'+
          //'uniform vec4 u_FragColor;\n'+
          'void main(){\n'+
          'gl_FragColor=vec4(1.0, 0.0, 0.0, 1.0);\n'+
          '}\n';

          var b_coords=new Float32Array(600);//boundary points
          var i_coords=new Float32Array(900);//interior points
          var n_coords=new Float32Array(1200);//all points
          var bDefined=false;//The boundary isn't defined yet
          var nCoords=0;//Number of vertex coordinates (total)
          var bCoords=0;//Number of boundary coordinates
          var iCoords=0;//Number of interior coordinates
          var edges=[];//all edges
          var nodes=[];//all nodes
          var triangles=[];
          var numBNodes=0;//number of boundary nodes
          var numINodes=0;//Number of interior nodes
          var numNodes=0;//Total number of nodes
          var numBEdges=0;//number of boundary edges
          var numIEdges=0;//Number of interior edges
          var numEdges=0;//Total number of edges
          var numTriangles=0;//Total number of triangles
          function node(x,y, index, boundOrInt){
            this.index=index;
            this.interior=false;
            if(boundOrInt>0){this.interior=true;}else{this.interior=false;}
            this.x=x;
            this.y=y;
            this.triangles=[];//Will contain the triangles that have this node
            this.edges=[];//Will contain the edges that have this node
          }
          function edge(nodeIndex1, nodeIndex2, index, boundOrInt){
            this.index=index;
            this.nodeIndices=[nodeIndex1, nodeIndex2];//Will contain the indices of the nodes of the edge
            this.coords= new Float32Array([nodes[nodeIndex1].x, nodes[nodeIndex1].y, nodes[nodeIndex2].x, nodes[nodeIndex2].y]);
            this.interior=false;
            if(boundOrInt>0){this.interior=true;}else{this.interior=false;}
            this.oppositeNodeIndices=[];//will contain the indices of the two opposite nodes if edge is interior
            this.oppositeAngles=[];//will contain two angles if edge is interior
            this.neighbourTriangleIndices=[];
            this.sumOpAngles=0;
            this.addOppositeAngles=function(){//sometimes adding 3 or only 1 opposite angle !
              if(this.interior==true){
                for(var t=0;t<triangles.length;t++){
                  if(triangles[t].nodeIndices.indexOf(this.nodeIndices[0])>=0 && triangles[t].nodeIndices.indexOf(this.nodeIndices[1])>=0){
                    console.log("edge number "+this.index+" belongs to triangle number "+t);//This works !!
                    console.log("edge number "+this.index+" has corner nodes "+this.nodeIndices[0]+" , "+this.nodeIndices[1]);//This works !!
                    var index1=triangles[t].nodeIndices.indexOf(this.nodeIndices[0]);
                    var index2=triangles[t].nodeIndices.indexOf(this.nodeIndices[1]);
                    if((index1+index2)==1){this.oppositeNodeIndices.push(triangles[t].nodeIndices[2]);
                      this.oppositeAngles.push(triangles[t].angles[2]);this.sumOpAngles+=triangles[t].angles[2];}
                    else if((index1+index2)==2){this.oppositeNodeIndices.push(triangles[t].nodeIndices[1]);
                      this.oppositeAngles.push(triangles[t].angles[1]);this.sumOpAngles+=triangles[t].angles[1];}
                    else if((index1+index2)==3){this.oppositeNodeIndices.push(triangles[t].nodeIndices[0]);
                      this.oppositeAngles.push(triangles[t].angles[0]);this.sumOpAngles+=triangles[t].angles[0];}
                    this.neighbourTriangleIndices.push(t);
                  }
                }
              }
            };
            this.zero=function(){
              this.oppositeAngles.length=0;//empty the opposite angles from the previous flip
              this.oppositeNodeIndices.length=0;
              this.neighbourTriangleIndices.length=0;
              this.sumOpAngles=0;
            }
          }

          function triangle(nodeIndex1, nodeIndex2, nodeIndex3, index){
            this.index=index;
            this.nodeIndices=[nodeIndex1, nodeIndex2, nodeIndex3];//Will contain the indices of the nodes of the triangle
            this.tb_coords=new Float32Array([nodes[nodeIndex1].x, nodes[nodeIndex1].y, 
                            nodes[nodeIndex2].x, nodes[nodeIndex2].y,
                            nodes[nodeIndex3].x, nodes[nodeIndex3].y]);
            this.vec1=new Float32Array([nodes[nodeIndex2].x-nodes[nodeIndex1].x,
                          nodes[nodeIndex2].y-nodes[nodeIndex1].y]);
            this.vec2=new Float32Array([nodes[nodeIndex3].x-nodes[nodeIndex1].x,
                          nodes[nodeIndex3].y-nodes[nodeIndex1].y]);
            this.vec3=new Float32Array([nodes[nodeIndex1].x-nodes[nodeIndex2].x,
                          nodes[nodeIndex1].y-nodes[nodeIndex2].y]);
            this.vec4=new Float32Array([nodes[nodeIndex3].x-nodes[nodeIndex2].x,
                          nodes[nodeIndex3].y-nodes[nodeIndex2].y]);
            this.vec5=new Float32Array([nodes[nodeIndex1].x-nodes[nodeIndex3].x,
                          nodes[nodeIndex1].y-nodes[nodeIndex3].y]);
            this.vec6=new Float32Array([nodes[nodeIndex2].x-nodes[nodeIndex3].x,
                          nodes[nodeIndex2].y-nodes[nodeIndex3].y]);
            this.vec1Norm=Math.sqrt(this.vec1[0]*this.vec1[0]+this.vec1[1]*this.vec1[1]);
            this.vec2Norm=Math.sqrt(this.vec2[0]*this.vec2[0]+this.vec2[1]*this.vec2[1]);
            this.vec3Norm=Math.sqrt(this.vec3[0]*this.vec3[0]+this.vec3[1]*this.vec3[1]);
            this.vec4Norm=Math.sqrt(this.vec4[0]*this.vec4[0]+this.vec4[1]*this.vec4[1]);
            this.vec5Norm=Math.sqrt(this.vec5[0]*this.vec5[0]+this.vec5[1]*this.vec5[1]);
            this.vec6Norm=Math.sqrt(this.vec6[0]*this.vec6[0]+this.vec6[1]*this.vec6[1]);
            this.vec1DotVec2=this.vec1[0]*this.vec2[0]+this.vec1[1]*this.vec2[1];
            this.vec3DotVec4=this.vec3[0]*this.vec4[0]+this.vec3[1]*this.vec4[1];
            this.vec5DotVec6=this.vec5[0]*this.vec6[0]+this.vec5[1]*this.vec6[1];
            var angle1=(Math.acos(this.vec1DotVec2/(this.vec1Norm*this.vec2Norm)))*180/Math.PI;
            var angle2=(Math.acos(this.vec3DotVec4/(this.vec3Norm*this.vec4Norm)))*180/Math.PI;
            var angle3=(Math.acos(this.vec5DotVec6/(this.vec5Norm*this.vec6Norm)))*180/Math.PI;
            this.angles=[angle1, angle2, angle3];//The key is that node 1 has angle 1 and so on
          }

          function main(){
            var canvas = document.getElementById('webgl');
            var bDefineBtn=document.getElementById('bDefine');
            var reDefineBtn=document.getElementById('reDefine');
            var iPointsTxt=document.getElementById('iPoints');
            var iPointsBtn=document.getElementById('iPointsApply');
            var gl=getWebGLContext(canvas); 
            if(!gl){
              console.log('Failed to get the rendering context for WebGL');
              return;
            }
            else{console.log('success getting the rendering context');}
            if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)){
              console.log('Failed to initialize shaders');
              return;
            }
            else{console.log('success initializing the shaders');}
            gl.clearColor(0.78,0.87,0.88,1.0);//blueish grey
            gl.clear(gl.COLOR_BUFFER_BIT);
            canvas.onmousedown=function(ev){click(ev, gl, canvas)};
            bDefineBtn.onclick=function(ev){bDefine(ev,gl)};//Make sure this syntax is correct
            reDefineBtn.onclick=function(ev){reDefine(ev,gl)};//Make sure this syntax is correct
            iPointsBtn.onclick=function(ev){iPoints(ev,gl,iPointsTxt)};
            meshBtn.onclick=function(ev){mesh(ev,gl,b_coords, bCoords, i_coords, iCoords)};
            flipBtn.onclick=function(ev){edgeFlip(ev,gl,b_coords, bCoords, i_coords, iCoords)};
          }

          function click(ev, gl, canvas){
            if(bDefined==false){
                var x = ev.clientX;
                var y = ev.clientY;
                var rect=ev.target.getBoundingClientRect();//Gets the position of canvas in the client area
                x=((x-rect.left)-canvas.width/2)/(canvas.width/2);
                y=(canvas.height/2-(y-rect.top))/(canvas.height/2);
                console.log('in click x= '+x+' y= '+y);
                b_coords[bCoords]=x;n_coords[bCoords]=x;
                b_coords[bCoords+1]=y;n_coords[bCoords+1]=y;
                bCoords+=2;
                var vertexBuffer = gl.createBuffer(); 
                if(!vertexBuffer){console.log('Failed to create the buffer object');return -1;} 
                gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);//Binding the buffer object to target
                gl.bufferData(gl.ARRAY_BUFFER, b_coords, gl.STATIC_DRAW);//Write data into buffer
                var a_Position=gl.getAttribLocation(gl.program, 'a_Position');
                if(a_Position<0){
                  console.log('Failed to get the storage location of a_Position inside click');
                  return;
                }
                else{console.log('success getting the storage location of a_Position inside click');}
                gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(a_Position);
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.drawArrays(gl.POINTS, 0, bCoords/2);
              }
            }
          
          function bDefine(ev,gl){
            if(bDefined==false){
              for(var i=0;i<numBNodes;i+=1){
                var boundaryEdge=new edge(nodes[i].index, nodes[(i+1)%numBNodes].index, numEdges, -1);//-1 indicates that it is a boundary edge
                edges.push(boundaryEdge);numEdges+=1;numBEdges+=1;
              }
              var vertexBuffer = gl.createBuffer(); 
              if(!vertexBuffer){console.log('Failed to create the buffer object');return -1;} 
              gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);//Binding the buffer object to target
              gl.bufferData(gl.ARRAY_BUFFER, b_coords, gl.STATIC_DRAW);//Write data into buffer
              var a_Position=gl.getAttribLocation(gl.program, 'a_Position');
              if(a_Position<0){
                console.log('Failed to get the storage location of a_Position');
                return;
              }
              else{console.log('success getting the storage location of a_Position');}
              gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
              gl.enableVertexAttribArray(a_Position);
              gl.clear(gl.COLOR_BUFFER_BIT);
              gl.drawArrays(gl.LINE_LOOP, 0, numBNodes);
            }
            bDefined=true;
          }
          function reDefine(ev, gl){
            gl.clear(gl.COLOR_BUFFER_BIT);
            bCoords=0;iCoords=0;nCoords=0;numBNodes=0;numINodes=0;numNodes=0;
            bDefined=false;
          }

          function iPoints(ev, gl, iPointsTxt){
            for(var i=numBNodes;i<numNodes;i+=1){nodes.pop();}
            numNodes-=numINodes;
            numINodes=parseInt(iPointsTxt.value);
            iCoords=numINodes*2;
            nCoords=bCoords+iCoords;
            var leftMin=b_coords[0];//Minimum x boundary coordinate
            var botMin=b_coords[1];//Minimum y boundary coordinate
            var rightMax=b_coords[0];//Maximum x boundary coordinate
            var upMax=b_coords[1];//Maximum y boundary coordinate
            for(var k=0;k<bCoords;k+=2){
              if(b_coords[k]<leftMin)leftMin=b_coords[k];
              if(b_coords[k]>rightMax)rightMax=b_coords[k];
            }
            for(var k=1;k<bCoords;k+=2){
              if(b_coords[k]<botMin)botMin=b_coords[k];
              if(b_coords[k]>upMax)upMax=b_coords[k];
            }
            var n=0;
            while(n<iCoords){
            //Add the interior vertices to i_coords and n_coords one by one
              var newX=leftMin+(rightMax-leftMin)*Math.random();
              var newY=botMin+(upMax-botMin)*Math.random();
              if(isInside(newX, newY, b_coords, bCoords)){
                i_coords[n]=newX;
                i_coords[n+1]=newY;
                n_coords[bCoords+n]=newX;
                n_coords[bCoords+n+1]=newY;
                var interiorNode=new node(newX, newY, numNodes, 1);
                nodes.push(interiorNode);numNodes+=1;
                n+=2;
              }
            }
            var vertexBuffer = gl.createBuffer(); 
            if(!vertexBuffer){console.log('Failed to create the buffer object');return -1;} 
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);//Binding the buffer object to target
            gl.bufferData(gl.ARRAY_BUFFER, n_coords, gl.STATIC_DRAW);//Write data into buffer
            var a_Position=gl.getAttribLocation(gl.program, 'a_Position');
            if(a_Position<0){
              console.log('Failed to get the storage location of a_Position');
              return;
            }
            else{console.log('success getting the storage location of a_Position');}
            gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(a_Position);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.POINTS, numBNodes, numINodes);
            gl.drawArrays(gl.LINE_LOOP, 0, numBNodes);
          }
          function isInside(newX, newY, b_coords, bCoords){
            var yThreshold = newY;
            var LHS=0, RHS=0;//no of intersection pts at the left and right
            for(var b=1;b<=bCoords-3;b+=2){//Traverse all edges except the last one
              //Here I used b as counter letter
              var interR=intersects(newX, newY, 5000.1, newY, b_coords[b-1], b_coords[b],b_coords[b+1], b_coords[b+2]);
              var interL=intersects(newX, newY,-5000.1, newY, b_coords[b-1], b_coords[b],b_coords[b+1], b_coords[b+2]);
              if(interR[2]==true){RHS+=1;}
              else if(interL[2]==true){LHS+=1;}
            }//bCoords-3 loop
            //Traverse the last edge
            var interR=intersects(newX, newY, 5000.1, newY, b_coords[bCoords-2], b_coords[bCoords-1],b_coords[0], b_coords[1]);
            var interL=intersects(newX, newY, -5000.1, newY, b_coords[bCoords-2], b_coords[bCoords-1],b_coords[0], b_coords[1]);
            if(interL[2]==true){LHS+=1;}
            if(interR[2]==true){RHS+=1;}
            if((LHS%2) == 1 && (RHS%2) == 1){
              return true;
            }
            else{
              return false;
            }
          }
          function intersects(pX, pY, farX, farY, edgeX1, edgeY1, edgeX2, edgeY2){
            var o1=(farX-pX)*(edgeY1-farY)-(edgeX1-farX)*(farY-pY);//Orientation of edge wrt p to far
            var o2=(farX-pX)*(edgeY2-farY)-(edgeX2-farX)*(farY-pY);
            var o3=(edgeX2-edgeX1)*(pY-edgeY2)-(pX-edgeX2)*(edgeY2-edgeY1);//Orientation of p to far wrt edge  
            var o4=(edgeX2-edgeX1)*(farY-edgeY2)-(farX-edgeX2)*(edgeY2-edgeY1);
            if(o1*o2<=0.0000001 && o3*o4<=0.0000001){
              if(edgeY2==edgeY1)edgeY2=edgeY1+0.0000001;if(edgeX2==edgeX1)edgeX2=edgeX1+0.0000001;
              var m=(edgeY2-edgeY1)/(edgeX2-edgeX1);var b =edgeY1-m*edgeX1;
              var xInt = (pY-b)/m;//intersection x
              var yInt = pY; //intersection y
              return [xInt, yInt, true];
            }
            else{return [50000,50000,false];}
          }
          function isPointLeftOfEdge(px, py, edgeStartX, edgeStartY, edgeEndX, edgeEndY){
            //The determinant of the cross product of the vector between the first and second edge vertices
            //and the vector between the first edge vertex and the test point
            //is positive if the test point is on the left hand side(looking from the start point in the direction of the end point)
            //negative if the test point is on the right hand side
            //zero if the test point is exactly in between
            return ((edgeEndX-edgeStartX)*(py-edgeStartY)-(px-edgeStartX)*(edgeEndY-edgeStartY))>0;
          }
          function mesh(ev, gl, b_coords, bCoords, i_coords, iCoords){
            for(var i =0;i<numBNodes;i+=1){ //Define the initial edges and triangles
            var interiorEdge=new edge(nodes[numBNodes].index, nodes[i].index, numEdges, 1);//1 indicates that it is an interior edge
            edges.push(interiorEdge);numEdges+=1;numIEdges+=1;
            var newTriangle=new triangle(nodes[numBNodes].index, nodes[i].index, nodes[(i+1)%numBNodes].index, numTriangles);
            triangles.push(newTriangle);numTriangles+=1;
            }
            for(var i=numBNodes+1;i<numNodes;i+=1){//This loop adds the interior points starting from the second one
              var initialNumOfTriangles=triangles.length;
              for(var t=0; t<initialNumOfTriangles;t++){
                if(isInside(nodes[i].x, nodes[i].y, triangles[t].tb_coords,6)){
                  console.log("node is inside");
                  var interiorEdge1 = new edge(nodes[i].index, triangles[t].nodeIndices[0], numEdges, 1);//1 indicates that this is an interior edge
                  edges.push(interiorEdge1);numEdges+=1;numIEdges+=1;
                  var interiorEdge2 = new edge(nodes[i].index, triangles[t].nodeIndices[1], numEdges, 1);//1 indicates that this is an interior edge
                  edges.push(interiorEdge2);numEdges+=1;numIEdges+=1;
                  var interiorEdge3 = new edge(nodes[i].index, triangles[t].nodeIndices[2], numEdges, 1);//1 indicates that this is an interior edge
                  edges.push(interiorEdge3);numEdges+=1;numIEdges+=1;
                  var triangle1=new triangle(nodes[i].index, triangles[t].nodeIndices[0], triangles[t].nodeIndices[1], numTriangles);
                  //triangles.push(triangle1);
                  var triangle2=new triangle(nodes[i].index, triangles[t].nodeIndices[1], triangles[t].nodeIndices[2], numTriangles);
                  var triangle3=new triangle(nodes[i].index, triangles[t].nodeIndices[2], triangles[t].nodeIndices[0], numTriangles);
                  delete triangles[t];
                  triangles[t]=triangle1;
                  triangles.push(triangle2);numTriangles+=1;
                  triangles.push(triangle3);numTriangles+=1;
                }
              } 
            }
            //Draw
            var vertexBuffer = gl.createBuffer(); 
            if(!vertexBuffer){console.log('Failed to create the buffer object');return -1;} 
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);//Binding the buffer object to target
            gl.bufferData(gl.ARRAY_BUFFER, n_coords, gl.STATIC_DRAW);//Write data into buffer
            var a_Position=gl.getAttribLocation(gl.program, 'a_Position');
            if(a_Position<0){
              console.log('Failed to get the storage location of a_Position');
              return;
            }
            else{console.log('success getting the storage location of a_Position');}
            gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(a_Position);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.POINTS, numBNodes, numINodes);
            gl.drawArrays(gl.LINE_LOOP, 0, numBNodes);
            for(var i=numBEdges;i<numEdges;i+=1){
              var dizi=new Float32Array([edges[i].coords[0], edges[i].coords[1],edges[i].coords[2],edges[i].coords[3]]);
              gl.bufferData(gl.ARRAY_BUFFER, dizi, gl.STATIC_DRAW);//Write data into buffer
              gl.drawArrays(gl.LINES, 0, 2);
            }
          }
          function edgeFlip(ev,gl,b_coords, bCoords, i_coords, iCoords){
            console.log("NOW WE ARE IN EDGE FLIP");
            for(var z=0;z<numEdges;z++){edges[z].index=z}
            for(var z=0;z<numTriangles;z++){triangles[z].index=z;}
            console.log("here we check the node indices of all triangles");
            for(var p=0;p<numTriangles;p++)console.log(triangles[p]);
            console.log("here we check the node indices of all internal edges");
            for(var p=numBEdges;p<numEdges;p++)console.log(edges[p]);
            for(var i=numBEdges;i<numEdges;i++){//traverse all the internal edges
              edges[i].zero();
              edges[i].addOppositeAngles();
              if(edges[i].oppositeAngles.length!=2){
                break;
              }
              if(edges[i].sumOpAngles>180){
                delete triangles[edges[i].neighbourTriangleIndices[0]];
                delete triangles[edges[i].neighbourTriangleIndices[1]];
                triangles[edges[i].neighbourTriangleIndices[0]] = new triangle(edges[i].oppositeNodeIndices[0], edges[i].oppositeNodeIndices[1], edges[i].nodeIndices[0]);
                triangles[edges[i].neighbourTriangleIndices[1]] = new triangle(edges[i].oppositeNodeIndices[0], edges[i].oppositeNodeIndices[1], edges[i].nodeIndices[1]);
                var i1=edges[i].oppositeNodeIndices[0];var i2=edges[i].oppositeNodeIndices[1];
                delete edges[i];
                edges[i]=new edge(i1, i2, numEdges, 1);
                break;//If we don't do this, it keeps flipping without updating the new ones
              }
            }
            //Draw
            var vertexBuffer = gl.createBuffer(); 
            if(!vertexBuffer){console.log('Failed to create the buffer object');return -1;} 
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);//Binding the buffer object to target
            gl.bufferData(gl.ARRAY_BUFFER, n_coords, gl.STATIC_DRAW);//Write data into buffer
            var a_Position=gl.getAttribLocation(gl.program, 'a_Position');
            if(a_Position<0){
              console.log('Failed to get the storage location of a_Position');
              return;
            }
            else{console.log('success getting the storage location of a_Position');}
            gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(a_Position);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.drawArrays(gl.POINTS, numBNodes, numINodes);
            gl.drawArrays(gl.LINE_LOOP, 0, numBNodes);
            for(var i=numBEdges;i<numEdges;i+=1){
              var dizi=new Float32Array([edges[i].coords[0], edges[i].coords[1],edges[i].coords[2],edges[i].coords[3]]);
              gl.bufferData(gl.ARRAY_BUFFER, dizi, gl.STATIC_DRAW);//Write data into buffer
              gl.drawArrays(gl.LINES, 0, 2);
            }
          }
      </script>
      
   </body>
   </html>

The above canvas responds to mouse clicks by drawing a dot. Using mouse clicks the boundary of the domain to be meshed is defined. In the next step the interior of the boundary is populated with vertices with random position. In this process the random vertices are generated between the maximum and minimum x and y coordinates of the boundary vertices. In order to determine if a randomly generated vertex is inside the boundary or not, the following steps are applied [1_]:

- **Step 1**: For each newly generated interior vertex (test vertex), the y coordinate of this vertex is called the y-threshold. Find the edges constituting the boundary, which have one end above, the other end below the y-threshold. If one vertex of an edge is exactly on the y-threshold, then this vertex is assumed to be above the threshold. This is an arbitrary decision. If we choose the other way round it would work too as long as this rule is applied consistently.

- **Step 2**: Locate all points on the boundary where a straight horizontal line through the test vertex intersects the boundary. These are the points on the edges found in Step 1 having the same y-coordinate as the y-threshold. This can be done by interpolating between the two ends of the edge for the x coordinate that corresponds to the y-threshold. If the interpolated x-coordinate is less than the x-coordinate of the test vertex, then the intersection point is on the left hand side of the test vertex.

- **Step 3**: If both on the left and right hand side of the test vertex there are odd number of intersection points (like 3 and 3), then the test vertex is inside the polygon. If there are even number of intersection points on both sides, then it is outside the polygon.

Auxiliary Functions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**Finding if a point lies to the left or right of a line**:

**Finding the intersection point of two line segments**: We start this procedure by determining if two segments intersect or not. This can be done by checking the orientation of the segments with respect to each other [2_]. As an example the orientation of the segment :math:`(p_1, p_2)` in Figure 1 with respect to the vertex :math:`p_3` is counterclockwise and :math:`((p_2-p_1) \Lambda (p_3 - p_2))\cdot \mathbf{k}>0`. Similarly the orientation of the segment :math:`(p_1, p_2)` with respect to the vertex :math:`p_4` is clockwise and :math:`((p_2-p_1) \Lambda (p_4 - p_2))\cdot \mathbf{k}< 0`. Here the symbol :math:`\Lambda` denotes the cross product operation and :math:`\mathbf{k}` denotes a unit vector in the positive z-direction according to the right hand rule. 

.. _TwoSegs:
.. figure:: Segments.JPG
   :height: 515px
   :width: 915 px
   :scale: 50 %
   :align: center

   Figure 1: Intersection of Segments

The necessary conditions for 2 segments oriented as in Figure 1, to intersect each other are:

**Condition1**: :math:`p_3` and :math:`p_4` must have opposite orientation with respect to the segment :math:`(p_1, p_2)`.

**Condition2**: :math:`p_1` and :math:`p_2` must have opposite orientation with respect to the segment :math:`(p_3, p_4)`.

**References**

.. _1: 

[1] http://alienryderflex.com/polygon/

.. _2: 

[2] http://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
   
   