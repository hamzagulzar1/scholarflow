import { LiaUniversitySolid } from "react-icons/lia";
import { MdOutlineCastForEducation, MdSchool } from "react-icons/md";

const OverviewCard = ({ data, type }) => {
	return (
		<div className="min-w-96 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			{type === "programCount" && <LiaUniversitySolid size={40} color="white" />}
			{type === "topPrograms" && <MdOutlineCastForEducation size={40} color="white" />}
			{type === "totalScholarships" && <MdSchool size={40} color="white" />}

			<div className="mt-4">
				<h5 className="mb-2 text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
					{type === "programCount" && "Total Programs Offered"}
					{type === "topPrograms" && "Top 5 Programs Across BS,MS,PhD"}
					{type === "totalScholarships" && "Total Scholarships Available"}
				</h5>
			</div>
			<p className="mb-3 font-semibold text-xl text-white">
				{data} {type === "totalScholarships" ? "Scholarships" : "Programs"}
			</p>
		</div>
	);
};

export default OverviewCard;
