import React, { useState } from 'react';
import { ContentHeader } from '@components';

const API_URL = 'https://api.apiverve.com/v1/airquality?city=';
const API_KEY = '0b0b854d-88bd-4b4c-a8e4-4f0fd9d9a800';

const Aire = () => {
  const [city, setCity] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para manejar la solicitud a la API
  const fetchAirQuality = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}${city}`, {
        headers: { 'x-api-key': API_KEY },
      });
      const result = await response.json();

      if (result.status === 'ok') {
        setData(result.data);
      } else {
        setError('No se pudo encontrar información para esta ciudad.');
      }
    } catch (err) {
      setError('Error al obtener los datos. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchAirQuality();
    }
  };

  return (
    <div>
      <ContentHeader title="Calidad del Aire" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Consultar Calidad del Aire</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                  type="text"
                  placeholder="Ingrese el nombre de la ciudad"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="form-control"
                />
                <button type="submit" className="btn btn-primary mt-2">
                  Consultar
                </button>
              </form>

              {loading && <p>Cargando datos...</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}

              {data && (
                <div className="air-quality-data">
                  <h4>Calidad del aire en {data.city}</h4>
                  <p><strong>PM2.5:</strong> {data.pm2_5}</p>
                  <p><strong>PM10:</strong> {data.pm10}</p>
                  <p><strong>Índice US EPA:</strong> {data['us-epa-index']}</p>
                  <p><strong>Índice GB DEFRA:</strong> {data['gb-defra-index']}</p>
                  <p><strong>Monóxido de Carbono:</strong> {data.carbonMonoxide} µg/m³</p>
                  <p><strong>Ozono:</strong> {data.ozone} µg/m³</p>
                  <p><strong>Dióxido de Nitrógeno:</strong> {data.nitrogenDioxide} µg/m³</p>
                  <p><strong>Dióxido de Azufre:</strong> {data.sulfurdioxide} µg/m³</p>
                  <p><strong>Recomendación:</strong> {data.recommendation}</p>
                </div>
              )}
            </div>
            <div className="card-footer">Datos proporcionados por Apiverve</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aire;
