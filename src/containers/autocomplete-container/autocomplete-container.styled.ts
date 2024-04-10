import Stack from "@mui/material/Stack";
import { styled } from "@mui/material";

export const ContentWrapper = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(8),
  alignItems: "center",
}));
