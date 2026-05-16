# La Libreta — Contexto de proyecto para Claude Code

## Stack
- **Astro v6.3.3** + MDX (`@astrojs/mdx`) + Vercel + GitHub (`etinclan/mi-libreta`)
- Contenido en `src/content/notas/` (colección `notas`, glob `**/*.mdx`)
- Colección `ensayos` registrada pero vacía — no rompe, maneja el warning con `.catch(() => [])`
- Deploy automático desde `main` → Vercel → `eduardotoledo.com`

## Sistema de diseño

### Fuentes
- **DM Serif Display** — títulos `<h1>`, wordmark, cards destacadas. Siempre `font-weight: 400`.
- **Cormorant Garamond** — cuerpo de texto, párrafos, subtítulos. `line-height: 2` en prosa.
- **Lato** — UI sans: antetítulos, ladillos `<h2>`, etiquetas, metadatos, botones.

### Paleta dark (base del sitio — no modificar)
| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#1C1B18` | Fondo de página |
| `--color-text` | `#C2BFB2` | Texto de cuerpo |
| `--color-text-dim` | `#7A7773` | Texto secundario / metadatos |
| `--color-text-bright` | `#E8E5DF` | Títulos y elementos destacados |
| `--color-border` | `#2A2927` | Bordes y separadores |
| `--color-accent` | `#E85AAB` | Acento legacy (no usar en nuevos elementos) |

### Paleta ETCOM (tokens globales en `:root`)
| Token | Valor | Uso |
|---|---|---|
| `--etcom-coral` / `--coral` | `#FF8F6B` | CTAs, badges, puntos de lista, énfasis |
| `--etcom-mint` / `--mint` | `#5EECC5` | Antetítulos, marcadores de sección |
| `--etcom-cream` | `#F5EFE6` | Fondos de bloque destacado (ej: suscripción) |
| `--etcom-smoke` | `#6B6560` | Subtítulos itálicos, texto terciario |
| `--etcom-midnight` | `#0D1B2E` | Uso esporádico en fondos de contraste |

### Tipografía fluida
Escala de 8 pasos (`--font-size-xs` → `--font-size-3xl`), mismos rangos que Maggie Appleton.

### Normas de estilo por elemento
| Elemento | Fuente | Tamaño | Estilo | Color |
|---|---|---|---|---|
| `<h1>` de página | DM Serif Display | `--font-size-2xl` | normal | `--color-text-bright` |
| Hero home `<h1>` | DM Serif Display | `--font-size-2xl` | normal | `--color-text-bright` |
| Subtítulo tras `<h1>` | Cormorant Garamond | `--font-size-md` | **italic** | `#A8A5A0` |
| `<h2>` ladillo de sección | Lato | `--font-size-xs` | uppercase, `letter-spacing: 0.12em` | `--color-text-bright` |
| Antetítulo de sección | Lato | `--font-size-xs` | uppercase, `letter-spacing: 0.1em` | `--etcom-mint` |
| Marcador de antetítulo | — | 24×2 px | barra horizontal | `--etcom-mint` |
| Cuerpo de texto | Cormorant Garamond | `--font-size-base` | normal | `--color-text` |
| Metadatos / fechas | Lato | `--font-size-xs` | `font-weight: 300` | `--color-text-dim` |
| Enlace coral (CTA texto) | Lato | `--font-size-xs/sm` | `font-weight: 300` | `--etcom-coral` |
| Botón coral primario | Lato | `--font-size-base` | `font-weight: 700` | bg `--etcom-coral`, texto `#fff` |

### Componente compartido
- `src/components/Antetitulo.astro` — antetítulo con marcador mint. Usar en todas las páginas excepto home (que gestiona sus propios antetítulos inline).

### No usar
- DM Serif Text (fuente eliminada del proyecto)
- `--color-accent` (`#E85AAB`) en nuevos elementos
- `--font-size-3xl` en `<h1>` de páginas interiores (reservado solo si se aprueba explícitamente)

## Páginas existentes
| Ruta | Archivo | Estado |
|---|---|---|
| `/` | `src/pages/index.astro` | Sección libreta rediseñada (dos columnas asimétricas); copy parcial en placeholders |
| `/jardin` | `src/pages/jardin.astro` | Funcional, lee `notas` dinámicamente |
| `/notas/[id]` | `src/pages/notas/[id].astro` | Funcional con 8 componentes MDX registrados |
| `/profesionales` | `src/pages/profesionales.astro` | Copy real (antes `/estudio`) |
| `/profesionales/asomarse` | `src/pages/profesionales/asomarse.astro` | Estructura lista, copy en placeholders |
| `/profesionales/reinventarse` | `src/pages/profesionales/reinventarse.astro` | Copy real, precio y fechas ilustrativas |
| `/organizaciones` | `src/pages/organizaciones.astro` | Copy real, datos ⚠️ ilustrativos, Formspree ID pendiente |
| `/newsletter` | `src/pages/newsletter.astro` | Copy real, URLs de ediciones individuales pendientes |
| `/sobre` | `src/pages/sobre.astro` | Copy real, "Un poco de historia" placeholder |
| `/ahora` | `src/pages/ahora.astro` | Todo en placeholders |
| `/colofon` | `src/pages/colofon.astro` | Completa |
| `/privacidad` | `src/pages/privacidad.astro` | Completa (layout propio sin nav) |
| `/aviso-legal` | `src/pages/aviso-legal.astro` | Completa (layout propio sin nav) |

## Componentes MDX globales
En `src/components/mdx/` — registrados en `[id].astro` via `<Content components={{...}} />`:
- `EstadoBadge` — pildorita de estadio (intuicion/borrador/ensayo)
- `MetaEntrada` — línea contextual completa
- `Audiencia` — caja "Asumo que…" borde coral
- `Duda` — caja "Lo que no tengo claro" borde mint
- `NotaAlMargen` — lateral en desktop, inline en mobile
- `Cita` — blockquote con atribución
- `EntradaRelacionada` — card con datos auto-cargados por `id`
- `Territorios` — badges con enlace a /jardin

Referencia de uso: `src/content/cuaderno/_ejemplos.mdx`

## Notas de contenido existentes
- `src/content/notas/agencia-humana-ia.mdx` — única nota real publicada

## Datos de contacto
- Email: `edutoledo@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/eduardotoledoinclan/`
- Twitter/X: `https://x.com/eduardotoledo`
- Substack: `https://eduardotoledo.substack.com`

## Pendiente crítico (bloquea lanzamiento)
1. **Formspree ID** en `/organizaciones` — sustituir `[FORMSPREE_ID]` por el real
2. **Datos ilustrativos en `/organizaciones`** — fact-bar, 3 casos, 8 apariciones, precios FAQ
3. **Datos ilustrativos en `/estudio/reinventarse`** — 3 casos, fechas de cohortes, precio

## Pendiente copy
- **`/`** — hero, territorios intro, libreta título, newsletter, trabajo (7 placeholders)
- **`/estudio/asomarse`** — todo el copy (subtítulo, manifiesto, para quién, 4 momentos, 3 formatos, CTA)
- **`/sobre`** — sección "Un poco de historia"
- **`/ahora`** — trabajando en, aprendiendo, viviendo, no haciendo

## Pendiente contenido jardín
- Nota `reshufle.mdx` — marco de anticipación estratégica
- Nota `cuatro-posturas.mdx` — las cuatro posturas ante la IA
- Nota `cuatro-mecanicas.mdx` — las cuatro mecánicas de reinvención
- Añadir campo `description` a notas existentes (usado en index y cards)

## Pendiente técnico
- Plugin `@astrojs/sitemap` — robots.txt ya referencia sitemap.xml pero no se genera
- Actualizar `public/llms.txt` — falta `/estudio` en la estructura del sitio
- Rutas de territorio `/jardin/[territorio]` — los enlaces de territorios apuntan a `/jardin` por ahora
- URLs individuales de ediciones de newsletter (actualmente todas apuntan a la home de Substack)
- Añadir `description` al schema de `notas` en `content.config.ts` (ahora opcional)
