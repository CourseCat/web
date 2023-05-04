import { Card, CardContent, Grid, Link, Typography } from "@mui/material";

export default function CourseGridItem({ course }) {
  return (
    <Grid item xs={12} md={6} lg={4} key={course._id}>
      <Link
        href={`/courses/${course._id}`}
        underline="none"
        sx={{ textDecoration: "none" }}
      >
        <Card>
          <CardContent>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              {course.courseNumber}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {course.name}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              {course.school.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxHeight: "4.5em",
              }}
            >
              {course.description}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}
