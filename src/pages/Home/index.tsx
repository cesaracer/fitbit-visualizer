import { PieChart } from "@mui/x-charts";
import { useHome } from "../../hooks/home/useHome";
import logo from "/src/assets/github-mark.png";
import { image_map } from "../../constants/image-map";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Avatar,
  Card,
  Container,
  Divider,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { FitbitActivitySingle, ImageMap } from "../../types/types";

function Home() {
  const { actions, state } = useHome();
  const { searchByDate } = actions;
  const { activities, dateData } = state;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Typography variant="h1">My Fitbit Activity</Typography>
        <Divider />
        <br />
        <br />
        <Card style={{ minHeight: 400, display: "flex", alignItems: "center" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            {!dateData.isSuccess && !dateData.isPending && (
              <Typography style={{ textAlign: "center" }}>
                Use the calendar to view the workout summary for that date
              </Typography>
            )}

            {dateData.isPending && (
              <LinearProgress style={{ marginLeft: 10 }} />
            )}

            {dateData.isSuccess && (
              <>
                <Typography
                  style={{ textAlign: "center", justifySelf: "flex-start" }}
                  variant="h4"
                >
                  Workout Summary
                </Typography>
                <List>
                  {dateData.isSuccess &&
                    dateData.data.map((dateItem: FitbitActivitySingle) => {
                      const imgKey: string = dateItem.activityParentName;
                      const imgSrc: string = image_map[imgKey as keyof ImageMap]
                        ? image_map[imgKey as keyof ImageMap]
                        : image_map.other;

                      return (
                        <ListItem>
                          <div style={{ flex: 2, display: "flex" }}>
                            <ListItemAvatar>
                              <Avatar src={imgSrc} />
                            </ListItemAvatar>
                            <ListItemText>
                              <Typography variant="h6">
                                {dateItem.activityParentName}
                              </Typography>
                              {Math.trunc(dateItem.duration / 1000 / 60)}{" "}
                              minutes
                            </ListItemText>
                          </div>

                          <div style={{ flex: 1, display: "flex" }}>
                            <ListItemText style={{}}>
                              <Typography variant="subtitle1">
                                Calories
                              </Typography>
                              <Typography variant="body1">
                                {dateItem.calories}
                              </Typography>
                            </ListItemText>
                          </div>
                        </ListItem>
                      );
                    })}
                </List>
              </>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <DateCalendar
              disabled={dateData.isPending}
              onChange={(val) => searchByDate(val)}
            />
          </div>
        </Card>
        <br />
        <Card style={{ minHeight: 400 }}>
          <Typography style={{ padding: 15 }} variant="h4">
            Recent Workout Trends
          </Typography>
          {activities && (
            <PieChart
              height={400}
              series={[
                {
                  data: activities,
                  innerRadius: 30,
                  outerRadius: 150,
                  paddingAngle: 2,
                  cornerRadius: 4,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
            />
          )}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "black" }}>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    Rank
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    Exercise
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    Total Minutes
                  </TableCell>
                  <TableCell style={{ color: "white", textAlign: "center" }}>
                    Frequency
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities &&
                  activities.map((activity, index) => (
                    <TableRow key={activity.id}>
                      <TableCell style={{ textAlign: "center" }}>
                        {index + 1}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {activity.label}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {activity.value}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {activity.frequency}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        <br />
        <br />

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            position: "fixed",
            bottom: 10,
            right: 10,
          }}
        >
          <img src={logo} style={{ height: 30, width: 30, marginRight: 10 }} />
          <Link
            href="https://github.com/cesaracer/fitbit-visualizer"
            target="_blank"
          >
            <Typography>Source Code</Typography>
          </Link>
        </div>
        <br />
      </Container>
    </LocalizationProvider>
  );
}

export { Home };
