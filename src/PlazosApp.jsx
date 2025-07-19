import React, { useState, useEffect } from "react";
import axios from "axios";

const PlazosApp = () => {
  const hoy = new Date();
  const fechaActual = hoy.toISOString().split("T")[0];

  // Estados
  const [fechaInicial, setFechaInicial] = useState(fechaActual);
  const [region, setRegion] = useState("Metropolitana");
  const [operacion, setOperacion] = useState("sumar");
  const [tipoDias, setTipoDias] = useState("judiciales");
  const [cantidadDias, setCantidadDias] = useState(1);
  const [mostrar, setMostrar] = useState(false);
  const [resultado, setResultado] = useState("");
  const [expanded, setExpanded] = useState(false); //Terminos y condiciones
  const [helpModal, setHelpModal] = useState(false); //Explicacion

  useEffect(() => {
    setFechaInicial(fechaActual);
  }, [fechaActual]);

  const handleInicializar = () => {
    setFechaInicial(fechaActual);
    setRegion("Metropolitana");
    setOperacion("sumar");
    setTipoDias("judiciales");
    setCantidadDias(1);
    setMostrar(false);
    setResultado("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      fecha_inicial: fechaInicial.split("-").reverse().join("-"),
      region,
      operacion,
      tipo_dias: tipoDias,
      cantidad_dias: cantidadDias,
    };

    try {
      const response = await axios.post(
        "https://wjgucpu5f9.execute-api.us-east-1.amazonaws.com/test/consejero_calculo_plazos",
        payload
      );

      if (response.data.codigo === 200) {
        setMostrar(true);
        setResultado(response.data.mensaje);
      } else {
        alert("El cálculo no fue exitoso. Revisa los datos enviados.");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Error al realizar el cálculo.");
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light text-dark">
      {/* Header */}
      <header className="py-1 border-bottom bg-white text-dark">
        <div className="container text-start">
          <h1 className="display-8 fw-bold">PLAZOS.CL</h1>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="container my-4 flex-grow-1">
        <div className="row gy-4">
          {/* Columna izquierda: Logo, Cards y Botón abajo */}
          <div className="col-12 col-md-4 d-flex flex-column text-center">
            <div className="mb-4">
              <img
                src="consejero.png"
                alt="Consejero"
                className="img-fluid"
                style={{ maxWidth: "300px" }}
              />
            </div>

            {/* Contenedor con flex column que crece */}
            <div className="d-flex flex-column align-items-center flex-grow-1">
              {/* Primera Card */}
              <div
                className="card mb-5 bg-white text-dark"
                style={{ maxWidth: "18rem" }}
              >
                <img
                  className="card-img-top"
                  src="https://via.placeholder.com/288x100?text=Tu+Logo+Aqui"
                  alt="Tu logo aquí"
                />
                <div className="card-body">
                  <h5 className="card-title text-center">
                    Tu logo puede estar aquí
                  </h5>
                  <p className="card-text text-center">
                    Contáctanos para más información.
                  </p>
                </div>
              </div>

              {/* Segunda Card */}
              <div
                className="card bg-white text-dark mb-5"
                style={{ maxWidth: "18rem" }}
              >
                <img
                  className="card-img-top"
                  src="https://via.placeholder.com/288x100?text=Tu+Logo+Aqui"
                  alt="Tu logo aquí"
                />
                <div className="card-body">
                  <h5 className="card-title text-center">
                    Tu logo puede estar aquí
                  </h5>
                  <p className="card-text text-center">
                    Contáctanos para más información.
                  </p>
                </div>
              </div>
              {/* Botón debajo de las 2 cards */}
              <div className="mt-auto mb-3">
                <button
                  className="btn btn-info"
                  style={{ maxWidth: "200px", width: "90%" }}
                  onClick={() => setHelpModal(true)}
                >
                  Glozario de plazos judiciales
                </button>
              </div>
            </div>
          </div>

          {/* Columna central: Calculadora */}
          <div className="col-12 col-md-6">
            <main className="container my-5 flex-grow-1">
              <div
                className="card mx-auto bg-white text-dark"
                style={{ maxWidth: "600px" }}
              >
                <div className="card-body">
                  <h5 className="card-title border-bottom pb-2 text-center">
                    Calculadora de Plazos
                  </h5>
                  <form onSubmit={handleSubmit}>
                    {/* Fecha Inicial */}
                    <div className="mb-3 row">
                      <label
                        htmlFor="fechaInicial"
                        className="col-sm-4 col-form-label text-center text-md-start"
                      >
                        Fecha Base
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="date"
                          id="fechaInicial"
                          className="form-control"
                          value={fechaInicial}
                          onChange={(e) => setFechaInicial(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Región */}
                    <div className="mb-3 row">
                      <label
                        htmlFor="region"
                        className="col-sm-4 col-form-label text-center text-md-start"
                      >
                        Región
                      </label>
                      <div className="col-sm-8">
                        <select
                          id="region"
                          className="form-select"
                          value={region}
                          onChange={(e) => setRegion(e.target.value)}
                        >
                          <option value="Metropolitana">
                            Región Metropolitana
                          </option>
                          <option value="Arica y Parinacota">
                            Región Arica y Parinacota
                          </option>
                          <option value="Coquimbo">Región Coquimbo</option>
                          <option value="Ñuble">Región de Ñuble</option>
                        </select>
                      </div>
                    </div>

                    {/* Operación */}
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label text-center text-md-start">
                        Operación
                      </label>
                      <div className="col-sm-8 d-flex align-items-center">
                        <div className="form-check me-3">
                          <input
                            type="radio"
                            id="sumar"
                            name="operacion"
                            className="form-check-input"
                            value="sumar"
                            checked={operacion === "sumar"}
                            onChange={(e) => setOperacion(e.target.value)}
                          />
                          <label htmlFor="sumar" className="form-check-label">
                            Sumar
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="radio"
                            id="restar"
                            name="operacion"
                            className="form-check-input"
                            value="restar"
                            checked={operacion === "restar"}
                            onChange={(e) => setOperacion(e.target.value)}
                          />
                          <label htmlFor="restar" className="form-check-label">
                            Restar
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Días Hábiles */}
                    <div className="mb-3 row">
                      <label
                        htmlFor="diasHabiles"
                        className="col-sm-4 col-form-label text-center text-md-start"
                      >
                        Considerar días
                      </label>
                      <div className="col-sm-8">
                        <select
                          id="diasHabiles"
                          className="form-select"
                          value={tipoDias}
                          onChange={(e) => setTipoDias(e.target.value)}
                        >
                          <option value="judiciales">
                            Judiciales (Lunes a Sábado)
                          </option>
                          <option value="administrativos">
                            Administrativos (Lunes a Viernes)
                          </option>
                          <option value="corridos">
                            Días Corridos (Lunes a Domingo)
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Cantidad de Días */}
                    <div className="mb-3 row">
                      <label
                        htmlFor="cantidadDias"
                        className="col-sm-4 col-form-label text-center text-md-start"
                      >
                        Cantidad de Días
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="number"
                          id="cantidadDias"
                          className="form-control"
                          value={cantidadDias > 0 ? cantidadDias : ""}
                          min="1"
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "" || Number(value) < 1) {
                              setCantidadDias("");
                            } else {
                              setCantidadDias(Number(value));
                            }
                          }}
                          onBlur={() => {
                            if (cantidadDias === "" || cantidadDias < 1) {
                              setCantidadDias(1);
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Botones */}
                    <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-primary me-2"
                      onClick={(e) => {
                        handleInicializar();
                        e.currentTarget.blur();
                      }}
                    >
                      Inicializar
                    </button>

                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={(e) => {
                        e.currentTarget.blur(); 
                      }}
                    >
                      Calcular
                    </button>
                    </div>
                  </form>

                  {/* Resultado */}
                  {mostrar && (
                    <div className="alert alert-success my-3 text-center">
                      {resultado}
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>

          {/* Columna derecha (vacía de momento) */}
          <div className="col-12 col-md-2"></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-3 border-top mt-auto bg-white text-dark">
        <div className="container d-flex justify-content-between align-items-center">
          <button className="btn btn-link p-0" onClick={() => setExpanded(true)}>
            Términos y Condiciones
          </button>
          <p className="mb-0">2024 | contacto@consejero.cl</p>
        </div>
      </footer>

      {/* Modal de Términos y Condiciones */}
      {expanded && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
            overflow: "hidden",
          }}
        >
          <div
            className="p-4 rounded bg-white text-dark"
            style={{
              maxWidth: "600px",
              maxHeight: "90%",
              overflowY: "auto",
              boxSizing: "border-box",
            }}
          >
            <h5 className="mb-3 text-center">Términos y Condiciones</h5>
            <p>
              El uso de la calculadora de plazos es gratuita para los usuarios.
              El sitio de internet www.plazos.cl contiene una calculadora de fechas
              que el usuario puede utilizar para sumar o restar una cantidad de
              días a partir de una fecha base.
            </p>
            <p>
              Los resultados proporcionados por la calculadora de www.plazos.cl
              consideran los días festivos vigentes, por lo que no necesariamente
              incluirán aquellos festivos que hayan sido incorporados recientemente
              por alguna ley.
            </p>
            <p>
              En este sentido, el resultado obtenido por el usuario facilita el
              cómputo de plazos, pero los propietarios y/o administradores del
              sitio www.plazos.cl no tienen responsabilidad alguna por el uso
              del resultado.
            </p>
            <p>
              El usuario es el único responsable del uso que asigne a los resultados
              obtenidos y, de igual manera, los propietarios y/o administradores
              no se responsabilizan por eventuales imprecisiones en los resultados
              presentados.
            </p>
            <button
              className="btn btn-secondary d-block mx-auto mt-3"
              onClick={() => setExpanded(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal de explicacion*/}
      {helpModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1050,
            overflowY: "auto",
          }}
        >
          <div
            className="p-4 rounded bg-white text-dark"
            style={{
              maxWidth: "800px",
              maxHeight: "90%",
              overflowY: "auto",
              boxSizing: "border-box",
            }}
          >
            <h5 className="mb-3 text-center">Cuadro Explicativo</h5>
            <p className="text-center">
              Resumen de Plazos para presentar escritos ante SII o TGR
            </p>
            <div style={{ overflowX: "auto" }}>
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>Presentar</th>
                    <th>N° Días</th>
                    <th>Tipo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Recurso Reposición Administrativa Voluntaria (RAV)</td>
                    <td>30</td>
                    <td>Hábiles Administrativos</td>
                  </tr>
                  <tr>
                    <td>Recurso de Resguardo</td>
                    <td>10</td>
                    <td>Hábiles Administrativos</td>
                  </tr>
                  <tr>
                    <td>Recurso Jerárquico</td>
                    <td>5</td>
                    <td>Hábiles Administrativos</td>
                  </tr>
                  <tr>
                    <td>Reclamo Tributario (Proc. General de Reclamaciones)</td>
                    <td>90</td>
                    <td>Hábiles Judiciales</td>
                  </tr>
                  <tr>
                    <td>Reclamo Tributario (Proc. Vulneración Derechos)</td>
                    <td>15</td>
                    <td>Hábiles Judiciales</td>
                  </tr>
                  <tr>
                    <td>Reclamo Tributario (Proc. Especial de Sanciones)</td>
                    <td>15</td>
                    <td>Hábiles Judiciales</td>
                  </tr>
                  <tr>
                    <td>Reclamo Tributario (Proc. General de Sanciones)</td>
                    <td>10</td>
                    <td>Hábiles Judiciales</td>
                  </tr>
                  <tr>
                    <td>Excepciones en Tesorería General de la República</td>
                    <td>10</td>
                    <td>Hábiles Judiciales</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              className="btn btn-secondary d-block mx-auto mt-3"
              onClick={() => setHelpModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlazosApp;
