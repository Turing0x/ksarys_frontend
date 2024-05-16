export const menu_items: MenuItem[] = [
  {
    icon: '../../../../assets/icons/users-group.svg',
    name: 'Control del Personal',
    items: [
      {
        name: 'Registro de Usuarios',
        path: './users'
      },
      {
        name: 'Dependientes',
        path: './dependents'
      },
      {
        name: 'Trabajadores',
        path: './workers'
      },
    ]
  },
  {
    icon: '../../../../assets/icons/products.svg',
    name: 'Control de Productos',
    items: [
      {
        name: 'Clasificaciones',
        path: ''
      },
      {
        name: 'Almacenes',
        path: ''
      },
      {
        name: 'Productos',
        path: ''
      },
      {
        name: 'Ofertas a la Venta',
        path: ''
      },
    ]
  },
  {
    icon: '../../../../assets/icons/world.svg',
    name: 'Datos Globales',
    items: [
      {
        name: 'Entidades',
        path: ''
      },
      {
        name: 'Utensilios',
        path: ''
      },
      {
        name: 'Activos Fijos',
        path: ''
      },
      {
        name: 'Cuentas Contables',
        path: ''
      },
      {
        name: 'Comprobantes',
        path: ''
      },
    ]
  },
  
];

export interface MenuItem {
  icon:  string;
  name:  string;
  items: Item[];
}

export interface Item {
  name: string;
  path: string;
}
