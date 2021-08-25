import { MockIllustrationItem } from "@api/local/get-mock-illustractions";
import { Avatar } from "@chakra-ui/react";
import React from "react";
import { FaFolderPlus, FaHeart } from "react-icons/fa";

interface CardProps {
  item: MockIllustrationItem;
}
const Card: React.FC<CardProps> = ({ item }) => {
  return (
    <li
      className="shot-thumbnail shot-thumbnail-container"
    >
      <div
        className="shot-thumbnail-base disabled-shot-section dribbble-shot dribbble"
      >
        <figure
          style={{ backgroundColor: item.background_color }}
          className="shot-thumbnail-placeholder"
        >
          <img
            alt={item.description}
            width="330"
            height="247"
            className="lazyautosizes lazyloaded"
            src={item.image}
          />
        </figure>
        <a
          className="shot-thumbnail-link dribbble-links"
          href="/shots/16310207-Website-Design-Landing-page-for-mobile-app-Banka"
        >
          <span className="accessibility-text">
            {item.name}
          </span>
        </a>
        <div className="shot-thumbnail-overlay">
          <div className="shot-thumbnail-overlay-content">
            <div className="shot-title">
              {item.name}
            </div>

            <ul className="shot-actions-container">
              <li className="shot-action">
                <a
                  className="bucket-shot form-btn"
                  title="Save shot"
                  href="/shots/16310207-Website-Design-Landing-page-for-mobile-app-Banka/bucketings/new"
                >
                  <FaFolderPlus
                    enableBackground="new 0 0 24 24"
                    className="icon text-gray-800"
                  />
                </a>
              </li>

              <div className="shot-action">
                <a
                  className="form-btn stats-action like-shot"
                  id="shots-like-button"
                  rel="no-follow"
                  title="Like this shot"
                  href="/miahajaz/likes?modal=false&amp;on_hover=true&amp;screenshot_id=16310207-Website-Design-Landing-page-for-mobile-app-Banka"
                >
                  <FaHeart
                    enableBackground="new 0 0 24 24"
                    className="icon text-gray-800"
                  />
                  <span className="accessibility-text">Like</span>
                </a>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div
        className="shot-details-container visible"
      >
        <div className="user-information">
          <a className="hoverable url" rel="contact" href="/bravewings">
            {item.profileImageUrl
              ? <img
                className="photo lazyloaded"
                alt={item.nickname}
                data-src={item.profileImageUrl}
                src={item.profileImageUrl}
              />
              : <Avatar
                bg="teal.500"
                className="photo"
              />}
            <span className="display-name">{item.nickname}</span>
          </a>
        </div>
        <div className="shot-statistics-container">
          <div className="shot-statistic space-x-1">
            <FaHeart
              enableBackground="new 0 0 24 24"
              className="icon text-gray-800"
            />
            <span className="font-semibold text-gray-800">
              20
            </span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;
