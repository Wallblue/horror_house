import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { clientHandlers } from "./clientHandlers";

export const worker = setupWorker(...handlers, ...clientHandlers);
