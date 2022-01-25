import React from 'react';
import { Button } from '@mui/material';

export interface ErrorScreenTemplateProps {
  image: string;
  message: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const ErrorScreenTemplate: React.FC<ErrorScreenTemplateProps> = ({
  image,
  message,
  buttonText,
  onButtonClick,
}) => {
  return (
    <>
      <div className="error-screen">
        <img src={image} alt="error-image" />
        <div className="message">{message}</div>
        {buttonText && (
          <div className="button-wrapper">
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          </div>
        )}
      </div>
      <style jsx global>{`
        .error-screen {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .error-screen img {
          width: 20rem;
          height: auto;
        }

        .error-screen .message {
          padding-left: 1rem;
          padding-right: 1rem;
          white-space: pre;
          text-align: center;
          line-height: 1.5;
          font-size: 2.5rem;
          margin-top: 2rem;
        }

        .error-screen .button-wrapper {
          margin-top: 2rem;
        }

        @media (max-width: 768px) {
          .error-screen img {
            width: 12rem;
          }

          .error-screen .button-wrapper {
            margin-top: 1rem;
          }

          .error-screen .message {
            font-size: 1.5rem;
            margin-top: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default ErrorScreenTemplate;
