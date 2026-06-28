# MEDICORE - Prototipo de Vistas

Proyecto web estático para mostrar los hitos 4 al 7 de un sistema de gestión clínica:

- Hito 4: Atención Médica funcional.
- Hito 5: Farmacia e Inventario operativo.
- Hito 6: Caja y Facturación funcional.
- Hito 7: Dashboards, reportes y seguridad JWT.

## Estructura

- `index.html`: página web pública de presentación.
- `admin.html`: login y panel administrativo con pantallas de casos de uso.
- `paciente.html`: portal web del paciente.
- `assets/css/styles.css`: estilos compartidos.
- `assets/js`: lógica compartida, página pública y administrativo.
- `portal-web-paciente`: código del portal paciente.
- `gestion-citas-agenda`: vistas y datos de citas/agenda.
- `historia-clinica-recetas`: vistas y datos de historia clínica/recetas.
- `farmacia-inventario`: vistas y datos de farmacia/inventario.
- `caja-facturacion`: vistas y datos de caja/facturación.
- `dashboards-reportes`: vistas y datos de dashboards/reportes.
- `seguridad-usuarios`: vistas y datos de seguridad/usuarios.

## Ejecutar

Abre `index.html` directamente en el navegador o sirve la carpeta con cualquier servidor estático.

No requiere backend, base de datos ni instalación de dependencias.

Entradas principales:

- `index.html`: portal público.
- `paciente.html`: portal web del paciente.
- `admin.html`: panel administrativo.
