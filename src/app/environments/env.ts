export class Environments {
  static urlPattern: string = '^(https?|ftp):\/\/([a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}|localhost)(:\d{2,5})?(\/[a-zA-Z0-9._%+-\/\?=&#]*)?$';
  static baseUrl: string = 'http://localhost:8080/api';
  // static baseUrl: string = 'https://ecommerce.byserverapp.com/api';

  static roles = {
    'Invitado': 10,
    'Supervisor': -1,
    'Implementador': 2,
    'Comercial': 4,
    'Almacen': 6,
    'Juridico': 8
  };

}