import { useUserStore } from '@/stores/user';

type Headers = {
  Authorization: string;
};
class Fetch {
  private static composeHeaders(): Headers {
    const userStore = useUserStore();
    return {
      Authorization: userStore.token?.encryptedToken
        ? userStore.token?.encryptedToken
        : '',
    };
  }
  public static async get(url: string): Promise<Response> {
    return fetch(`${process.env.VUE_APP_API_URL}${url}`, {
      method: 'GET',
      headers: this.composeHeaders(),
    });
  }
  public static async post(
    url: string,
    body: any,
    nonJson = false
  ): Promise<Response> {
    return fetch(`${process.env.VUE_APP_API_URL}${url}`, {
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
    return fetch(`${process.env.VUE_APP_API_URL}${url}`, {
      method: 'PUT',
      headers: this.composeHeaders(),
      body: nonJson ? body : JSON.stringify(body),
    });
  }

  public static async delete(url: string): Promise<Response> {
    return fetch(`${process.env.VUE_APP_API_URL}${url}`, {
      method: 'DELETE',
      headers: this.composeHeaders(),
    });
  }
}

export default Fetch;
