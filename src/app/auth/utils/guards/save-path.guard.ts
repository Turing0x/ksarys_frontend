import type { CanActivateChildFn } from '@angular/router';

export const savePathGuard: CanActivateChildFn = (childRoute, state) => {

  let element_id = '1';
  const pathToElementIdMap = {
    'all-products': '2',
    'cart': '3',
    'category-list': '3',
    'coins': '4',
    'main-content': '1',
    'orders': '6',
    'pendings': '5',
    'products-list': '1',
    'profile': '8',
    'storage': '7',
    'users-list': '2',
    'wish-list': '4',
  };

  const pathSegment = state.url.split('/')[2] as keyof typeof pathToElementIdMap;
  if (pathSegment.includes('details') || pathSegment.includes('query')) {
    element_id = '2';
  } else {
    element_id = pathToElementIdMap[pathSegment] || '1';
  }

  localStorage.setItem('lastPath', state.url);
  localStorage.setItem('activeMenu', element_id);
  return true;
};
