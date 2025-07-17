import { useParams } from 'react-router-dom';
import HadeethDiscription from './HadeethDiscription';
import JuzDiscription from './JuzDiscription';
import Revelation_Order from './Revelation_Order';
import SurahDiscription from './SurahDiscription';

const DiscriptionHandler = () => {
  const { type, id } = useParams(); // Get 'type' and 'id' from the URL

  switch (type) {
    case 'surah':
      return <SurahDiscription surahId={id} />;
    case 'Juz':
      return <JuzDiscription juzId={id} />;
    case 'Revelation':
      return <Revelation_Order RevelateId={id} />;
    case 'Hadeeth':
      return <HadeethDiscription hadeethId={id} />;
    default:
      return (
        <div className="text-red-500 text-center">
          Invalid Type {console.log('ID Type:', typeof id, 'ID Value:', id)}
        </div>
      );
  }
};

export default DiscriptionHandler;
