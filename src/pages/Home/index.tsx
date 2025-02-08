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
} from "@mui/material";

function Home() {
  const { actions, state } = useHome();
  const { searchByDate } = actions;
  const { activities, dateData } = state;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
        }}
      >
        <Container>
          <Card
            style={{ minHeight: 400, display: "flex", alignItems: "center" }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                height: "100%",
              }}
            >
              <h3 style={{ textAlign: "center", height: 40 }}>
                {} Workout Summary
              </h3>
              <List style={{ minHeight: 250 }}>
                {dateData.isSuccess &&
                  dateData.data.map((dateItem) => {
                    const imgSrc = image_map[dateItem.activityParentName]
                      ? image_map[dateItem.activityParentName]
                      : image_map.other;

                    return (
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar src={imgSrc} />
                        </ListItemAvatar>
                        <ListItemText>
                          {dateItem.activityParentName} for{" "}
                          {Math.trunc(dateItem.duration / 1000 / 60)} minutes
                        </ListItemText>
                      </ListItem>
                    );
                  })}
              </List>
            </div>
            <div style={{ flex: 1 }}>
              <DateCalendar onChange={(val) => searchByDate(val)} />
            </div>
          </Card>
          <br />
          <Card style={{ minHeight: 400, padding: 10 }}>
            <h2>Recent Workout Trends</h2>
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
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
          <br />
          <br />

          <Card style={{ padding: 10 }}>
            <>
              <a
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  alignSelf: "flex-end",
                }}
                href=""
                target="__blank"
              >
                <img
                  src={logo}
                  style={{ height: 30, width: 30, marginRight: 10 }}
                />
                Source Code
              </a>
            </>
          </Card>
          <br />
        </Container>
      </div>
    </LocalizationProvider>
  );
}

export { Home };
