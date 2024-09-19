// import axios from 'axios';
// import querystring from 'querystring';
// import { authSuffix, host } from '../Constants/urls';

// class AuthManager {
//   private static instance: AuthManager;
//   private accessToken: string | null = null;
//   private tokenPromise: Promise<void> | null = null;

//   private constructor() {}

//   public static getInstance(): AuthManager {
//     if (!AuthManager.instance) {
//       AuthManager.instance = new AuthManager();
//     }
//     return AuthManager.instance;
//   }

//   public initialize(clientId: string, clientSecret: string): void {
//     if (!this.tokenPromise) {
//       this.tokenPromise = this.fetchToken(
//         clientId,
//         clientSecret,
//         host,
//         authSuffix
//       );
//     }
//   }

//   private async fetchToken(
//     clientId: string,
//     clientSecret: string,
//     host: string,
//     authSuffix: string
//   ): Promise<void> {
//     const data = querystring.stringify({
//       client_id: clientId,
//       client_secret: clientSecret,
//       grant_type: 'client_credentials',
//     });

//     try {
//       const response = await axios.post(`https://${host}${authSuffix}`, data);
//       this.accessToken = response.data.access_token;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error('Axios error:', error.message);
//         console.error('Error details:', error.toJSON());
//       } else {
//         console.error('Unexpected error:', error);
//       }
//       throw error;
//     }
//   }

//   public async getAccessToken(): Promise<string> {
//     if (this.tokenPromise) {
//       await this.tokenPromise;
//       this.tokenPromise = null; // Reset tokenPromise after fetching the token
//     }
//     if (!this.accessToken) {
//       throw new Error(
//         'Access token is not initialized. Please initialize the authentication first:\n' +
//           `const auth = () => authManager.initialize(clientId, clientSecret);`
//       );
//     }
//     return this.accessToken;
//   }
// }

// export default AuthManager.getInstance();


import axios from 'axios';
import querystring from 'querystring';
import { authSuffix, host } from '../constants/urls';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  clientid: string;
}

class AuthManager {
  private static instance: AuthManager;
  private accessToken: string | null = null;
  private tokenExpiresAt: number | null = null;
  private clientId: string | null = null;
  private clientSecret: string | null = null;

  private constructor() {}

  public static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  public async initialize(
    clientId: string,
    clientSecret: string
  ): Promise<void> {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    await this.refreshToken(); // Initialize or refresh token
  }

  private async fetchToken(): Promise<void> {
    if (!this.clientId || !this.clientSecret) {
      throw new Error('Client ID or Client Secret not set.');
    }

    const data = querystring.stringify({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'client_credentials',
    });

    try {
      const response = await axios.post<TokenResponse>(
        `https://${host}${authSuffix}`,
        data
      );
      this.accessToken = response.data.access_token;
      this.tokenExpiresAt = Date.now() + response.data.expires_in * 1000; // Convert seconds to milliseconds
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        console.error('Error details:', error.toJSON());
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  }

  public async getAccessToken(): Promise<string> {
    if (
      !this.accessToken ||
      !this.tokenExpiresAt ||
      this.tokenExpiresAt < Date.now()
    ) {
      await this.refreshToken();
    }
    return this.accessToken!;
  }

  private async refreshToken(): Promise<void> {
    await this.fetchToken();
  }
}

export default AuthManager.getInstance();