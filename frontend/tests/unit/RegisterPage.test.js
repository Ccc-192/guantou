import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  registerUser: vi.fn(),
  normalLogin: vi.fn(),
  sendEmailCode: vi.fn(),
  requestPhoneCode: vi.fn(),
}));

vi.mock('@/services/user', () => ({ registerUser: mocks.registerUser }));
vi.mock('@/services/login', () => ({ normalLogin: mocks.normalLogin }));
vi.mock('@/services/verification', () => ({ sendEmailCode: mocks.sendEmailCode }));
vi.mock('@/services/phoneAuth', () => ({ requestPhoneCode: mocks.requestPhoneCode, isValidPhone: vi.fn((phone) => /^1\d{10}$/.test(phone)) }));

const { default: RegisterPage } = await import('@/pages/login/register.vue');

function mountPage() {
  return mount(RegisterPage, {
    global: {
      stubs: {
        PageShell: { template: '<main><slot /></main>' },
      },
    },
  });
}

function fillValidForm(wrapper, contact = 'collector@example.com') {
  wrapper.vm.username = 'collector';
  wrapper.vm.password = 'password123';
  wrapper.vm.passwordConfirmed = 'password123';
  wrapper.vm.contact = contact;
  wrapper.vm.code = '123456';
}

describe('register page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.uni = {
      showToast: vi.fn(),
    };
    mocks.registerUser.mockResolvedValue({ id: 9 });
    mocks.normalLogin.mockResolvedValue({ id: 9 });
  });

  it('registers then logs in with the new account by email', async () => {
    const wrapper = mountPage();
    fillValidForm(wrapper);

    await wrapper.vm.register();

    expect(mocks.registerUser).toHaveBeenCalledWith(
      'collector',
      'password123',
      'collector@example.com',
      '123456',
      'email',
    );
    expect(mocks.normalLogin).toHaveBeenCalledWith('collector', 'password123', { isNew: true });
    expect(wrapper.vm.submitting).toBe(false);
  });

  it('registers then logs in with the new account by phone', async () => {
    const wrapper = mountPage();
    fillValidForm(wrapper, '13912345678');

    await wrapper.vm.register();

    expect(mocks.registerUser).toHaveBeenCalledWith(
      'collector',
      'password123',
      '13912345678',
      '123456',
      'phone',
    );
    expect(mocks.normalLogin).toHaveBeenCalledWith('collector', 'password123', { isNew: true });
  });

  it('blocks submission when client validation fails', async () => {
    const wrapper = mountPage();
    fillValidForm(wrapper);
    wrapper.vm.passwordConfirmed = 'different';

    await wrapper.vm.register();

    expect(mocks.registerUser).not.toHaveBeenCalled();
    expect(wrapper.vm.errors.passwordConfirmed).toBe('两次密码不相同');
  });

  it('sends email code when contact is an email', async () => {
    const wrapper = mountPage();
    wrapper.vm.contact = 'collector@example.com';
    mocks.sendEmailCode.mockResolvedValue({ demo_code: '654321' });

    await wrapper.vm.getCode();

    expect(mocks.sendEmailCode).toHaveBeenCalledWith('collector@example.com', 'register');
    expect(wrapper.vm.demoCode).toBe('654321');
  });

  it('sends phone code when contact is a phone', async () => {
    const wrapper = mountPage();
    wrapper.vm.contact = '13912345678';
    mocks.requestPhoneCode.mockResolvedValue({ demo_code: '111111' });

    await wrapper.vm.getCode();

    expect(mocks.requestPhoneCode).toHaveBeenCalledWith('13912345678');
    expect(wrapper.vm.demoCode).toBe('111111');
  });

  it('maps server field errors onto the matching field without a toast', async () => {
    const wrapper = mountPage();
    fillValidForm(wrapper);
    mocks.registerUser.mockRejectedValue({
      statusCode: 409,
      message: '该邮箱已被绑定',
      data: { contact: '该邮箱已被绑定' },
    });

    await wrapper.vm.register();

    expect(wrapper.vm.errors.contact).toBe('该邮箱已被绑定');
    expect(wrapper.vm.errors.username).toBe('');
    expect(uni.showToast).not.toHaveBeenCalled();
    expect(wrapper.vm.submitting).toBe(false);
  });

  it('falls back to one status-aware toast for unfielded errors', async () => {
    const wrapper = mountPage();
    fillValidForm(wrapper);
    mocks.registerUser.mockRejectedValue({ statusCode: 401, message: '' });

    await wrapper.vm.register();

    expect(uni.showToast).toHaveBeenCalledTimes(1);
    expect(uni.showToast).toHaveBeenCalledWith({ title: '验证码错误', icon: 'none' });
  });

  it('recovers the message when empty-body conflicts only expose a reason phrase', async () => {
    const wrapper = mountPage();
    fillValidForm(wrapper);
    mocks.registerUser.mockRejectedValue({ statusCode: 409, message: 'Conflict' });

    await wrapper.vm.register();

    expect(uni.showToast).toHaveBeenCalledWith({ title: '用户名或联系方式已存在', icon: 'none' });
  });
});
