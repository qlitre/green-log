-- 植物情報を保持するテーブル
CREATE TABLE plants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    species TEXT,
    description TEXT,
    thumbnail_key TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now'))
);

-- 写真とコメントのログを保持するテーブル
CREATE TABLE plant_logs (
    id TEXT PRIMARY KEY,
    plant_id TEXT NOT NULL,
    comment TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
);

-- 写真を保持するテーブル
CREATE TABLE plant_photos (
    id TEXT PRIMARY KEY,
    plant_log_id TEXT NOT NULL,
    photo_key TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (plant_log_id) REFERENCES plant_logs(id) ON DELETE CASCADE
);