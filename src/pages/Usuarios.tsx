import React, { useEffect, useState } from 'react';
import { ContentHeader } from '@components';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredUsuarios, setFilteredUsuarios] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users from the API
    const fetchUsuarios = async () => {
      try {
        const response = await fetch(API_URL);
        const data: User[] = await response.json();
        setUsuarios(data);
        setFilteredUsuarios(data); // Initial list is the full set of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsuarios();
  }, []);

  useEffect(() => {
    // Filter users based on search term
    if (searchTerm === '') {
      setFilteredUsuarios(usuarios);
    } else {
      setFilteredUsuarios(
        usuarios.filter((user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, usuarios]);

  return (
    <div>
      <ContentHeader title="Usuarios" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Lista de Usuarios</h3>
              <div className="card-tools">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nombre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Ubicación</th>
                    <th>Mapa</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsuarios.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.address.city}, {user.address.street}
                      </td>
                      <td>
                        <a
                          href={`https://www.google.com/maps?q=${user.address.geo.lat},${user.address.geo.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver en Google Maps
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer">
              Total de usuarios: {filteredUsuarios.length}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Usuarios;
