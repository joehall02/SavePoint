/* eslint-disable @typescript-eslint/no-explicit-any */

import { DependencyContainer, container } from "tsyringe";
import { registerProd } from "./environments/registerProd.js";
import { registerTest } from "./environments/registerTest.js";

export function createContainer(
  env: string,
  overrides?: Array<{ token: symbol; useClass: any }>
): DependencyContainer {
  container.reset();

  if (env === "test") {
    registerTest();
  } else {
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
}
