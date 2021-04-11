import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../reducks/users/operetions';

const Home = () => {
  const dispatch = useDispatch();
  return(
    <div>
      hello,world
      <button onClick={() => dispatch(signOut())}>
        サインアウト
      </button>
    </div>
  )
}

export default Home;