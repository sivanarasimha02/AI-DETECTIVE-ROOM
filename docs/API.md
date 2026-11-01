# AI Detective Room - API Specification

All backend endpoints use the prefix `/api/v1`.

## Base URL
`http://localhost:5001/api/v1`

## Authentication (`/auth`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/register` | Register new detective account | No |
| POST | `/auth/login` | Login and receive secure HttpOnly JWT | No |
| POST | `/auth/logout` | Invalidate cookie session | Yes |
| GET | `/auth/me` | Return authenticated user profile & preferences | Yes |

### Register Request
```json
{
  "username": "detective_holmes",
  "email": "holmes@bakerstreet.com",
  "password": "StrongPassword123!"
}
```

### Login Request
```json
{
  "email": "holmes@bakerstreet.com",
  "password": "StrongPassword123!"
}
```

---

## Cases (`/cases`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/cases` | List all available cases with status & difficulty | No (or User) |
| GET | `/cases/:caseId` | Get public case briefing, scene config, and initial objectives | Yes |
| GET | `/cases/:caseId/evidence` | Get discoverable evidence definitions (without canonical answers) | Yes |
| GET | `/cases/:caseId/suspects` | Get suspect profiles, alibis, and initial statements | Yes |
| POST | `/cases/:caseId/documents` | Upload approved case documents (PDF/TXT) | Admin/Authorized |

---

## Investigations (`/investigations`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/investigations` | Start or initialize an investigation for a case | Yes |
| GET | `/investigations/:id` | Load saved investigation progress & state | Yes |
| PATCH | `/investigations/:id/progress` | Checkpoint scene position and state | Yes |
| POST | `/investigations/:id/evidence/:evidenceId` | Record validated evidence discovery | Yes |
| PATCH | `/investigations/:id/board` | Save evidence board cards, pins, and strings | Yes |
| POST | `/investigations/:id/notes` | Save detective journal notes | Yes |
| POST | `/investigations/:id/chat` | Ask the Gemini Detective Assistant evidence-grounded questions | Yes |
| POST | `/investigations/:id/hints` | Request progressive hints (Level 1, 2, or 3) | Yes |
| POST | `/investigations/:id/verdict` | Submit final culprit and evidence theory for authoritative scoring | Yes |
| GET | `/investigations/:id/results` | Retrieve final case results, score breakdown, and explanation | Yes |

---

## Security & Grounding Principles
- **Canonical Protection:** Canonical solution, perpetrator identity, and exact score criteria are strictly stored server-side.
- **RAG Grounding:** The Gemini assistant only references verified evidence items and approved case files.
- **Rate Limiting:** Chat, hint, and auth endpoints are protected against rapid automated spam.

