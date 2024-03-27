import { LiaUniversitySolid } from "react-icons/lia";
import { MdOutlineCastForEducation } from "react-icons/md";

const OverviewCard = ({ data, type }) => {
	return (
		<div className="min-w-96 p-6  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			{type == "programCount" ? (
				<LiaUniversitySolid size={40} color="white" />
			) : (
				<MdOutlineCastForEducation size={40} color="white" />
			)}
			<div className="mt-4">
				<h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
					{type == "programCount" ? "Total Programs Offered" : "Top 5 Programs Across BS,MS,PhD"}
				</h5>
			</div>
			<p className="mb-3 font-normal text-gray-500 dark:text-gray-400">{data}</p>
		</div>
	);
};

export default OverviewCard;
