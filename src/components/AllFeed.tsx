import React, { useEffect, useState } from "react";
import Mainlayout from "../layout/Mainlayout";
import "../css/Allfeed.css";
import {
  DeletingFeed,
  useFetchFeedDataQuery,
  useUpdateFeedMutation,
} from "../queries/allda";
import { useQueryClient } from "@tanstack/react-query";

interface FeedItem {
  _id: string;
  title: string;
  description: string;
  level: string;
  expires_at: string;
  FeedImgVi: any; // Assuming this is the field for images
}

const AllFeed = () => {
  const { isPending, data, error } = useFetchFeedDataQuery();
  const queryClient = useQueryClient();
  const { mutate: deleteFeed } = DeletingFeed();
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Partial<FeedItem>>({});
  const { mutate: updateFeed } = useUpdateFeedMutation();

  const handleEditButtonClick = (feedId: string) => {
    setEditItemId(feedId);
    const feedToEdit = data?.data.find((item: FeedItem) => item._id === feedId);
    if (feedToEdit) {
      const { expires_at } = feedToEdit;
      const date = new Date(expires_at);

      console.log("Expire at:", expires_at, date, date.toLocaleString());

      setEditedData(feedToEdit);
    }
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateButtonClick = async (feedId: string) => {
    console.log(feedId);
    const updateData = { id: feedId, data: editedData };
    updateFeed(updateData);
  };

  const deleteButtonClick = (feedId: string) => {
    deleteFeed(feedId);
    queryClient.invalidateQueries({ queryKey: ["all-feed"] });
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
                  <span className="allfeedno">{index + 1}.</span>
                </div>

                <div className="middle_feed">
                  {editItemId === feedItem._id ? (
                    <div>
                      <input
                        type="text"
                        name="title"
                        value={editedData.title || ""}
                        onChange={handleEditInputChange}
                      />
                      <input
                        type="text"
                        name="description"
                        value={editedData.description || ""}
                        onChange={handleEditInputChange}
                      />
                      <select
                        name="level"
                        value={editedData.level || ""}
                        onChange={handleSelectChange}
                      >
                        <option value="p">Purple</option>
                        <option value="s">Saffron</option>
                        <option value="m">Marron</option>
                      </select>

                      <input
                        type="date"
                        name="expires_at"
                        // value={editedData.expires_at || ""}
                        value={
                          editedData.expires_at
                            ? new Date(editedData.expires_at)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={handleEditInputChange}
                      />
                    </div>
                  ) : (
                    <div>
                      <h3 className="h3feed">{feedItem.title}</h3>
                      <h5 className="des">{feedItem.description}</h5>
                    </div>
                  )}
                </div>
                <div className="third_feed">
                  {editItemId === feedItem._id ? (
                    <button
                      onClick={() => handleUpdateButtonClick(feedItem._id)}
                      className="update-button"
                    >
                      Update
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditButtonClick(feedItem._id)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  )}
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
