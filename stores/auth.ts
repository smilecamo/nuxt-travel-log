import { createAuthClient } from "better-auth/vue";

/**
 * 初始化 Better Auth 客户端
 * 在 Nuxt 环境中，它会自动指向 /api/auth 路由
 */
const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  /**
   * session 响应式引用
   * 类型解析：
   * - ReturnType <typeof authClient.useSession> 获取的是 useSession 函数返回的类型
   * - Awaited 获取的是 Promise 转换后的实际对象类型
   * 这个变量包含了：data (用户信息), isPending (加载状态), error (错误信息)
   */
  const session = ref<Awaited<ReturnType <typeof authClient.useSession>> | null>(null);

  /**
   * 初始化函数：从后端获取当前的登录会话
   *
   * 为什么要传入 useFetch？
   * 在 Nuxt 3 中，传入 useFetch 可以让 Better Auth 利用 Nuxt 的原生请求机制。
   * 这有助于处理 SSR（服务端渲染）时的身份校验，确保服务器和浏览器状态同步。
   */
  async function init() {
    // 使用 useAsyncData 并记录其返回的 refresh 方法
    const { data } = await useAsyncData("auth-session", () =>
      authClient.useSession(useFetch));
    session.value = data.value;
  }

  /**
   * 计算属性：是否正在加载会话信息
   * 用于在 UI 上显示加载动画（如登录中的 Loading 状态）
   */
  const loading = computed(() => session.value?.isPending);

  /**
   * 计算属性：当前登录的用户对象
   * 包含用户 ID、邮箱、姓名、头像等
   */
  const user = computed(() => session.value?.data?.user);

  /**
   * 登录函数：发起 GitHub 社交登录
   *
   * 执行流程：
   * 1. 调用该函数后，浏览器会重定向到 GitHub 的授权页面
   * 2. 用户同意授权后，GitHub 重定向回你的 /api/auth/callback/github
   * 3. 校验成功后，最终跳转到下方配置的 callbackURL
   */
  async function signIn() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard", // 登录成功后的跳转地址
      errorCallbackURL: "/error", // 登录失败后的跳转地址
    });
  }

  /**
   * 登出函数
   *
   * 执行流程：
   * 1. 调用后端接口销毁 Session（清除 Cookie）
   * 2. 清除成功后，利用 Nuxt 的 navigateTo 跳转回首页
   */
  async function signOut() {
    // 1. 调用 Better Auth 的退出接口
    await authClient.signOut();
    // 2. 清除 Pinia 中的本地状态
    session.value = null;
    // 3. 重要：清除 useAsyncData 的缓存
    // 这样下次进入页面或调用 init 时，它不会再使用旧的 'auth-session' 数据
    clearNuxtData("auth-session");
    // 4. 跳转回首页
    await navigateTo("/");
  }

  // 暴露给组件使用的状态和方法
  return {
    init,
    loading,
    signIn,
    signOut,
    user,
  };
});
