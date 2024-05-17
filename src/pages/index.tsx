import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const pages = [
    '2darray',
    'bitsweeper',
    'dot',
    'gradiusTest',
    'rpg',
    'slitherio',
    'breakBlock',
    'effect',
  ];

  return (
    <div>
      <h1>Pages:</h1>
      <ul>
        {pages.map((page) => (
          <li key={page} onClick={() => router.push(page)}>
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
