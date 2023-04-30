import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const SubjectCard = ({ schoolId, subject }) => {
  const url = schoolId
    ? `/schools/${schoolId}/subjects/${subject._id}`
    : `/subjects/${subject._id}`;

  return (
    <Link href={url}>
      <Card sx={{ height: 150, aspectRatio: 1 }}>
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: "center", fontSize: "1.5rem", fontWeight: "bold" }}
          >
            {subject.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SubjectCard;
