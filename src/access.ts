// src/access.ts
export default function access(initialState: { user?: API.CurrentUser | undefined }) {
  const { user } = initialState || {};
  return {
    canAdmin: user?.role === 'admin',
  };
}
