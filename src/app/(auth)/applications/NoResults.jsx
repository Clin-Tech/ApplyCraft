function NoResults({ query, status }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
      No results{query ? ` for “${query}”` : ""}
      {status && status !== "All Status" ? ` with status “${status}”` : ""}. Try
      clearing filters or searching different keywords.
    </div>
  );
}

export default NoResults;
