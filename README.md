# Matriz-Contrato

Sistema de Control de Contratos - Una aplicación web para gestionar y controlar contratos de manera eficiente.

## Características

- ✅ **Gestión completa de contratos**: Crear, editar, eliminar y visualizar contratos
- ✅ **Interfaz intuitiva**: Diseño moderno y responsivo
- ✅ **Búsqueda en tiempo real**: Filtrado instantáneo de contratos
- ✅ **Validación de datos**: Prevención de duplicados y validación de fechas
- ✅ **Estados de contrato**: Activo, Pendiente, Finalizado, Cancelado
- ✅ **Persistencia local**: Los datos se guardan en localStorage del navegador
- ✅ **Responsive**: Compatible con dispositivos móviles y escritorio

## Campos de Contrato

Cada contrato incluye la siguiente información:

- **Número de Contrato**: Identificador único
- **Cliente**: Nombre de la empresa o persona
- **Descripción**: Detalle del trabajo o servicio
- **Fecha de Inicio**: Fecha de comienzo del contrato
- **Fecha de Fin**: Fecha de finalización del contrato
- **Monto**: Valor económico del contrato
- **Estado**: Estado actual (Activo, Pendiente, Finalizado, Cancelado)

## Cómo usar

1. **Abrir la aplicación**: Abra `index.html` en su navegador web
2. **Agregar contrato**: Haga clic en "Nuevo Contrato" y complete el formulario
3. **Buscar contratos**: Use la caja de búsqueda para filtrar contratos
4. **Editar contrato**: Haga clic en el botón "Editar" en la fila del contrato
5. **Eliminar contrato**: Haga clic en el botón "Eliminar" (se pedirá confirmación)

## Instalación

### Opción 1: Servidor HTTP simple
```bash
# En el directorio del proyecto
python3 -m http.server 8000
# Luego visite http://localhost:8000
```

### Opción 2: Abrir directamente
Simplemente abra el archivo `index.html` en su navegador web.

## Estructura del Proyecto

```
Matriz-Contrato/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
└── README.md           # Documentación
```

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con gradientes y animaciones
- **JavaScript ES6+**: Funcionalidad interactiva
- **LocalStorage**: Persistencia de datos en el navegador

## Validaciones Implementadas

- Números de contrato únicos
- Fechas válidas (fin debe ser posterior al inicio)
- Montos positivos
- Campos obligatorios

## Capturas de Pantalla

### Pantalla Principal
![Pantalla Principal](https://github.com/user-attachments/assets/5f12c371-2e87-403e-8a7b-41a9468db671)

### Contratos Registrados
![Contratos en la Tabla](https://github.com/user-attachments/assets/46547287-c83e-41bf-8eae-8ff92f79d673)

## Contribuir

1. Fork el proyecto
2. Cree una rama para su característica (`git checkout -b feature/nueva-caracteristica`)
3. Commit sus cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Cree un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.