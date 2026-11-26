// tests/api/helpers.ts
export const API_BASE_URL = 'http://localhost:3000';

export interface ApiResponse<T = any> {
  status: number;
  data: T;
}

export async function apiRequest<T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  endpoint: string,
  options?: {
    body?: Record<string, any>;
    headers?: Record<string, any>;
  }
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    const data = (await response.json().catch(() => ({}) as T)) as T;

    return {
      status: response.status,
      data,
    };
  } catch (error) {
    throw new Error(`API Request failed: ${error}`);
  }
}

export const API = {
  usuarios: {
    listar: () => apiRequest('GET', '/usuarios'),
    criar: (body: Record<string, any>) => apiRequest('POST', '/usuarios', { body }),
    obter: (id: string) => apiRequest('GET', `/usuarios/${id}`),
    atualizar: (id: string, body: Record<string, any>) => apiRequest('PUT', `/usuarios/${id}`, { body }),
    deletar: (id: string) => apiRequest('DELETE', `/usuarios/${id}`),
  },
  produtos: {
    listar: () => apiRequest('GET', '/produtos'),
    criar: (body: Record<string, any>) => apiRequest('POST', '/produtos', { body }),
    obter: (id: string) => apiRequest('GET', `/produtos/${id}`),
    atualizar: (id: string, body: Record<string, any>) => apiRequest('PUT', `/produtos/${id}`, { body }),
    deletar: (id: string) => apiRequest('DELETE', `/produtos/${id}`),
  },
  carrinhos: {
    listar: () => apiRequest('GET', '/carrinhos'),
    criar: (body: Record<string, any>) => apiRequest('POST', '/carrinhos', { body }),
    obter: (id: string) => apiRequest('GET', `/carrinhos/${id}`),
    deletar: (id: string) => apiRequest('DELETE', `/carrinhos/${id}`),
  },
  login: {
    executar: (body: Record<string, any>) => apiRequest('POST', '/login', { body }),
  },
};
