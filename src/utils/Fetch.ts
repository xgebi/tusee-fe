import { useUserStore } from '@/stores/user';

type Headers = {
  Authorization: string;
};
class Fetch {
  private static composeHeaders(): Headers {
    const userStore = useUserStore();
    return {
      Authorization: userStore.getJwtToken
        ? userStore.getJwtToken
        : localStorage.getItem('token') ?? '',
    };
  }
  public static async get(url: string): Promise<Response> {
    return fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      method: 'GET',
      headers: this.composeHeaders(),
    });
  }
  public static async post(
    url: string,
    body: any,
    nonJson = false
  ): Promise<Response> {
    return fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      method: 'POST',
      headers: this.composeHeaders(),
      body: nonJson ? body : JSON.stringify(body),
    });
  }

  public static async put(
    url: string,
    body: any,
    nonJson = false
  ): Promise<Response> {
    return fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      method: 'PUT',
      headers: this.composeHeaders(),
      body: nonJson ? body : JSON.stringify(body),
    });
  }

  public static async delete(
    url: string,
    body: string | object | Array<any>,
    nonJson = false
  ): Promise<Response> {
    const processedBody: string = nonJson
      ? (body as string)
      : JSON.stringify(body);
    return fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      method: 'DELETE',
      headers: this.composeHeaders(),
      body: processedBody,
    });
  }
}

export default Fetch;
