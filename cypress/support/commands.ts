/// <reference types="cypress" />
import { apiRequest, API } from './api';

Cypress.Commands.add('apiRequest', apiRequest);
Cypress.Commands.add('API', () => API);
