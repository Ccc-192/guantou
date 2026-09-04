<template>
  <view class="immersive-shell welcome-tour">
    <view class="tour-glow tour-glow--top" />
    <view class="tour-glow tour-glow--bottom" />
    <view class="tour-grain" />

    <view class="tour-top">
      <view class="tour-brand">
        乡声集盒
      </view>
      <view
        class="tour-skip"
        @tap="skipTour"
      >
        跳过
      </view>
    </view>

    <swiper
      class="tour-swiper"
      :current="current"
      @change="onSwiperChange"
    >
      <swiper-item
        v-for="(step, index) in steps"
        :key="step.title"
        class="tour-slide"
      >
        <view
          class="tour-illustration"
          :class="`tour-illustration--${index}`"
          aria-hidden="true"
        >
          <!-- 第 1 页：乡音罐头 + 波形 -->
          <view
            v-if="index === 0"
            class="illus-can"
          >
            <view class="illus-can__ring" />
            <view class="illus-can__core" />
            <view class="illus-can__bars">
              <view
                v-for="n in 5"
                :key="n"
                :class="`illus-can__bar illus-can__bar--${n}`"
              />
            </view>
          </view>

          <!-- 第 2 页：概念徽章图标 -->
          <view
            v-if="index === 1"
            class="illus-badges"
          >
            <view class="illus-badge illus-badge--can">
              <view class="badge-icon badge-icon--can" />
            </view>
            <view class="illus-badge illus-badge--nameplate">
              <view class="badge-icon badge-icon--nameplate" />
            </view>
            <view class="illus-badge illus-badge--pack">
              <view class="badge-icon badge-icon--pack" />
            </view>
          </view>

          <!-- 第 3 页：探索方式图标 -->
          <view
            v-if="index === 2"
            class="illus-grid"
          >
            <view class="illus-grid__item">
              <view class="grid-icon grid-icon--atlas" />
            </view>
            <view class="illus-grid__item">
              <view class="grid-icon grid-icon--shelf" />
            </view>
            <view class="illus-grid__item">
              <view class="grid-icon grid-icon--search" />
            </view>
          </view>

          <!-- 第 4 页：出发光晕 -->
          <view
            v-if="index === 3"
            class="illus-depart"
          >
            <view class="depart-aura" />
            <view class="depart-can" />
          </view>
        </view>

        <view class="tour-kicker">
          {{ step.kicker }}
        </view>
        <view class="tour-title">
          {{ step.title }}
        </view>
        <view class="tour-copy">
          {{ step.copy }}
        </view>
        <view
          v-if="step.cards"
          class="tour-cards"
        >
          <view
            v-for="card in step.cards"
            :key="card.term"
            class="tour-card"
          >
            <view
              v-if="card.icon"
              class="tour-card__icon"
              :class="`tour-card__icon--${card.icon}`"
              aria-hidden="true"
            >
              <view class="card-icon" />
            </view>
            <view class="tour-card__body">
              <view class="tour-card__term">
                {{ card.term }}
              </view>
              <view class="tour-card__desc">
                {{ card.desc }}
              </view>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>

    <view class="tour-footer">
      <view class="tour-dots">
        <view
          v-for="(step, index) in steps"
          :key="index"
          class="tour-dot"
          :class="{ active: current === index }"
        />
      </view>
      <view class="tour-actions">
        <view
          v-if="!isFirstStep"
          class="tour-prev"
          @tap="goPrev"
        >
          上一步
        </view>
        <view
          class="tour-cta"
          :class="{ 'tour-cta--solo': isFirstStep }"
          @tap="goNext"
        >
          {{ ctaLabel }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { toFollowRecommendations } from '@/routers/user';
import { goLogin } from '@/services/navigation';

const steps = [
  {
    kicker: '乡声集盒',
    title: '欢迎来到乡声集盒',
    copy: '这里收藏着各地的乡音，每一句家乡话都值得被好好保存。你的方言身份已就绪，先花一分钟认识这里。',
  },
  {
    kicker: '三个核心概念',
    title: '罐头 · 铭牌 · 装罐',
    copy: '装罐是这里最重要的动作：把一段声音存成罐头，再由大家为它贴上铭牌。',
    cards: [
      { term: '罐头', desc: '一段方言录音，这里最基本的声音单元', icon: 'can' },
      { term: '铭牌', desc: '贴在罐头上的写法与释义，说明怎么写、什么意思', icon: 'nameplate' },
      { term: '装罐', desc: '录一段你自己的乡音，存进集盒', icon: 'pack' },
    ],
  },
  {
    kicker: '探索方式',
    title: '图鉴 · 集盒 · 搜索',
    copy: '收藏不只是听：按主题整理罐头，也能按义项对比各地说法。',
    cards: [
      { term: '图鉴', desc: '按义项看「同一个意思，各地怎么说」', icon: 'atlas' },
      { term: '集盒', desc: '把罐头收进主题收藏，像整理一套声音盒子', icon: 'shelf' },
      { term: '搜索', desc: '用汉字或拼音检索乡音', icon: 'search' },
    ],
  },
  {
    kicker: '准备好了',
    title: '去认识一些乡音吧',
    copy: '先选想听的方言和几位同乡作者，你的关注流会从乡音开始。',
  },
];

export default {
  data() {
    const user = getApp().globalData.userInfo || {};
    return {
      current: 0,
      steps,
      userId: user.id || uni.getStorageSync('id'),
    };
  },
  computed: {
    isFirstStep() {
      return this.current === 0;
    },
    isLastStep() {
      return this.current === this.steps.length - 1;
    },
    ctaLabel() {
      return this.isLastStep ? '开始我的乡音之旅' : '下一步';
    },
  },
  onLoad() {
    if (!this.userId) {
      goLogin({}, { reset: true });
    }
  },
  onBackPress() {
    uni.showToast({ title: '看完导览即可开始', icon: 'none' });
    return true;
  },
  methods: {
    onSwiperChange(event) {
      this.current = event.detail.current;
    },
    goNext() {
      if (this.isLastStep) {
        this.finishTour();
        return;
      }
      this.current += 1;
    },
    goPrev() {
      if (this.isFirstStep) return;
      this.current -= 1;
    },
    finishTour() {
      toFollowRecommendations(true);
    },
    skipTour() {
      toFollowRecommendations(true);
    },
  },
};
</script>

<style scoped>
.welcome-tour {
  position: relative;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* 与首页同款固定深色渐变，不随明暗主题翻转 */
  background: linear-gradient(
    165deg,
    var(--immersive-bg-strong-color) 0%,
    var(--immersive-bg-soft-color) 38%,
    var(--immersive-bg-color) 100%
  );
  color: var(--on-immersive-color);
  padding-top: env(safe-area-inset-top);
}

.tour-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.tour-glow--top {
  top: -220rpx;
  right: -180rpx;
  width: 640rpx;
  height: 640rpx;
  background: radial-gradient(circle, var(--immersive-glow-color) 0%, transparent 70%);
}

.tour-glow--bottom {
  bottom: -260rpx;
  left: -200rpx;
  width: 720rpx;
  height: 720rpx;
  background: radial-gradient(circle, var(--immersive-glow-color) 0%, transparent 72%);
  opacity: 0.7;
}

.tour-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.16;
  background-image: radial-gradient(var(--immersive-border-color) 1rpx, transparent 1rpx);
  background-size: 46rpx 46rpx;
}

.tour-top {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5) 0;
}

.tour-brand {
  color: var(--on-immersive-muted-color);
  font-size: var(--font-size-sm);
  font-weight: 800;
  letter-spacing: 4rpx;
}

.tour-skip {
  padding: 8rpx 4rpx;
  color: var(--on-immersive-muted-color);
  font-size: var(--font-size-sm);
  transition: color 0.2s ease;
}

.tour-skip:active {
  color: var(--on-immersive-color);
}

/* swiper 默认高度 150px，必须用 flex 撑满剩余空间（双端一致） */
.tour-swiper {
  position: relative;
  z-index: 5;
  flex: 1;
  min-height: 0;
  margin-top: var(--space-3);
}

.tour-slide {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--space-4) var(--space-5);
  box-sizing: border-box;
}

/* ---------- 视觉插画区 ---------- */
.tour-illustration {
  position: relative;
  height: 260rpx;
  margin-bottom: var(--space-4);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 第 1 页：乡音罐头 */
.illus-can {
  position: relative;
  width: 200rpx;
  height: 200rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.illus-can__ring {
  position: absolute;
  inset: 0;
  border: 4rpx solid var(--immersive-border-color);
  border-radius: 50%;
  animation: can-breathe 3s ease-in-out infinite;
}

.illus-can__core {
  position: absolute;
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: var(--immersive-surface-color);
  box-shadow: 0 0 40rpx var(--immersive-glow-color);
}

.illus-can__bars {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 10rpx;
  height: 60rpx;
}

.illus-can__bar {
  width: 8rpx;
  border-radius: var(--radius-pill);
  background: var(--immersive-wave-active-color);
  animation: bar-dance 1.2s ease-in-out infinite alternate;
}

.illus-can__bar--1 { height: 24%; animation-delay: 0s; }
.illus-can__bar--2 { height: 56%; animation-delay: 0.15s; }
.illus-can__bar--3 { height: 100%; animation-delay: 0.3s; }
.illus-can__bar--4 { height: 72%; animation-delay: 0.45s; }
.illus-can__bar--5 { height: 40%; animation-delay: 0.6s; }

@keyframes can-breathe {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.05); opacity: 1; }
}

@keyframes bar-dance {
  from { transform: scaleY(0.7); opacity: 0.7; }
  to { transform: scaleY(1); opacity: 1; }
}

/* 第 2 页：概念徽章 */
.illus-badges {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24rpx;
}

.illus-badge {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: var(--immersive-surface-color);
  border: 1rpx solid var(--immersive-border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: badge-float 3s ease-in-out infinite;
}

.illus-badge--can { animation-delay: 0s; }
.illus-badge--nameplate { animation-delay: 0.4s; }
.illus-badge--pack { animation-delay: 0.8s; }

@keyframes badge-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12rpx); }
}

.badge-icon {
  position: relative;
  color: var(--immersive-accent-color);
}

/* 罐头图标：圆环 + 小圆点 */
.badge-icon--can {
  width: 48rpx;
  height: 48rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}
.badge-icon--can::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12rpx;
  height: 12rpx;
  margin: -6rpx 0 0 -6rpx;
  border-radius: 50%;
  background: currentColor;
}

/* 铭牌图标：矩形铭牌 + 挂孔 */
.badge-icon--nameplate {
  width: 52rpx;
  height: 34rpx;
  border: 4rpx solid currentColor;
  border-radius: 8rpx;
}
.badge-icon--nameplate::after {
  content: '';
  position: absolute;
  top: -10rpx;
  left: 50%;
  width: 10rpx;
  height: 10rpx;
  margin-left: -5rpx;
  border: 3rpx solid currentColor;
  border-radius: 50%;
  background: var(--immersive-surface-color);
}

/* 装罐图标：罐子 + 声波 */
.badge-icon--pack {
  width: 44rpx;
  height: 52rpx;
  border: 4rpx solid currentColor;
  border-radius: 10rpx;
}
.badge-icon--pack::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 24rpx;
  height: 4rpx;
  margin: -2rpx 0 0 -12rpx;
  background: currentColor;
  box-shadow: 0 10rpx 0 currentColor, 0 -10rpx 0 currentColor;
}

/* 第 3 页：探索网格 */
.illus-grid {
  display: grid;
  grid-template-columns: repeat(3, 140rpx);
  gap: 24rpx;
}

.illus-grid__item {
  aspect-ratio: 1;
  border-radius: var(--radius-lg);
  background: var(--immersive-surface-color);
  border: 1rpx solid var(--immersive-border-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-icon {
  position: relative;
  color: var(--immersive-accent-color);
}

/* 图鉴：书本翻开 */
.grid-icon--atlas {
  width: 48rpx;
  height: 40rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}
.grid-icon--atlas::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 1rpx;
  height: 100%;
  background: currentColor;
}

/* 集盒：堆叠盒子 */
.grid-icon--shelf {
  width: 50rpx;
  height: 42rpx;
  border: 4rpx solid currentColor;
  border-radius: 4rpx;
}
.grid-icon--shelf::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 4rpx;
  margin-top: -2rpx;
  background: currentColor;
}

/* 搜索：放大镜 */
.grid-icon--search {
  width: 40rpx;
  height: 40rpx;
  border: 4rpx solid currentColor;
  border-radius: 50%;
}
.grid-icon--search::after {
  content: '';
  position: absolute;
  right: -8rpx;
  bottom: -4rpx;
  width: 16rpx;
  height: 4rpx;
  background: currentColor;
  transform: rotate(45deg);
  border-radius: 2rpx;
}

/* 第 4 页：出发光晕 */
.illus-depart {
  position: relative;
  width: 240rpx;
  height: 240rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.depart-aura {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle, var(--immersive-glow-color) 0%, transparent 70%);
  animation: aura-pulse 2.5s ease-in-out infinite;
}

.depart-can {
  position: relative;
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  background: var(--immersive-surface-strong-color);
  border: 2rpx solid var(--immersive-border-color);
}
.depart-can::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  margin: -14rpx 0 0 -10rpx;
  border-top: 16rpx solid transparent;
  border-bottom: 16rpx solid transparent;
  border-left: 24rpx solid var(--immersive-accent-color);
}

@keyframes aura-pulse {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.15); opacity: 1; }
}

/* 禁用动画 */
@media (prefers-reduced-motion: reduce) {
  .illus-can__ring,
  .illus-can__bar,
  .illus-badge,
  .depart-aura {
    animation: none;
  }
}

.tour-kicker {
  color: var(--immersive-accent-color);
  font-size: 22rpx;
  font-weight: 800;
  letter-spacing: 4rpx;
}

.tour-title {
  margin-top: 12rpx;
  font-size: 46rpx;
  font-weight: 900;
  line-height: 1.2;
}

.tour-copy {
  margin-top: 14rpx;
  color: var(--on-immersive-muted-color);
  font-size: var(--font-size-sm);
  line-height: 1.7;
}

.tour-cards {
  margin-top: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.tour-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  border: 1rpx solid var(--immersive-border-color);
  border-radius: var(--radius-md);
  background: var(--immersive-surface-color);
  padding: 22rpx 26rpx;
}

.tour-card__icon {
  flex: 0 0 auto;
  width: 76rpx;
  height: 76rpx;
  border-radius: 50%;
  background: var(--immersive-surface-strong-color);
  border: 1rpx solid var(--immersive-border-color);
  display: flex;
  align-items: center;
  justify-content: center;
}

.tour-card__icon--can .card-icon {
  width: 34rpx;
  height: 34rpx;
  border: 3rpx solid var(--immersive-accent-color);
  border-radius: 50%;
}

.tour-card__icon--nameplate .card-icon {
  position: relative;
  width: 36rpx;
  height: 22rpx;
  border: 3rpx solid var(--immersive-accent-color);
  border-radius: 4rpx;
}
.tour-card__icon--nameplate .card-icon::after {
  content: '';
  position: absolute;
  top: -7rpx;
  left: 50%;
  width: 6rpx;
  height: 6rpx;
  margin-left: -3rpx;
  border: 2rpx solid var(--immersive-accent-color);
  border-radius: 50%;
}

.tour-card__icon--pack .card-icon {
  width: 30rpx;
  height: 34rpx;
  border: 3rpx solid var(--immersive-accent-color);
  border-radius: 6rpx;
}
.tour-card__icon--pack .card-icon::after {
  content: '';
  display: block;
  width: 100%;
  height: 3rpx;
  margin-top: 10rpx;
  background: var(--immersive-accent-color);
  box-shadow: 0 8rpx 0 var(--immersive-accent-color);
}

.tour-card__icon--atlas .card-icon {
  width: 34rpx;
  height: 28rpx;
  border: 3rpx solid var(--immersive-accent-color);
  border-radius: 4rpx;
}
.tour-card__icon--atlas .card-icon::after {
  content: '';
  display: block;
  width: 1rpx;
  height: 100%;
  margin: 0 auto;
  background: var(--immersive-accent-color);
}

.tour-card__icon--shelf .card-icon {
  width: 34rpx;
  height: 28rpx;
  border: 3rpx solid var(--immersive-accent-color);
  border-radius: 4rpx;
}
.tour-card__icon--shelf .card-icon::after {
  content: '';
  display: block;
  width: 100%;
  height: 3rpx;
  margin-top: 10rpx;
  background: var(--immersive-accent-color);
}

.tour-card__icon--search .card-icon {
  position: relative;
  width: 28rpx;
  height: 28rpx;
  border: 3rpx solid var(--immersive-accent-color);
  border-radius: 50%;
}
.tour-card__icon--search .card-icon::after {
  content: '';
  position: absolute;
  right: -6rpx;
  bottom: -2rpx;
  width: 10rpx;
  height: 3rpx;
  background: var(--immersive-accent-color);
  transform: rotate(45deg);
  border-radius: 2rpx;
}

.tour-card__body {
  min-width: 0;
  flex: 1;
}

.tour-card__term {
  color: var(--on-immersive-color);
  font-size: var(--font-size-base);
  font-weight: 800;
}

.tour-card__desc {
  margin-top: 6rpx;
  color: var(--on-immersive-muted-color);
  font-size: 24rpx;
  line-height: 1.6;
}

.tour-footer {
  position: relative;
  z-index: 10;
  padding: 0 var(--space-5) calc(var(--space-5) + env(safe-area-inset-bottom));
}

.tour-dots {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12rpx;
  margin-bottom: var(--space-4);
}

.tour-dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: var(--radius-pill);
  background: var(--immersive-border-color);
  transition: width 0.2s ease, background-color 0.2s ease;
}

.tour-dot.active {
  width: 40rpx;
  background: var(--immersive-accent-color);
}

.tour-actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.tour-prev {
  flex: 0 0 auto;
  min-width: 140rpx;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-pill);
  border: 1rpx solid var(--immersive-border-color);
  background: var(--immersive-surface-color);
  color: var(--on-immersive-color);
  font-size: var(--font-size-lg);
  font-weight: 700;
  transition: transform 0.15s ease, opacity 0.2s ease, background-color 0.2s ease;
}

.tour-prev:active {
  transform: scale(0.98);
  background: var(--immersive-surface-strong-color);
}

.tour-cta {
  flex: 1;
  height: 96rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-pill);
  background: var(--on-immersive-color);
  color: var(--immersive-bg-color);
  font-size: var(--font-size-lg);
  font-weight: 800;
  transition: transform 0.15s ease, opacity 0.2s ease;
}

.tour-cta--solo {
  flex: 1;
}

.tour-cta:active {
  transform: scale(0.98);
  opacity: 0.9;
}

@media (prefers-reduced-motion: reduce) {
  .tour-dot,
  .tour-cta,
  .tour-prev,
  .tour-skip {
    transition: none;
  }
}
</style>
