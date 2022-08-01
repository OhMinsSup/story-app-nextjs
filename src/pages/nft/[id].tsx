import React from 'react';

// hooks
import { useRouter } from 'next/router';

// api

// components
import { NFTsMedia, AccordionInfo, RightSection } from '@components/nft';
import { Layout } from '@components/ui/Layout';

function NFTsDetailPage() {
  const router = useRouter();
  const id = router.query.id?.toString();

  return (
    <Layout
      styles={() => ({
        body: {
          height: '100%',
        },
        main: {
          padding: 0,
        },
      })}
    >
      <div
        className={`nc-NftDetailPage  ${'className'}`}
        data-nc-id="NftDetailPage"
      >
        {/* MAIn */}
        <main className="container mt-11 flex">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
            {/* CONTENT */}
            <div className="space-y-8 lg:space-y-10">
              {/* HEADING */}
              <NFTsMedia />

              <AccordionInfo />
            </div>

            {/* SIDEBAR */}
            <div className="pt-10 lg:pt-0 xl:pl-10 border-t-2 border-neutral-200 dark:border-neutral-700 lg:border-t-0">
              <RightSection />
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default NFTsDetailPage;
