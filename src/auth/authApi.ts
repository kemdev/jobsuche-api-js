import axios from 'axios';
import querystring from 'querystring';
import { authSuffix, host } from '../constants/urls';

async function getJwt(): Promise<string | {}> {
  const data = querystring.stringify({
    client_id: 'c003a37f-024f-462a-b36d-b001be4cd24a',
    client_secret: '32a39620-32b3-4307-9aa1-511e3d7f48a8',
    grant_type: 'client_credentials',
  });

  try {
    const response = await axios.post(`https://${host}${authSuffix}`, data);
    return response.data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      console.error('Error details:', error.toJSON());
    } else {
      console.error('Unexpected error:', error);
    }
    return {
      error: error,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    };
    // throw error;
  }
}

export default getJwt;
