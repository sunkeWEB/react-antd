import React, { useEffect } from 'react';

const Home = (props:any) => (
  <div onClick={() => {
    props?.ok?.();
  }}
  >
    hello,
  </div>
);

export default Home;
