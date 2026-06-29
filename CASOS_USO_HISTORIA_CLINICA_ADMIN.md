# Casos de uso - Modulo Historia Clinica Administrativo

## Alcance del documento

Este documento describe los casos de uso presentes en el modulo **Historia Clinica** dentro del panel administrativo de MEDICORE. La informacion fue levantada desde la pantalla `admin.html`, el registro del modulo en `historia-clinica-recetas/historia-recetas.js` y el renderizado funcional en `assets/js/admin.js`.

El modulo administrativo agrupa 7 vistas principales:

- Panel clinico
- Triaje y signos
- Consulta medica
- Ordenes
- Recetas
- Documentos
- Auditoria

Ademas, la pantalla contiene acciones transversales que aparecen en varias vistas: busqueda de paciente, seleccion de paciente, creacion de nueva historia clinica, firma de atencion, cierre de atencion, programacion de cita, impresion de receta y envio de receta a farmacia.

## Acceso al modulo para capturas

1. Abrir `admin.html` en el navegador.
2. Iniciar sesion con los datos de prueba:
   - Usuario: `admin.clinica`
   - Rol sugerido: `Administrador`
   - Contrasena: `123456789`
3. En el menu lateral, abrir el grupo **Historia Clinica**.
4. Seleccionar la vista que corresponda al caso de uso.

### Captura base recomendada

Tomar una captura inicial del panel administrativo con:

- Menu lateral abierto en **Historia Clinica**.
- Barra superior visible.
- Vista **Panel clinico** seleccionada.
- Tablero de pacientes visible.

Esta captura sirve como evidencia de acceso al modulo y contexto general.

---

## UC-HCE-01 - Consultar panel clinico del paciente

**Vista administrativa:** Historia Clinica > Panel clinico  
**Pestana interna:** Resumen  
**Actor principal:** Equipo clinico / Administrador clinico  
**Objetivo:** Visualizar el resumen completo de la historia clinica de un paciente activo del turno.

### Precondiciones

- El usuario ingreso al panel administrativo.
- Existe al menos un paciente activo en el tablero del turno.
- El usuario tiene acceso al grupo **Historia Clinica**.

### Flujo principal

1. El usuario ingresa a **Historia Clinica > Panel clinico**.
2. El sistema muestra la barra de comando con el titulo del modulo, cantidad de pacientes, estado de atencion y prioridad.
3. El sistema lista los pacientes activos del turno con hora, nombre, documento y estado.
4. El usuario selecciona un paciente.
5. El sistema muestra la ficha del paciente con numero de historia, nombre, documento, edad, seguro, medico, hora y estado.
6. El sistema carga la pestana **Resumen**.
7. El usuario revisa alergias, antecedentes relevantes, ultima atencion, motivo actual, historial de consultas, diagnosticos y medicamentos activos.

### Datos visibles del caso

- Pacientes de prueba: Maria Salas Rojas, Luis Herrera Vega y Rosa Medina Torres.
- Numero de historia clinica.
- Documento de identidad.
- Edad.
- Seguro.
- Estado de atencion.
- Medico asignado.
- Alergias.
- Antecedentes.
- Historial de consultas.
- Diagnosticos.
- Medicamentos activos.

### Resultado esperado

El usuario obtiene una vista consolidada del estado clinico y administrativo del paciente seleccionado.

### Que captura tomar

Tomar captura de la pantalla completa cuando este visible:

- Menu lateral con **Historia Clinica** abierto.
- Encabezado **Panel clinico**.
- Tarjetas de **Pacientes del turno**.
- Banner del paciente seleccionado.
- Pestana **Resumen** con los bloques **Resumen clinico**, **Historial de consultas** y **Diagnosticos y medicamentos activos**.

---

## UC-HCE-02 - Buscar paciente en el tablero del turno

**Vista administrativa:** Historia Clinica > cualquier vista del modulo  
**Actor principal:** Equipo clinico / Recepcion / Administrador clinico  
**Objetivo:** Filtrar pacientes activos por nombre, documento, numero de historia, estado o motivo de atencion.

### Precondiciones

- El usuario esta dentro del modulo **Historia Clinica**.
- El tablero **Pacientes del turno** esta visible.
- Existen pacientes activos cargados en la interfaz.

### Flujo principal

1. El usuario ubica el campo **Buscar por nombre, documento o historia**.
2. El usuario escribe parte del nombre, DNI, numero de historia, estado o motivo.
3. El sistema oculta las tarjetas que no coinciden con el texto ingresado.
4. El usuario identifica el paciente buscado.
5. El usuario selecciona la tarjeta del paciente.
6. El sistema actualiza la ficha clinica con los datos del paciente seleccionado.

### Flujos alternativos

- Si el usuario borra el texto de busqueda, el sistema vuelve a mostrar todos los pacientes.
- Si no hay coincidencias, las tarjetas no coincidentes quedan ocultas y el usuario debe ajustar el criterio de busqueda.

### Resultado esperado

El sistema facilita ubicar rapidamente una historia clinica dentro del turno.

### Que captura tomar

Tomar captura con:

- Campo de busqueda con texto ingresado, por ejemplo `Luis`, `DNI 47200981` o `Historia 000219`.
- Lista de pacientes filtrada.
- Paciente coincidente visible.

---

## UC-HCE-03 - Seleccionar paciente activo del turno

**Vista administrativa:** Historia Clinica > cualquier vista del modulo  
**Actor principal:** Equipo clinico  
**Objetivo:** Cambiar el paciente activo para consultar o registrar informacion en su historia clinica.

### Precondiciones

- El tablero **Pacientes del turno** esta visible.
- Hay mas de un paciente disponible.

### Flujo principal

1. El usuario revisa las tarjetas del tablero de pacientes.
2. El usuario hace clic sobre una tarjeta de paciente.
3. El sistema marca la tarjeta como activa.
4. El sistema restablece la pestana interna a **Resumen**.
5. El sistema muestra los datos del nuevo paciente seleccionado.

### Resultado esperado

La interfaz queda enfocada en la historia clinica del paciente seleccionado.

### Que captura tomar

Tomar captura despues de seleccionar un paciente diferente al inicial. Debe verse:

- Tarjeta del paciente activa.
- Banner con el nombre del paciente.
- Pestana **Resumen** actualizada.
- Datos clinicos correspondientes al paciente seleccionado.

---

## UC-HCE-04 - Crear nueva historia clinica

**Vista administrativa:** Historia Clinica > cualquier vista del modulo  
**Accion:** Nueva historia  
**Actor principal:** Administrador clinico / Recepcion  
**Objetivo:** Registrar una nueva historia clinica con datos personales, cobertura, contacto de emergencia y antecedentes iniciales.

### Precondiciones

- El usuario esta autenticado en el panel administrativo.
- El usuario esta dentro del modulo **Historia Clinica**.

### Flujo principal

1. El usuario presiona el boton **Nueva historia** ubicado en la barra superior del modulo.
2. El sistema abre el modal **Nueva historia clinica**.
3. El usuario registra datos de identificacion:
   - Tipo de documento.
   - Numero de documento.
   - Nombres.
   - Apellidos.
   - Fecha de nacimiento.
   - Sexo.
4. El usuario registra datos de contacto:
   - Telefono.
   - Correo.
   - Direccion.
   - Distrito.
5. El usuario registra datos administrativos:
   - Seguro.
   - Numero de poliza.
   - Contacto de emergencia.
   - Telefono de emergencia.
6. El usuario registra datos clinicos iniciales:
   - Alergias conocidas.
   - Antecedentes y medicacion habitual.
   - Observaciones de admision.
7. El usuario valida el consentimiento informado para tratamiento de datos clinicos.
8. El usuario presiona **Crear historia**.
9. El sistema confirma la accion y cierra el modal.

### Flujos alternativos

- El usuario puede presionar **Cancelar** para cerrar el modal sin registrar la historia.
- El usuario puede cerrar el modal con el boton de cierre.

### Resultado esperado

El sistema simula la creacion de una nueva historia clinica y muestra confirmacion visual.

### Que captura tomar

Tomar dos capturas:

1. Modal **Nueva historia clinica** abierto, mostrando los campos de identificacion, contacto y seguro.
2. Parte inferior del mismo modal, mostrando alergias, antecedentes, observaciones, consentimiento informado y boton **Crear historia**.

---

## UC-HCE-05 - Registrar triaje y signos vitales

**Vista administrativa:** Historia Clinica > Triaje y signos  
**Pestana interna:** Triaje  
**Actor principal:** Enfermeria  
**Objetivo:** Revisar y registrar los signos vitales, prioridad y observaciones iniciales del paciente.

### Precondiciones

- El paciente fue admitido o esta en el tablero del turno.
- El usuario ingreso a la vista **Triaje y signos** o selecciono la pestana **Triaje**.

### Flujo principal

1. El usuario ingresa a **Historia Clinica > Triaje y signos**.
2. El sistema abre la pestana **Triaje**.
3. El usuario revisa los signos vitales:
   - Presion.
   - Frecuencia cardiaca.
   - Frecuencia respiratoria.
   - Temperatura.
   - Saturacion.
   - Peso.
   - Talla.
   - IMC.
4. El usuario revisa o edita la evaluacion inicial:
   - Motivo inicial.
   - Prioridad.
   - Observaciones de enfermeria.
5. El usuario presiona **Guardar triaje**.
6. El sistema muestra la accion como procesada.

### Resultado esperado

El triaje queda registrado de forma simulada y disponible para la consulta medica.

### Que captura tomar

Tomar captura con:

- Vista **Triaje y signos** seleccionada en el menu lateral.
- Pestana **Triaje** activa.
- Panel **Signos vitales** completo.
- Formulario **Evaluacion inicial**.
- Boton **Guardar triaje** visible.

---

## UC-HCE-06 - Registrar consulta medica

**Vista administrativa:** Historia Clinica > Consulta medica  
**Pestana interna:** Consulta  
**Actor principal:** Medico  
**Objetivo:** Registrar el motivo de consulta, enfermedad actual, examen fisico, diagnostico, plan e indicaciones.

### Precondiciones

- El paciente esta seleccionado.
- El paciente cuenta con datos minimos de admision y triaje.
- El usuario ingreso a la vista **Consulta medica** o selecciono la pestana **Consulta**.

### Flujo principal

1. El usuario ingresa a **Historia Clinica > Consulta medica**.
2. El sistema muestra la pestana **Consulta**.
3. El usuario revisa o edita:
   - Motivo de consulta.
   - Tiempo de enfermedad.
   - Enfermedad actual.
   - Examen fisico.
4. El usuario revisa los diagnosticos cargados.
5. El usuario puede presionar **Agregar diagnostico**.
6. El usuario revisa el panel **Plan e indicaciones**.
7. El usuario puede presionar **Cerrar atencion**.
8. El usuario puede presionar **Guardar evolucion**.
9. El sistema muestra confirmacion visual de procesamiento.

### Resultado esperado

La evolucion medica queda registrada en el prototipo y el flujo puede continuar hacia ordenes, receta o cierre de atencion.

### Que captura tomar

Tomar captura con:

- Vista **Consulta medica** seleccionada.
- Pestana **Consulta** activa.
- Formulario **Consulta medica**.
- Bloques **Diagnostico** y **Plan e indicaciones**.
- Botones **Guardar evolucion**, **Agregar diagnostico** y **Cerrar atencion** visibles.

---

## UC-HCE-07 - Cerrar atencion

**Vista administrativa:** Historia Clinica > Consulta medica o panel lateral **Trabajo pendiente**  
**Actor principal:** Medico  
**Objetivo:** Marcar la atencion como cerrada despues de completar evaluacion, diagnostico e indicaciones.

### Precondiciones

- Existe un paciente seleccionado.
- La consulta medica fue revisada.
- El usuario esta en la pestana **Consulta** o en el panel lateral **Trabajo pendiente**.

### Flujo principal

1. El usuario revisa los datos de consulta.
2. El usuario verifica diagnosticos y plan de atencion.
3. El usuario presiona **Cerrar atencion**.
4. El sistema cambia temporalmente el texto del boton a **Procesado**.
5. El sistema marca la accion con estilo de exito durante unos segundos.

### Resultado esperado

El prototipo confirma visualmente la accion de cierre de atencion.

### Que captura tomar

Tomar captura antes de hacer clic donde se vea el boton **Cerrar atencion**. Si se requiere evidencia de accion, tomar una segunda captura inmediatamente despues del clic cuando aparezca **Procesado**.

---

## UC-HCE-08 - Firmar atencion

**Vista administrativa:** Historia Clinica > cualquier vista del modulo  
**Accion:** Firmar atencion  
**Actor principal:** Medico  
**Objetivo:** Confirmar la firma de la atencion desde la barra superior o desde el panel de trabajo pendiente.

### Precondiciones

- El usuario esta dentro del modulo **Historia Clinica**.
- Hay un paciente activo seleccionado.
- La atencion tiene informacion clinica lista para validar.

### Flujo principal

1. El usuario revisa la historia clinica del paciente.
2. El usuario presiona **Firmar atencion** en la barra superior o en el panel lateral **Trabajo pendiente**.
3. El sistema muestra el estado **Procesado** temporalmente.
4. El boton vuelve a su estado original luego de la confirmacion visual.

### Resultado esperado

La pantalla simula la firma de la atencion.

### Que captura tomar

Tomar captura con:

- Boton **Firmar atencion** visible en la barra superior.
- Panel lateral **Trabajo pendiente** visible.
- Paciente seleccionado en pantalla.

Opcionalmente, tomar una captura despues del clic mostrando el estado **Procesado**.

---

## UC-HCE-09 - Gestionar ordenes y solicitudes

**Vista administrativa:** Historia Clinica > Ordenes  
**Pestana interna:** Ordenes  
**Actor principal:** Medico / Equipo clinico  
**Objetivo:** Revisar ordenes de laboratorio, imagenes o controles, crear nuevas ordenes, generar consentimientos y agendar seguimiento.

### Precondiciones

- Existe un paciente seleccionado.
- El usuario ingreso a la vista **Ordenes** o selecciono la pestana **Ordenes**.

### Flujo principal

1. El usuario ingresa a **Historia Clinica > Ordenes**.
2. El sistema muestra la tabla **Ordenes y solicitudes**.
3. El usuario revisa:
   - Tipo de orden.
   - Solicitud.
   - Prioridad.
   - Estado.
4. El usuario puede presionar **Nueva orden**.
5. El usuario revisa el bloque **Seguimiento**.
6. El usuario puede presionar **Agendar control**.
7. El usuario revisa el bloque **Consentimientos**.
8. El usuario puede presionar **Generar documento**.

### Flujos alternativos

- Al presionar **Agendar control**, el sistema abre el modal **Programar cita**.
- Al presionar **Nueva orden** o **Generar documento**, el sistema muestra confirmacion visual de accion procesada.

### Resultado esperado

El usuario puede gestionar solicitudes asociadas a la historia clinica y continuar con seguimiento o documentacion.

### Que captura tomar

Tomar captura con:

- Vista **Ordenes** seleccionada.
- Pestana **Ordenes** activa.
- Tabla **Ordenes y solicitudes**.
- Bloques **Seguimiento** y **Consentimientos**.
- Botones **Nueva orden**, **Agendar control** y **Generar documento** visibles.

---

## UC-HCE-10 - Programar cita de control

**Vista administrativa:** Historia Clinica > Ordenes o panel lateral **Proximo control**  
**Accion:** Agendar control / Programar cita  
**Actor principal:** Medico / Recepcion / Equipo clinico  
**Objetivo:** Registrar una proxima cita de seguimiento para el paciente seleccionado.

### Precondiciones

- Existe un paciente seleccionado.
- El usuario esta en la vista **Ordenes** o en cualquier vista con el panel lateral **Proximo control** visible.

### Flujo principal

1. El usuario presiona **Agendar control** o **Programar cita**.
2. El sistema abre el modal **Programar cita**.
3. El sistema precarga el nombre del paciente.
4. El usuario completa o revisa:
   - Fecha sugerida.
   - Hora.
   - Especialidad.
   - Medico.
   - Prioridad.
   - Motivo.
5. El usuario presiona **Confirmar cita**.
6. El sistema muestra confirmacion visual y cierra el modal.

### Flujos alternativos

- El usuario puede presionar **Cancelar** para cerrar el modal sin confirmar.
- El usuario puede cerrar el modal con el boton de cierre.

### Resultado esperado

El sistema simula la programacion de una cita de control para el paciente.

### Que captura tomar

Tomar captura del modal **Programar cita** abierto, asegurando que se vea:

- Nombre del paciente.
- Fecha sugerida.
- Hora.
- Especialidad.
- Medico.
- Prioridad.
- Motivo.
- Boton **Confirmar cita**.

---

## UC-HCE-11 - Emitir receta

**Vista administrativa:** Historia Clinica > Recetas  
**Pestana interna:** Receta  
**Actor principal:** Medico  
**Objetivo:** Revisar medicamentos prescritos, validar alertas y emitir la receta del paciente.

### Precondiciones

- Existe un paciente seleccionado.
- El paciente tiene una receta cargada en la historia clinica.
- El usuario ingreso a la vista **Recetas** o selecciono la pestana **Receta**.

### Flujo principal

1. El usuario ingresa a **Historia Clinica > Recetas**.
2. El sistema muestra la receta con codigo y estado.
3. El usuario revisa la tabla de medicamentos:
   - Medicamento.
   - Dosis.
   - Frecuencia.
   - Duracion.
4. El usuario revisa el panel **Validaciones automaticas**.
5. El sistema informa si existen alertas de alergias o duplicados.
6. El usuario presiona **Emitir receta**.
7. El sistema confirma visualmente la accion.

### Resultado esperado

La receta queda emitida de forma simulada en el prototipo.

### Que captura tomar

Tomar captura con:

- Vista **Recetas** seleccionada.
- Pestana **Receta** activa.
- Codigo de receta.
- Estado de receta.
- Tabla de medicamentos.
- Panel **Validaciones automaticas**.
- Boton **Emitir receta** visible.

---

## UC-HCE-12 - Firmar receta

**Vista administrativa:** Historia Clinica > Recetas  
**Pestana interna:** Receta  
**Actor principal:** Medico  
**Objetivo:** Validar la receta mediante la accion de firma.

### Precondiciones

- El paciente tiene receta cargada.
- El usuario esta en la pestana **Receta**.

### Flujo principal

1. El usuario revisa medicamentos, dosis, frecuencia y duracion.
2. El usuario revisa las validaciones automaticas.
3. El usuario presiona **Firmar**.
4. El sistema muestra confirmacion visual de procesamiento.

### Resultado esperado

El prototipo confirma la firma de la receta.

### Que captura tomar

Tomar captura de la pestana **Receta** con el boton **Firmar** visible junto a **Emitir receta**, **Imprimir** y **Enviar a farmacia**.

---

## UC-HCE-13 - Imprimir receta

**Vista administrativa:** Historia Clinica > Recetas  
**Accion:** Imprimir  
**Actor principal:** Medico / Administrativo clinico  
**Objetivo:** Abrir la vista imprimible de la receta para entregarla al paciente o anexarla al expediente.

### Precondiciones

- Existe una receta visible para el paciente.
- El usuario esta en la pestana **Receta**.

### Flujo principal

1. El usuario presiona **Imprimir**.
2. El sistema abre el modal **Vista de impresion**.
3. El sistema muestra encabezado institucional de MEDICORE.
4. El sistema muestra codigo de receta y fecha.
5. El sistema muestra datos del paciente.
6. El sistema muestra la tabla de medicamentos.
7. El sistema muestra indicaciones y espacio de firma/sello.
8. El usuario presiona **Imprimir**.
9. El sistema muestra confirmacion visual y cierra el modal.

### Flujos alternativos

- El usuario puede presionar **Cerrar** para salir de la vista de impresion.
- El usuario puede cerrar el modal con el boton de cierre.

### Resultado esperado

El sistema muestra una version imprimible de la receta y simula la impresion.

### Que captura tomar

Tomar captura del modal **Vista de impresion** abierto, donde se vea:

- Encabezado MEDICORE.
- Codigo de receta.
- Datos del paciente.
- Tabla de medicamentos.
- Indicaciones.
- Firma y sello.
- Boton **Imprimir**.

---

## UC-HCE-14 - Enviar receta a farmacia

**Vista administrativa:** Historia Clinica > Recetas o panel lateral **Trabajo pendiente**  
**Accion:** Enviar a farmacia  
**Actor principal:** Medico / Equipo clinico  
**Objetivo:** Enviar la receta del paciente al modulo de farmacia para preparacion o despacho.

### Precondiciones

- Existe un paciente seleccionado.
- Existe una receta cargada.
- El usuario esta en la pestana **Receta** o en el panel lateral **Trabajo pendiente**.

### Flujo principal

1. El usuario revisa la receta del paciente.
2. El usuario presiona **Enviar a farmacia**.
3. El sistema cambia el texto del boton a **Receta enviada**.
4. El sistema marca el boton con estado visual de exito.

### Resultado esperado

La pantalla simula el envio de la receta al area de farmacia.

### Que captura tomar

Tomar dos capturas:

1. Antes de la accion, con el boton **Enviar a farmacia** visible.
2. Despues de la accion, mostrando el texto **Receta enviada**.

---

## UC-HCE-15 - Gestionar documentos clinicos

**Vista administrativa:** Historia Clinica > Documentos  
**Pestana interna:** Documentos  
**Actor principal:** Equipo clinico / Administrativo clinico  
**Objetivo:** Revisar documentos adjuntos, permisos de visibilidad y generar nuevos documentos clinicos.

### Precondiciones

- Existe un paciente seleccionado.
- El usuario ingreso a la vista **Documentos** o selecciono la pestana **Documentos**.

### Flujo principal

1. El usuario ingresa a **Historia Clinica > Documentos**.
2. El sistema muestra la tabla **Documentos clinicos**.
3. El usuario revisa:
   - Tipo de documento.
   - Nombre del documento.
   - Fecha.
   - Permiso.
4. El usuario puede presionar **Adjuntar documento**.
5. El usuario puede generar un **Informe medico**.
6. El usuario puede crear un **Descanso medico**.
7. El sistema muestra confirmacion visual en las acciones procesadas.

### Resultado esperado

El usuario revisa y administra documentos vinculados a la historia clinica del paciente.

### Que captura tomar

Tomar captura con:

- Vista **Documentos** seleccionada.
- Pestana **Documentos** activa.
- Tabla **Documentos clinicos**.
- Boton **Adjuntar documento**.
- Bloques **Informe medico** y **Descanso medico** con sus acciones.

---

## UC-HCE-16 - Adjuntar documento clinico

**Vista administrativa:** Historia Clinica > Documentos  
**Accion:** Adjuntar documento  
**Actor principal:** Equipo clinico / Administrativo clinico  
**Objetivo:** Iniciar el registro de un documento clinico asociado al paciente.

### Precondiciones

- Existe un paciente seleccionado.
- El usuario esta en la pestana **Documentos**.

### Flujo principal

1. El usuario revisa la tabla de documentos existentes.
2. El usuario presiona **Adjuntar documento**.
3. El sistema muestra el estado **Procesado** temporalmente.
4. El boton recupera su texto original luego de la confirmacion visual.

### Resultado esperado

El prototipo confirma la accion de adjuntar documento.

### Que captura tomar

Tomar captura antes del clic con el boton **Adjuntar documento** visible. Para evidencia de procesamiento, tomar una segunda captura inmediatamente despues del clic con el texto **Procesado**.

---

## UC-HCE-17 - Generar informe medico

**Vista administrativa:** Historia Clinica > Documentos  
**Accion:** Generar informe medico  
**Actor principal:** Medico / Equipo clinico  
**Objetivo:** Iniciar la generacion de un informe medico desde la historia clinica.

### Precondiciones

- Existe un paciente seleccionado.
- La pestana **Documentos** esta activa.

### Flujo principal

1. El usuario ubica el bloque **Informe medico**.
2. El usuario presiona **Generar**.
3. El sistema muestra confirmacion visual de procesamiento.

### Resultado esperado

El sistema simula la generacion del informe medico.

### Que captura tomar

Tomar captura del bloque **Informe medico** con el boton **Generar** visible. Opcionalmente capturar el estado **Procesado** despues de hacer clic.

---

## UC-HCE-18 - Crear descanso medico

**Vista administrativa:** Historia Clinica > Documentos  
**Accion:** Crear descanso medico  
**Actor principal:** Medico / Equipo clinico  
**Objetivo:** Iniciar la creacion de un descanso medico para el paciente.

### Precondiciones

- Existe un paciente seleccionado.
- La pestana **Documentos** esta activa.

### Flujo principal

1. El usuario ubica el bloque **Descanso medico**.
2. El usuario presiona **Crear**.
3. El sistema muestra confirmacion visual de procesamiento.

### Resultado esperado

El sistema simula la creacion del descanso medico.

### Que captura tomar

Tomar captura del bloque **Descanso medico** con el boton **Crear** visible. Opcionalmente capturar el estado **Procesado** despues de hacer clic.

---

## UC-HCE-19 - Consultar auditoria de la historia clinica

**Vista administrativa:** Historia Clinica > Auditoria  
**Pestana interna:** Auditoria  
**Actor principal:** Auditor medico / Administrador clinico  
**Objetivo:** Revisar la trazabilidad de acciones realizadas sobre la historia clinica.

### Precondiciones

- Existe un paciente seleccionado.
- El usuario ingreso a la vista **Auditoria** o selecciono la pestana **Auditoria**.

### Flujo principal

1. El usuario ingresa a **Historia Clinica > Auditoria**.
2. El sistema muestra la tabla **Auditoria de la historia**.
3. El usuario revisa:
   - Hora.
   - Usuario.
   - Accion.
   - Area.
4. El usuario identifica cambios o accesos registrados en la historia clinica.

### Resultado esperado

El usuario puede consultar la trazabilidad de acciones sobre la historia clinica del paciente.

### Que captura tomar

Tomar captura con:

- Vista **Auditoria** seleccionada.
- Pestana **Auditoria** activa.
- Tabla **Auditoria de la historia** visible.
- Registros de hora, usuario, accion y area.
- Boton **Exportar** visible.

---

## UC-HCE-20 - Exportar auditoria de la historia clinica

**Vista administrativa:** Historia Clinica > Auditoria  
**Accion:** Exportar  
**Actor principal:** Auditor medico / Administrador clinico  
**Objetivo:** Exportar o preparar la salida de los registros de auditoria.

### Precondiciones

- La pestana **Auditoria** esta activa.
- La tabla de auditoria contiene registros.

### Flujo principal

1. El usuario revisa la tabla **Auditoria de la historia**.
2. El usuario presiona **Exportar**.
3. El sistema muestra confirmacion visual de procesamiento.

### Resultado esperado

El prototipo confirma la accion de exportacion de auditoria.

### Que captura tomar

Tomar captura con el boton **Exportar** visible junto a la tabla de auditoria. Para evidencia de accion, capturar el estado **Procesado** despues del clic.

---

## UC-HCE-21 - Revisar alerta clinica del paciente

**Vista administrativa:** Historia Clinica > cualquier vista del modulo  
**Componente:** Panel lateral **Alerta clinica**  
**Actor principal:** Equipo clinico  
**Objetivo:** Mantener visible informacion critica del paciente durante la atencion.

### Precondiciones

- Existe un paciente seleccionado.
- El paciente tiene alergia o condicion relevante registrada.

### Flujo principal

1. El usuario selecciona un paciente.
2. El sistema muestra el panel lateral **Alerta clinica**.
3. El usuario revisa la alergia o alerta registrada.
4. El usuario utiliza esta informacion antes de emitir recetas, ordenes o indicaciones.

### Resultado esperado

El usuario mantiene visibilidad de riesgos clinicos durante el flujo de atencion.

### Que captura tomar

Tomar captura de cualquier vista del modulo donde se vea:

- Banner del paciente.
- Panel lateral **Alerta clinica**.
- Texto de alergia o alerta, por ejemplo `Penicilina - reaccion anafilactica`.

---

## UC-HCE-22 - Revisar trabajo pendiente

**Vista administrativa:** Historia Clinica > cualquier vista del modulo  
**Componente:** Panel lateral **Trabajo pendiente**  
**Actor principal:** Equipo clinico  
**Objetivo:** Acceder rapidamente a las acciones pendientes de la atencion.

### Precondiciones

- Existe un paciente seleccionado.
- El panel lateral esta visible.

### Flujo principal

1. El usuario revisa el panel lateral **Trabajo pendiente**.
2. El sistema muestra acciones disponibles:
   - Cerrar atencion.
   - Firmar atencion.
   - Emitir receta.
   - Enviar a farmacia.
3. El usuario selecciona una accion.
4. El sistema procesa visualmente la accion.

### Resultado esperado

El usuario puede ejecutar acciones importantes sin cambiar necesariamente de pestana.

### Que captura tomar

Tomar captura con el panel lateral **Trabajo pendiente** completo y sus cuatro acciones visibles.

---

## UC-HCE-23 - Revisar proximo control

**Vista administrativa:** Historia Clinica > cualquier vista del modulo  
**Componente:** Panel lateral **Proximo control**  
**Actor principal:** Equipo clinico / Recepcion  
**Objetivo:** Ver si el paciente tiene control programado y permitir programar una cita desde la historia clinica.

### Precondiciones

- Existe un paciente seleccionado.
- El panel lateral esta visible.

### Flujo principal

1. El usuario revisa el panel lateral **Proximo control**.
2. El sistema muestra fecha y especialidad.
3. Si no hay control, el sistema muestra `Sin programar` y `Por definir`.
4. El usuario puede presionar **Programar cita**.
5. El sistema abre el modal de programacion de cita.

### Resultado esperado

El usuario identifica el estado del siguiente control y puede iniciar su programacion.

### Que captura tomar

Tomar captura donde se vea:

- Panel **Proximo control**.
- Fecha `Sin programar`.
- Especialidad `Por definir`.
- Boton **Programar cita**.

---

## Matriz resumen de capturas sugeridas

| Codigo | Caso de uso | Captura principal |
| --- | --- | --- |
| UC-HCE-01 | Consultar panel clinico | Vista Resumen completa con paciente seleccionado |
| UC-HCE-02 | Buscar paciente | Campo de busqueda con filtro aplicado |
| UC-HCE-03 | Seleccionar paciente | Nueva tarjeta activa y banner actualizado |
| UC-HCE-04 | Crear nueva historia clinica | Modal Nueva historia clinica |
| UC-HCE-05 | Registrar triaje | Pestana Triaje con signos vitales |
| UC-HCE-06 | Registrar consulta medica | Pestana Consulta con diagnostico y plan |
| UC-HCE-07 | Cerrar atencion | Boton Cerrar atencion antes/despues del clic |
| UC-HCE-08 | Firmar atencion | Barra superior y Trabajo pendiente |
| UC-HCE-09 | Gestionar ordenes | Tabla Ordenes y solicitudes |
| UC-HCE-10 | Programar cita de control | Modal Programar cita |
| UC-HCE-11 | Emitir receta | Pestana Receta con validaciones |
| UC-HCE-12 | Firmar receta | Boton Firmar en receta |
| UC-HCE-13 | Imprimir receta | Modal Vista de impresion |
| UC-HCE-14 | Enviar receta a farmacia | Estado Receta enviada |
| UC-HCE-15 | Gestionar documentos clinicos | Pestana Documentos completa |
| UC-HCE-16 | Adjuntar documento clinico | Boton Adjuntar documento |
| UC-HCE-17 | Generar informe medico | Bloque Informe medico |
| UC-HCE-18 | Crear descanso medico | Bloque Descanso medico |
| UC-HCE-19 | Consultar auditoria | Tabla Auditoria de la historia |
| UC-HCE-20 | Exportar auditoria | Boton Exportar |
| UC-HCE-21 | Revisar alerta clinica | Panel Alerta clinica |
| UC-HCE-22 | Revisar trabajo pendiente | Panel Trabajo pendiente |
| UC-HCE-23 | Revisar proximo control | Panel Proximo control |

## Observaciones del prototipo

- El proyecto es estatico y no usa backend, base de datos ni autenticacion real.
- Las acciones administrativas muestran confirmaciones visuales temporales, pero no persisten datos.
- Las vistas del menu lateral abren la misma experiencia de historia clinica, cambiando la pestana inicial segun el submodulo seleccionado.
- El modulo usa datos de prueba definidos en `historia-clinica-recetas/historia-recetas.js`.
- Para evidencias, se recomienda capturar pantalla completa porque el menu lateral, la barra superior, el paciente activo y el panel lateral ayudan a demostrar contexto del caso de uso.
