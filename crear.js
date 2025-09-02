export function initCrear() {
  const div = document.getElementById('modulo-crear');
  div.innerHTML = `
    <h2>Crear Social</h2>
    <form id="formCrearSocial" autocomplete="off">
      <label>No. Cédula:<br>
        <input type="text" id="noCedula" required>
      </label><br><br>

      <label>Nombre:<br>
        <input type="text" id="nombreSocial" required>
      </label><br><br>

      <label>Celular:<br>
        <input type="text" id="celularSocial" required>
      </label><br><br>

      <label>Correo Electrónico:<br>
        <input type="email" id="correoSocial" required>
      </label><br><br>

      <button type="submit">Guardar Social</button>
    </form>
    <div id="crearSocialMsg"></div>
  `;

  document.getElementById('formCrearSocial').onsubmit = e => {
    e.preventDefault();

    const social = {
      noCedula: document.getElementById('noCedula').value.trim(),
      nombre: document.getElementById('nombreSocial').value.trim(),
      celular: document.getElementById('celularSocial').value.trim(),
      correo: document.getElementById('correoSocial').value.trim()
    };

    document.getElementById('crearSocialMsg').innerHTML = `
      <h3>Datos ingresados:</h3>
      <ul>
        <li><b>No. Cédula:</b> ${social.noCedula}</li>
        <li><b>Nombre:</b> ${social.nombre}</li>
        <li><b>Celular:</b> ${social.celular}</li>
        <li><b>Correo Electrónico:</b> ${social.correo}</li>
      </ul>
    `;
    document.getElementById('formCrearSocial').reset();
  };
}