import { BarChart, PieChart } from "@mui/x-charts";
import { useHome } from "../../hooks/home/useHome";
import logo from "/src/assets/github-mark.png";

function Home() {
  const { actions, state } = useHome();
  const { toggleModal, viewDetails } = actions;
  const { activities } = state;

  console.log(activities);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column-reverse",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          alignSelf: "flex-end",
          margin: 15,
        }}
      >
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
          <img src={logo} style={{ height: 30, width: 30, marginRight: 10 }} />
          Source Code
        </a>
      </div>
      <>
        {activities && (
          <PieChart
            series={[
              {
                data: activities,
                innerRadius: 30,
                outerRadius: 250,
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
      </>
      <>
        <p>The data shown is a reflection of the</p>
      </>
      <>
        <h1>My Fitbit Trends</h1>
      </>
    </div>
  );
}

export { Home };
