import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);
export default function ResponsiveGrid(props) {
    const {list} = props;
  return (
    <div>
      <Box sx={{ flexGrow: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {list.map((item, index) => (
            <Grid item xs={6} sm={4} md={4} key={index}>
              <Item>
                {" "}
                {/* This is the Card container */}
                <CardContent>
                  {/* Display item information */}
                  <Typography variant="h5">{item.name}</Typography>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography color="green">{item.price}</Typography>
                    <Typography color="orange">{item.category}</Typography>
                  </div>
                </CardContent>
                <Button variant="contained" fullWidth>
                  Add To Cart
                </Button>
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button align="left" variant="contained" color="primary">
                    Edit
                  </Button>
                  <Button align="right" variant="contained" color="error">
                    Delete
                  </Button>
                </CardActions>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}