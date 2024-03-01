import React, { useEffect, useRef, useState } from "react";
import Mainlayout from "../layout/Mainlayout";
import "../css/Allfeed.css";
import {
  DeletingFeed,
  useFetchFeedDataQuery,
  useUpdateFeedMutation,
} from "../queries/allda";
import { useQueryClient } from "@tanstack/react-query";
import { ProgressSpinner } from "primereact/progressspinner";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

interface FeedItem {
  _id: string;
  title: string;
  description: string;
  level: string;
  expires_at: string;
  FeedImgVi: any;
}

const AllFeed = () => {
  const [visibleRight, setVisibleRight] = useState<boolean>(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Partial<FeedItem>>({});
  const { isPending, data, isError, error } = useFetchFeedDataQuery();
  const queryClient = useQueryClient();
  const {
    mutate: deleteFeed,
    isError: isdeleteerror,
    isSuccess: isdeletesuccess,
  } = DeletingFeed();
  const {
    mutate: updateFeed,
    isSuccess: isUpdateSuccess,
    isError: isUpdateerror,
  } = useUpdateFeedMutation();

  const handleEditButtonClick = (feedId: string) => {
    setEditItemId(feedId);
    const feedToEdit = data?.data.find((item: FeedItem) => item._id === feedId);
    if (feedToEdit) {
      const { expires_at } = feedToEdit;
      const date = new Date(expires_at);
      setEditedData(feedToEdit);
    }
    setVisibleRight(true);
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
    const updateData = { id: feedId, data: editedData };
    updateFeed(updateData);
    setEditItemId(null);
    setVisibleRight(false);
  };

  const deleteButtonClick = (feedId: string) => {
    deleteFeed(feedId);
    queryClient.invalidateQueries({ queryKey: ["all-feed"] });
  };
  const toast = useRef<Toast | null>(null);
  useEffect(() => {
    if (isUpdateSuccess) {
      toast.current?.show({
        severity: "info",
        summary: "Confirmed",
        detail: "Update done",
        life: 3000,
      });
    } else if (isUpdateerror) {
      toast.current?.show({
        severity: "warn",
        summary: "Rejected",
        detail: "Not Updated",
        life: 3000,
      });
    } else if (isdeleteerror) {
      toast.current?.show({
        severity: "warn",
        summary: "Rejected",
        detail: "Not Deleted",
        life: 3000,
      });
    } else if (isdeletesuccess) {
      toast.current?.show({
        severity: "info",
        summary: "Confirmed",
        detail: "Deleted",
        life: 3000,
      });
    }
  }, [isUpdateSuccess, isUpdateerror, isdeleteerror, isdeletesuccess]);

  useEffect(() => {
    if (isUpdateSuccess) {
      queryClient.invalidateQueries({ queryKey: ["all-feed"] });
    }
  }, [isUpdateSuccess]);
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const truncateDescription = (description: string, maxLength: number) => {
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  const toggleDescription = (feedId: string) => {
    const feedToToggle = data?.data.find(
      (item: FeedItem) => item._id === feedId
    );
    if (feedToToggle) {
      const fullDescription = feedToToggle.description;
      setEditedData((prevData) => ({
        ...prevData,
        description: fullDescription,
      }));
    }
  };

  return (
    <Mainlayout>
      <Toast ref={toast}></Toast>
      <div className="all_container">
        <h3>Feed Data</h3>
        {isPending && (
          <div className="loa">
            <div className="loader">
              <ProgressSpinner />
            </div>
          </div>
        )}
        {isError && (
          <div className="ia">
            <img
              style={{ width: "90%" }}
              src="https://motionarray.imgix.net/preview-1495654-q6kPWs8bbUiplaHn-large.jpg?w=660&q=60&fit=max&auto=Q"
              alt="Error"
            />
          </div>
        )}
        {data && data.success && (
          <div>
            <h4>{data.message}</h4>

            {data.data.map((feedItem: FeedItem, index: number) => (
              <div key={feedItem._id} className="feed-item">
                <div className="start_feed">
                  <span className="allfeedno">{index + 1}.</span>
                </div>
                <Sidebar
                  className="saasd"
                  visible={visibleRight && editItemId === feedItem._id}
                  position="right"
                  onHide={() => {
                    setVisibleRight(false);
                    setEditItemId(null);
                  }}
                >
                  <h2>Update</h2>
                  <div className="sideaa">
                    <input
                      type="text"
                      name="title"
                      value={editedData.title || ""}
                      onChange={handleEditInputChange}
                    />
                    <textarea
                      name="description"
                      value={editedData.description || ""}
                      onChange={handleTextAreaChange}
                      rows={4}
                      cols={40}
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
                      value={
                        editedData.expires_at
                          ? new Date(editedData.expires_at)
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
                      onChange={handleEditInputChange}
                    />
                    <Button
                      onClick={() => handleUpdateButtonClick(feedItem._id)}
                      className="update-button"
                      label="Update"
                    />
                  </div>
                </Sidebar>

                <div className="middle_feed">
                  <div>
                    <h3 className="h3feed">{feedItem.title}</h3>
                    <h5
                      className="des"
                      onClick={() => toggleDescription(feedItem._id)}
                    >
                      {truncateDescription(feedItem.description, 30)}
                    </h5>
                  </div>
                </div>
                <div className="third_feed">
                  <button
                    onClick={() => {
                      handleEditButtonClick(feedItem._id);
                      setVisibleRight(true);
                    }}
                    className="edit-button"
                  >
                    Edit
                  </button>
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
