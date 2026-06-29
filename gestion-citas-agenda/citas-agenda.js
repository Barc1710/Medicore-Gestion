// ============ DATA MANAGER - SISTEMA COMPLETO DE CITAS ============
const CitasManager = {
  // Inicializar datos en localStorage
  initData() {
    // SIEMPRE sobrescribir con datos nuevos (no verificar si existen)
    localStorage.setItem("medicos", JSON.stringify([
      { id: 1, nombre: "Dra. Vargas", especialidad: "Medicina", sede: "Tarapoto", consultorio: "101" },
      { id: 2, nombre: "Dr. Ramos", especialidad: "Medicina", sede: "Tarapoto", consultorio: "102" },
      { id: 3, nombre: "Dra. León", especialidad: "Pediatría", sede: "Tarapoto", consultorio: "103" },
      { id: 4, nombre: "Dr. Gómez", especialidad: "Cardiología", sede: "Tarapoto", consultorio: "104" },
      { id: 5, nombre: "Dra. Ruiz", especialidad: "Gastroenterología", sede: "Tarapoto", consultorio: "105" },
    ]));
    
    localStorage.setItem("sedes", JSON.stringify(["Tarapoto"]));

    localStorage.setItem("turnos", JSON.stringify([
      "08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00",
      "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"
    ]));

    localStorage.setItem("pacientes", JSON.stringify([
      { id: 1, nombre: "María Salas González", documento: "12345678", telefono: "942123456", email: "maria.salas@email.com", edad: 45 },
      { id: 2, nombre: "Jorge Paredes Mendoza", documento: "87654321", telefono: "942234567", email: "jorge.paredes@email.com", edad: 38 },
      { id: 3, nombre: "Ana Torres Flores", documento: "11111111", telefono: "942345678", email: "ana.torres@email.com", edad: 52 },
      { id: 4, nombre: "Luis Herrera Rojas", documento: "22222222", telefono: "942456789", email: "luis.herrera@email.com", edad: 61 },
      { id: 5, nombre: "Rosa Medina Castro", documento: "33333333", telefono: "942567890", email: "rosa.medina@email.com", edad: 58 },
      { id: 6, nombre: "Carlos Vega Sánchez", documento: "44444444", telefono: "942678901", email: "carlos.vega@email.com", edad: 8 },
    ]));

    localStorage.setItem("citas", JSON.stringify([
      { id: "CT-001", fecha: "2026-06-29", hora: "09:00", medico_id: 1, medico_nombre: "Dra. Vargas", especialidad: "Medicina", sede: "Tarapoto", turno: "09:00 - 10:00", estado: "Confirmada", paciente_id: 1, paciente_nombre: "María Salas González", canal: "WhatsApp", motivo: "Control HTA", reprogramada: false },
      { id: "CT-002", fecha: "2026-06-29", hora: "10:30", medico_id: 2, medico_nombre: "Dr. Ramos", especialidad: "Medicina", sede: "Tarapoto", turno: "10:00 - 11:00", estado: "Pendiente", paciente_id: 2, paciente_nombre: "Jorge Paredes Mendoza", canal: "Teléfono", motivo: "Dolor abdominal", reprogramada: false },
      { id: "CT-003", fecha: "2026-06-30", hora: "11:00", medico_id: 3, medico_nombre: "Dra. León", especialidad: "Pediatría", sede: "Tarapoto", turno: "11:00 - 12:00", estado: "Confirmada", paciente_id: 3, paciente_nombre: "Ana Torres Flores", canal: "Portal", motivo: "Revisión general pediátrica", reprogramada: false },
      { id: "CT-004", fecha: "2026-06-28", hora: "14:00", medico_id: 4, medico_nombre: "Dr. Gómez", especialidad: "Cardiología", sede: "Tarapoto", turno: "14:00 - 15:00", estado: "Confirmada", paciente_id: 2, paciente_nombre: "Jorge Paredes Mendoza", canal: "WhatsApp", motivo: "Control cardíaco", reprogramada: false },
      { id: "CT-005", fecha: "2026-06-28", hora: "15:30", medico_id: 5, medico_nombre: "Dra. Ruiz", especialidad: "Gastroenterología", sede: "Tarapoto", turno: "15:00 - 16:00", estado: "Confirmada", paciente_id: 4, paciente_nombre: "Luis Herrera Rojas", canal: "Presencial", motivo: "Consulta gastroenterológica", reprogramada: false },
      { id: "CT-006", fecha: "2026-06-30", hora: "08:30", medico_id: 1, medico_nombre: "Dra. Vargas", especialidad: "Medicina", sede: "Tarapoto", turno: "08:00 - 09:00", estado: "Cancelada", paciente_id: 5, paciente_nombre: "Rosa Medina Castro", canal: "Teléfono", motivo: "Chequeo rutinario", reprogramada: true },
      { id: "CT-007", fecha: "2026-07-01", hora: "10:00", medico_id: 3, medico_nombre: "Dra. León", especialidad: "Pediatría", sede: "Tarapoto", turno: "10:00 - 11:00", estado: "Pendiente", paciente_id: 6, paciente_nombre: "Carlos Vega Sánchez", canal: "WhatsApp", motivo: "Evaluación pediátrica", reprogramada: false },
      { id: "CT-008", fecha: "2026-07-02", hora: "13:00", medico_id: 4, medico_nombre: "Dr. Gómez", especialidad: "Cardiología", sede: "Tarapoto", turno: "13:00 - 14:00", estado: "Confirmada", paciente_id: 1, paciente_nombre: "María Salas González", canal: "Portal", motivo: "Ecocardiograma", reprogramada: false },
    ]));

    localStorage.setItem("espera", JSON.stringify([
      { id: 1, paciente_id: 4, paciente_nombre: "Luis Herrera Rojas", especialidad: "Cardiología", prioridad: "Alta", estado: "Esperando", fecha_registro: "2026-06-25" },
      { id: 2, paciente_id: 5, paciente_nombre: "Rosa Medina Castro", especialidad: "Gastroenterología", prioridad: "Media", estado: "Contactar", fecha_registro: "2026-06-26" },
      { id: 3, paciente_id: 6, paciente_nombre: "Carlos Vega Sánchez", especialidad: "Pediatría", prioridad: "Alta", estado: "Asignada", fecha_registro: "2026-06-24" },
      { id: 4, paciente_id: 1, paciente_nombre: "María Salas González", especialidad: "Cardiología", prioridad: "Media", estado: "Esperando", fecha_registro: "2026-06-27" },
      { id: 5, paciente_id: 3, paciente_nombre: "Ana Torres Flores", especialidad: "Endocrinología", prioridad: "Media", estado: "Contactar", fecha_registro: "2026-06-27" },
    ]));
  },

  getMedicos() { return JSON.parse(localStorage.getItem("medicos")) || []; },
  getSedes() { return JSON.parse(localStorage.getItem("sedes")) || []; },
  getTurnos() { return JSON.parse(localStorage.getItem("turnos")) || []; },
  getCitas() { return JSON.parse(localStorage.getItem("citas")) || []; },
  getPacientes() { return JSON.parse(localStorage.getItem("pacientes")) || []; },
  getEspera() { return JSON.parse(localStorage.getItem("espera")) || []; },
  
  guardarCitas(citas) { localStorage.setItem("citas", JSON.stringify(citas)); },
  guardarEspera(espera) { localStorage.setItem("espera", JSON.stringify(espera)); },

  // Calcular métricas CONGRUENTES entre todos los apartados
  calcularMetricasAgendaMedica() {
    const citas = this.getCitas();
    const hoy = "2026-06-28";
    const citasHoy = citas.filter(c => c.fecha === hoy);
    const ocupadas = citasHoy.filter(c => c.estado === "Confirmada" || c.estado === "Ocupado").length;
    const libres = 6 - ocupadas; // Total de slots - ocupados

    return [
      ["Citas hoy", ocupadas.toString(), "Programadas"],
      ["Disponibles", libres.toString(), "Bloques libres"],
      ["Sobreturnos", Math.floor(ocupadas * 0.1).toString(), "Autorizados"]
    ];
  },

  calcularMetricasRegistro() {
    const citas = this.getCitas();
    const hoy = "2026-06-28";
    const confirmadas = citas.filter(c => c.estado === "Confirmada").length;
    const pendientes = citas.filter(c => c.estado === "Pendiente").length;

    return [
      ["Reservas", confirmadas.toString(), "Hoy"],
      ["Nuevos", (confirmadas * 0.3).toFixed(0), "Primera vez"],
      ["Reprogramadas", pendientes.toString(), "Hoy"]
    ];
  },

  calcularMetricasConfirmacion() {
    const citas = this.getCitas();
    const confirmadas = citas.filter(c => c.estado === "Confirmada").length;
    const pendientes = citas.filter(c => c.estado === "Pendiente").length;
    const canceladas = citas.filter(c => c.estado === "Cancelada").length;

    return [
      ["Confirmadas", confirmadas.toString(), "Hoy"],
      ["Pendientes", pendientes.toString(), "Contactar"],
      ["Canceladas", canceladas.toString(), "Hoy"]
    ];
  },

  calcularMetricasReprogramar() {
    const citas = this.getCitas();
    const reprogramadas = citas.filter(c => c.reprogramada).length;

    return [
      ["Solicitudes", citas.length.toString(), "Semana"],
      ["Aprobadas", Math.floor(citas.length * 0.7).toString(), "Recepción"],
      ["Pendientes", Math.floor(citas.length * 0.3).toString(), "Paciente"]
    ];
  },

  calcularMetricasEspera() {
    const espera = this.getEspera();
    const activos = espera.filter(e => e.estado !== "Asignada").length;
    const prioritarios = espera.filter(e => e.prioridad === "Alta").length;
    const asignados = espera.filter(e => e.estado === "Asignada").length;

    return [
      ["En espera", activos.toString(), "Activos"],
      ["Prioritarios", prioritarios.toString(), "Adulto mayor"],
      ["Asignados", asignados.toString(), "Semana"]
    ];
  },

  calcularMetricasCalendario(medicoId) {
    const citas = this.getCitas().filter(c => c.medico_id === medicoId);
    const hoy = "2026-06-28";
    const citasHoy = citas.filter(c => c.fecha === hoy);
    const atendidas = citasHoy.filter(c => c.estado === "Atendida").length;

    return [
      ["Pacientes", citasHoy.length.toString(), "Turno"],
      ["Atendidos", atendidas.toString(), "Cerrados"],
      ["Restantes", (citasHoy.length - atendidas).toString(), "Pendientes"]
    ];
  },

  getEspecialidades() {
    const medicos = this.getMedicos();
    return [...new Set(medicos.map(m => m.especialidad))];
  },

  getMedicosPorEspecialidad(especialidad) {
    return this.getMedicos().filter(m => m.especialidad === especialidad);
  },

  getTurnosDisponibles() {
    return this.getTurnos();
  },

  filtrarCitas(filtros = {}) {
    let citas = this.getCitas();
    
    if (filtros.especialidad) citas = citas.filter(c => c.especialidad === filtros.especialidad);
    if (filtros.medico_id) citas = citas.filter(c => c.medico_id === filtros.medico_id);
    if (filtros.sede) citas = citas.filter(c => c.sede === filtros.sede);
    if (filtros.turno) citas = citas.filter(c => c.turno === filtros.turno);

    return citas;
  }
};

CitasManager.initData();

// Hacer CitasManager accesible globalmente para admin.js
window.CitasManager = CitasManager;

window.GestionApp.registerAdminGroup({
  id: "citas-agenda",
  module: "Módulo",
  label: "Gestión de Citas y Agenda",
  screens: [
    {
      id: "agenda-medica",
      title: "Agenda médica",
      useCase: "Consultar disponibilidad",
      actor: "Recepción",
      objective: "Visualizar horarios disponibles por médico, especialidad, sede y turno.",
      get metrics() {
        return CitasManager.calcularMetricasAgendaMedica();
      },
      fields: ["Especialidad", "Médico", "Sede", "Turno", "Fecha"],
      get table() {
        const citas = CitasManager.getCitas();
        const medicos = CitasManager.getMedicos();
        
        return {
          headers: ["Hora", "Médico", "Especialidad", "Estado"],
          rows: citas.map(c => {
            const medico = medicos.find(m => m.id === c.medico_id);
            return [c.hora || "N/A", medico?.nombre || "N/A", c.especialidad, c.estado];
          })
        };
      },
      side: ["Filtro por médico", "Bloques disponibles", "Vista calendario"],
    },
    {
      id: "registrar-cita",
      title: "Registrar cita",
      useCase: "Agendar atención",
      actor: "Recepción / Paciente",
      objective: "Reservar una cita seleccionando paciente, especialidad, médico, fecha y horario.",
      get metrics() {
        return CitasManager.calcularMetricasRegistro();
      },
      fields: ["Documento", "Paciente", "Especialidad", "Médico", "Fecha", "Hora"],
      get table() {
        const citas = CitasManager.getCitas();
        return {
          headers: ["Paciente", "Especialidad", "Fecha", "Estado"],
          rows: citas.map(c => [c.paciente_nombre, c.especialidad, `${c.fecha} ${c.hora}`, c.estado])
        };
      },
      side: ["Validar paciente", "Asignar horario", "Confirmación visible"],
    },
    {
      id: "confirmar-cita",
      title: "Confirmación de cita",
      useCase: "Confirmar asistencia",
      actor: "Recepción",
      objective: "Cambiar el estado de la cita a confirmada, pendiente, cancelada o no asistió.",
      get metrics() {
        return CitasManager.calcularMetricasConfirmacion();
      },
      fields: ["Cita", "Paciente", "Canal", "Estado", "Observación"],
      get table() {
        const citas = CitasManager.getCitas();
        return {
          headers: ["Cita", "Paciente", "Canal", "Estado"],
          rows: citas.map(c => [c.id, c.paciente_nombre, c.canal, c.estado])
        };
      },
      side: ["Confirmar asistencia", "Registrar canal", "Reducir inasistencias"],
    },
    {
      id: "reprogramar-cita",
      title: "Reprogramar cita",
      useCase: "Cambiar fecha u horario",
      actor: "Recepción / Paciente",
      objective: "Mover una cita existente a otro horario disponible dejando trazabilidad visual.",
      get metrics() {
        return CitasManager.calcularMetricasReprogramar();
      },
      fields: ["Cita actual", "Motivo", "Nueva fecha", "Nueva hora", "Responsable"],
      get table() {
        const citas = CitasManager.getCitas();
        return {
          headers: ["Paciente", "Anterior", "Nuevo horario", "Estado"],
          rows: citas.map(c => [c.paciente_nombre, `${c.fecha} ${c.hora}`, "Pendiente cambio", "Aprobada"])
        };
      },
      side: ["Buscar disponibilidad", "Registrar motivo", "Notificar cambio"],
    },
    {
      id: "lista-espera",
      title: "Lista de espera",
      useCase: "Administrar pacientes en espera",
      actor: "Recepción",
      objective: "Mantener pacientes esperando cupo para especialidades con alta demanda.",
      get metrics() {
        return CitasManager.calcularMetricasEspera();
      },
      fields: ["Paciente", "Especialidad", "Prioridad", "Disponibilidad", "Comentario"],
      get table() {
        const espera = CitasManager.getEspera();
        return {
          headers: ["Paciente", "Especialidad", "Prioridad", "Estado"],
          rows: espera.map(e => [e.paciente_nombre, e.especialidad, e.prioridad, e.estado])
        };
      },
      side: ["Priorizar pacientes", "Asignar cupo", "Control de demanda"],
    },
    {
      id: "calendario-medico",
      title: "Calendario del médico",
      useCase: "Revisar agenda diaria",
      actor: "Médico",
      objective: "Mostrar las citas del profesional con estados, tiempos y notas rápidas.",
      get metrics() {
        return CitasManager.calcularMetricasCalendario(1); // Primer médico por defecto
      },
      fields: ["Médico", "Fecha", "Consultorio", "Estado", "Nota"],
      get table() {
        const citas = CitasManager.getCitas().filter(c => c.medico_id === 1);
        return {
          headers: ["Hora", "Paciente", "Motivo", "Estado"],
          rows: citas.map(c => [c.hora, c.paciente_nombre, c.motivo, c.estado])
        };
      },
      side: ["Agenda por turno", "Estado del paciente", "Notas médicas rápidas"],
    },
  ],
});
