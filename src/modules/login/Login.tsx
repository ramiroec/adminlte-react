//Login.tsx;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { setCurrentUser } from '@store/reducers/auth';
import { setWindowClass } from '@app/utils/helpers';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Form, InputGroup } from 'react-bootstrap';
import { Button } from '@app/styles/common';

const Login = () => {
  const [isAuthLoading, setAuthLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [t] = useTranslation();

  const login = async (email: string, password: string) => {
    setAuthLoading(true);
    try {
      if (email === 'admin@example.com' && password === 'admin') {
        const user = { email };
        dispatch(setCurrentUser(user));
        toast.success('Login is successful!');
        navigate('/');
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed');
    } finally {
      setAuthLoading(false);
    }
  };

  const { handleChange, values, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: 'admin@example.com',
      password: 'admin',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  setWindowClass('hold-transition login-page');

  return (
    <div style={styles.loginBox}>
      <div style={styles.card}>
        <div style={styles.cardBody}>
          <p style={styles.loginMsg}>{t('Ingrese su usuario y contraseña para iniciar sesión')}</p>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <InputGroup>
                <Form.Control
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={values.email}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                  style={styles.input}
                />
                {touched.email && errors.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                )}
              </InputGroup>
            </div>

            <div style={styles.inputGroup}>
              <InputGroup>
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={values.password}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                  style={styles.input}
                />
                {touched.password && errors.password && (
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                )}
              </InputGroup>
            </div>

            <div style={styles.row}>
              <div style={styles.loginButtonContainer}>
                <Button
                  loading={isAuthLoading}
                  onClick={handleSubmit as any}
                  style={styles.loginButton}
                >
                  {isAuthLoading ? 'Cargando...' : t('login.button.signIn.label')}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  loginBox: {
    backgroundColor: '#E4FBFC',
    width: '400px',
    margin: '0 auto',
    padding: '20px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    border: '3px solid #B0F0F5',
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: '10px',
  },
  cardHeader: {
    display: 'flex', // Utiliza flexbox para la alineación
    justifyContent: 'center', // Centra el contenido horizontalmente
    alignItems: 'center', // Centra el contenido verticalmente
    padding: '10px',
  },
  
  logo: {
    maxWidth: '70%',
    height: 'auto',
    marginBottom: '20px',
  },
  cardBody: {
    padding: '20px',
  },
  loginMsg: {
    color: '#6B7280',
   // textAlign: 'center',
    fontSize: '14px',
    marginBottom: '40px',
    padding: '15px',
  },
  inputGroup: {
    marginBottom: '25px',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '10px 20px',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
  },
  loginButtonContainer: {
    flex: '0 0 100%',
  },
  loginButton: {
    backgroundColor: '#1CBED2',
    color: '#FFFFFF',
    border: 'none',
    padding: '5px 5px',
    borderRadius: '10px',
    width: '50%',
    margin: '0 auto',
    display: 'block',
  },
};

export default Login;
