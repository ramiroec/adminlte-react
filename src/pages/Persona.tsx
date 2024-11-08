import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMobileAlt, faMapMarkerAlt, faCalendarAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';

const API_URL = 'https://randomuser.me/api/?results=1';

const Persona = () => {
  const [persona, setPersona] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPersona(data.results[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching person data:', error);
        setLoading(false);
      }
    };
    fetchPersona();
  }, []);

  if (loading) {
    return <p>Cargando datos de la persona...</p>;
  }

  if (!persona) {
    return <p>No se encontraron datos de la persona.</p>;
  }

  const { name, location, email, dob, phone, cell, picture } = persona;

  return (
    <div>
      <ContentHeader title="Detalles de la Persona" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                {`${name.title} ${name.first} ${name.last}`}
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                {/* Columna izquierda con la imagen y datos personales */}
                <div className="col-md-6 text-center">
                  <img
                    src={picture.large}
                    alt={`${name.first} ${name.last}`}
                    className="img-fluid rounded-circle mb-3"
                    style={{ maxWidth: '150px', border: '2px solid #ddd', padding: '10px' }}
                  />
                  <h5>Información Personal</h5>
                  <p><FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong> {email}</p>
                  <p><FontAwesomeIcon icon={faPhone} /> <strong>Teléfono:</strong> {phone}</p>
                  <p><FontAwesomeIcon icon={faMobileAlt} /> <strong>Celular:</strong> {cell}</p>
                  <p><FontAwesomeIcon icon={faCalendarAlt} /> <strong>Fecha de Nacimiento:</strong> {new Date(dob.date).toLocaleDateString()}</p>
                  <p><strong>Edad:</strong> {dob.age} años</p>
                </div>

                {/* Columna derecha con la dirección */}
                <div className="col-md-6">
                  <h5>Dirección</h5>
                  <p><FontAwesomeIcon icon={faMapMarkerAlt} /> <strong>Calle:</strong> {`${location.street.number} ${location.street.name}`}</p>
                  <p><strong>Ciudad:</strong> {location.city}</p>
                  <p><strong>Estado:</strong> {location.state}</p>
                  <p><FontAwesomeIcon icon={faGlobe} /> <strong>País:</strong> {location.country}</p>
                  <p><strong>Código Postal:</strong> {location.postcode}</p>
                  <a
                    href={`https://www.google.com/maps?q=${location.coordinates.latitude},${location.coordinates.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-2"
                  >
                    Ver en Google Maps
                  </a>
                </div>
              </div>
            </div>
            <div className="card-footer text-center">
              Datos proporcionados por Random User API
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Persona;
