import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { getPieData } from "@/utils/programs";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
	labels: ["Red", "Blue", "Yellow"],
	datasets: [
		{
			label: "# of Votes",
			data: [12, 19, 3],
			backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 159, 64, 0.2)"],
			borderColor: ["rgba(255, 99, 132, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
			borderWidth: 1,
		},
	],
};

const DegreesPieChart = () => {
	return (
		<div className="h-[300px] w-[500px]">
			<Pie data={data} />;
		</div>
	);
};

export default DegreesPieChart;
