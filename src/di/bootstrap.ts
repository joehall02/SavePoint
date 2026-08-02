/* eslint-disable @typescript-eslint/no-explicit-any */

import { DependencyContainer, container } from "tsyringe";

export const createContainer = async (
  env: string,
  overrides?: Array<{ token: symbol; useClass: any }>
): Promise<DependencyContainer> => {
  container.reset();

  // Dynamic imports so only the env actually used gets loaded - keeps the
  // real db/IGDB client (imported by registerProd) out of test runs entirely.
  if (env === "test") {
    const { registerTest } = await import("./environments/registerTest.js");
    registerTest();
  } else {
    const { registerProd } = await import("./environments/registerProd.js");
    registerProd();
  }

  // Apply dependency overrides after default registration
  if (overrides) {
    overrides.forEach((override) => {
      container.register(override.token, {
        useClass: override.useClass,
      });
    });
  }

  return container;
};
