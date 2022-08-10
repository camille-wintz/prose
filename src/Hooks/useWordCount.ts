import { useChapters } from "@/Hooks/useChapters";

export const useWordCount = () => {
  const { chapters } = useChapters();

  return {
    count: chapters?.reduce((acc, chapter) => {
      return acc + chapter.content.split(" ").length;
    }, 0),
  };
};
