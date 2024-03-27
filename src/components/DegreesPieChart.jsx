import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DegreesPieChart = ({ universityData }) => {
	const [degreeCounts, setDegreeCounts] = useState({ bachelors: 0, masters: 0, phd: 0 });

	useEffect(() => {
		if (universityData.academic_fields) {
			setDegreeCounts({
				bachelors: universityData.academic_fields["Bachelor's Degree"].split(", ").length,
				masters: universityData.academic_fields["Master's Degree/ M. Phil"].split(", ").length,
				phd: universityData.academic_fields["PhD"].split(", ").length,
			});
		}
	}, [universityData]);

	const data = {
		labels: ["Bachelors", "Masters", "PhD"],
		datasets: [
			{
				label: "Degree Distribution",
				data: [degreeCounts.bachelors, degreeCounts.masters, degreeCounts.phd],
				backgroundColor: [
					"rgba(255, 0, 0, 0.2)", // Bright Red
					"rgba(0, 255, 255, 0.2)", // Bright Cyan
					"rgba(255, 215, 0, 0.2)", // Gold
				],
				borderColor: [
					"rgba(255, 0, 0, 1)", // Bright Red
					"rgba(0, 255, 255, 1)", // Bright Cyan
					"rgba(255, 215, 0, 1)", // Gold
				],
				borderWidth: 1,
			},
		],
	};

	const options = {
		plugins: {
			tooltip: {
				callbacks: {
					label: function (context) {
						let label = context.label || "";
						if (label) {
							label += " degrees: ";
						}
						if (context.parsed !== null) {
							label += context.parsed;
						}
						return label;
					},
				},
			},
			legend: {
				labels: {
					color: "#fff",
				},
			},
		},
	};

	return (
		<div className="h-[380px] w-[350px] p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			<h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
				Number of Degrees Offered
			</h5>
			<Pie data={data} options={options} />
		</div>
	);
};

export default DegreesPieChart;
