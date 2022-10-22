<h1>Web de administradores</h1>

## Indice de informacion
1. **Instalacion de dependencias**
2. **Propósito del servicio de administradores**
3. **Datalles de implementación**

### Tecnologías utilizadas.

- ReactJS (Framework para construir Single Page Application)
- Axios (Cliente HTTP)
- React Hook Form (Validación de formularios)
- MUI (Material Design)
- Eslint (Linter javascript)
- Firebase (Login)

### Instalación del entorno

Pasos para levantar el frontend local una vez clonado el repositorio.

Instalar dependencias.
```bash
npm install
```
Levantar frontend por defecto en el puerto 3000.
```bash
npm start
```

Ejecutar linter a traves de script.

```bash
npm run eslint
```

### Propósito de la web de administradores
---
El proposito de la web de administradores es proveer a los mismos la funcionalidades de gestión de los usuarios de la aplicación, tanto pasajeros como conductores. A su vez, también se tiene la posibilidad de registrar otros administradores.

Las funcionalidades implementadas hasta el momento son:

- Login.
- Visualización y edición de perfil.
- Registrar otro administrador.
- Visualizar perfil de usuarios de la aplicación.
