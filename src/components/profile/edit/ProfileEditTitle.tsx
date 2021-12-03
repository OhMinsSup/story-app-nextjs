import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PAGE_ENDPOINTS } from '@constants/constant';
import { safeDataId } from '@utils/utils';

interface ProfileEditTitleProps {}
const ProfileEditTitle: React.FC<ProfileEditTitleProps> = () => {
  const router = useRouter();
  const id = router.query.id?.toString();

  return (
    <>
      <div className="relative">
        <div className="slat-header user relative mb-8">
          <div className="slat-details ml-3">
            <h1 className="p-0 text-base font-medium">
              <Link href={PAGE_ENDPOINTS.PROFILE.DETAIL(safeDataId(id))}>
                <a>
                  <picture>
                    <source
                      srcSet="https://cdn.dribbble.com/users/4714321/avatars/normal/open-uri20200123-26444-dmet7r?1579773018"
                      media="(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-device-pixel-ratio: 1.5), (min-resolution: 1.5dppx)"
                    />
                    <source srcSet="https://cdn.dribbble.com/users/4714321/avatars/small/open-uri20200123-26444-dmet7r?1579773018" />
                    <img
                      className="photo"
                      alt="OhMinSeop"
                      src="https://cdn.dribbble.com/users/4714321/avatars/small/open-uri20200123-26444-dmet7r?1579773018"
                    />
                  </picture>
                  <span className="display-name text-gray-800">OhMinSeop</span>
                </a>
              </Link>
              <span className="sep">/</span>
              <span className="text-base font-medium">프로필 수정</span>
            </h1>
          </div>
        </div>
      </div>
      <style jsx>{`
        .slat-header {
          min-height: 48px;
        }

        .slat-header.user {
          min-height: 40px;
          padding-left: 52px;
        }

        h1 span.sep {
          margin: 0 2px;
          color: #dbdbde;
          font-weight: normal;
          text-shadow: none;
        }

        .slat-header img.photo {
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        @media (min-width: 768px) {
          .slat-header img.photo {
            width: 48px;
            height: 48px;
          }
        }

        @media (min-width: 768px) {
          .slat-header.user {
            padding-left: 60px;
          }
        }

        @media (min-width: 768px) {
          .slat-header.user h1 {
            font-size: 20px;
            font-weight: 500;
            line-height: 29px;
          }
        }
      `}</style>
    </>
  );
};

export default ProfileEditTitle;
