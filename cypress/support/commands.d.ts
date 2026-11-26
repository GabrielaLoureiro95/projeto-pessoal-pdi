// cypress/support/commands.d.ts
declare namespace Cypress {
  interface Chainable {
    apiRequest(
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
      endpoint: string,
      options?: {
        body?: Record<string, any>;
        headers?: Record<string, any>;
      }
    ): Chainable<any>;
    API(): typeof import('./api').API;
  }
}
