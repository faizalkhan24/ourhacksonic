import { useState, useEffect } from "react";
import axios from "axios";

const useArticleFetcher = () => {
  const [articlesByAPI, setArticlesByAPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_APIBASEURL;

  useEffect(() => {
    const pollInterval = 5000;
    const maxWaitTime = 50000;
    let elapsedTime = 0;

    const fetchArticles = async () => {
      const storedParams = localStorage.getItem("clientParams");
      if (!storedParams) return;

      const clientParams = JSON.parse(storedParams);
      if (!clientParams?.label || !clientParams?.classifications) {
        setLoading(false);
        setError("Invalid client parameters.");
        return;
      }

      const { label, classifications } = clientParams;
      const apiCalls = [];

      // Sentiment APIs
      for (const l of label) {
        if (classifications.includes("Sentiment")) {
          const sentimentAPIs = [
            {
              url: `${apiUrl}/sentiment?label=${encodeURIComponent(
                l
              )}&type=positive`,
              type: "Positive Sentiment",
              arrow: "↑",
              color: "#4caf50",
            },
            {
              url: `${apiUrl}/sentiment?label=${encodeURIComponent(
                l
              )}&type=negative`,
              type: "Negative Sentiment",
              arrow: "↓",
              color: "red",
            },
          ];

          sentimentAPIs.forEach(({ url, type, arrow, color }) => {
            apiCalls.push(
              axios.get(url).then((response) => ({
                label: type,
                classification: type,
                arrow,
                color,
                articles: response.data.map((item) => ({
                  title: (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                    >
                      {item.TITLE || "No Title"}
                    </a>
                  ),
                  location: item.LABEL || "No LABEL",
                  classification: type,
                  industry: item.INDUSTRY || "Unknown Industry",
                  date: item.DATE || "Unknown Date",
                  image:
                    item.IMAGE_LINK && item.IMAGE_LINK !== "#"
                      ? item.IMAGE_LINK
                      : "/logo/notfound.png",
                  timeline: item.TIMELINE || [],
                })),
              }))
            );
          });
        }
      }

      // Non-sentiment APIs
      for (const l of label) {
        for (const c of classifications) {
          if (c !== "Sentiment") {
            const url = `${apiUrl}/classify?label=${encodeURIComponent(
              l
            )}&classification=${encodeURIComponent(c)}`;
            console.log("API URL:", url);
            apiCalls.push(
              axios
                .get(url)
                .then((response) => {
                  const flattenedArticles = response.data.flat();
                  const uniqueArticles = Array.from(
                    new Map(flattenedArticles.map((item) => [item.LINK, item])).values()
                  );
                  if (uniqueArticles.length === 0) return null;

                  return {
                    label: l,
                    classification: c,
                    articles: uniqueArticles.map((item) => ({
                      title: (
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          {item.TITLE || "No Title"}
                        </a>
                      ),
                      location: item.LABEL || "No LABEL",
                      classification: item.CLASSIFICATION || "Unclassified",
                      industry: item.INDUSTRY || "Unknown Industry",
                      date: item.DATE || "Unknown Date",
                      image:
                        item.IMAGE_LINK && item.IMAGE_LINK !== "#"
                          ? item.IMAGE_LINK
                          : "/logo/notfound.png",
                      timeline: item.TIMELINE || [],
                    })),
                  };
                })
                .catch((err) => {
                  console.error(`Error fetching articles for ${l} - ${c}:`, err);
                  return null;
                })
            );
          }
        }
      }

      try {
        let results = await Promise.all(apiCalls);
        results = results.filter((item) => item !== null);
        results.sort((a, b) => b.articles.length - a.articles.length);
        setArticlesByAPI(results);
      } catch {
        setError("Error fetching articles.");
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setInterval(() => {
      if (localStorage.getItem("clientParams")) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        fetchArticles();
      } else {
        elapsedTime += pollInterval;
        if (elapsedTime >= maxWaitTime) {
          clearInterval(intervalId);
          setLoading(false);
          setError("No client parameters found.");
        }
      }
    }, pollInterval);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setLoading(false);
      setError("No client parameters found.");
    }, maxWaitTime);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return { articlesByAPI, loading, error };
};

export default useArticleFetcher;
