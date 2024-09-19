import axios from 'axios';
import { companyInfoLink } from '../constants/urls';

async function fetchCompanyInfo(refnr: string) {
  try {
    // const refNummer = base64.encode(refnr);

    const res = await axios.get(`${companyInfoLink}${refnr}`, {
      headers: {
        'X-API-KEY': 'jobboerse-jobsuche',
      },
    });

    const data = res.data;

    return data;
  } catch (err) {
    return null;
  }
}

export { fetchCompanyInfo };
