import axios from 'axios';

const getAccessToken = () => {
  const body = {
    grant_type: 'client_credentials',
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
  };

  //console.log(body);

  return axios.post('/api/getAccessToken', body);
};

export default getAccessToken;
