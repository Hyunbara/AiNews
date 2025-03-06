import { useState } from "react";
import { fetchNews } from "../../utils/apiClient";

function NewsList() {
  const [query, setQuery] = useState("");
  const [news, setNews] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    const newsData = await fetchNews(query);
    setNews(newsData);
  };

  return (
    <div>
      <h2>네이버 뉴스 검색</h2>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="검색어 입력" />
      <button onClick={handleSearch}>검색</button>
      <ul>
        {news.map((item, index) => (
          <li key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.title.replace(/<[^>]+>/g, "")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NewsList;
