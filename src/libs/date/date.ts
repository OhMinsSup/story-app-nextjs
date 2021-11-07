export const formatDiffText = (time?: string | number | null) => {
  if (!time) {
    return '-';
  }

  const now = Date.now();
  const diff = now - new Date(time).getTime();
  const diffText =
    diff < 60000
      ? `${Math.floor(diff / 1000)}초 전`
      : diff < 3600000
      ? `${Math.floor(diff / 60000)}분 전`
      : diff < 86400000
      ? `${Math.floor(diff / 3600000)}시간 전`
      : diff < 604800000
      ? `${Math.floor(diff / 86400000)}일 전`
      : diff < 2592000000
      ? `${Math.floor(diff / 604800000)}주 전`
      : diff < 31536000000
      ? `${Math.floor(diff / 2592000000)}달 전`
      : `${Math.floor(diff / 31536000000)}년 전`;

  return diffText;
};
