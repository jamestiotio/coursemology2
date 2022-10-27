import { createRoot } from 'react-dom/client';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ProviderWrapper from 'lib/components/wrappers/ProviderWrapper';
import AccountSettings from './AccountSettings';

$(() => {
  const mountNode = document.getElementById('user-admin-component');
  if (!mountNode) return;

  const root = createRoot(mountNode);

  root.render(
    <ProviderWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/user/profile/edit" element={<AccountSettings />} />
        </Routes>
      </BrowserRouter>
    </ProviderWrapper>,
  );
});
