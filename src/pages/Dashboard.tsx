import { ContentHeader, SmallBox } from '@components';
import {
  faChartSimple,
  faCartShopping,
  faUserPlus,
  faChartPie,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dashboard = () => {
  return (
    <div>
      <ContentHeader title="Dashboard" />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <SmallBox
                title="Nuevas Ordenes"
                text="70"
                navigateTo="#"
                variant="info"
                icon={{
                  content: (
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      style={{ fontSize: '62px' }}
                    />
                  ),
                }}
              />
            </div>
            <div className="col-lg-3 col-6">
              <SmallBox
                title="Bounce Rate"
                text="53 %"
                navigateTo="#"
                variant="success"
                icon={{
                  content: (
                    <FontAwesomeIcon
                      icon={faChartSimple}
                      style={{ fontSize: '62px' }}
                    />
                  ),
                }}
              />
            </div>
            <div className="col-lg-3 col-6">
              <SmallBox
                title="Usuarios Registrados"
                text="44"
                navigateTo="#"
                variant="primary"
                icon={{
                  content: (
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      style={{ fontSize: '62px' }}
                    />
                  ),
                }}
              />
            </div>
            <div className="col-lg-3 col-6">
              <SmallBox
                title="Unique Visitors"
                text="65"
                navigateTo="#"
                variant="danger"
                icon={{
                  content: (
                    <FontAwesomeIcon
                      icon={faChartPie}
                      style={{ fontSize: '62px' }}
                    />
                  ),
                  variant: 'success',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
