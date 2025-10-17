export const storagePath = {
  article: ({
    userId,
    articleId,
    fileNameWithExtension,
  }: {
    userId: string;
    articleId: string;
    fileNameWithExtension: string;
  }) => `users/${userId}/articles/${articleId}/${fileNameWithExtension}`,
  user: ({
    userId,
    fileNameWithExtension,
  }: {
    userId: string;
    fileNameWithExtension: string;
  }) => `users/${userId}/${fileNameWithExtension}`,
};
