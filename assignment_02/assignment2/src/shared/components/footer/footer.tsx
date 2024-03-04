import { Container, Typography } from "@mui/material";

function Footer() {
  return (
    <>
      <footer
        style={{
          marginTop: "20px",
          backgroundColor: "#f5f5f5",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="body1">
            &copy; {new Date().getFullYear()} Your Website Name. All rights
            reserved.
          </Typography>
        </Container>
      </footer>
    </>
  );
}

export default Footer;
