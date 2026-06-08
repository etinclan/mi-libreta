# CLAUDE.md — Mi Libreta (repo)

Contexto técnico del repo para Claude Code. Refleja el estado real del código a mayo 2026.
Para contexto editorial y de marca, leer `/Desktop/Proyectos IA/Mi libreta/CLAUDE.md`.

---

## Stack

- **Astro v6.3.3** + MDX (`@astrojs/mdx`) + GitHub (`etinclan/mi-libreta`) + Vercel
- Contenido en `src/content/notas/` (colección `notas`) y `src/content/ensayos/` (colección `ensayos`, carpeta vacía — no rompe)
- Deploy automático desde `main` → Vercel → `eduardotoledo.com` (pendiente migración)
- Node ≥ 22.12.0

---

## Sistema de diseño — ETCOM v1.1 «El Manuscrito Iluminado»

### Fuentes (Google Fonts, cargadas en `Base.astro`)
| Token | Fuente | Uso |
|---|---|---|
| `--font-serif-display` | **Fraunces** (variable opsz 9–144) | Títulos, `<h1>`, `<h2>`, citas grandes, palabra-eje italic |
| `--font-serif-text` | **Newsreader** (variable opsz 6–72) | Cuerpo, párrafos, extractos |
| `--font-sans` | **JetBrains Mono** | Nav, antetítulos, labels, tags, footer, metadatos |

- Pesos permitidos: 400 y 500. El 600 solo en capitulares (`drop-cap`).
- Fraunces siempre con `font-variation-settings: 'SOFT' 30, 'WONK' 1` cuando se aplique.
- JetBrains Mono siempre en `text-transform: uppercase`, `letter-spacing: 0.18em`, peso 400.
- Italic en titulares = firma visual de la marca (palabra-eje, subtítulos).

### Paleta — Lapislázuli Pigmento
| Token CSS | Valor | Uso |
|---|---|---|
| `--etcom-lapis` / `--color-accent` | `#26358C` | Superficie dominante, hover nav |
| `--etcom-lapis-vivo` / `--etcom-coral` | `#3445A8` | CTAs, palabras-eje, botones, links activos |
| `--etcom-lapis-noche` / `--color-text` / `--color-text-bright` | `#0F1340` | Texto principal, titulares |
| `--etcom-oro` / `--color-border` | `#D4B976` | Ribetes, separadores, bordes estructurales |
| `--etcom-oro-suave` | `#E5D4A3` | Hover cards, divisiones sutiles |
| `--etcom-vitela` / `--color-bg` / `--etcom-cream` | `#F2EDDC` | Fondo principal (pergamino) |
| `--etcom-vitela-claro` | `#FAF6E8` | Superficies elevadas, dropdown, cards claras |
| `--etcom-humo` / `--color-text-dim` / `--etcom-smoke` | `#6E6F75` | Captions, metadatos, nav en reposo, footer |
| `--etcom-humo-claro` | `#B5B5BA` | Bordes sutiles |
| `--etcom-mint` | `#D4B976` | Alias del oro — antetítulos, marcadores de sección |
| `--etcom-midnight` | `#26358C` | Alias del lapis |

> ⚠️ El oro **nunca** es texto corrido. Solo ribetes, números destacados y separadores.
> El fondo es siempre vitela (`#F2EDDC`), nunca blanco.

### Escala tipográfica fluida
8 pasos desde 320px hasta 1200px:
`--font-size-xs` → `--font-size-sm` → `--font-size-base` → `--font-size-md` → `--font-size-lg` → `--font-size-xl` → `--font-size-2xl` → `--font-size-3xl`

---

## Colecciones de contenido (`src/content.config.ts`)

```ts
// notas
{ title: string, date: Date, stage: 'intuicion' | 'emergente' | 'maduro', tags?: string[] }

// ensayos
{ title: string, date: Date, stage: 'intuicion' | 'emergente' | 'maduro', tags?: string[], description?: string }
```

> Los stages son `intuicion / emergente / maduro` — no "borrador/ensayo".

---

## Páginas existentes

| Ruta | Archivo | Estado |
|---|---|---|
| `/` | `src/pages/index.astro` | Home — copy parcialmente en placeholders |
| `/jardin` | `src/pages/jardin.astro` | Funcional, lee `notas` dinámicamente |
| `/notas/[id]` | `src/pages/notas/[id].astro` | Funcional con 8 componentes MDX |
| `/el-nuevo-juego` | `src/pages/el-nuevo-juego.astro` | Página hub con dropdown a Personas y Organizaciones |
| `/personas` | `src/pages/personas.astro` | Copy real (antes `/profesionales`) |
| `/organizaciones` | `src/pages/organizaciones.astro` | Copy real, datos ⚠️ ilustrativos, Formspree pendiente |
| `/newsletter` | `src/pages/newsletter.astro` | Copy real, URLs de ediciones individuales pendientes |
| `/sobre` | `src/pages/sobre.astro` | Copy real, sección "Un poco de historia" placeholder |
| `/ahora` | `src/pages/ahora.astro` | Todo en placeholders |
| `/colofon` | `src/pages/colofon.astro` | Completa |
| `/privacidad` | `src/pages/privacidad.astro` | Completa (layout sin nav) |
| `/aviso-legal` | `src/pages/aviso-legal.astro` | Completa (layout sin nav) |

### Nav (definida en `Base.astro`)
```
Logo | La Libreta | Newsletter | El nuevo juego ▾ | Ahora | Sobre mí
                                   └ Personas
                                   └ Organizaciones
```

---

## Componentes MDX (`src/components/mdx/`)

Registrados en `notas/[id].astro` via `<Content components={{...}} />`:

| Componente | Uso |
|---|---|
| `EstadoBadge` | Píldora de stage (intuicion / emergente / maduro) |
| `MetaEntrada` | Línea contextual completa (fecha, stage, ámbito) |
| `Audiencia` | Caja "Asumo que…" con borde lapis |
| `Duda` | Caja "Lo que no tengo claro" con borde oro |
| `NotaAlMargen` | Lateral en desktop, inline en mobile |
| `Cita` | Blockquote con atribución estructurada |
| `EntradaRelacionada` | Card con datos auto-cargados por `id` |
| `Territorios` | Badges con enlace a /jardin |

Referencia de uso: `src/content/cuaderno/_ejemplos.mdx`

### Componente compartido
- `src/components/Antetitulo.astro` — antetítulo con marcador oro. Usar en páginas interiores.

---

## Notas publicadas

- `src/content/notas/agencia-humana-ia.mdx` — única nota real publicada

---

## Datos de contacto (usar en páginas)

- Email: `edutoledo@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/eduardotoledoinclan/`
- Twitter/X: `https://x.com/eduardotoledo`
- Substack: `https://eduardotoledo.substack.com`
- Formspree: ID pendiente — sustituir `[FORMSPREE_ID]` en `/organizaciones`

---

## Pendiente crítico (bloquea lanzamiento)

1. **Formspree ID real** en `/organizaciones`
2. **Datos ilustrativos ⚠️** en `/organizaciones` — fact-bar, 3 casos, apariciones, precios FAQ
3. **Datos ilustrativos ⚠️** en `/personas` — casos, fechas de cohortes, precio

## Pendiente copy

- `/` — hero, territorios intro, libreta título, newsletter, trabajo (varios placeholders)
- `/sobre` — sección "Un poco de historia"
- `/ahora` — trabajando en, aprendiendo, viviendo, no haciendo
- URLs individuales de ediciones de newsletter (actualmente apuntan a home de Substack)

## Pendiente técnico

- Plugin `@astrojs/sitemap` — robots.txt referencia sitemap.xml pero no se genera
- Actualizar `public/llms.txt` con la estructura de nav actual (`/el-nuevo-juego`, `/personas`)
- Rutas de territorio `/jardin/[territorio]` — los enlaces de Territorios apuntan a `/jardin` por ahora
- Migrar de `mi-libreta.vercel.app` a `eduardotoledo.com` y actualizar URLs en llms.txt y robots.txt
- Añadir `description` al schema de `notas` (ahora solo en `ensayos`)

## Pendiente contenido jardín

- Nota `reshuffle.mdx` — marco de anticipación estratégica
- Nota `cuatro-posturas.mdx` — las cuatro posturas ante la IA
- Nota `cuatro-mecanicas.mdx` — las cuatro mecánicas de reinvención
- Al menos una nota por cada uno de los seis ámbitos
