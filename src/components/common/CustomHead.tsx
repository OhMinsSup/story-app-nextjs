import React from 'react';
import Script from 'next/script';

const CustomHead = () => {
  return (
    <>
      <Script
        src="https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://www.gstatic.com/firebasejs/8.4.1/firebase-analytics.js"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          // TODO: Add SDKs for Firebase products that you want to use
          // https://firebase.google.com/docs/web/setup#available-libraries
        
          // Your web app's Firebase configuration
          // For Firebase JS SDK v7.20.0 and later, measurementId is optional
          const firebaseConfig = {
            apiKey: "AIzaSyAcpUGHqIAup5_2iAogflpfmwNyoZSrfv4",
            authDomain: "story-push-message.firebaseapp.com",
            projectId: "story-push-message",
            storageBucket: "story-push-message.appspot.com",
            messagingSenderId: "753509563937",
            appId: "1:753509563937:web:14b67d913f2947095d2d60",
            measurementId: "G-N69G0M8781"
          };
        
          // Initialize Firebase
          const app = initializeApp(firebaseConfig);
          const analytics = getAnalytics(app);
        `,
        }}
      />
    </>
  );
};

export default CustomHead;
