# Prompt 05 — React Frontend and Deployment Boundaries

Read the master prompt, roles/modules docs and architecture docs. Implement `frontend/`.

## Requirements
- Use React + TypeScript with Vite and React Router.
- Create routes for institution, scrutiny, clearances, executive and audit views.
- Use a restrained administrative/government-service design: compact tables, plain forms, clear status labels, accessible focus states and useful loading/empty/error states.
- Do not copy official logos or imply the prototype is an official government website.
- Show source/evidence/limitations on verification screens.
- Mock data must be labeled as simulated.
- Connect only to Spring Boot API using `VITE_API_BASE_URL`; do not call Python service directly.
- Add environment files that contain no secrets.
- Add unit/component tests and a production build.
- Document Vercel deployment and separate Preview/Production environment variables.
- Configure CORS allowlist in backend documentation.
- Do not add real login claims before an identity provider is configured.

## Acceptance
- `npm ci`, `npm test` and `npm run build` succeed.
- All routes render with synthetic data.
- Error/loading/empty states are present.
- API base URL is environment-configured.
