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
| **Backend (estadísticas + email)** | Conectado a Supabase. Ver sección **Backend** más abajo. Las claves (`SUPABASE_URL`, `SUPABASE_ANON_KEY`) están en el `<script>` de `index.html`; la anon key es pública por diseño. |
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

## Backend (Supabase): estadísticas y email

La app está conectada a un proyecto Supabase dedicado:

- **Proyecto:** `ai-culture-quiz` · ref `fyjdtpmabbggctvddomn` · región `eu-west-3` (Paris).
- **Panel:** https://supabase.com/dashboard/project/fyjdtpmabbggctvddomn

### 1. Estadísticas (ya funciona, sin configurar nada)

Cada vez que alguien **termina** el quiz, el cliente guarda una fila **anónima** (sin email)
en la tabla `quiz_responses`: cultura resultante, modo de desempate, puntuación y las 10
respuestas. El RLS solo permite *insertar* con la anon key; nadie puede *leer* con ella.

Para ver los porcentajes, abre el **SQL Editor** del proyecto y consulta las vistas:

```sql
select * from v_culture_distribution;  -- % de cada cultura como resultado final
select * from v_answer_distribution;   -- % de cada opción (A/B/C/D) por pregunta
select * from v_summary;               -- totales y reparto por tipo de desempate
```

(Estas vistas solo son legibles con el rol de servicio / SQL Editor, no públicamente.)

### 2. Email con la ficha (requiere un paso tuyo: proveedor de envío)

Al dejar el email en el resultado, el cliente llama a la Edge Function **`enviar-ficha`**, que:
1. guarda el lead en la tabla `email_leads` (con su cultura y si marcó la newsletter), y
2. envía un correo HTML con la **ficha completa** de su cultura + un botón **“Suscríbete a la
   newsletter”** (a tu Substack).

**El paso 2 solo se dispara si configuras un proveedor de email (Resend).** Hasta entonces, el
lead se guarda igualmente y el formulario muestra el “gracias” (no se pierde nada).

Para activar el envío real:

1. Crea una cuenta en [Resend](https://resend.com) y **verifica tu dominio** `eduardotoledo.com`
   (añadir los registros DNS de DKIM/SPF que te indica Resend). Sin dominio verificado, Resend
   solo deja enviar a tu propio email.
2. En el panel de Supabase → *Edge Functions* → *Manage secrets*, añade:
   - `RESEND_API_KEY` = tu API key de Resend.
   - `EMAIL_FROM` = `AI Culture Quiz <hola@eduardotoledo.com>` (un remitente de tu dominio verificado).
   - *(opcional)* `NEWSLETTER_URL` (por defecto `https://eduardotoledo.substack.com`) y
     `QUIZ_URL` (por defecto `https://eduardotoledo.com/culturas-ia/`).
3. Listo. No hay que redeployar: la función lee los secrets en caliente.

> Privacidad: los emails se guardan en `email_leads`. Es PII — informa en tu aviso de privacidad
> y respeta el consentimiento (el quiz funciona sin dejar email).

### Si quieres apagar el backend
Pon `SUPABASE_URL = ""` en `index.html`: la app vuelve a ser 100% estática (sin estadísticas
ni email), sin romperse.

---

## Notas

- Funciona también abriendo `index.html` directamente en el navegador (todo es cliente).
- Sin dependencias externas salvo Google Fonts (Fraunces + Inter). Si quieres 100% offline,
  descarga las fuentes y cámbialas por `@font-face` locales.
- La imagen del moodboard es referencia visual: si la imagen final tuviera derechos de terceros,
  sustitúyela por una propia antes de publicar.
