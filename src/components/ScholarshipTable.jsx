"use client";
import { useState } from "react";

const ScholarshipTable = ({ data }) => {
	const [scholarships, setScholarships] = useState(data.scholarships);

	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3">
							Scholarship name
						</th>
						<th scope="col" className="px-6 py-3">
							Description
						</th>
						<th scope="col" className="px-6 py-3">
							Criteria
						</th>
						<th scope="col" className="px-6 py-3">
							Link
						</th>
					</tr>
				</thead>
				<tbody>
					{scholarships.map((scholarship, index) => (
						<tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
							<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
								{scholarship.scholarship_name}
							</th>
							<td className="px-6 py-4">{scholarship.desc}</td>
							<td className="px-6 py-4">{scholarship.criteria}</td>
							<td className="px-6 py-4">
								<a
									target="_blank"
									href={scholarship.url}
									className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
								>
									Link
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ScholarshipTable;
