import { render } from '@testing-library/react';

import LibsSharedGuardsProtectedRouteDataAccess from './protected-route';

describe('LibsSharedGuardsProtectedRouteDataAccess', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <LibsSharedGuardsProtectedRouteDataAccess />
    );
    expect(baseElement).toBeTruthy();
  });
});
