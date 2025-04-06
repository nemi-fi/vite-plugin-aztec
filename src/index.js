import { nodePolyfills } from "vite-plugin-node-polyfills";

/**
 * @returns {import("vite").Plugin<any>[]}
 */
export function aztec() {
  return [
    {
      name: "vite-plugin-aztec",
      config(config) {
        if (!isSupportedTarget(config.build?.target)) {
          console.log(`Setting build.target to "${MIN_SUPPORTED_TARGET}"`);
          config.build ??= {};
          config.build.target = MIN_SUPPORTED_TARGET;
        }
        if (!isSupportedTarget(config.optimizeDeps?.esbuildOptions?.target)) {
          console.log(
            `Setting optimizeDeps.esbuildOptions.target to "${MIN_SUPPORTED_TARGET}"`,
          );
          config.optimizeDeps ??= {};
          config.optimizeDeps.esbuildOptions ??= {};
          config.optimizeDeps.esbuildOptions.target = MIN_SUPPORTED_TARGET;
        }
      },
    },
    nodePolyfills({
      include: ["buffer", "process", "path"],
    }),
  ];
}

const MIN_SUPPORTED_TARGET = "ES2022";
/**
 * @param {string | string[] | undefined | false} rawTarget
 */
function isSupportedTarget(rawTarget) {
  if (typeof rawTarget !== "string") {
    return false;
  }

  const target = rawTarget.toLowerCase();
  if (target === "esnext") {
    return true;
  }

  if (
    !target.startsWith("es") ||
    Number(target.slice(2)) < Number(MIN_SUPPORTED_TARGET.slice(2))
  ) {
    return false;
  }
  return true;
}
