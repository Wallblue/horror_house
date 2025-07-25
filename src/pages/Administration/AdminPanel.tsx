import {Container, Typography} from "@mui/material";

interface AdminPanelProps{
  title: string;
  children: React.ReactNode;
}

export default function AdminPanel({title, children} : AdminPanelProps) {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {children}
    </Container>
  );
};
