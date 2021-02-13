import React from 'react';
import { ToastContainer } from 'react-toastify';
import { shallowEqual, useSelector } from 'react-redux';
import OpaqueLayer from '~/components/common/OpaqueLayer';
import { RootState } from '~/store/modules';
import AuthModalContainer from '../auth/AuthModalContainer';

interface CoreProps {}
function Core(_: CoreProps) {
  const layer = useSelector<RootState, boolean>(
    ({ system }) => system.layer,
    shallowEqual
  );

  return (
    <>
      <OpaqueLayer visible={layer} />
      <AuthModalContainer />
      <ToastContainer />
    </>
  );
}

export default Core;
