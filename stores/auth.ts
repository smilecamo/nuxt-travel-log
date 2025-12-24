import { createAuthClient } from "better-auth/client";

const authClient = createAuthClient();
export const useAuthStore = defineStore("useAuthStore", () => {
  const loading = ref(false);
  async function signIn() {
    loading.value = true;
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/database",
      errorCallbackURL: "/error",
    });
    loading.value = false;
  }
  return {
    loading,
    signIn,
  };
});
