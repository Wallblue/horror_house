import {setupServer} from "msw/node";
import { clientHandlers } from "./clientHandlers";

export const server = setupServer(...clientHandlers);
