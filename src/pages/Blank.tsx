import { ContentHeader } from '@components';

const Blank = () => {
  return (
    <div>
      <ContentHeader title="Blank Page" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              Aquí puedes crear tu aplicación increible!
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blank;
