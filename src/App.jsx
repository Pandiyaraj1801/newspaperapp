import axios from "axios";
import React, { useState, useEffect } from "react";
import AppBar from "./appbar/AppBar.jsx";
import ErrorScreen from "./error/errror.jsx";
import LoaderImg from "./loader/Loader.jsx";
import "../src/app.css";

function App() {
  const [newsData, setNewsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://newspaper-api-56kk.onrender.com/getUserdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setNewsData(res.data.articles);
          setError(false);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <div>
      {error == null ? (
        <LoaderImg></LoaderImg>
      ) : error !== false ? (
        <ErrorScreen></ErrorScreen>
      ) : (
        <div>
          <AppBar></AppBar>
          <div className="news-container">
            {newsData.map((val, index) => {
              return (
                <div className="news-card" key={index}>
                  <div className="img-card">
                    <img src={val.urlToImage} alt={val.author} />
                  </div>
                  <div className="content-box">
                    <p className="content">
                      {val.content}Lorem Ipsum is simply dummy text of the
                      printing and typesetting industry. when an unknown printer
                      took a galley of type and scrambled it to make a type
                      specimen book.
                    </p>
                    <dl>
                      <dt className="descr-header">Description</dt>
                      <dd className="descr">{val.description}</dd>
                    </dl>
                    <div>
                      <span className="pub-header">PublishedAt:</span>
                      <span className="pub-content">{val.publishedAt}</span>
                    </div>

                    <div>
                      <span className="auth-header">Author:</span>
                      <span className="author">{val.author}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
