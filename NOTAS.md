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

Cada vez que se cambia el código, hay que hacer **dos cosas**: subirlo a GitHub y publicarlo en Netlify.

```powershell
# 1. Guardar los cambios en el historial local de Git
git add .
git commit -m "Descripción corta de lo que cambió"

# 2. Subir los cambios a GitHub (respaldo + control de versiones)
git push

# 3. Publicar el sitio en vivo en Netlify
netlify deploy --dir=project --prod
```

**Por qué cada paso:**
- `git add .` → marca TODOS los archivos modificados para guardarlos. *(El punto significa "todo".)*
- `git commit -m "..."` → guarda una "foto" de los cambios en tu PC con una nota de qué cambió. **Aún NO sube nada a internet.**
- `git push` → ahora sí, sube esa foto a GitHub (la nube). Esto es tu respaldo.
- `netlify deploy --dir=project --prod` → toma la carpeta `project` y la publica en el sitio en vivo. `--prod` significa "producción" (el sitio real, no una prueba).

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

```powershell
# Ver la cuenta y el sitio conectado
netlify status

# Abrir el panel del sitio en el navegador
netlify open

# Publicar a producción (el sitio en vivo)
netlify deploy --dir=project --prod

# Publicar una PRUEBA (genera un link temporal, NO afecta el sitio real)
netlify deploy --dir=project
```

**Por qué:**
- `--dir=project` → le dice a Netlify que publique la carpeta `project` (ahí están el HTML, CSS, JS, media). **Siempre incluir esto.**
- `--prod` → publica al sitio real. **Sin** `--prod` genera solo un link de prueba para revisar antes de publicar de verdad.

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
