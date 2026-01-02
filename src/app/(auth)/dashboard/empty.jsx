function EmptyState({ title, subtitle, ctaLabel, onCta }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center">
        <span className="text-xl">📌</span>
      </div>
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
      <button
        onClick={onCta}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#8a61ee] to-[#6b46cc] px-5 py-3 text-sm font-semibold text-white"
      >
        {ctaLabel}
      </button>
    </div>
  );
}
export default EmptyState;
