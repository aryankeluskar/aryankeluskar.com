import snapshot from "@/data/citations.json";

export type CitationArticle = {
  key: string;
  title: string;
  citations: number;
  link: string;
};

export type CitationSnapshot = {
  updatedAt: string;
  source?: string;
  authorId: string;
  totals: { citations: number; hIndex: number; i10Index: number };
  articles: CitationArticle[];
};

/**
 * Google Scholar titles drift in punctuation and casing, so match on a
 * flattened form: lowercase, every non-alphanumeric run collapsed to a space.
 */
export function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

const INDEX = new Map(
  (snapshot as CitationSnapshot).articles.map((a) => [a.key, a]),
);

/** Papers below this are rendered without a citation line. Raise to hide low counts. */
const MIN_DISPLAYED_CITATIONS = 5;

type PublicationLike = {
  title: string;
  citation?: string;
  citationLink?: string;
};

/**
 * Live count from the Scholar snapshot, falling back to whatever is written
 * in resume.tsx so the section still renders if the snapshot is missing an
 * entry (title drift, brand-new paper, failed refresh).
 */
export function resolveCitation(publication: PublicationLike): {
  citation?: string;
  citationLink?: string;
} {
  const hit = INDEX.get(normalizeTitle(publication.title));
  if (hit && hit.citations >= MIN_DISPLAYED_CITATIONS) {
    return {
      citation: `${hit.citations} citation${hit.citations === 1 ? "" : "s"}`,
      citationLink: hit.link || publication.citationLink,
    };
  }
  return {
    citation: publication.citation,
    citationLink: publication.citationLink,
  };
}

export const citationsUpdatedAt = (snapshot as CitationSnapshot).updatedAt;
