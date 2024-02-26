import React, { useEffect } from "react";
import Mainlayout from "../layout/Mainlayout";
import "../css/Allfeed.css";
import { DeletingFeed, useFetchDataQuery } from "../queries/allda";

interface FeedItem {
  _id: string;
  title: string;
  description: String;
}

const AllFeed = () => {
  const { mutate: fetchData, isPending, data, error } = useFetchDataQuery();
  const { mutate: deleteFeed } = DeletingFeed(); // Renamed DeleteFeed to deleteFeed

  useEffect(() => {
    fetchData();
  }, []);

  const handleButtonClick = () => {
    fetchData();
  };

  const deleteButtonClick = (feedId: string) => {
    deleteFeed(feedId); // Calling deleteFeed with feedId
  };

  return (
    <Mainlayout>
      <div className="all_container">
        <h3>Feed Data</h3>
        {data && data.success && (
          <div>
            <h4>{data.message}</h4>

            {data.data.map((feedItem: FeedItem, index: number) => (
              <div key={feedItem._id} className="feed-item">
                <div className="start_feed">
                  {
                    <span className="allfeedno">
                      {index + 1}
                      {"."}
                    </span>
                  }
                </div>

                <div className="middle_feed">
                  <h3 className="h3feed">
                    {"       "}
                    {feedItem.title}
                  </h3>
                  <h5 className="des">{feedItem.description}</h5>
                </div>
                <div className="third_feed">
                  <button
                    onClick={() => deleteButtonClick(feedItem._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {error && (
          <div>
            <h4>Error fetching data:</h4>
            <p>{error.message}</p>
          </div>
        )}
      </div>
    </Mainlayout>
  );
};

export default AllFeed;
