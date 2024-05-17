export const environment = {
  urlPattern: '^(https?|ftp):\/\/([a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}|localhost)(:\d{2,5})?(\/[a-zA-Z0-9._%+-\/\?=&#]*)?$',
  baseUrl: 'http://localhost:8080/api',
  roles: {
    'Invitado': 10,
    'Supervisor': -1,
    'Implementador': 2,
    'Comercial': 4,
    'Almacen': 6,
    'Juridico': 8
  },
  production: true
};
