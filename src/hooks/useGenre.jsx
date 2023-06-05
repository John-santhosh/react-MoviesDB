export const useGenres = (selectedGenres) => {
  if (selectedGenres.length < 1) {
    return "";
  }
  console.log(selectedGenres);
  const GenresId = selectedGenres.map((item) => {
    return item.id;
  });
  console.log(GenresId);
  return GenresId.reduce((acc, curr) => acc + "," + curr);
};
