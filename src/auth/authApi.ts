import axios from 'axios';
import querystring from 'querystring';
import { authSuffix, headers, host } from '../Constants/urls';

async function getJwt() {
  const data = querystring.stringify({
    client_id: 'c003a37f-024f-462a-b36d-b001be4cd24a',
    client_secret: '32a39620-32b3-4307-9aa1-511e3d7f48a8',
    grant_type: 'client_credentials',
  });

  const response = await axios.post(`https://${host}/${authSuffix}`, data, {
    headers,
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    // validateStatus: false,
  });

  return response.data.access_token;
}

export default getJwt;
