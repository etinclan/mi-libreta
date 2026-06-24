# AI Culture Quiz · ¿Qué cultura de IA tiene tu organización?

Mini-app estática y autocontenida (un solo `index.html`, sin build ni backend) basada en las
cuatro culturas de IA de *Infinite* (Brian Solis & Dave Wright): **AI Follower · AI Forward ·
AI First · AI Native**.

Diseño según el moodboard **«Explorer + Sage · Paleta disruptiva»** (mora profunda, rojo energía,
lima eléctrica, lavanda mineral) con tipografía Fraunces + Inter.

---

## Cómo desplegar en `eduardotoledo.com/culturas-ia/`

Es HTML/CSS/JS plano: no necesita Node, ni compilación, ni servidor especial.

### Opción A — Subir la carpeta (recomendada)
1. Copia esta carpeta `culturas-ia/` completa.
2. Súbela por FTP / SFTP / gestor de archivos de tu hosting a la **raíz pública** de
   `eduardotoledo.com` (junto al WordPress), de forma que quede en `/culturas-ia/`.
3. Listo: queda servida en `https://eduardotoledo.com/culturas-ia/`.
   - WordPress no interfiere: al ser una carpeta física con su `index.html`, el servidor la
     sirve directamente antes de pasar por WordPress.
   - Si usas un permalink de WordPress que choca, asegúrate de que no exista una página/entrada
     con el slug `culturas-ia`.

### Opción B — Incrustar dentro de una página de WordPress
Crea una página y embebe la app con un iframe a tamaño completo:

```html
<iframe src="/culturas-ia/" title="AI Culture Quiz"
        style="width:100%;height:100vh;border:0" loading="lazy"></iframe>
```

### Opción C — Plugin de HTML estático
Con un plugin tipo *“Insert HTML Snippet”* o un bloque HTML, puedes pegar el contenido,
aunque la Opción A es más limpia y mantiene el SEO/Open Graph propio.

---

## Personalización rápida

| Qué | Dónde |
|---|---|
| **Imagen del hero** | En `index.html`, busca `HERO VISUAL`. Hay un SVG de montañas como placeholder. Sustitúyelo por `<img src="hero.jpg" alt="Diagnóstico de cultura de IA">` y coloca `hero.jpg` en esta carpeta. |
| **Imagen para compartir (Open Graph)** | Añade `og.png` (1200×630) en esta carpeta. Ya está referenciada en las metaetiquetas. |
| **Captura de email real** | En `index.html`, define `FORMSPREE_ENDPOINT` con tu endpoint de [Formspree](https://formspree.io). Si lo dejas vacío, el formulario solo muestra el agradecimiento (no envía). |
| **Analítica** | Hay una función `track()` que empuja eventos a `window.dataLayer` (GTM) si existe. Sin GTM no hace nada. Eventos: `quiz_started`, `question_answered`, `quiz_completed`, `result_viewed`, `email_submitted`, `share_clicked`, `restart_clicked`. |
| **Preguntas y resultados** | Objeto `QUIZ_DATA` al inicio del `<script>` (sigue el modelo de datos del PRD). |
| **Dominio en enlaces de compartir / canonical** | Buscar `eduardotoledo.com/culturas-ia/` en `index.html`. |

---

## Lógica de puntuación (resumen)

Cada respuesta suma 1 punto: **A → Follower · B → Forward · C → First · D → Native**.
Gana la cultura con más puntos. Desempates:

- **Dos culturas adyacentes** → muestra la más avanzada con la etiqueta *“En transición desde…”*.
- **Dos culturas no adyacentes** → resultado *“Cultura híbrida”* (revisar contradicciones internas).
- **Tres o cuatro empatadas** → *“Sin cultura dominante: conviven varias lógicas a la vez.”*

---

## Notas

- Funciona también abriendo `index.html` directamente en el navegador (todo es cliente).
- Sin dependencias externas salvo Google Fonts (Fraunces + Inter). Si quieres 100% offline,
  descarga las fuentes y cámbialas por `@font-face` locales.
- La imagen del moodboard es referencia visual: si la imagen final tuviera derechos de terceros,
  sustitúyela por una propia antes de publicar.
