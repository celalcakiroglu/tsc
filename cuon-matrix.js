// cuon-matrix.js (c) 2012 kanda and matsuda
/** 
 * 4x4縺ｮ陦悟・繧貞ｮ溯｣・＠縺溘け繝ｩ繧ｹ縲�
 * OpenGL縺ｮ陦悟・繧ｹ繧ｿ繝・け縺ｨ蜷檎ｭ峨・讖溯・繧貞ｙ縺医※縺・ｋ縲�
 * 螟画鋤蠕後・陦悟・縺ｯ縲∝､画鋤陦悟・繧貞承縺九ｉ縺九￠繧九％縺ｨ縺ｧ險育ｮ励＆繧後ｋ縲�
 * 險育ｮ励＠縺溽ｵ先棡縺ｧ縲∬｡悟・縺ｮ蜀・ｮｹ縺檎ｽｮ縺肴鋤縺医ｉ繧後ｋ縲�
 */

/**
 * Matrix4縺ｮ繧ｳ繝ｳ繧ｹ繝医Λ繧ｯ繧ｿ縲�
 * 譁ｰ縺励￥逕滓・縺輔ｌ繧玖｡悟・縺ｯ縲｛pt_src縺ｫMatrix4縺ｮ繧､繝ｳ繧ｹ繧ｿ繝ｳ繧ｹ縺梧ｸ｡縺輔ｌ縺溷ｴ蜷医√◎縺ｮ隕∫ｴ縺後さ繝斐・縺輔ｌ縺ｦ蛻晄悄蛹悶＆繧後ｋ縲�
 * 縺昴ｌ莉･螟悶・蝣ｴ蜷医∝腰菴崎｡悟・縺ｫ蛻晄悄蛹悶＆繧後ｋ縲�
 * @param opt_src 隕∫ｴ繧偵さ繝斐・縺励※縺上ｋ陦悟・・医が繝励す繝ｧ繝ｳ・�
 */
var Matrix4 = function(opt_src) {
  var i, s, d;
  if (opt_src && typeof opt_src === 'object' && opt_src.hasOwnProperty('elements')) {
    s = opt_src.elements;
    d = new Float32Array(16);
    for (i = 0; i < 16; ++i) {
      d[i] = s[i];
    }
    this.elements = d;
  } else {
    this.elements = new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
  }
};

/**
 * 蜊倅ｽ崎｡悟・縺ｫ險ｭ螳壹☆繧九�
 * @return this
 */
Matrix4.prototype.setIdentity = function() {
  var e = this.elements;
  e[0] = 1;   e[4] = 0;   e[8]  = 0;   e[12] = 0;
  e[1] = 0;   e[5] = 1;   e[9]  = 0;   e[13] = 0;
  e[2] = 0;   e[6] = 0;   e[10] = 1;   e[14] = 0;
  e[3] = 0;   e[7] = 0;   e[11] = 0;   e[15] = 1;
  return this;
};

/**
 * 貂｡縺輔ｌ縺溯｡悟・縺ｮ隕∫ｴ繧偵さ繝斐・縺吶ｋ縲�
 * @param src 隕∫ｴ繧偵さ繝斐・縺励※縺上ｋ陦悟・
 * @return this
 */
Matrix4.prototype.set = function(src) {
  var i, s, d;

  s = src.elements;
  d = this.elements;

  if (s === d) {
    return;
  }
    
  for (i = 0; i < 16; ++i) {
    d[i] = s[i];
  }

  return this;
};

/**
 * 貂｡縺輔ｌ縺溯｡悟・繧貞承縺九ｉ縺九￠繧九�
 * @param other 縺九￠繧玖｡悟・
 * @return this
 */
Matrix4.prototype.concat = function(other) {
  var i, e, a, b, ai0, ai1, ai2, ai3;
  
  // e = a * b 繧定ｨ育ｮ励☆繧�
  e = this.elements;
  a = this.elements;
  b = other.elements;
  
  // e縺ｨb縺悟酔縺伜ｴ蜷医｜縺ｮ蜀・ｮｹ繧剃ｸ譎ら噪縺ｪ驟榊・縺ｫ繧ｳ繝斐・縺吶ｋ
  if (e === b) {
    b = new Float32Array(16);
    for (i = 0; i < 16; ++i) {
      b[i] = e[i];
    }
  }
  
  for (i = 0; i < 4; i++) {
    ai0=a[i];  ai1=a[i+4];  ai2=a[i+8];  ai3=a[i+12];
    e[i]    = ai0 * b[0]  + ai1 * b[1]  + ai2 * b[2]  + ai3 * b[3];
    e[i+4]  = ai0 * b[4]  + ai1 * b[5]  + ai2 * b[6]  + ai3 * b[7];
    e[i+8]  = ai0 * b[8]  + ai1 * b[9]  + ai2 * b[10] + ai3 * b[11];
    e[i+12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
  }
  
  return this;
};
Matrix4.prototype.multiply = Matrix4.prototype.concat;

/**
 * 貂｡縺輔ｌ縺溘・繧ｯ繝医Ν繧偵°縺代ｋ縲�
 * @param pos 縺九￠繧玖｡悟・
 * @return 縺薙・陦悟・繧呈寺縺代◆邨先棡(Float32Array)
 */
Matrix4.prototype.multiplyVector3 = function(pos) {
  var e = this.elements;
  var p = pos.elements;
  var v = new Vector3();
  var result = v.elements;

  result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[ 8] + e[11];
  result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[ 9] + e[12];
  result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + e[13];

  return v;
};

/**
 * 貂｡縺輔ｌ縺溘・繧ｯ繝医Ν繧偵°縺代ｋ縲�
 * @param pos 縺九￠繧玖｡悟・
 * @return 縺薙・陦悟・繧呈寺縺代◆邨先棡(Float32Array)
 */
Matrix4.prototype.multiplyVector4 = function(pos) {
  var e = this.elements;
  var p = pos.elements;
  var v = new Vector4();
  var result = v.elements;

  result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[ 8] + p[3] * e[12];
  result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[ 9] + p[3] * e[13];
  result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + p[3] * e[14];
  result[3] = p[0] * e[3] + p[1] * e[7] + p[2] * e[11] + p[3] * e[15];

  return v;
};

/**
 * 陦悟・繧定ｻ｢鄂ｮ縺吶ｋ縲�
 * @return this
 */
Matrix4.prototype.transpose = function() {
  var e, t;

  e = this.elements;

  t = e[ 1];  e[ 1] = e[ 4];  e[ 4] = t;
  t = e[ 2];  e[ 2] = e[ 8];  e[ 8] = t;
  t = e[ 3];  e[ 3] = e[12];  e[12] = t;
  t = e[ 6];  e[ 6] = e[ 9];  e[ 9] = t;
  t = e[ 7];  e[ 7] = e[13];  e[13] = t;
  t = e[11];  e[11] = e[14];  e[14] = t;

  return this;
};

/**
 * 貂｡縺輔ｌ縺溯｡悟・縺ｮ騾・｡悟・繧定ｨ育ｮ励＠縺ｦ縲√％縺ｮ陦悟・縺ｫ莉｣蜈･縺吶ｋ縲�
 * @param other 騾・｡悟・繧定ｨ育ｮ励☆繧玖｡悟・
 * @return this
 */
Matrix4.prototype.setInverseOf = function(other) {
  var i, s, d, inv, det;

  s = other.elements;
  d = this.elements;
  inv = new Float32Array(16);

  inv[0]  =   s[5]*s[10]*s[15] - s[5] *s[11]*s[14] - s[9] *s[6]*s[15]
            + s[9]*s[7] *s[14] + s[13]*s[6] *s[11] - s[13]*s[7]*s[10];
  inv[4]  = - s[4]*s[10]*s[15] + s[4] *s[11]*s[14] + s[8] *s[6]*s[15]
            - s[8]*s[7] *s[14] - s[12]*s[6] *s[11] + s[12]*s[7]*s[10];
  inv[8]  =   s[4]*s[9] *s[15] - s[4] *s[11]*s[13] - s[8] *s[5]*s[15]
            + s[8]*s[7] *s[13] + s[12]*s[5] *s[11] - s[12]*s[7]*s[9];
  inv[12] = - s[4]*s[9] *s[14] + s[4] *s[10]*s[13] + s[8] *s[5]*s[14]
            - s[8]*s[6] *s[13] - s[12]*s[5] *s[10] + s[12]*s[6]*s[9];

  inv[1]  = - s[1]*s[10]*s[15] + s[1] *s[11]*s[14] + s[9] *s[2]*s[15]
            - s[9]*s[3] *s[14] - s[13]*s[2] *s[11] + s[13]*s[3]*s[10];
  inv[5]  =   s[0]*s[10]*s[15] - s[0] *s[11]*s[14] - s[8] *s[2]*s[15]
            + s[8]*s[3] *s[14] + s[12]*s[2] *s[11] - s[12]*s[3]*s[10];
  inv[9]  = - s[0]*s[9] *s[15] + s[0] *s[11]*s[13] + s[8] *s[1]*s[15]
            - s[8]*s[3] *s[13] - s[12]*s[1] *s[11] + s[12]*s[3]*s[9];
  inv[13] =   s[0]*s[9] *s[14] - s[0] *s[10]*s[13] - s[8] *s[1]*s[14]
            + s[8]*s[2] *s[13] + s[12]*s[1] *s[10] - s[12]*s[2]*s[9];

  inv[2]  =   s[1]*s[6]*s[15] - s[1] *s[7]*s[14] - s[5] *s[2]*s[15]
            + s[5]*s[3]*s[14] + s[13]*s[2]*s[7]  - s[13]*s[3]*s[6];
  inv[6]  = - s[0]*s[6]*s[15] + s[0] *s[7]*s[14] + s[4] *s[2]*s[15]
            - s[4]*s[3]*s[14] - s[12]*s[2]*s[7]  + s[12]*s[3]*s[6];
  inv[10] =   s[0]*s[5]*s[15] - s[0] *s[7]*s[13] - s[4] *s[1]*s[15]
            + s[4]*s[3]*s[13] + s[12]*s[1]*s[7]  - s[12]*s[3]*s[5];
  inv[14] = - s[0]*s[5]*s[14] + s[0] *s[6]*s[13] + s[4] *s[1]*s[14]
            - s[4]*s[2]*s[13] - s[12]*s[1]*s[6]  + s[12]*s[2]*s[5];

  inv[3]  = - s[1]*s[6]*s[11] + s[1]*s[7]*s[10] + s[5]*s[2]*s[11]
            - s[5]*s[3]*s[10] - s[9]*s[2]*s[7]  + s[9]*s[3]*s[6];
  inv[7]  =   s[0]*s[6]*s[11] - s[0]*s[7]*s[10] - s[4]*s[2]*s[11]
            + s[4]*s[3]*s[10] + s[8]*s[2]*s[7]  - s[8]*s[3]*s[6];
  inv[11] = - s[0]*s[5]*s[11] + s[0]*s[7]*s[9]  + s[4]*s[1]*s[11]
            - s[4]*s[3]*s[9]  - s[8]*s[1]*s[7]  + s[8]*s[3]*s[5];
  inv[15] =   s[0]*s[5]*s[10] - s[0]*s[6]*s[9]  - s[4]*s[1]*s[10]
            + s[4]*s[2]*s[9]  + s[8]*s[1]*s[6]  - s[8]*s[2]*s[5];

  det = s[0]*inv[0] + s[1]*inv[4] + s[2]*inv[8] + s[3]*inv[12];
  if (det === 0) {
    return this;
  }

  det = 1 / det;
  for (i = 0; i < 16; i++) {
    d[i] = inv[i] * det;
  }

  return this;
};

/**
 * 縺薙・陦悟・縺ｮ騾・｡悟・繧定ｨ育ｮ励＠縺ｦ縲∝・螳ｹ繧堤ｽｮ縺肴鋤縺医ｋ縲�
 * @return this
 */
Matrix4.prototype.invert = function() {
  return this.setInverseOf(this);
};

/**
 * 豁｣蟆・ｽｱ陦悟・縺ｫ險ｭ螳壹☆繧九�
 * @param left 蟾ｦ繧ｯ繝ｪ繝・・蟷ｳ髱｢縺ｮX蠎ｧ讓�
 * @param right 蜿ｳ繧ｯ繝ｪ繝・・蟷ｳ髱｢縺ｮX蠎ｧ讓�
 * @param bottom 荳九け繝ｪ繝・・蟷ｳ髱｢縺ｮY蠎ｧ讓�
 * @param top 荳翫け繝ｪ繝・・蟷ｳ髱｢縺ｮY蠎ｧ讓�
 * @param near 霑代け繝ｪ繝・・蟷ｳ髱｢縺ｾ縺ｧ縺ｮ霍晞屬縲ょｹｳ髱｢縺瑚ｦ也せ縺ｮ蠕梧婿縺ｫ縺ゅｋ蝣ｴ蜷医・雋謨ｰ
 * @param far 驕繧ｯ繝ｪ繝・・蟷ｳ髱｢縺ｾ縺ｧ縺ｮ霍晞屬縲ょｹｳ髱｢縺瑚ｦ也せ縺ｮ蠕梧婿縺ｫ縺ゅｋ蝣ｴ蜷医・雋謨ｰ
 * @return this
 */
Matrix4.prototype.setOrtho = function(left, right, bottom, top, near, far) {
  var e, rw, rh, rd;

  if (left === right || bottom === top || near === far) {
    throw 'null frustum';
  }

  rw = 1 / (right - left);
  rh = 1 / (top - bottom);
  rd = 1 / (far - near);

  e = this.elements;

  e[0]  = 2 * rw;
  e[1]  = 0;
  e[2]  = 0;
  e[3]  = 0;

  e[4]  = 0;
  e[5]  = 2 * rh;
  e[6]  = 0;
  e[7]  = 0;

  e[8]  = 0;
  e[9]  = 0;
  e[10] = -2 * rd;
  e[11] = 0;

  e[12] = -(right + left) * rw;
  e[13] = -(top + bottom) * rh;
  e[14] = -(far + near) * rd;
  e[15] = 1;

  return this;
};

/**
 * 豁｣蟆・ｽｱ陦悟・繧貞承縺九ｉ縺九￠繧九�
 * @param left 蟾ｦ繧ｯ繝ｪ繝・・蟷ｳ髱｢縺ｮX蠎ｧ讓�
 * @param right 蜿ｳ繧ｯ繝ｪ繝・・蟷ｳ髱｢縺ｮX蠎ｧ讓�
 * @param bottom 荳九け繝ｪ繝・・蟷ｳ髱｢縺ｮY蠎ｧ讓�
 * @param top 荳翫け繝ｪ繝・・蟷ｳ髱｢縺ｮY蠎ｧ讓�
 * @param near 霑代け繝ｪ繝・・蟷ｳ髱｢縺ｾ縺ｧ縺ｮ霍晞屬縲ょｹｳ髱｢縺瑚ｦ也せ縺ｮ蠕梧婿縺ｫ縺ゅｋ蝣ｴ蜷医・雋謨ｰ
 * @param far 驕繧ｯ繝ｪ繝・・蟷ｳ髱｢縺ｾ縺ｧ縺ｮ霍晞屬縲ょｹｳ髱｢縺瑚ｦ也せ縺ｮ蠕梧婿縺ｫ縺ゅｋ蝣ｴ蜷医・雋謨ｰ
 * @return this
 */
Matrix4.prototype.ortho = function(left, right, bottom, top, near, far) {
  return this.concat(new Matrix4().setOrtho(left, right, bottom, top, near, far));
};

/**
 * 騾剰ｦ門ｰ・ｽｱ陦悟・縺ｫ險ｭ螳壹☆繧�
 * @param left 霑代け繝ｪ繝・・蟷ｳ髱｢荳翫↓縺翫￠繧句ｷｦ繧ｯ繝ｪ繝・・蟷ｳ髱｢縺ｮX蠎ｧ讓�
 * @param right 霑代け繝ｪ繝・・蟷ｳ髱｢荳翫↓縺翫￠繧句承繧ｯ繝ｪ繝・・蟷ｳ髱｢縺ｮX蠎ｧ讓�
 * @param bottom 霑代け繝ｪ繝・・蟷ｳ髱｢荳翫↓縺翫￠繧倶ｸ九け繝ｪ繝・・蟷ｳ髱｢縺ｮY蠎ｧ讓�
 * @param top 霑代け繝ｪ繝・・蟷ｳ髱｢荳翫↓縺翫￠繧倶ｸ翫け繝ｪ繝・・蟷ｳ髱｢縺ｮY蠎ｧ讓�
 * @param near 霑代け繝ｪ繝・・蟷ｳ髱｢縺ｾ縺ｧ縺ｮ霍晞屬縲よｭ｣謨ｰ縺ｧ縺ｪ縺上※縺ｯ縺ｪ繧峨↑縺�
 * @param far 驕繧ｯ繝ｪ繝・・蟷ｳ髱｢縺ｾ縺ｧ縺ｮ霍晞屬縲よｭ｣謨ｰ縺ｧ縺ｪ縺上※縺ｯ縺ｪ繧峨↑縺�
 * @return this
 */
Matrix4.prototype.setFrustum = function(left, right, bottom, top, near, far) {
  var e, rw, rh, rd;

  if (left === right || top === bottom || near === far) {
    throw 'null frustum';
  }
  if (near <= 0) {
    throw 'near <= 0';
  }
  if (far <= 0) {
    throw 'far <= 0';
  }

  rw = 1 / (right - left);
  rh = 1 / (top - bottom);
  rd = 1 / (far - near);

  e = this.elements;

  e[ 0] = 2 * near * rw;
  e[ 1] = 0;
  e[ 2] = 0;
  e[ 3] = 0;

  e[ 4] = 0;
  e[ 5] = 2 * near * rh;
  e[ 6] = 0;
  e[ 7] = 0;

  e[ 8] = (right + left) * rw;
  e[ 9] = (top + bottom) * rh;
  e[10] = -(far + near) * rd;
  e[11] = -1;

  e[12] = 0;
  e[13] = 0;
  e[14] = -2 * near * far * rd;
  e[15] = 0;

  return this;
};

/**
 * 騾剰ｦ門ｰ・ｽｱ陦悟・繧貞承縺九ｉ縺九￠繧九�
 * @param left 霑代け繝ｪ繝・・蟷ｳ髱｢荳翫↓縺翫￠繧句ｷｦ繧ｯ繝ｪ繝・・蟷ｳ髱｢縺ｮX蠎ｧ讓�
 * @param right 霑代け繝ｪ繝・・蟷ｳ髱｢荳翫↓縺翫￠繧句承繧ｯ繝ｪ繝・・蟷ｳ髱｢縺ｮX蠎ｧ讓�
 * @param bottom 霑代け繝ｪ繝・・蟷ｳ髱｢荳翫↓縺翫￠繧倶ｸ九け繝ｪ繝・・蟷ｳ髱｢縺ｮY蠎ｧ讓�
 * @param top 霑代け繝ｪ繝・・蟷ｳ髱｢荳翫↓縺翫￠繧倶ｸ翫け繝ｪ繝・・蟷ｳ髱｢縺ｮY蠎ｧ讓�
 * @param near 霑代け繝ｪ繝・・蟷ｳ髱｢縺ｾ縺ｧ縺ｮ霍晞屬縲よｭ｣謨ｰ縺ｧ縺ｪ縺上※縺ｯ縺ｪ繧峨↑縺�
 * @param far 驕繧ｯ繝ｪ繝・・蟷ｳ髱｢縺ｾ縺ｧ縺ｮ霍晞屬縲よｭ｣謨ｰ縺ｧ縺ｪ縺上※縺ｯ縺ｪ繧峨↑縺�
 * @return this
 */
Matrix4.prototype.frustum = function(left, right, bottom, top, near, far) {
  return this.concat(new Matrix4().setFrustum(left, right, bottom, top, near, far));
};

/**
 * 隕夜㍽隗偵√い繧ｹ繝壹け繝域ｯ斐ｒ謖・ｮ壹＠縺ｦ騾剰ｦ門ｰ・ｽｱ陦悟・縺ｫ險ｭ螳壹☆繧九�
 * @param fovy 蝙ら峩隕夜㍽隗� [蠎ｦ]
 * @param aspect 隕夜㍽縺ｮ繧｢繧ｹ繝壹け繝域ｯ費ｼ亥ｹ� / 鬮倥＆・�
 * @param near 霑代け繝ｪ繝・・蟷ｳ髱｢縺ｾ縺ｧ縺ｮ霍晞屬縲よｭ｣謨ｰ縺ｧ縺ｪ縺上※縺ｯ縺ｪ繧峨↑縺�
 * @param far 驕繧ｯ繝ｪ繝・・蟷ｳ髱｢縺ｾ縺ｧ縺ｮ霍晞屬縲よｭ｣謨ｰ縺ｧ縺ｪ縺上※縺ｯ縺ｪ繧峨↑縺�
 * @return this
 */
Matrix4.prototype.setPerspective = function(fovy, aspect, near, far) {
  var e, rd, s, ct;

  if (near === far || aspect === 0) {
    throw 'null frustum';
  }
  if (near <= 0) {
    throw 'near <= 0';
  }
  if (far <= 0) {
    throw 'far <= 0';
  }

  fovy = Math.PI * fovy / 180 / 2;
  s = Math.sin(fovy);
  if (s === 0) {
    throw 'null frustum';
  }

  rd = 1 / (far - near);
  ct = Math.cos(fovy) / s;

  e = this.elements;

  e[0]  = ct / aspect;
  e[1]  = 0;
  e[2]  = 0;
  e[3]  = 0;

  e[4]  = 0;
  e[5]  = ct;
  e[6]  = 0;
  e[7]  = 0;

  e[8]  = 0;
  e[9]  = 0;
  e[10] = -(far + near) * rd;
  e[11] = -1;

  e[12] = 0;
  e[13] = 0;
  e[14] = -2 * near * far * rd;
  e[15] = 0;

  return this;
};

/**
 * 騾剰ｦ門ｰ・ｽｱ陦悟・繧貞承縺九ｉ縺九￠繧九�
 * @param fovy 蝙ら峩隕夜㍽隗� [蠎ｦ]
 * @param aspect 隕夜㍽縺ｮ繧｢繧ｹ繝壹け繝域ｯ費ｼ亥ｹ� / 鬮倥＆・�
 * @param near 霑代け繝ｪ繝・・蟷ｳ髱｢縺ｾ縺ｧ縺ｮ霍晞屬縲よｭ｣謨ｰ縺ｧ縺ｪ縺上※縺ｯ縺ｪ繧峨↑縺�
 * @param far 驕繧ｯ繝ｪ繝・・蟷ｳ髱｢縺ｾ縺ｧ縺ｮ霍晞屬縲よｭ｣謨ｰ縺ｧ縺ｪ縺上※縺ｯ縺ｪ繧峨↑縺�
 * @return this
 */
Matrix4.prototype.perspective = function(fovy, aspect, near, far) {
  return this.concat(new Matrix4().setPerspective(fovy, aspect, near, far));
};

/**
 * 繧ｹ繧ｱ繝ｼ繝ｪ繝ｳ繧ｰ陦悟・縺ｫ險ｭ螳壹☆繧九�
 * @param x X譁ｹ蜷代・蛟咲紫
 * @param y Y譁ｹ蜷代・蛟咲紫
 * @param z Z譁ｹ蜷代・蛟咲紫
 * @return this
 */
Matrix4.prototype.setScale = function(x, y, z) {
  var e = this.elements;
  e[0] = x;  e[4] = 0;  e[8]  = 0;  e[12] = 0;
  e[1] = 0;  e[5] = y;  e[9]  = 0;  e[13] = 0;
  e[2] = 0;  e[6] = 0;  e[10] = z;  e[14] = 0;
  e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
  return this;
};

/**
 * 繧ｹ繧ｱ繝ｼ繝ｪ繝ｳ繧ｰ陦悟・繧貞承縺九ｉ縺九￠繧九�
 * @param x X譁ｹ蜷代・蛟咲紫
 * @param y Y譁ｹ蜷代・蛟咲紫
 * @param z Z譁ｹ蜷代・蛟咲紫
 * @return this
 */
Matrix4.prototype.scale = function(x, y, z) {
  var e = this.elements;
  e[0] *= x;  e[4] *= y;  e[8]  *= z;
  e[1] *= x;  e[5] *= y;  e[9]  *= z;
  e[2] *= x;  e[6] *= y;  e[10] *= z;
  e[3] *= x;  e[7] *= y;  e[11] *= z;
  return this;
};

/**
 * 蟷ｳ陦檎ｧｻ蜍戊｡悟・縺ｫ險ｭ螳壹☆繧九�
 * @param x X譁ｹ蜷代・遘ｻ蜍暮㍼
 * @param y Y譁ｹ蜷代・遘ｻ蜍暮㍼
 * @param z Z譁ｹ蜷代・遘ｻ蜍暮㍼
 * @return this
 */
Matrix4.prototype.setTranslate = function(x, y, z) {
  var e = this.elements;
  e[0] = 1;  e[4] = 0;  e[8]  = 0;  e[12] = x;
  e[1] = 0;  e[5] = 1;  e[9]  = 0;  e[13] = y;
  e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = z;
  e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
  return this;
};

/**
 * 蟷ｳ陦檎ｧｻ蜍戊｡悟・繧貞承縺九ｉ縺九￠繧九�
 * @param x X譁ｹ蜷代・遘ｻ蜍暮㍼
 * @param y Y譁ｹ蜷代・遘ｻ蜍暮㍼
 * @param z Z譁ｹ蜷代・遘ｻ蜍暮㍼
 * @return this
 */
Matrix4.prototype.translate = function(x, y, z) {
  var e = this.elements;
  e[12] += e[0] * x + e[4] * y + e[8]  * z;
  e[13] += e[1] * x + e[5] * y + e[9]  * z;
  e[14] += e[2] * x + e[6] * y + e[10] * z;
  e[15] += e[3] * x + e[7] * y + e[11] * z;
  return this;
};

/**
 * 蝗櫁ｻ｢陦悟・縺ｫ險ｭ螳壹☆繧九�
 * 蝗櫁ｻ｢霆ｸ縺ｮ譁ｹ蜷代・繧ｯ繝医Ν縺ｯ豁｣隕丞喧縺輔ｌ縺ｦ縺・↑縺上※繧よｧ九ｏ縺ｪ縺・�
 * @param angle 蝗櫁ｻ｢隗� [蠎ｦ]
 * @param x 蝗櫁ｻ｢霆ｸ縺ｮ譁ｹ蜷代・繧ｯ繝医Ν縺ｮX謌仙・
 * @param y 蝗櫁ｻ｢霆ｸ縺ｮ譁ｹ蜷代・繧ｯ繝医Ν縺ｮY謌仙・
 * @param z 蝗櫁ｻ｢霆ｸ縺ｮ譁ｹ蜷代・繧ｯ繝医Ν縺ｮZ謌仙・
 * @return this
 */
Matrix4.prototype.setRotate = function(angle, x, y, z) {
  var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;

  angle = Math.PI * angle / 180;
  e = this.elements;

  s = Math.sin(angle);
  c = Math.cos(angle);

  if (0 !== x && 0 === y && 0 === z) {
    // X霆ｸ縺ｾ繧上ｊ縺ｮ蝗櫁ｻ｢
    if (x < 0) {
      s = -s;
    }
    e[0] = 1;  e[4] = 0;  e[ 8] = 0;  e[12] = 0;
    e[1] = 0;  e[5] = c;  e[ 9] =-s;  e[13] = 0;
    e[2] = 0;  e[6] = s;  e[10] = c;  e[14] = 0;
    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
  } else if (0 === x && 0 !== y && 0 === z) {
    // Y霆ｸ縺ｾ繧上ｊ縺ｮ蝗櫁ｻ｢
    if (y < 0) {
      s = -s;
    }
    e[0] = c;  e[4] = 0;  e[ 8] = s;  e[12] = 0;
    e[1] = 0;  e[5] = 1;  e[ 9] = 0;  e[13] = 0;
    e[2] =-s;  e[6] = 0;  e[10] = c;  e[14] = 0;
    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
  } else if (0 === x && 0 === y && 0 !== z) {
    // Z霆ｸ縺ｾ繧上ｊ縺ｮ蝗櫁ｻ｢
    if (z < 0) {
      s = -s;
    }
    e[0] = c;  e[4] =-s;  e[ 8] = 0;  e[12] = 0;
    e[1] = s;  e[5] = c;  e[ 9] = 0;  e[13] = 0;
    e[2] = 0;  e[6] = 0;  e[10] = 1;  e[14] = 0;
    e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
  } else {
    // 縺昴・莉悶・莉ｻ諢剰ｻｸ縺ｾ繧上ｊ縺ｮ蝗櫁ｻ｢
    len = Math.sqrt(x*x + y*y + z*z);
    if (len !== 1) {
      rlen = 1 / len;
      x *= rlen;
      y *= rlen;
      z *= rlen;
    }
    nc = 1 - c;
    xy = x * y;
    yz = y * z;
    zx = z * x;
    xs = x * s;
    ys = y * s;
    zs = z * s;

    e[ 0] = x*x*nc +  c;
    e[ 1] = xy *nc + zs;
    e[ 2] = zx *nc - ys;
    e[ 3] = 0;

    e[ 4] = xy *nc - zs;
    e[ 5] = y*y*nc +  c;
    e[ 6] = yz *nc + xs;
    e[ 7] = 0;

    e[ 8] = zx *nc + ys;
    e[ 9] = yz *nc - xs;
    e[10] = z*z*nc +  c;
    e[11] = 0;

    e[12] = 0;
    e[13] = 0;
    e[14] = 0;
    e[15] = 1;
  }

  return this;
};

/**
 * 蝗櫁ｻ｢陦悟・繧貞承縺九ｉ縺九￠繧九�
 * 蝗櫁ｻ｢霆ｸ縺ｮ譁ｹ蜷代・繧ｯ繝医Ν縺ｯ豁｣隕丞喧縺輔ｌ縺ｦ縺・↑縺上※繧よｧ九ｏ縺ｪ縺・�
 * @param angle 蝗櫁ｻ｢隗� [蠎ｦ]
 * @param x 蝗櫁ｻ｢霆ｸ縺ｮ譁ｹ蜷代・繧ｯ繝医Ν縺ｮX謌仙・
 * @param y 蝗櫁ｻ｢霆ｸ縺ｮ譁ｹ蜷代・繧ｯ繝医Ν縺ｮY謌仙・
 * @param z 蝗櫁ｻ｢霆ｸ縺ｮ譁ｹ蜷代・繧ｯ繝医Ν縺ｮZ謌仙・
 * @return this
 */
Matrix4.prototype.rotate = function(angle, x, y, z) {
  return this.concat(new Matrix4().setRotate(angle, x, y, z));
};

/**
 * 隕夜㍽螟画鋤陦悟・繧定ｨｭ螳壹☆繧九�
 * @param eyeX, eyeY, eyeZ 隕也せ縺ｮ菴咲ｽｮ
 * @param centerX, centerY, centerZ 讓咏せ縺ｮ菴咲ｽｮ
 * @param upX, upY, upZ 繧ｫ繝｡繝ｩ縺ｮ荳頑婿蜷代ｒ陦ｨ縺呎婿蜷代・繧ｯ繝医Ν
 * @return this
 */
Matrix4.prototype.setLookAt = function(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
  var e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;

  fx = centerX - eyeX;
  fy = centerY - eyeY;
  fz = centerZ - eyeZ;

  // f繧呈ｭ｣隕丞喧縺吶ｋ
  rlf = 1 / Math.sqrt(fx*fx + fy*fy + fz*fz);
  fx *= rlf;
  fy *= rlf;
  fz *= rlf;

  // f縺ｨup縺ｮ螟也ｩ阪ｒ豎ゅａ繧�
  sx = fy * upZ - fz * upY;
  sy = fz * upX - fx * upZ;
  sz = fx * upY - fy * upX;

  // s繧呈ｭ｣隕丞喧縺吶ｋ
  rls = 1 / Math.sqrt(sx*sx + sy*sy + sz*sz);
  sx *= rls;
  sy *= rls;
  sz *= rls;

  // s縺ｨf縺ｮ螟也ｩ阪ｒ豎ゅａ繧�
  ux = sy * fz - sz * fy;
  uy = sz * fx - sx * fz;
  uz = sx * fy - sy * fx;

  // 莉｣蜈･縺吶ｋ
  e = this.elements;
  e[0] = sx;
  e[1] = ux;
  e[2] = -fx;
  e[3] = 0;

  e[4] = sy;
  e[5] = uy;
  e[6] = -fy;
  e[7] = 0;

  e[8] = sz;
  e[9] = uz;
  e[10] = -fz;
  e[11] = 0;

  e[12] = 0;
  e[13] = 0;
  e[14] = 0;
  e[15] = 1;

  // 蟷ｳ陦檎ｧｻ蜍輔☆繧�
  return this.translate(-eyeX, -eyeY, -eyeZ);
};

/**
 * 隕夜㍽螟画鋤陦悟・繧貞承縺九ｉ縺九￠繧九�
 * @param eyeX, eyeY, eyeZ 隕也せ縺ｮ菴咲ｽｮ
 * @param centerX, centerY, centerZ 讓咏せ縺ｮ菴咲ｽｮ
 * @param upX, upY, upZ 繧ｫ繝｡繝ｩ縺ｮ荳頑婿蜷代ｒ陦ｨ縺呎婿蜷代・繧ｯ繝医Ν
 * @return this
 */
Matrix4.prototype.lookAt = function(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
  return this.concat(new Matrix4().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ));
};

/**
 * 鬆らせ繧貞ｹｳ髱｢荳翫↓蟆・ｽｱ縺吶ｋ繧医≧縺ｪ陦悟・繧貞承縺九ｉ縺九￠繧九�
 * @param plane 蟷ｳ髱｢譁ｹ遞句ｼ� Ax + By + Cz + D = 0 縺ｮ菫よ焚[A, B, C, D]繧呈ｼ邏阪＠縺滄・蛻�
 * @param light 蜈画ｺ舌・蜷梧ｬ｡蠎ｧ讓吶ｒ譬ｼ邏阪＠縺滄・蛻励Ｍight[3]=0縺ｮ蝣ｴ蜷医∝ｹｳ陦悟・貅舌ｒ陦ｨ縺�
 * @return this
 */
Matrix4.prototype.dropShadow = function(plane, light) {
  var mat = new Matrix4();
  var e = mat.elements;

  var dot = plane[0] * light[0] + plane[1] * light[1] + plane[2] * light[2] + plane[3] * light[3];

  e[ 0] = dot - light[0] * plane[0];
  e[ 1] =     - light[1] * plane[0];
  e[ 2] =     - light[2] * plane[0];
  e[ 3] =     - light[3] * plane[0];

  e[ 4] =     - light[0] * plane[1];
  e[ 5] = dot - light[1] * plane[1];
  e[ 6] =     - light[2] * plane[1];
  e[ 7] =     - light[3] * plane[1];

  e[ 8] =     - light[0] * plane[2];
  e[ 9] =     - light[1] * plane[2];
  e[10] = dot - light[2] * plane[2];
  e[11] =     - light[3] * plane[2];

  e[12] =     - light[0] * plane[3];
  e[13] =     - light[1] * plane[3];
  e[14] =     - light[2] * plane[3];
  e[15] = dot - light[3] * plane[3];

  return this.concat(mat);
}

/**
 * 蟷ｳ陦悟・貅舌↓繧医ｊ鬆らせ繧貞ｹｳ髱｢荳翫↓蟆・ｽｱ縺吶ｋ繧医≧縺ｪ陦悟・繧貞承縺九ｉ縺九￠繧九�
 * @param normX, normY, normZ 蟷ｳ髱｢縺ｮ豕慕ｷ壹・繧ｯ繝医Ν・域ｭ｣隕丞喧縺輔ｌ縺ｦ縺・ｋ蠢・ｦ√・縺ｪ縺・ｼ�
 * @param planeX, planeY, planeZ 蟷ｳ髱｢荳翫・轤ｹ
 * @param lightX, lightY, lightZ 繝ｩ繧､繝医・譁ｹ蜷托ｼ域ｭ｣隕丞喧縺輔ｌ縺ｦ縺・ｋ蠢・ｦ√・縺ｪ縺・ｼ�
 * @return this
 */
Matrix4.prototype.dropShadowDirectionally = function(normX, normY, normZ, planeX, planeY, planeZ, lightX, lightY, lightZ) {
  var a = planeX * normX + planeY * normY + planeZ * normZ;
  return this.dropShadow([normX, normY, normZ, -a], [lightX, lightY, lightZ, 0]);
};

/**
 * Vector3縺ｮ繧ｳ繝ｳ繧ｹ繝医Λ繧ｯ繧ｿ
 * 蠑墓焚繧呈欠螳壹☆繧九→縺昴・蜀・ｮｹ縺後さ繝斐・縺輔ｌ繧�
 * @param opt_src 隕∫ｴ繧偵さ繝斐・縺励※縺上ｋ繝吶け繝医Ν・医が繝励す繝ｧ繝ｳ・�
 */
var Vector3 = function(opt_src) {
  var v = new Float32Array(3);
  if (opt_src && typeof opt_src === 'object') {
    v[0] = opt_src[0]; v[1] = opt_src[1]; v[2] = opt_src[2];
  } 
  this.elements = v;
}

/**
  * 豁｣隕丞喧縺吶ｋ縲�
  * @return this
  */
Vector3.prototype.normalize = function() {
  var v = this.elements;
  var c = v[0], d = v[1], e = v[2], g = Math.sqrt(c*c+d*d+e*e);
  if(g){
    if(g == 1)
        return this;
   } else {
     v[0] = 0; v[1] = 0; v[2] = 0;
     return this;
   }
   g = 1/g;
   v[0] = c*g; v[1] = d*g; v[2] = e*g;
   return this;
};

/**
 * Vector4縺ｮ繧ｳ繝ｳ繧ｹ繝医Λ繧ｯ繧ｿ
 * 蠑墓焚繧呈欠螳壹☆繧九→縺昴・蜀・ｮｹ縺後さ繝斐・縺輔ｌ繧�
 * @param opt_src 隕∫ｴ繧偵さ繝斐・縺励※縺上ｋ繝吶け繝医Ν・医が繝励す繝ｧ繝ｳ・�
 */
var Vector4 = function(opt_src) {
  var v = new Float32Array(4);
  if (opt_src && typeof opt_src === 'object') {
    v[0] = opt_src[0]; v[1] = opt_src[1]; v[2] = opt_src[2]; v[3] = opt_src[3];
  } 
  this.elements = v;
}
