export const isFromGithub = (request: Request): boolean =>
  (request.headers.get("user-agent") || "").startsWith("github-camo") ||
  (request.headers.get("referer") || "").includes("github.com");
