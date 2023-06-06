import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const CustomPagination = ({ setPage, page, numOfPages = 10 }) => {
  const handlePageChange = (event, value) => {
    // setPage(page);
    setPage(value);
    window.scroll(0, 0);
  };
  return (
    <Stack
      spacing={2}
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Pagination
        count={numOfPages}
        onChange={handlePageChange}
        color="primary"
        hideNextButton
        hidePrevButton
        page={page}
      />
    </Stack>
  );
};

export default CustomPagination;
