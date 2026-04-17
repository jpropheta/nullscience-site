"use client";

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-surface/30">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm font-semibold tracking-[-0.02em]">
                nullscience
              </span>
            </div>
            <p className="text-sm text-muted/50 leading-relaxed max-w-sm">
              Traduzimos risco cibernético em estratégia executiva. Advisory,
              simulações de crise e preparação para incidentes na América Latina.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-[10px] font-mono text-muted/40 uppercase tracking-[0.15em] mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Sobre", href: "#sobre" },
                { label: "CrisisLab", href: "#crisislab" },
                { label: "Método", href: "#metodo" },
                { label: "Contato", href: "#contato" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted/50 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-mono text-muted/40 uppercase tracking-[0.15em] mb-4">
              Contato
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:contato@nullscience.ai"
                  className="text-sm text-muted/50 hover:text-accent/70 transition-colors duration-200"
                >
                  contato@nullscience.ai
                </a>
              </li>
              <li>
                <span className="text-sm text-muted/50">
                  São Paulo, Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-muted/30 font-mono">
            © {new Date().getFullYear()} Nullscience. Todos os direitos reservados.
          </span>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-[11px] text-muted/30 hover:text-accent/60 transition-colors duration-300 font-mono"
            >
              Privacidade
            </a>
            <a
              href="#"
              className="text-[11px] text-muted/30 hover:text-accent/60 transition-colors duration-300 font-mono"
            >
              Termos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
