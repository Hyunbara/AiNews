const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = 5001;

app.use(cors());

const CLIENT_ID = process.env.VITE_NAVER_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_NAVER_CLIENT_SECRET;

app.get("/naver-news", async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: "검색어(query)가 필요합니다." });
  }

  const url = `https://openapi.naver.com/v1/search/news.json?query=${encodeURIComponent(query)}&display=10&start=1&sort=date`;

  try {
    console.log("🔍 [DEBUG] 요청 URL:", url);
    console.log("🔑 [DEBUG] 네이버 API 키:", CLIENT_ID, CLIENT_SECRET);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Naver-Client-Id": CLIENT_ID,
        "X-Naver-Client-Secret": CLIENT_SECRET,
      },
    });

    console.log("📡 [DEBUG] 네이버 API 응답 상태 코드:", response.status);

    if (!response.ok) {
      throw new Error(`네이버 뉴스 API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ [DEBUG] 네이버 뉴스 API 응답 데이터:", data);
    res.json(data);
  } catch (error) {
    console.error("❌ [ERROR] 네이버 뉴스 API 호출 중 오류 발생:", error);
    res.status(500).json({ error: "네이버 뉴스 API 호출 중 오류 발생" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ 백엔드 서버 실행 중: http://localhost:${PORT}`);
});
