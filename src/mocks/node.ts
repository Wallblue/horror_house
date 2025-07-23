import {setupServer} from "msw/node";
import { handlers } from "./handlers";
import { clientHandlers } from "./clientHandlers";

export const server = setupServer(...handlers, ...clientHandlers);
