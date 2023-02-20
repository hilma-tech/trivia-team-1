import {
  Typography,
  Button,
  Input,
  ThemeProvider,
  TextField,
} from "@material-ui/core";

const Test = () => (
  <>
    <Typography variant="h1">הנה טקסט בערבית</Typography>
    <Typography variant="p">הנה פסקה בעברית</Typography>
    <Button variant="contained" color="primary">
      פריימרי
    </Button>
    <Button variant="contained" color="secondary">
      סקונדרי
    </Button>
    <Input placeholder="שם"
          variant="standard"
        />
  </>
);
export default Test;
