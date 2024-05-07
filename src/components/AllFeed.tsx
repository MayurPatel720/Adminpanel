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
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { Image } from "primereact/image";
import { FileUpload } from "primereact/fileupload";
import { ListBox } from "primereact/listbox";
import { Chips } from "primereact/chips";

interface FeedItem {
  _id: string;
  title: string;
  description: string;
  level: string;
  expires_at: string;

  attachments: any[];
  attachmentsToDelete: any[];
}

const AllFeed = () => {
  const [visibleRight, setVisibleRight] = useState<boolean>(false);
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Partial<FeedItem>>({});
  const [selectedFile, setSelectedFile] = useState<Array<File>>([]);

  const [selectedFeedType, setSelectedFeedType] = useState<string>("latest");
  const { isPending, data, isError, error } = useFetchFeedDataQuery({
    feedType: [selectedFeedType],
  });

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
    const formData = new FormData();
    Array.from(selectedFile).forEach((file, index) => {
      formData.append(`FeedImgVi`, file, file.name);
    });
    formData.append("id", feedId);
    formData.append("title", editedData.title || "");
    formData.append("description", editedData.description || "");
    formData.append("level", editedData.level || "");
    formData.append("expires_at", editedData.expires_at || "");
    if (
      editedData.attachmentsToDelete &&
      editedData.attachmentsToDelete.length > 0
    ) {
      editedData.attachmentsToDelete.forEach((attachmentUrl, index) => {
        formData.append(`attachmentsToDelete[${index}]`, attachmentUrl);
      });
    }
   
    updateFeed({ id: feedId, data: formData });

    setEditItemId(null);
    setVisibleRight(false);
  };

  const handleDeleteImage = (attachmentUrl: string) => {
    console.log("Deleting image with URL:", attachmentUrl);
    setEditedData((prevData) => ({
      ...prevData,
      attachmentsToDelete: [attachmentUrl],
    }));
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

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const truncateDescription = (description: string, maxLength: number) => {
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  const handleFeedTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFeedType(e.target.value);
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

  const confirm = (feedItem: FeedItem) => {
    confirmPopup({
      target: document.body,
      message: "Do you want to delete this record?",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: () => {
        deleteButtonClick(feedItem._id);
      },
      reject: () => {
        toast.current?.show({
          severity: "warn",
          summary: "Rejected",
          detail: "You have rejected",
          life: 3000,
        });
      },
    });
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
            <select
              style={{ width: "150px", marginBottom: "15px" }}
              value={selectedFeedType}
              onChange={handleFeedTypeChange}
            >
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
              <option value="oldest">Oldest</option>
            </select>
            {/* {JSON.stringify(data.data[0].users)} */}

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
                    {/* <Chips
                      value={editedData.users?.map((user) => user.name) || []}
                      onChange={(e) => {
                        const userToDelete =
                          Array.isArray(e.value) && e.value.length > 0
                            ? e.value[0]
                            : "";
                        handleDeleteUser(userToDelete);
                        setEditedData((prevData) => ({
                          ...prevData,
                          users:
                            prevData.users?.filter(
                              (user) => user.name !== userToDelete
                            ) || [],
                        }));
                      }}
                    /> */}

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

                    <FileUpload
                      name="demo[]"
                      url="api/svfsdv"
                      multiple
                      accept="image/*"
                      maxFileSize={1000000}
                      onSelect={(e) => {
                        setSelectedFile((prev) => [...prev, ...e.files]);
                      }}
                    />

                    <div className="card flex" style={{ overflow: "scroll" }}>
                      {editedData.attachments &&
                      editedData.attachments.length > 0 ? (
                        editedData.attachments.map(
                          (
                            attachment: {
                              _id: string;
                              url: string | undefined;
                            },
                            index: number
                          ) => (
                            <div key={index} className="image-container">
                              <Image
                                src={attachment.url}
                                alt={`Image ${index + 1}`}
                                width="200"
                                height="200"
                                preview
                                onError={(e) =>
                                  console.error("Error loading image:", e)
                                }
                              />

                              <Button
                                className="delete-button"
                                icon="pi pi-trash"
                                onClick={() =>
                                  attachment.url &&
                                  handleDeleteImage(attachment.url)
                                }
                              />
                            </div>
                          )
                        )
                      ) : (
                        <div>No images found</div>
                      )}
                    </div>
                    {/* <div className="field col-12 md:col-4">
                      <Chips
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          marginTop: "10px",
                          width: "100%",
                        }}
                        itemTemplate={CustomChip}
                        value={selectedNames.map((city) => {
                          return JSON.stringify({
                            name: city.name,
                            url: city.url,
                          });
                        })}
                        onChange={(e: ChipsChangeEvent) => {
                          if (e.value) {
                            const selectedCities = e.value.map(
                              (value: string) => JSON.parse(value)
                            );
                            setSelectedNames(selectedCities);
                          }
                        }}
                        separator=","
                      />

                      <ListBox
                        filter
                        multiple
                        value={selectedNames}
                        onChange={(e) => setSelectedNames(e.value)}
                        options={cities}
                        optionLabel="name"
                        itemTemplate={(option: City) => (
                          <div className="p-multiselect-representative-option">
                            <img
                              src={option.url}
                              alt={option.name}
                              width="30"
                              height="30"
                            />
                            <span>{option.name}</span>
                          </div>
                        )}
                        className="w-full"
                      />
                    </div> */}

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
                  <ConfirmPopup />
                  <Button
                    onClick={() => confirm(feedItem)}
                    icon="pi pi-times"
                    label="Delete"
                  ></Button>
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
