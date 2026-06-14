# 📒 Notas y Comandos — Orange True Solution

> Archivo de referencia con los comandos importantes del proyecto y **el porqué** de cada uno.
> Este archivo NO se publica en el sitio web (solo se publica la carpeta `project/`).

---

## 🌐 Enlaces importantes

| Qué | Enlace |
|-----|--------|
| Sitio en vivo | https://orange-true-solution.netlify.app |
| Panel de Netlify | https://app.netlify.com/projects/orange-true-solution |
| Repositorio GitHub | https://github.com/GabrielCont95/Orange-True-Solution-Website |
| Activar formulario (FormSubmit) | https://formsubmit.co/info@orangetruesolution.com |

**Carpeta del proyecto en la PC:**
`C:\Users\Edler Contreras\Desktop\Orange True Solution Web\orange-true-solution`

---

## 🔄 Flujo para publicar cambios (lo más importante)

GitHub y Netlify **ya están conectados** (deploy automático). Solo hay que subir a GitHub
y Netlify publica el sitio solo. Ya NO se usa `netlify deploy`.

```powershell
# 1. Guardar los cambios en el historial local de Git
git add .
git commit -m "Descripción corta de lo que cambió"

# 2. Subir los cambios a GitHub  →  Netlify publica solo 🪄
git push
```

**Por qué cada paso:**
- `git add .` → marca TODOS los archivos modificados para guardarlos. *(El punto significa "todo".)*
- `git commit -m "..."` → guarda una "foto" de los cambios en tu PC con una nota de qué cambió. **Aún NO sube nada a internet.**
- `git push` → sube esa foto a GitHub. **Netlify detecta el push automáticamente y reconstruye el sitio** (tarda ~30 seg – 1 min). No hay que ejecutar nada más.

> ⚠️ Como el deploy es automático por GitHub, **NO mezclar** con `netlify deploy` manual.
> El sitio real siempre refleja lo último que está en la rama `main` de GitHub.

---

## 🐙 Git y GitHub

```powershell
# Ver qué archivos cambiaron y el estado actual
git status

# Ver el historial de cambios (cada commit)
git log --oneline

# Ver a qué repositorio de GitHub está conectado
git remote -v
```

**Por qué:**
- `git status` → te dice qué archivos modificaste pero aún no guardaste. Úsalo siempre antes de hacer commit.
- `git log --oneline` → lista resumida de todos los commits (cambios guardados).
- `git remote -v` → confirma que apunta a `GabrielCont95/Orange-True-Solution-Website`.

### GitHub CLI (`gh`) — crear repos nuevos sin abrir el navegador

```powershell
# Crear un repo NUEVO, conectarlo y subir todo en un solo paso
gh repo create NOMBRE-DEL-REPO --public --source="." --remote=origin --push

# Ver tu sesión de GitHub
gh auth status
```

**Por qué:**
- `gh repo create` → crea el repositorio en GitHub directamente desde la terminal.
  - `--public` → repo público (usa `--private` si lo quieres privado).
  - `--source="."` → usa la carpeta actual como contenido.
  - `--remote=origin` → lo conecta automáticamente.
  - `--push` → sube todo de inmediato.

---

## ☁️ Netlify

El deploy es **automático vía GitHub**, así que normalmente NO necesitas comandos de Netlify.
Estos son útiles solo para revisar el estado:

```powershell
# Ver la cuenta y el sitio conectado
netlify status

# Abrir el panel del sitio en el navegador
netlify open
```

**Configuración del deploy automático (ya hecha, solo de referencia):**
- Proveedor: GitHub → repo `GabrielCont95/Orange-True-Solution-Website`, rama `main`
- Publish directory: `project`  ·  Build command: *(vacío)*
- Cada `git push` a `main` dispara una nueva publicación automática.

---

## ⚠️ Recordatorios

- **FormSubmit:** El formulario de contacto no envía correos hasta que se confirme el email visitando https://formsubmit.co/info@orangetruesolution.com una vez.
- **La carpeta que se publica es `project/`**, no la raíz. Cualquier archivo fuera de `project/` (como este `NOTAS.md`) NO aparece en el sitio web.

---

## 📝 Mis notas personales
> Aquí se van agregando notas con el tiempo. Para guardar una nueva, dile a Claude:
> **"Agrega a mis notas: ..."** y la escribirá aquí abajo con su explicación.

<!-- NUEVAS-NOTAS-AQUI -->

_(Aún no hay notas personales — agrega la primera cuando quieras.)_
