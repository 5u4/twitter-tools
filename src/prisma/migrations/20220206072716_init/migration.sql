-- CreateTable
CREATE TABLE "tweets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "tweets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "following" BOOLEAN DEFAULT false
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "tweet_id" TEXT NOT NULL,
    CONSTRAINT "Media_tweet_id_fkey" FOREIGN KEY ("tweet_id") REFERENCES "tweets" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
