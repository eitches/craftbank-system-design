export const createApplication = async (orderId: string) => {
  // TODO: 本実装後削除する
  console.info({ orderId });
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  await delay(300);
};
