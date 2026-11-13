import type { Dict } from "../core";
import home from "./home";
import profile from "./profile";
import credentials from "./credentials";
import startHere from "./start-here";
import misp from "./misp";
import edr from "./edr";
import xdr from "./xdr";
import soar from "./soar";
import soc from "./soc";
import extras from "./extras";

// Thai dictionary: key = hash of the English template (see lib/i18n/core.ts), value = Thai template.
// Technical terms stay in English (web-app, endpoint, dashboard, alert, log, script ...).
const th: Dict = { ...home, ...profile, ...credentials, ...startHere, ...misp, ...edr, ...xdr, ...soar, ...soc, ...extras };

export default th;
