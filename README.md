# Documentación

Todos los elementos están divididos en componentes.

La estructura del proyecto es:

- components: componentes que son usados en toda la app. Todos estos renderizan HTML.
- data: información estatica del proyecto
- pages: todo archivo dentro de pages mapea a una ruta, por ejemplo, si tenemos un archivo llamado "resultados.tsx", tendremos también una ruta "/resultados" que renderizará lo que exista en "resultados.tsx"
- server/api/routers: routers que actuan como el backend del proyecto

## 1. Gráficas
Origen: "pages/resultados.tsx"

## 2. Cálculos de la sección de Resultados

Lo relacionado a las fases se cuentra en "server/api/routers/project.ts" en el método "getAll"

Lo relacionado al resto, se encuentra en "pages/resultados.tsx"