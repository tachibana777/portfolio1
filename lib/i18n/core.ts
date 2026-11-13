/**
 * DOM-level translation core (English source, Thai dictionary).
 *
 * The English text stays in the JSX. Each translatable "unit" (an element that has its own text)
 * is turned into a template such as `Run <0>isolate.sh</0> and check <1>status</1>.`
 * and looked up in the Thai dictionary by a hash of that template.
 * The Thai template reuses the original child elements (links, code, icons, classes) by index,
 * so markup and React references stay intact, and switching back to English restores the original nodes.
 */

export type Lang = "en" | "th";
export type Dict = Record<string, string>;

const SKIP_TAGS = new Set(["script", "style", "pre", "svg", "textarea", "noscript", "code", "kbd", "samp", "iframe", "canvas", "img", "select", "option", "head"]);
const ATTRS = ["alt", "aria-label", "title", "placeholder"] as const;

/** FNV-1a 32-bit, base36. Used as the dictionary key of an English template. */
export function hashKey(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
}

const escapeText = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const unescapeText = (s: string) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const hasLetter = (s: string | null) => !!s && /[A-Za-z]/.test(s);

function skipped(el: Element): boolean {
  return SKIP_TAGS.has(el.tagName.toLowerCase()) || el.hasAttribute("data-no-i18n") || el.getAttribute("translate") === "no";
}

/** Opt-out used for attributes (alt, aria-label...), where tags such as <img> are allowed. */
const optedOut = (el: Element) => el.hasAttribute("data-no-i18n") || el.getAttribute("translate") === "no";

function hasDirectText(el: Element): boolean {
  for (const n of Array.from(el.childNodes)) if (n.nodeType === 3 && hasLetter(n.nodeValue)) return true;
  return false;
}

/** Template of an element's content: text plus numbered tags for element children. */
export function templateOf(el: Element): string {
  let out = "";
  let idx = 0;
  for (const n of Array.from(el.childNodes)) {
    if (n.nodeType === 3) out += escapeText((n.nodeValue ?? "").replace(/\s+/g, " "));
    else if (n.nodeType === 1) {
      const c = n as Element;
      const i = idx++;
      if (c.tagName.toLowerCase() === "br" || !(c.textContent ?? "").trim()) out += `<${i}/>`;
      else out += `<${i}>${templateOf(c)}</${i}>`;
    }
  }
  return out;
}

/** Visit every translatable unit under root. A unit is not descended into. */
function walkUnits(root: Element, cb: (el: Element) => void): void {
  if (skipped(root)) return;
  if (hasDirectText(root)) {
    cb(root);
    return;
  }
  for (const c of Array.from(root.children)) walkUnits(c, cb);
}

type Node2 = { text: string } | { tag: number; void: boolean; kids: Node2[] };

function parseTemplate(t: string): Node2[] {
  const root: Node2[] = [];
  const stack: { tag: number; kids: Node2[] }[] = [];
  const cur = () => (stack.length ? stack[stack.length - 1].kids : root);
  const re = /<(\d+)\/>|<(\d+)>|<\/(\d+)>|([^<]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(t))) {
    if (m[1] !== undefined) cur().push({ tag: +m[1], void: true, kids: [] });
    else if (m[2] !== undefined) {
      const node = { tag: +m[2], void: false, kids: [] as Node2[] };
      cur().push(node);
      stack.push(node);
    } else if (m[3] !== undefined) stack.pop();
    else if (m[4] !== undefined) cur().push({ text: unescapeText(m[4]) });
  }
  return root;
}

const touched = new Map<Element, Node[]>(); // element -> its original child nodes
const touchedAttrs: [Element, string, string][] = [];
const done = new WeakSet<Element>();

function applyNodes(el: Element, nodes: Node2[]): void {
  const kids = Array.from(el.children);
  if (!touched.has(el)) touched.set(el, Array.from(el.childNodes));
  const next: Node[] = [];
  for (const n of nodes) {
    if ("text" in n) next.push(document.createTextNode(n.text));
    else {
      const child = kids[n.tag];
      if (!child) continue;
      if (!n.void) applyNodes(child, n.kids);
      next.push(child);
    }
  }
  el.replaceChildren(...next);
}

function translateAttrs(root: Element, dict: Dict): void {
  const sel = ATTRS.map((a) => `[${a}]`).join(",");
  const els = [root, ...Array.from(root.querySelectorAll(sel))];
  for (const el of els) {
    if (!el.hasAttribute || optedOut(el)) continue;
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (!v || !hasLetter(v)) continue;
      const th = dict[hashKey(v.replace(/\s+/g, " ").trim())];
      if (th) {
        touchedAttrs.push([el, a, v]);
        el.setAttribute(a, th);
      }
    }
  }
}

/** Translate every unit under root that has a Thai entry. Returns the number of units translated. */
export function applyThai(root: Element, dict: Dict): number {
  let n = 0;
  walkUnits(root, (el) => {
    if (done.has(el)) return;
    const th = dict[hashKey(templateOf(el).trim())];
    if (!th) return;
    applyNodes(el, parseTemplate(th));
    done.add(el);
    n++;
  });
  translateAttrs(root, dict);
  return n;
}

/** Put the original English nodes and attributes back. */
export function restoreEnglish(): void {
  for (const [el, nodes] of touched) el.replaceChildren(...nodes);
  touched.clear();
  for (const [el, a, v] of touchedAttrs) el.setAttribute(a, v);
  touchedAttrs.length = 0;
}

/** Dev helper: list every unit/attribute template under root with its id (used to build the dictionary). */
export function collect(root: Element = document.body): Record<string, string> {
  const out: Record<string, string> = {};
  walkUnits(root, (el) => {
    const t = templateOf(el).trim();
    if (hasLetter(t)) out[hashKey(t)] = t;
  });
  const sel = ATTRS.map((a) => `[${a}]`).join(",");
  for (const el of Array.from(root.querySelectorAll(sel))) {
    if (optedOut(el)) continue;
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (v && hasLetter(v)) {
        const t = v.replace(/\s+/g, " ").trim();
        out[hashKey(t)] = t;
      }
    }
  }
  return out;
}
