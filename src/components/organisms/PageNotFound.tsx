import { Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function PageNotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography gutterBottom sx={{ color: "text.primary", fontSize: 24 }}>
            Oops! The page doesn't exist
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
