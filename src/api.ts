export const fetchArtworks = async (page: number) => {
  const response = await fetch(
    `https://api.artic.edu/api/v1/artworks?page=${page}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fectch artworks");
  }
  return response.json();
};
