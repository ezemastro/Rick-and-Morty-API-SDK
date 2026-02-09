interface APIClientConfig {
  baseUrl: string;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  // TODO - handle different body types (e.g., JSON, FormData)
  body?: any;
  queryParams?: Record<string, any>;
}

export class APIClient {
  private baseUrl: string;

  constructor(config: APIClientConfig) {
    this.baseUrl = config.baseUrl;
  }

  async request<T> (endpoint: string, options?: RequestOptions): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (options?.queryParams) {
      Object.entries(options.queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    const response = await fetch(url.toString(), {
      method: options?.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      body: JSON.stringify(options?.body),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
  }
}