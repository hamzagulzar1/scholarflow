import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "@/app/globals.css";

import Accordian from "@/components/Accordian";
import DegreesPieChart from "@/components/DegreesPieChart";
import OverviewCard from "@/components/OverviewCard";
import ScholarshipTable from "@/components/ScholarshipTable";
import Navbar from "@/components/Navbar";

const tabs = ["Overview", "Programs", "Academic Fields", "Admissions", "Scholarships"];

const UniversityPage = () => {
	const router = useRouter();
	const { university } = router.query;
	const [activeTab, setActiveTab] = useState(tabs[0]);
	const [universityData, setUniversityData] = useState({});
	const [admissionsData, setAdmissionsData] = useState({});
	const [scholarshipsData, setScholarshipsData] = useState({});
	const [loading, setLoading] = useState(true);

	const tickRef = useRef(
		<svg
			className="w-3 h-3 text-green-500"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 16 12"
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M1 5.917 5.724 10.5 15 1.5"
			/>
		</svg>
	);

	const crossRef = useRef(
		<svg
			className="w-3 h-3 text-red-500"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 14 14"
		>
			<path
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
			/>
		</svg>
	);

	// Fetch university data when the component mounts or when the active tab changes
	const fetchUniversityData = async () => {
		setLoading(true);
		const response = await fetch(`/api/universities?name=${encodeURIComponent(university)}`);
		const data = await response.json();
		setUniversityData(data);

		// Now that we have the university data, we can fetch admissions and scholarships data
		const admissionsResponse = await fetch(`/api/admissions?name=${encodeURIComponent(university)}`);
		const admissionsData = await admissionsResponse.json();
		setAdmissionsData(admissionsData);

		const scholarshipsResponse = await fetch(`/api/scholarships?name=${encodeURIComponent(university)}`);
		const scholarshipsData = await scholarshipsResponse.json();
		setScholarshipsData(scholarshipsData);
		setLoading(false);
	};

	useEffect(() => {
		if (!university) return;
		fetchUniversityData().catch(console.error);
	}, [university]);

	// Function to handle clicking a tab
	const handleTabClick = async (tab) => {
		setActiveTab(tab);
	};

	const renderDegrees = (degrees) => {
		return Object.entries(degrees).map(([degree, isOffered]) => (
			<li key={degree}>
				{degree}: {isOffered ? "Available" : "Not available"}
			</li>
		));
	};

	return (
		<div className="min-h-screen relative">
			<Navbar />
			<div className="fixed top-0 left-0 w-full h-full -z-10 bg-opacity-60 bg-transparent">
				<Image src="/bg-image.png" alt="Background" layout="fill" objectFit="cover" quality={100} />
			</div>
			<div className="container mx-auto p-4">
				<h1 className="text-4xl font-bold mb-8 text-center">{universityData.university_name}</h1>
				<div className="mb-4">
					{tabs.map((tab, index) => (
						<button
							key={index}
							className={`px-4 py-2 mr-2 ${activeTab === tab ? "text-blue-500 border-b-2 border-blue-500" : ""}`}
							onClick={() => handleTabClick(tab)}
						>
							{tab}
						</button>
					))}
				</div>

				<div className="relative">
					{activeTab === "Overview" && (
						<div className="mt-5 absolute left-[20%]">
							<div className="flex gap-5 justify-center items-center">
								<OverviewCard
									data={universityData?.programs
										?.filter(
											(program) =>
												program.degrees_offered.Bachelor &&
												program.degrees_offered.Master &&
												program.degrees_offered.Doctoral
										)
										.slice(0, 5)
										.map((program) => program.field_of_study)
										.join(", ")}
									type={"topPrograms"}
								/>
								<OverviewCard data={universityData?.programs?.length} type={"programCount"} />
							</div>
							<div className="ml-16 mt-6">
								<DegreesPieChart universityData={universityData} />
							</div>
						</div>
					)}
					{activeTab === "Programs" && (
						<div className="relative overflow-x-auto">
							<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
								<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
									<tr>
										<th scope="col" className="px-6 py-3">
											Programs Offered
										</th>
										<th scope="col" className="px-6 py-3">
											Bachelors
										</th>
										<th scope="col" className="px-6 py-3">
											Masters
										</th>
										<th scope="col" className="px-6 py-3">
											PHD
										</th>
									</tr>
								</thead>
								<tbody>
									{universityData.programs?.map((program, index) => (
										<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
											<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
												{program.field_of_study}
											</th>
											<td className="px-6 py-4">
												{program.degrees_offered.Bachelor ? tickRef.current : crossRef.current}
											</td>
											<td className="px-6 py-4">
												{program.degrees_offered.Master ? tickRef.current : crossRef.current}
											</td>
											<td className="px-6 py-4">
												{program.degrees_offered.Doctoral ? tickRef.current : crossRef.current}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
					{activeTab === "Academic Fields" && <Accordian universityData={universityData} />}
					{activeTab === "Admissions" && (
						<div className="json-container">
							<pre>{JSON.stringify(admissionsData, null, 2)}</pre>
						</div>
					)}
					{activeTab === "Scholarships" && (
						<div className="json-container">
							<ScholarshipTable data={scholarshipsData} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default UniversityPage;
