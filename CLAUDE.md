# Mi Libreta — Contexto de proyecto para Claude Code

## Stack
- **Astro v6.3.3** + MDX (`@astrojs/mdx`) + Vercel + GitHub (`etinclan/mi-libreta`)
- Contenido en `src/content/notas/` (colección `notas`, glob `**/*.mdx`)
- Colección `ensayos` registrada pero vacía — no rompe, maneja el warning con `.catch(() => [])`
- Deploy automático desde `main` → Vercel → `eduardotoledo.com`

## Sistema de diseño
- **Fuentes:** DM Serif Display (títulos) · Cormorant Garamond (cuerpo texto) · Lato (sans UI)
- **Google Fonts link:** `Cormorant:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500` + `Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500` + `Lato:wght@300;400;700`
- **Paleta dark:** bg `#1C1B18` · text `#C2BFB2` · text-dim `#7A7773` · text-bright `#E8E5DF` · border `#2A2927` · accent `#E85AAB`
- **Paleta ETCOM (tokens globales en `:root`):** `--etcom-coral #FF8F6B` · `--etcom-mint #5EECC5` · `--etcom-midnight #0D1B2E` · `--etcom-cream #F5EFE6` · `--etcom-smoke #6B6560`
- **Tipografía fluida:** escala de 8 tamaños `--font-size-xs` → `--font-size-3xl`, mismos rangos que Maggie Appleton
- **Line-height:** 2 (200%) en cuerpo · max-width 72ch en columnas de lectura
- **No usar:** DM Serif Text (reemplazada), ni cambiar paleta dark

## Páginas existentes
| Ruta | Archivo | Estado |
|---|---|---|
| `/` | `src/pages/index.astro` | Estructura lista, copy en placeholders |
| `/jardin` | `src/pages/jardin.astro` | Funcional, lee `notas` dinámicamente |
| `/notas/[id]` | `src/pages/notas/[id].astro` | Funcional con 8 componentes MDX registrados |
| `/estudio` | `src/pages/estudio.astro` | Copy real |
| `/estudio/asomarse` | `src/pages/estudio/asomarse.astro` | Estructura lista, copy en placeholders |
| `/estudio/reinventarse` | `src/pages/estudio/reinventarse.astro` | Copy real, precio y fechas ilustrativas |
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
