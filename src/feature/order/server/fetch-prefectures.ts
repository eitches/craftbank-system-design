import { prefectureRepository } from "@/api/repository/prefecture-repository";

export const fetchPrefectures = async () => {
  try {
    return await prefectureRepository.getAll();
  } catch (error) {
    console.error(error);
    return [];
  }
};
