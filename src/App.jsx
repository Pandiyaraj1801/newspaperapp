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
    const today = new Date();
    today.setDate(today.getDate() - 1);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const previousDate = `${year}-${month}-${day}`;

    axios
      .get(
        `https://newsapi.org/v2/everything?q=tesla&from=${previousDate}&sortBy=publishedAt&apiKey=5b21cfd79046481e91f216d22d686c33`
      )
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
