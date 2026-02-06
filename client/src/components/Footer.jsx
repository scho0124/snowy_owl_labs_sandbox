export function Footer({ links }) {
  return (
    <footer className="mt-10 border-t border-neutral-200 pt-4 text-center text-xs text-neutral-500">
      {links.map((l, idx) => (
        <span key={l.href}>
          <a className="hover:underline" href={l.href}>
            {l.label}
          </a>
          {idx < links.length - 1 ? " | " : ""}
        </span>
      ))}
    </footer>
  );
}
