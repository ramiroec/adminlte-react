import React, { useState } from 'react';
import { ContentHeader } from '@components';

const API_BASE_URL = 'https://calendarific.com/api/v2/holidays';
const API_KEY = 'jkzttTFxSt5407cBDsebYr9tu6lWqIvl';

const Feriados = () => {
  const [country, setCountry] = useState('PY');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [feriados, setFeriados] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los feriados
  const fetchHolidays = async () => {
    setLoading(true);
    setError(null);

    const url = `${API_BASE_URL}?&api_key=${API_KEY}&country=${country}&year=${year}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.response && data.response.holidays) {
        setFeriados(data.response.holidays);
      } else {
        setError('No se encontraron feriados para estos parámetros.');
      }
    } catch (error) {
      setError('Error al obtener los datos. Intente de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHolidays();
  };

  return (
    <div>
      <ContentHeader title={`Feriados ${year} - ${country}`} />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Lista de Feriados</h3>
            </div>
            <div className="card-body">
              {/* Formulario para ingresar país y año */}
              <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <div className="form-group">
                  <label>País (Código ISO):</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="form-control"
                    placeholder="Ejemplo: PY, US, AR"
                    maxLength={2}
                  />
                </div>
                <div className="form-group">
                  <label>Año:</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="form-control"
                    placeholder="Ejemplo: 2024"
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Consultar</button>
              </form>

              {/* Mensajes de carga y error */}
              {loading && <p>Cargando feriados...</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}

              {/* Tabla de feriados */}
              {!loading && !error && feriados.length > 0 && (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Nombre</th>
                      <th>Tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feriados.map((feriado) => (
                      <tr key={feriado.date.iso}>
                        <td>{new Date(feriado.date.iso).toLocaleDateString()}</td>
                        <td>{feriado.name}</td>
                        <td>{feriado.type.join(', ')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="card-footer">
              {feriados.length > 0 && `Total de feriados: ${feriados.length}`}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feriados;
