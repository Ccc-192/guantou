<path>C:\Users\15265\Desktop\guantou\frontend\src\pages\login\login.vue</path>
<type>file</type>
<content>
1: <path>C:\Users\15265\Desktop\guantou\frontend\src\pages\login\login.vue</path>
2: <type>file</type>
3: <content>
4: 1: <template>
5: 2:   <PageShell
6: 3:     title="登录"
7: 4:     :scroll="false"
8: 5:     content-class="login-content"
9: 6:   >
10: 7:     <view class="login-card">
11: 8:       <view class="login-card__stamp">
12: 9:         身份校验处
13: 10:       </view>
14: 11:       <view class="login-card__title">
15: 12:         回来听一听乡音
16: 13:       </view>
17: 14:       <view class="login-card__lead">
18: 15:         登录后可以支持铭牌、发表评论和提出自己的立论。
19: 16:       </view>
20: 17:
21: 18:       <view
22: 19:         v-if="intentText"
23: 20:         class="intent-banner"
24: 21:       >
25: 22:         <view class="intent-kicker">
26: 23:           {{ intentVoluntary ? '继续访问' : '登录后继续' }}
27: 24:         </view>
28: 25:         <view class="intent-copy">
29: 26:           {{ intentText }}
30: 27:         </view>
31: 28:       </view>
32: 29:
33: 30:       <t-tabs
34: 31:         :value="loginMode"
35: 32:         class="login-tabs"
36: 33:         @change="changeMode"
37: 34:       >
38: 35:         <t-tab-panel
39: 36:           value="phone"
40: 37:           label="手机验证码"
41: 38:         />
42: 39:         <t-tab-panel
43: 40:           value="password"
44: 41:           label="账号密码"
45: 42:         />
46: 43:       </t-tabs>
47: 44:
48: 45:       <view
49: 46:         v-if="loginMode === 'phone'"
50: 47:         class="login-form phone-form"
51: 48:       >
52: 49:         <BaseField
53: 50:           v-model="phone"
54: 51:           class="phone-input"
55: 52:           label="手机号"
56: 53:           type="number"
57: 54:           :maxlength="13"
58: 55:           placeholder="请输入手机号"
59: 56:           required
60: 57:           :error="errors.phone"
61: 58:           @input="clearFieldError('phone')"
62: 59:         />
63: 60:         <view class="code-row">
64: 61:           <view class="code-field">
65: 62:             <BaseField
66: 63:               v-model="code"
67: 64:               class="code-input"
68: 65:               label="验证码"
69: 66:               type="number"
70: 67:               :maxlength="6"
71: 68:               placeholder="六位验证码"
72: 69:               required
73: 70:               :error="errors.code"
74: 71:               @input="clearFieldError('code')"
75: 72:             />
76: 73:           </view>
77: 74:           <BaseButton
78: 75:             class="code-button"
79: 76:             variant="ghost"
80: 77:             size="medium"
81: 78:             :disabled="countdown > 0 || sendingCode"
82: 79:             @click="sendPhoneCode"
83: 80:           >
84: 81:             {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
85: 82:           </BaseButton>
86: 83:         </view>
87: 84:         <view
88: 85:           v-if="demoCode"
89: 86:           class="demo-code"
90: 87:         >
91: 88:           Demo 验证码：<text>{{ demoCode }}</text>
92: 89:         </view>
93: 90:         <BaseButton
94: 91:           class="phone-login-button"
95: 92:           block
96: 93:           :loading="submitting"
97: 94:           @click="phoneLogin"
98: 95:         >
99: 96:           登录 / 注册
100: 97:         </BaseButton>
101: 98:       </view>
102: 99:
103: 100:       <view
104: 101:         v-else
105: 102:         class="login-form password-form"
106: 103:       >
107: 104:         <BaseField
108: 105:           v-model="username"
109: 106:           label="账号"
110: 107:           placeholder="请输入用户名"
111: 108:           required
112: 109:           :error="errors.username"
113: 110:           @input="clearFieldError('username')"
114: 111:         />
115: 112:         <BaseField
116: 113:           v-model="password"
117: 114:           label="密码"
118: 115:           type="password"
119: 116:           placeholder="请输入密码"
120: 117:           required
121: 118:           :error="errors.password"
122: 119:           @input="clearFieldError('password')"
123: 120:         />
124: 121:         <BaseButton
125: 122:           block
126: 123:           :loading="submitting"
127: 124:           @click="passwordLogin"
128: 125:         >
129: 126:           账号密码登录
130: 127:         </BaseButton>
131: 128:       </view>
132: 129:
133: 130:       <!-- #ifdef MP-WEIXIN -->
134: 131:       <BaseButton
135: 132:         class="wechat-login"
136: 133:         block
137: 134:         variant="ghost"
138: 135:         @click="mpLogin()"
139: 136:       >
140: 137:         微信一键登录 / 注册
141: 138:       </BaseButton>
142: 139:       <!-- #endif -->
143: 140:
144: 141:       <view class="login-card__secondary">
145: 142:         <view
146: 143:           class="browse-first"
147: 144:           @tap="cancelLoginToSearch"
148: 145:         >
149: 146:           暂不登录，先去查词
150: 147:         </view>
151: 148:         <view class="login-links">
152: 149:           <text @tap="toForgetPage()">
153: 150:             忘记密码
154: 151:           </text>
155: 152:           <!-- #ifndef MP-WEIXIN -->
156: 153:           <text @tap="toRegisterPage()">
157: 154:             用户注册
158: 155:           </text>
159: 156:           <!-- #endif -->
160: 157:           <!-- #ifdef MP-WEIXIN -->
161: 158:           <text @tap="toWechatRegisterPage()">
162: 159:             微信注册
163: 160:           </text>
164: 161:           <!-- #endif -->
165: 162:         </view>
166: 163:       </view>
167: 164:     </view>
168: 165:   </PageShell>
169: 166: </template>
170: 167:
171: 168: <script>
172: 169: import TTabPanel from '@tdesign/uniapp/tab-panel/tab-panel.vue';
173: 170: import TTabs from '@tdesign/uniapp/tabs/tabs.vue';
174: 171: import PageShell from '@/components/PageShell.vue';
175: 172: import BaseButton from '@/components/BaseButton.vue';
176: 173: import BaseField from '@/components/BaseField.vue';
177: 174: import { actionLabel, peekInterceptIntent } from '@/services/authGuard';
178: 175: import { cancelLoginToSearch } from '@/services/authJourney';
179: 176: import { mpLogin, normalLogin } from '@/services/login';
180: 177: import { loginWithPhone, requestPhoneCode } from '@/services/phoneAuth';
181: 178: import { toForgetPage, toRegisterPage, toWechatRegisterPage } from '@/routers/login';
182: 179: import { applyFieldErrors, readableErrorMessage } from '@/utils/apiError';
183: 180:
184: 181: export default {
185: 182:   name: 'LoginPage',
186: 183:   components: {
187: 184:     PageShell,
188: 185:     BaseButton,
189: 186:     BaseField,
190: 187:     TTabPanel,
191: 188:     TTabs,
192: 189:   },
193: 190:   data() {
194: 191:     return {
195: 192:       toForgetPage,
196: 193:       toRegisterPage,
197: 194:       toWechatRegisterPage,
198: 195:       intent: null,
199: 196:       loginMode: 'phone',
200: 197:       phone: '',
201: 198:       code: '',
202: 199:       username: '',
203: 200:       password: '',
204: 201:       demoCode: '',
205: 202:       countdown: 0,
206: 203:       countdownTimer: null,
207: 204:       sendingCode: false,
208: 205:       submitting: false,
209: 206:       errors: {
210: 207:         phone: '',
211: 208:         code: '',
212: 209:         username: '',
213: 210:         password: '',
214: 211:       },
215: 212:     };
216: 213:   },
217: 214:   computed: {
218: 215:     intentVoluntary() {
219: 216:       return Boolean(this.intent?.voluntary);
220: 217:     },
221: 218:     intentText() {
222: 219:       if (!this.intent) return '';
223: 220:       if (this.intentVoluntary) return '验证身份后返回「我的」。';
224: 221:       return `你刚才想${actionLabel(this.intent.action)}，验证身份后会回到原来的位置。`;
225: 222:     },
226: 223:   },
227: 224:   onLoad() {
228: 225:     this.intent = peekInterceptIntent();
229: 226:   },
230: 227:   onUnload() {
231: 228:     this.clearCountdown();
232: 229:   },
233: 230:   methods: {
234: 231:     mpLogin,
235: 232:     cancelLoginToSearch,
236: 233:     changeMode(event) {
237: 234:       const value = event?.detail?.value ?? event?.value ?? event?.detail ?? event;
238: 235:       const nextMode = value ?? 'phone';
239: 236:       if (nextMode === this.loginMode) return;
240: 237:       this.loginMode = nextMode;
241: 238:       // 两种模式字段互斥，切走时清空错误，避免隐藏字段的旧错误阻塞提交。
242: 239:       this.errors = {
243: 240:         phone: '',
244: 241:         code: '',
245: 242:         username: '',
246: 243:         password: '',
247: 244:       };
248: 245:     },
249: 246:     clearFieldError(field) {
250: 247:       this.errors[field] = '';
251: 248:     },
252: 249:     clearCountdown() {
253: 250:       if (this.countdownTimer) clearInterval(this.countdownTimer);
254: 251:       this.countdownTimer = null;
255: 252:     },
256: 253:     startCountdown(seconds) {
257: 254:       this.clearCountdown();
258: 255:       this.countdown = Number(seconds) || 60;
259: 256:       this.countdownTimer = setInterval(() => {
260: 257:         this.countdown -= 1;
261: 258:         if (this.countdown <= 0) this.clearCountdown();
262: 259:       }, 1000);
263: 260:     },
264: 261:     async sendPhoneCode() {
265: 262:       if (this.countdown > 0 || this.sendingCode) return;
266: 263:       const phone = String(this.phone || '').trim();
267: 264:       this.errors.phone = phone ? '' : '请输入手机号';
268: 265:       if (!phone) return;
269: 266:       this.sendingCode = true;
270: 267:       try {
271: 268:         const response = await requestPhoneCode(phone);
272: 269:         this.demoCode = response.demo_code || '';
273: 270:         this.startCountdown(response.retry_after);
274: 271:         uni.showToast({ title: '验证码已生成', icon: 'success' });
275: 272:       } catch (error) {
276: 273:         this.errors.phone = error.message || '验证码发送失败';
277: 274:       } finally {
278: 275:         this.sendingCode = false;
279: 276:       }
280: 277:     },
281: 278:     async phoneLogin() {
282: 279:       const phone = String(this.phone || '').trim();
283: 280:       const code = String(this.code || '').trim();
284: 281:       this.errors.phone = phone ? '' : '请输入手机号';
285: 282:       this.errors.code = code ? '' : '请输入验证码';
286: 283:       if (this.errors.phone || this.errors.code) return;
287: 284:       this.submitting = true;
288: 285:       try {
289: 286:         await loginWithPhone(phone, code);
290: 287:       } catch (error) {
291: 288:         if (!applyFieldErrors(this.errors, error, ['phone', 'code'])) {
292: 289:           uni.showToast({ title: readableErrorMessage(error) || '登录失败', icon: 'none' });
293: 290:         }
294: 291:       } finally {
295: 292:         this.submitting = false;
296: 293:       }
297: 294:     },
298: 295:     async passwordLogin() {
299: 296:       const username = String(this.username || '').trim();
300: 297:       const { password } = this;
301: 298:       this.errors.username = username ? '' : '请输入用户名';
302: 299:       this.errors.password = password ? '' : '请输入密码';
303: 300:       if (this.errors.username || this.errors.password) return;
304: 301:       this.submitting = true;
305: 302:       try {
306: 303:         await normalLogin(username, password);
307: 304:       } finally {
308: 305:         this.submitting = false;
309: 306:       }
310: 307:     },
311: 308:   },
312: 309: };
313: 310: </script>
314: 311:
315: 312: <style scoped>
316: 313: .login-card {
317: 314:   position: relative;
318: 315:   max-width: 680rpx;
319: 316:   margin: 42rpx auto 0;
320: 317:   padding: 52rpx 34rpx 38rpx;
321: 318:   border: 1rpx solid var(--border-color);
322: 319:   border-radius: var(--radius-sm);
323: 320:   background: var(--surface-color);
324: 321:   box-shadow: 0 20rpx 60rpx var(--border-color);
325: 322:   box-sizing: border-box;
326: 323: }
327: 324:
328: 325: .login-card__stamp {
329: 326:   position: absolute;
330: 327:   top: 28rpx;
331: 328:   right: 28rpx;
332: 329:   padding: 8rpx 12rpx;
333: 330:   border: 2rpx solid var(--danger-color);
334: 331:   color: var(--danger-color);
335: 332:   font-size: 18rpx;
336: 333:   font-weight: 800;
337: 334:   letter-spacing: 3rpx;
338: 335:   transform: rotate(3deg);
339: 336: }
340: 337:
341: 338: .login-card__title {
342: 339:   color: var(--text-color);
343: 340:   font-family: STSong, SimSun, serif;
344: 341:   font-size: 44rpx;
345: 342:   font-weight: 900;
346: 343: }
347: 344:
348: 345: .login-card__lead {
349: 346:   width: 76%;
350: 347:   margin-top: 14rpx;
351: 348:   color: var(--text-secondary-color);
352: 349:   font-size: 24rpx;
353: 350:   line-height: 1.6;
354: 351: }
355: 352:
356: 353: .intent-banner {
357: 354:   margin-top: 28rpx;
358: 355:   padding: 20rpx 22rpx;
359: 356:   border-left: 7rpx solid var(--accent-color);
360: 357:   background: var(--accent-subtle-color);
361: 358: }
362: 359:
363: 360: .intent-kicker {
364: 361:   color: var(--accent-color);
365: 362:   font-size: 20rpx;
366: 363:   font-weight: 800;
367: 364:   letter-spacing: 3rpx;
368: 365: }
369: 366:
370: 367: .intent-copy {
371: 368:   margin-top: 6rpx;
372: 369:   color: var(--text-secondary-color);
373: 370:   font-size: 24rpx;
374: 371:   line-height: 1.5;
375: 372: }
376: 373:
377: 374: .login-tabs {
378: 375:   display: block;
379: 376:   margin-top: 34rpx;
380: 377: }
381: 378:
382: 379: .login-form {
383: 380:   display: flex;
384: 381:   flex-direction: column;
385: 382:   gap: 22rpx;
386: 383:   margin-top: 28rpx;
387: 384: }
388: 385:
389: 386: .code-row {
390: 387:   display: flex;
391: 388:   align-items: flex-end;
392: 389:   gap: 12rpx;
393: 390: }
394: 391:
395: 392: .code-field {
396: 393:   flex: 1;
397: 394:   min-width: 0;
398: 395: }
399: 396:
400: 397: .code-button {
401: 398:   flex: 0 0 auto;
402: 399:   margin-bottom: var(--space-3);
403: 400: }
404: 401:
405: 402: .demo-code {
406: 403:   padding: 14rpx 18rpx;
407: 404:   background: var(--surface-subtle-color);
408: 405:   color: var(--warning-color);
409: 406:   font-size: 23rpx;
410: 407: }
411: 408:
412: 409: .demo-code text {
413: 410:   font-weight: 900;
414: 411:   letter-spacing: 4rpx;
415: 412: }
416: 413:
417: 414: .wechat-login {
418: 415:   display: block;
419: 416:   margin-top: 18rpx;
420: 417: }
421: 418:
422: 419: .login-card__secondary {
423: 420:   margin-top: 30rpx;
424: 421:   padding-top: 24rpx;
425: 422:   border-top: 1rpx dashed var(--border-color);
426: 423: }
427: 424:
428: 425: .browse-first {
429: 426:   color: var(--accent-color);
430: 427:   text-align: center;
431: 428:   font-size: 24rpx;
432: 429:   transition: opacity 0.2s ease;
433: 430: }
434: 431:
435: 432: .browse-first:active {
436: 433:   opacity: 0.6;
437: 434: }
438: 435:
439: 436: .login-links {
440: 437:   display: flex;
441: 438:   justify-content: center;
442: 439:   gap: 44rpx;
443: 440:   margin-top: 22rpx;
444: 441:   color: var(--muted-color);
445: 442:   font-size: 22rpx;
446: 443: }
447: 444:
448: 445: .login-links text {
449: 446:   transition: color 0.2s ease;
450: 447: }
451: 448:
452: 449: .login-links text:active {
453: 450:   color: var(--accent-color);
454: 451: }
455: 452:
456: 453: @media (prefers-reduced-motion: reduce) {
457: 454:   .browse-first,
458: 455:   .login-links text {
459: 456:     transition: none;
460: 457:   }
461: 458: }
462: 459:
463: 460: :deep(.login-content) {
464: 461:   background: linear-gradient(
465: 462:     180deg,
466: 463:     var(--page-color) 0%,
467: 464:     var(--surface-subtle-color) 100%
468: 465:   );
469: 466: }
470: 467: </style>
471: 468:
472:
473: (End of file - total 468 lines)
474: </content>

(End of file - total 474 lines)
</content>
