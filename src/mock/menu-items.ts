export const menu_items: MenuItem[] = [
  {
    icon: '../../../../assets/icons/users-group.svg',
    name: 'Gestión del Personal',
    items: [
      {
        name: 'Usuarios del Sistema',
        path: './users'
      },
      {
        name: 'Control de Dependientes',
        path: './dependents'
      },
      {
        name: 'Control de Trabajadores',
        path: './workers'
      },
    ]
  },
  {
    icon: '../../../../assets/icons/products.svg',
    name: 'Gestión de Productos',
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
        name: 'Registro de Entidades',
        path: './entities'
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
