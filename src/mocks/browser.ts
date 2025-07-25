import { setupWorker } from "msw/browser";
import { clientHandlers } from "./clientHandlers";

export const worker = setupWorker(...clientHandlers);
