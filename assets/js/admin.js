function initAdminPage() {
  const loginForm = document.querySelector("#adminLoginForm");

  if (!loginForm) {
    return;
  }

  const app = window.GestionApp;
  const loginView = document.querySelector("#adminLogin");
  const shell = document.querySelector("#adminShell");
  const loginUser = document.querySelector("#loginUser");
  const loginRole = document.querySelector("#loginRole");
  const adminNav = document.querySelector("#adminNav");
  const adminContent = document.querySelector("#adminContent");
  const currentModule = document.querySelector("#currentModule");
  const currentTitle = document.querySelector("#currentTitle");
  const logoutButton = document.querySelector("#logoutButton");
  const jwtDrawer = document.querySelector("#jwtDrawer");
  const openJwt = document.querySelector("#openJwt");
  const closeJwt = document.querySelector("#closeJwt");
  const notificationButton = document.querySelector("#notificationButton");
  const notificationMenu = document.querySelector("#notificationMenu");
  const profileButton = document.querySelector("#profileButton");
  const profileMenu = document.querySelector("#profileMenu");
  const topbarUser = document.querySelector("#topbarUser");
  const profileMenuUser = document.querySelector("#profileMenuUser");
  const profileMenuRole = document.querySelector("#profileMenuRole");
  const adminJwt = document.querySelector("#adminJwt");
  const adminPermissions = document.querySelector("#adminPermissions");

  let activeScreenId = app.adminGroups[0].screens[0].id;
  let activeRole = loginRole.value;
  let activeUser = loginUser.value;
  const expandedGroups = new Set([app.adminGroups[0].id]);

  function getScreens() {
    return app.adminGroups.flatMap((group) => group.screens.map((screen) => ({ ...screen, group })));
  }

  function getGroupIcon(groupId) {
    const icons = {
      "citas-agenda": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>',
      "historia-recetas": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 14h6"/><path d="M12 11v6"/></svg>',
      "farmacia-inventario": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10.5 20.5 10-10a4.95 4.95 0 0 0-7-7l-10 10a4.95 4.95 0 0 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>',
      "caja-facturacion": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2Z"/><path d="M16 8h-6"/><path d="M16 12h-6"/><path d="M10 16h4"/></svg>',
      "dashboards-reportes": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/><path d="M14 9h5v5"/></svg>',
      "seguridad-usuarios": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z"/><path d="m9 12 2 2 4-4"/></svg>',
    };

    return icons[groupId] || '<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="16" height="16" x="4" y="4" rx="2"/><path d="M9 9h6"/><path d="M9 15h6"/></svg>';
  }

  function renderNav() {
    adminNav.innerHTML = app.adminGroups
      .map((group) => {
        const isExpanded = expandedGroups.has(group.id);

        return `
          <section class="nav-group ${isExpanded ? "open" : ""}">
            <button class="nav-group-toggle" type="button" data-group="${group.id}" aria-expanded="${isExpanded}">
              <span class="nav-group-icon">${getGroupIcon(group.id)}</span>
              <span class="nav-group-copy">
                <small>${group.screens.length} vistas</small>
                <strong>${group.label}</strong>
              </span>
              <b>${group.screens.length}</b>
            </button>
            <div class="nav-group-panel">
              ${group.screens
              .map(
                (screen) => `
                  <button class="admin-nav-button ${screen.id === activeScreenId ? "active" : ""}" type="button" data-screen="${screen.id}">
                    <span class="screen-dot"></span>
                    <span>
                    <small>${screen.useCase}</small>
                    ${screen.title}
                    </span>
                  </button>
                `,
              )
              .join("")}
            </div>
          </section>
        `;
      })
      .join("");

    adminNav.querySelectorAll("[data-group]").forEach((button) => {
      button.addEventListener("click", () => {
        const groupId = button.dataset.group;

        if (expandedGroups.has(groupId)) {
          expandedGroups.delete(groupId);
        } else {
          expandedGroups.add(groupId);
        }

        renderNav();
      });
    });

    adminNav.querySelectorAll("[data-screen]").forEach((button) => {
      button.addEventListener("click", () => renderScreen(button.dataset.screen));
    });
  }

  function renderMetricCards(metrics) {
    return metrics
      .map(
        ([label, value, note]) => `
          <article class="admin-metric">
            <span>${label}</span>
            <strong>${value}</strong>
            <small>${note}</small>
          </article>
        `,
      )
      .join("");
  }

  function renderFields(fields) {
    return fields
      .map(
        (field, index) => `
          <label>
            ${field}
            <input type="text" value="${index % 2 === 0 ? "Dato de prueba" : "Pendiente de confirmar"}" />
          </label>
        `,
      )
      .join("");
  }

  function renderScreen(screenId) {
    const screen = getScreens().find((item) => item.id === screenId) || getScreens()[0];
    activeScreenId = screen.id;
    expandedGroups.add(screen.group.id);
    currentModule.textContent = `${screen.group.module} · ${screen.group.label}`;
    currentTitle.textContent = screen.title;

    // Renderizar formulario especial según el apartado
    let formHtml = "";
    if (typeof window.CitasManager !== "undefined") {
      const especialidades = window.CitasManager.getEspecialidades();
      const sedes = window.CitasManager.getSedes();
      const turnos = window.CitasManager.getTurnosDisponibles();
      const pacientes = window.CitasManager.getPacientes();

      if (screen.id === "agenda-medica") {
        formHtml = `
          <div class="formulario-agenda">
            <h3>Filtrar y consultar disponibilidad</h3>
            <form id="formFiltroAgenda">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;">
                <div class="form-group">
                  <label>Especialidad:</label>
                  <select id="especialidad" class="form-control">
                    <option value="">-- Seleccionar --</option>
                    ${especialidades.map(e => `<option value="${e}">${e}</option>`).join("")}
                  </select>
                </div>

                <div class="form-group">
                  <label>Médico:</label>
                  <select id="medico" class="form-control" disabled>
                    <option value="">-- Seleccionar especialidad primero --</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Sede:</label>
                  <select id="sede" class="form-control">
                    <option value="">-- Seleccionar --</option>
                    ${sedes.map(s => `<option value="${s}">${s}</option>`).join("")}
                  </select>
                </div>

                <div class="form-group">
                  <label>Turno:</label>
                  <select id="turno" class="form-control">
                    <option value="">-- Seleccionar --</option>
                    ${turnos.map(t => `<option value="${t}">${t}</option>`).join("")}
                  </select>
                </div>

                <div class="form-group">
                  <label>Fecha (DD/MM/YY):</label>
                  <input type="text" id="fechaAgenda" class="form-control" placeholder="DD/MM/YY" maxlength="8" />
                </div>
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label>Observaciones/Dolencia:</label>
                <textarea id="observaciones" class="form-control" placeholder="Describe la dolencia o motivo de la consulta"></textarea>
              </div>
            </form>
          </div>
        `;
      } else if (screen.id === "registrar-cita") {
        formHtml = `
          <div class="formulario-agenda">
            <h3>Registrar nueva cita</h3>
            <form id="formRegistroCita">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;">
                <div class="form-group">
                  <label>Documento del paciente:</label>
                  <input type="text" id="documento" class="form-control" placeholder="Ingrese documento" />
                </div>

                <div class="form-group">
                  <label>Paciente:</label>
                  <select id="paciente" class="form-control">
                    <option value="">-- Seleccionar --</option>
                    ${pacientes.map(p => `<option value="${p.id}">${p.nombre}</option>`).join("")}
                  </select>
                </div>

                <div class="form-group">
                  <label>Especialidad:</label>
                  <select id="especialidadReg" class="form-control">
                    <option value="">-- Seleccionar --</option>
                    ${especialidades.map(e => `<option value="${e}">${e}</option>`).join("")}
                  </select>
                </div>

                <div class="form-group">
                  <label>Médico:</label>
                  <select id="medicoReg" class="form-control" disabled>
                    <option value="">-- Seleccionar especialidad --</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Fecha (DD/MM/YY):</label>
                  <input type="text" id="fechaReg" class="form-control" placeholder="DD/MM/YY" maxlength="8" />
                </div>

                <div class="form-group">
                  <label>Hora:</label>
                  <select id="horaReg" class="form-control">
                    <option value="">-- Seleccionar --</option>
                    ${turnos.map(t => `<option value="${t.split(' ')[0]}">${t}</option>`).join("")}
                  </select>
                </div>
              </div>
            </form>
          </div>
        `;
      } else if (screen.id === "confirmar-cita") {
        const citas = window.CitasManager.getCitas();
        formHtml = `
          <div class="formulario-agenda">
            <h3>Confirmar asistencia</h3>
            <form id="formConfirmacion">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;">
                <div class="form-group">
                  <label>Cita:</label>
                  <select id="citaConfirm" class="form-control">
                    <option value="">-- Seleccionar --</option>
                    ${citas.map(c => `<option value="${c.id}">${c.id} - ${c.paciente_nombre}</option>`).join("")}
                  </select>
                </div>

                <div class="form-group">
                  <label>Estado:</label>
                  <select id="estadoConfirm" class="form-control">
                    <option value="Confirmada">Confirmada</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Cancelada">Cancelada</option>
                    <option value="No asistió">No asistió</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Canal:</label>
                  <select id="canalConfirm" class="form-control">
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Teléfono">Teléfono</option>
                    <option value="Portal">Portal</option>
                    <option value="Presencial">Presencial</option>
                  </select>
                </div>
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label>Observaciones:</label>
                <textarea id="obsConfirm" class="form-control" placeholder="Notas adicionales"></textarea>
              </div>
            </form>
          </div>
        `;
      } else if (screen.id === "reprogramar-cita") {
        const citas = window.CitasManager.getCitas();
        formHtml = `
          <div class="formulario-agenda">
            <h3>Reprogramar cita</h3>
            <form id="formReprogramar">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;">
                <div class="form-group">
                  <label>Cita actual:</label>
                  <select id="citaReprog" class="form-control">
                    <option value="">-- Seleccionar --</option>
                    ${citas.map(c => `<option value="${c.id}">${c.id} - ${c.paciente_nombre} (${c.fecha} ${c.hora})</option>`).join("")}
                  </select>
                </div>

                <div class="form-group">
                  <label>Motivo:</label>
                  <input type="text" id="motivoReprog" class="form-control" placeholder="Motivo del cambio" />
                </div>

                <div class="form-group">
                  <label>Nueva fecha (DD/MM/YY):</label>
                  <input type="text" id="fechaReprog" class="form-control" placeholder="DD/MM/YY" maxlength="8" />
                </div>

                <div class="form-group">
                  <label>Nueva hora:</label>
                  <select id="horaReprog" class="form-control">
                    <option value="">-- Seleccionar --</option>
                    ${turnos.map(t => `<option value="${t.split(' ')[0]}">${t}</option>`).join("")}
                  </select>
                </div>
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label>Responsable del cambio:</label>
                <input type="text" id="responsable" class="form-control" placeholder="Nombre del responsable" />
              </div>
            </form>
          </div>
        `;
      } else if (screen.id === "lista-espera") {
        const espera = window.CitasManager.getEspera();
        formHtml = `
          <div class="formulario-agenda">
            <h3>Gestionar lista de espera</h3>
            <form id="formEspera">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;">
                <div class="form-group">
                  <label>Paciente:</label>
                  <select id="pacienteEspera" class="form-control">
                    <option value="">-- Seleccionar --</option>
                    ${pacientes.map(p => `<option value="${p.id}">${p.nombre}</option>`).join("")}
                  </select>
                </div>

                <div class="form-group">
                  <label>Especialidad:</label>
                  <select id="especialidadEspera" class="form-control">
                    <option value="">-- Seleccionar --</option>
                    ${especialidades.map(e => `<option value="${e}">${e}</option>`).join("")}
                  </select>
                </div>

                <div class="form-group">
                  <label>Prioridad:</label>
                  <select id="prioridadEspera" class="form-control">
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                    <option value="Baja">Baja</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Estado:</label>
                  <select id="estadoEspera" class="form-control">
                    <option value="Esperando">Esperando</option>
                    <option value="Contactar">Contactar</option>
                    <option value="Asignada">Asignada</option>
                  </select>
                </div>
              </div>
              <div class="form-group" style="margin-top: 14px;">
                <label>Comentario:</label>
                <textarea id="comentarioEspera" class="form-control" placeholder="Observaciones"></textarea>
              </div>
            </form>
          </div>
        `;
      } else if (screen.id === "calendario-medico") {
        const medicos = window.CitasManager.getMedicos();
        formHtml = `
          <div class="formulario-agenda">
            <h3>Seleccionar médico y revisar agenda</h3>
            <form id="formCalendario">
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;">
                <div class="form-group">
                  <label>Médico:</label>
                  <select id="medicoCalendario" class="form-control">
                    <option value="">-- Seleccionar --</option>
                    ${medicos.map(m => `<option value="${m.id}">${m.nombre} - ${m.especialidad}</option>`).join("")}
                  </select>
                </div>

                <div class="form-group">
                  <label>Consultorio:</label>
                  <input type="text" id="consultorio" class="form-control" placeholder="Número de consultorio" />
                </div>
              </div>
            </form>
          </div>
        `;
      } else {
        formHtml = `<form class="admin-form">${renderFields(screen.fields)}<label class="wide">Observaciones<textarea>Vista de prueba. No se guardan datos reales porque no existe backend.</textarea></label></form>`;
      }
    } else {
      formHtml = `<form class="admin-form">${renderFields(screen.fields)}<label class="wide">Observaciones<textarea>Vista de prueba. No se guardan datos reales porque no existe backend.</textarea></label></form>`;
    }

    adminContent.innerHTML = `
      <section class="screen-hero-card">
        <div>
          <span class="tag">${screen.useCase}</span>
          <h3>${screen.title}</h3>
          <p>${screen.objective}</p>
        </div>
        <div class="actor-card">
          <span>Actor principal</span>
          <strong>${screen.actor}</strong>
        </div>
      </section>
      <section class="admin-metrics">${renderMetricCards(screen.metrics)}</section>
      <section class="admin-workspace">
        <article class="admin-form-card">
          <div class="card-heading">
            <div><p class="eyebrow">Formulario</p><h3>${screen.title}</h3></div>
            <button class="ghost-button" type="button" data-admin-action>Guardar</button>
          </div>
          ${formHtml}
        </article>
        <aside class="admin-side-card">
          <p class="eyebrow">Flujo</p>
          <h3>Acciones visibles</h3>
          <ul class="check-list">${screen.side.map((item) => `<li>${item}</li>`).join("")}</ul>
          <button class="button primary full" type="button" data-admin-action>Procesar vista</button>
        </aside>
      </section>
      <section class="admin-list-card">
        <div class="card-heading">
          <div><p class="eyebrow">Listado</p><h3>Registros</h3></div>
          <div class="table-actions">
            <button class="ghost-button" type="button" data-admin-action>Filtrar</button>
            <button class="ghost-button" type="button" data-admin-action>Exportar</button>
          </div>
        </div>
        ${app.renderTable(screen.table)}
      </section>
    `;

    // Inicializar eventos especiales
    if (typeof window.CitasManager !== "undefined") {
      if (screen.id === "agenda-medica") {
        const especialidadSelect = document.getElementById("especialidad");
        const medicoSelect = document.getElementById("medico");
        const fechaInput = document.getElementById("fechaAgenda");

        if (especialidadSelect) {
          especialidadSelect.addEventListener("change", (e) => {
            const especialidad = e.target.value;
            medicoSelect.innerHTML = '<option value="">-- Seleccionar médico --</option>';
            
            if (especialidad) {
              const medicos = window.CitasManager.getMedicosPorEspecialidad(especialidad);
              medicos.forEach(m => {
                const option = document.createElement("option");
                option.value = m.id;
                option.textContent = m.nombre;
                medicoSelect.appendChild(option);
              });
              medicoSelect.disabled = false;
            } else {
              medicoSelect.disabled = true;
            }
          });
        }

        // Formato automático de fecha
        if (fechaInput) {
          fechaInput.addEventListener("input", (e) => {
            let valor = e.target.value.replace(/\D/g, "").substring(0, 6);
            if (valor.length >= 2) valor = valor.substring(0, 2) + "/" + valor.substring(2);
            if (valor.length >= 5) valor = valor.substring(0, 5) + "/" + valor.substring(5);
            e.target.value = valor;
          });
        }
      } else if (screen.id === "registrar-cita") {
        const especialidadSelect = document.getElementById("especialidadReg");
        const medicoSelect = document.getElementById("medicoReg");
        const fechaInput = document.getElementById("fechaReg");

        if (especialidadSelect) {
          especialidadSelect.addEventListener("change", (e) => {
            const especialidad = e.target.value;
            medicoSelect.innerHTML = '<option value="">-- Seleccionar médico --</option>';
            
            if (especialidad) {
              const medicos = window.CitasManager.getMedicosPorEspecialidad(especialidad);
              medicos.forEach(m => {
                const option = document.createElement("option");
                option.value = m.id;
                option.textContent = m.nombre;
                medicoSelect.appendChild(option);
              });
              medicoSelect.disabled = false;
            } else {
              medicoSelect.disabled = true;
            }
          });
        }

        if (fechaInput) {
          fechaInput.addEventListener("input", (e) => {
            let valor = e.target.value.replace(/\D/g, "").substring(0, 6);
            if (valor.length >= 2) valor = valor.substring(0, 2) + "/" + valor.substring(2);
            if (valor.length >= 5) valor = valor.substring(0, 5) + "/" + valor.substring(5);
            e.target.value = valor;
          });
        }
      } else if (screen.id === "reprogramar-cita") {
        const fechaInput = document.getElementById("fechaReprog");
        if (fechaInput) {
          fechaInput.addEventListener("input", (e) => {
            let valor = e.target.value.replace(/\D/g, "").substring(0, 6);
            if (valor.length >= 2) valor = valor.substring(0, 2) + "/" + valor.substring(2);
            if (valor.length >= 5) valor = valor.substring(0, 5) + "/" + valor.substring(5);
            e.target.value = valor;
          });
        }
      }
    }

    adminContent.querySelectorAll("[data-admin-action]").forEach((button) => {
      const originalText = button.textContent;
      button.addEventListener("click", () => {
        button.textContent = "Acción realizada";
        button.classList.add("success");
        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove("success");
        }, 1000);
      });
    });

    renderNav();
  }

  function renderJwtDrawer() {
    const permissions = app.rolePermissions[activeRole] || app.rolePermissions.Administrador;
    adminJwt.textContent = app.createFakeJwt(activeRole, activeUser);
    adminPermissions.innerHTML = permissions.map((permission) => `<span class="permission">${permission}</span>`).join("");
  }

  function startSession() {
    activeRole = loginRole.value;
    activeUser = loginUser.value.trim() || "admin.clinica";
    topbarUser.textContent = activeUser;
    profileMenuUser.textContent = activeUser;
    profileMenuRole.textContent = activeRole;
    loginView.classList.add("hidden");
    shell.classList.remove("hidden");
    renderJwtDrawer();
    renderScreen(activeScreenId);
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    startSession();
  });

  logoutButton.addEventListener("click", () => {
    shell.classList.add("hidden");
    loginView.classList.remove("hidden");
    jwtDrawer.classList.remove("open");
    profileMenu.classList.add("hidden");
  });

  openJwt.addEventListener("click", () => {
    renderJwtDrawer();
    jwtDrawer.classList.add("open");
    profileMenu.classList.add("hidden");
  });

  closeJwt.addEventListener("click", () => jwtDrawer.classList.remove("open"));

  notificationButton.addEventListener("click", (event) => {
    event.stopPropagation();
    notificationMenu.classList.toggle("hidden");
    profileMenu.classList.add("hidden");
  });

  profileButton.addEventListener("click", (event) => {
    event.stopPropagation();
    profileMenu.classList.toggle("hidden");
    notificationMenu.classList.add("hidden");
  });

  profileMenu.querySelectorAll("[data-profile-action]").forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = "Vista abierta";
      setTimeout(() => {
        button.textContent = button.dataset.profileAction === "perfil" ? "Mi perfil" : "Preferencias";
      }, 900);
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".topbar-menu")) {
      notificationMenu.classList.add("hidden");
      profileMenu.classList.add("hidden");
    }
  });
}

initAdminPage();
