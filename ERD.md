# ERD - Todo List Application

## Visual ERD Diagram

```
┌────────────────────────────────────────────────────────────────┐
│                            Todo                                 │
├────────────────────────────────────────────────────────────────┤
│ PK  id          INTEGER     PRIMARY KEY AUTO_INCREMENT          │
│     title       VARCHAR     NOT NULL                            │
│     description TEXT        NULL                                │
│     completed   BOOLEAN     DEFAULT FALSE                       │
│     startDate   DATETIME    NULL                                │
│     deadline    DATETIME    NULL                                │
│     createdAt   DATETIME    DEFAULT CURRENT_TIMESTAMP           │
│     updatedAt   DATETIME    AUTO UPDATE                         │
└────────────────────────────────────────────────────────────────┘
```

## Detail Schema

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | Int | PK, Auto Increment | Unique identifier |
| title | String | Required | Judul todo |
| description | String | Optional | Deskripsi todo |
| completed | Boolean | Default: false | Status selesai |
| startDate | DateTime | Optional | Tanggal mulai |
| deadline | DateTime | Optional | Batas waktu |
| createdAt | DateTime | Auto: now() | Tanggal dibuat |
| updatedAt | DateTime | Auto update | Tanggal diubah |

