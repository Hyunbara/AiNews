export const fetchNews = async (query) => {
  const url = `http://localhost:5001/naver-news?query=${encodeURIComponent(query)}`;

  try {
    console.log("요청 URL:", url);
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`네이버 뉴스 API 호출 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log("네이버 뉴스 API 응답:", data);
    return data.items;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};
