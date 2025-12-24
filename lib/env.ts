import { z } from "zod";

import tryParseEnv from "./try-parse-env";

const EnvSchema = z.object({
  NODE_ENV: z.string(),
  TURSO_DATABASE_URL: z.string(),
  TURSO_AUTH_TOKEN: z.string(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  AUTH_GITHUB_CLIENT_ID: z.string(),
  AUTH_GITHUB_CLIENT_SECRET: z.string(),
});

// 类型推断 (Static Type Inference)
// 这是 Zod 的杀手锏。它从上面定义的运行时 EnvSchema 中自动提取出 TypeScript 类型。
// 效果：等同于手动写了 type EnvSchema = { NODE_ENV: string }。
// 好处：单一数据源。你只需要修改 Zod Schema，对应的 TS 类型会自动更新，避免了类型定义和实际校验逻辑不一致的问题。
export type EnvSchema = z.infer<typeof EnvSchema>;
tryParseEnv(EnvSchema);
// process.env：这是 Node.js 原生的环境变量对象。
// .parse()：这是最关键的一步。它接收 process.env，根据 EnvSchema 进行对比：
// 成功：返回一个类型安全的对象。
// 失败：直接抛出异常，并详细列出哪个变量少了、哪个变量格式不对。
// eslint-disable-next-line node/no-process-env
export default EnvSchema.parse(process.env);
