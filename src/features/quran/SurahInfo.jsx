import { useParams } from 'react-router-dom';

function SurahInfo() {
  const { id } = useParams();
  return (
    <div className="mt-32 h-screen grid place-items-center text-5xl font-black">
      SurahInfo{id}
    </div>
  );
}

export default SurahInfo;
