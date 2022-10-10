import React from 'react';

// components
import { Divider } from '@mantine/core';
import { NFTsForm } from '@components/nft';
import { Layout } from '@components/ui/Layout';
import { NFTsRegisterSeo } from '@components/ui/Seo';
import { ModalsProvider } from '@mantine/modals';

function NFTsRegisterPage() {
  return (
    <>
      <div className="max-w-2xl">
        <h2 className="text-3xl sm:text-4xl font-semibold">NFT 만들기</h2>
        <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
          선호하는 표시 이름을 설정하고 프로필 URL을 만들고 기타 개인 설정을
          관리할 수 있습니다.
        </span>
      </div>
      <Divider my="xs" />
      <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
        <NFTsForm />
      </div>
    </>
  );
}

export default NFTsRegisterPage;

NFTsRegisterPage.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      <NFTsRegisterSeo />
      <ModalsProvider>
        <div className="container">
          <div className="my-12 sm:lg:my-16 lg:my-24 max-w-4xl mx-auto space-y-8 sm:space-y-10">
            {page}
          </div>
        </div>
      </ModalsProvider>
    </Layout>
  );
};
