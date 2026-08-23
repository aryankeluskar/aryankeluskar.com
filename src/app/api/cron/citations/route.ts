import { NextRequest, NextResponse } from "next/server";
import {
  normalizeTitle,
  type CitationArticle,
  type CitationSnapshot,
} from "@/lib/citations";
import { DATA } from "@/data/resume";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const AUTHOR_ID = "wVDeZtcAAAAJ";
const FILE_PATH = "src/data/citations.json";
const GITHUB_API = "https://api.github.com";
const PAGE_SIZE = 100;
const MAX_PAGES = 3;

type SerpApiArticle = {
  title?: string;
  cited_by?: { value?: number; link?: string };
};

type SerpApiResponse = {
  error?: string;
  articles?: SerpApiArticle[];
  cited_by?: { table?: Array<Record<string, { all?: number }>> };
  serpapi_pagination?: { next?: string };
};

function tableValue(
  table: Array<Record<string, { all?: number }>> | undefined,
  key: string,
): number {
  const row = table?.find((r) => key in r);
  return row?.[key]?.all ?? 0;
}

async function fetchScholar(apiKey: string): Promise<CitationSnapshot> {
  const articles: SerpApiArticle[] = [];
  let table: Array<Record<string, { all?: number }>> | undefined;

  for (let page = 0; page < MAX_PAGES; page++) {
    const url = new URL("https://serpapi.com/search.json");
    url.searchParams.set("engine", "google_scholar_author");
    url.searchParams.set("author_id", AUTHOR_ID);
    url.searchParams.set("hl", "en");
    url.searchParams.set("sort", "pubdate");
    url.searchParams.set("num", String(PAGE_SIZE));
    url.searchParams.set("start", String(page * PAGE_SIZE));
    url.searchParams.set("api_key", apiKey);

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`SerpApi HTTP ${res.status}: ${await res.text()}`);
    }
    const body = (await res.json()) as SerpApiResponse;
    if (body.error) throw new Error(`SerpApi error: ${body.error}`);

    articles.push(...(body.articles ?? []));
    table ??= body.cited_by?.table;

    if (!body.serpapi_pagination?.next) break;
  }

  const mapped: CitationArticle[] = articles
    .filter((a): a is SerpApiArticle & { title: string } => Boolean(a.title))
    .map((a) => ({
      key: normalizeTitle(a.title),
      title: a.title,
      citations: a.cited_by?.value ?? 0,
      link: a.cited_by?.link ?? "",
    }))
    // Stable ordering keeps the committed diff readable.
    .sort((a, b) => a.key.localeCompare(b.key));

  return {
    updatedAt: new Date().toISOString(),
    source: "serpapi",
    authorId: AUTHOR_ID,
    totals: {
      citations: tableValue(table, "citations"),
      hIndex: tableValue(table, "h_index"),
      i10Index: tableValue(table, "i10_index"),
    },
    articles: mapped,
  };
}

/**
 * Scholar occasionally serves partial or blocked responses that parse fine but
 * report far fewer citations than reality. Refuse to commit those.
 */
function assertSane(prev: CitationSnapshot, next: CitationSnapshot): void {
  if (next.articles.length === 0) {
    throw new Error("refusing to commit: scholar returned zero articles");
  }
  if (
    prev.totals.citations > 0 &&
    next.totals.citations < prev.totals.citations * 0.8
  ) {
    throw new Error(
      `refusing to commit: total citations fell ${prev.totals.citations} -> ${next.totals.citations}`,
    );
  }
  const byKey = new Map(next.articles.map((a) => [a.key, a]));
  for (const before of prev.articles) {
    const after = byKey.get(before.key);
    if (!after) continue;
    const tolerance = Math.max(2, before.citations * 0.1);
    if (after.citations < before.citations - tolerance) {
      throw new Error(
        `refusing to commit: "${before.title}" fell ${before.citations} -> ${after.citations}`,
      );
    }
  }
}

/** Everything except updatedAt — so an unchanged profile is a no-op commit. */
function fingerprint(s: CitationSnapshot): string {
  return JSON.stringify({ totals: s.totals, articles: s.articles });
}

function ghHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function readRemote(repo: string, branch: string, token: string) {
  const res = await fetch(
    `${GITHUB_API}/repos/${repo}/contents/${FILE_PATH}?ref=${branch}`,
    { headers: ghHeaders(token), cache: "no-store" },
  );
  if (!res.ok) {
    throw new Error(`GitHub read HTTP ${res.status}: ${await res.text()}`);
  }
  const body = (await res.json()) as { content: string; sha: string };
  const decoded = Buffer.from(body.content, "base64").toString("utf8");
  return {
    snapshot: JSON.parse(decoded) as CitationSnapshot,
    sha: body.sha,
  };
}

async function writeRemote(
  repo: string,
  branch: string,
  token: string,
  sha: string,
  snapshot: CitationSnapshot,
  message: string,
) {
  const res = await fetch(
    `${GITHUB_API}/repos/${repo}/contents/${FILE_PATH}`,
    {
      method: "PUT",
      headers: { ...ghHeaders(token), "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        branch,
        sha,
        content: Buffer.from(
          JSON.stringify(snapshot, null, 2) + "\n",
        ).toString("base64"),
      }),
    },
  );
  if (!res.ok) {
    throw new Error(`GitHub write HTTP ${res.status}: ${await res.text()}`);
  }
}

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    if (request.headers.get("authorization") !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "CRON_SECRET not set" }, { status: 500 });
  }

  const apiKey = process.env.SERPAPI_KEY;
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO ?? "aryankeluskar/aryankeluskar.com";
  const branch = process.env.GITHUB_BRANCH ?? "master";
  const dry = request.nextUrl.searchParams.get("dry") === "1";

  if (!apiKey) {
    return NextResponse.json({ error: "SERPAPI_KEY not set" }, { status: 500 });
  }

  try {
    const next = await fetchScholar(apiKey);

    if (dry) {
      // Scholar titles drift from the ones in resume.tsx (subtitles, renamed
      // preprints). Report both sides so a miss is obvious before going live.
      const scholarKeys = new Set(next.articles.map((a) => a.key));
      const resumeKeys = new Set(
        DATA.publications.map((p) => normalizeTitle(p.title)),
      );
      return NextResponse.json({
        status: "dry-run",
        totals: next.totals,
        matched: DATA.publications
          .filter((p) => scholarKeys.has(normalizeTitle(p.title)))
          .map((p) => p.title),
        resumeMissingFromScholar: DATA.publications
          .filter((p) => !scholarKeys.has(normalizeTitle(p.title)))
          .map((p) => p.title),
        scholarNotOnSite: next.articles
          .filter((a) => !resumeKeys.has(a.key))
          .map((a) => `${a.title} (${a.citations})`),
        snapshot: next,
      });
    }

    if (!token) {
      return NextResponse.json(
        { error: "GITHUB_TOKEN not set" },
        { status: 500 },
      );
    }

    const { snapshot: prev, sha } = await readRemote(repo, branch, token);
    assertSane(prev, next);

    if (fingerprint(prev) === fingerprint(next)) {
      return NextResponse.json({
        status: "unchanged",
        totals: next.totals,
        articles: next.articles.length,
      });
    }

    const delta = next.totals.citations - prev.totals.citations;
    await writeRemote(
      repo,
      branch,
      token,
      sha,
      next,
      `chore: refresh scholar citations (${next.totals.citations} total, ${
        delta >= 0 ? "+" : ""
      }${delta})`,
    );

    return NextResponse.json({
      status: "committed",
      totals: next.totals,
      delta,
      articles: next.articles.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[cron/citations]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
