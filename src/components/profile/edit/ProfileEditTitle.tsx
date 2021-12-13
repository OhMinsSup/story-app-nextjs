import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PAGE_ENDPOINTS } from '@constants/constant';
import { safeDataId } from '@utils/utils';

interface ProfileEditTitleProps {
  nikcname?: string;
}
const ProfileEditTitle: React.FC<ProfileEditTitleProps> = ({ nikcname }) => {
  const router = useRouter();
  const id = router.query.id?.toString();

  return (
    <>
      <div className="relative">
        <div className="slat-header user relative mb-8">
          <div className="slat-details ml-3">
            <h1 className="p-0 text-base font-medium">
              {id && (
                <Link href={PAGE_ENDPOINTS.PROFILE.DETAIL(safeDataId(id))}>
                  <a>
                    <span className="display-name text-gray-800">
                      {nikcname}
                    </span>
                  </a>
                </Link>
              )}
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
          /* padding-left: 52px; */
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
            /* padding-left: 60px; */
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
