import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@/routers/user', () => ({
  toFollowRecommendations: vi.fn(),
}));

vi.mock('@/services/navigation', () => ({
  goLogin: vi.fn(),
}));

import { toFollowRecommendations } from '@/routers/user';
import { goLogin } from '@/services/navigation';

const app = {
  globalData: {
    userInfo: { id: 7, username: 'collector', primary_dialect: { id: 3 } },
  },
};
globalThis.getApp = vi.fn(() => app);

const { default: WelcomeTourPage } = await import('@/pages/users/welcome-tour.vue');

function mountPage() {
  return mount(WelcomeTourPage, {
    global: {
      stubs: {
        swiper: { template: '<div><slot /></div>' },
        'swiper-item': { template: '<div><slot /></div>' },
      },
    },
  });
}

describe('welcome tour page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    app.globalData.userInfo = { id: 7, username: 'collector', primary_dialect: { id: 3 } };
    globalThis.uni = {
      getStorageSync: vi.fn((key) => (key === 'id' ? 7 : '')),
      reLaunch: vi.fn(),
      showToast: vi.fn(),
    };
  });

  it('renders four steps with the first dot active', () => {
    const wrapper = mountPage();

    expect(wrapper.findAll('.tour-dot')).toHaveLength(4);
    expect(wrapper.findAll('.tour-dot').at(0).classes()).toContain('active');
    expect(wrapper.vm.current).toBe(0);
    expect(wrapper.vm.isFirstStep).toBe(true);
    expect(wrapper.vm.ctaLabel).toBe('下一步');
  });

  it('advances through the steps and shows the final call to action', async () => {
    const wrapper = mountPage();

    wrapper.vm.goNext();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.current).toBe(1);
    expect(wrapper.findAll('.tour-dot').at(1).classes()).toContain('active');

    wrapper.vm.goNext();
    wrapper.vm.goNext();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.current).toBe(3);
    expect(wrapper.vm.ctaLabel).toBe('开始我的乡音之旅');
  });

  it('syncs current when the swiper change event arrives', async () => {
    const wrapper = mountPage();

    wrapper.vm.onSwiperChange({ detail: { current: 2 } });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.current).toBe(2);
    expect(wrapper.findAll('.tour-dot').at(2).classes()).toContain('active');
  });

  it('continues to follow recommendations when finishing or skipping', () => {
    const wrapper = mountPage();

    wrapper.vm.finishTour();
    expect(toFollowRecommendations).toHaveBeenCalledWith(true);

    wrapper.vm.skipTour();
    expect(toFollowRecommendations).toHaveBeenCalledTimes(2);
  });

  it('redirects to login when there is no user id', () => {
    app.globalData.userInfo = null;
    globalThis.uni.getStorageSync = vi.fn(() => '');
    const wrapper = mountPage();

    wrapper.vm.$options.onLoad.call(wrapper.vm);
    expect(goLogin).toHaveBeenCalledWith({}, { reset: true });
  });

  it('allows going back to the previous step from the second step onward', async () => {
    const wrapper = mountPage();

    wrapper.vm.goNext();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.current).toBe(1);
    expect(wrapper.vm.isFirstStep).toBe(false);
    expect(wrapper.find('.tour-prev').exists()).toBe(true);

    wrapper.vm.goPrev();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.current).toBe(0);
    expect(wrapper.find('.tour-prev').exists()).toBe(false);
  });

  it('does not go before the first step', () => {
    const wrapper = mountPage();

    wrapper.vm.goPrev();
    expect(wrapper.vm.current).toBe(0);
  });

  it('blocks physical back navigation', () => {
    const wrapper = mountPage();

    expect(wrapper.vm.$options.onBackPress.call(wrapper.vm)).toBe(true);
    expect(uni.showToast).toHaveBeenCalled();
  });
});
