"use client";
import { useState } from "react";

const Accordian = ({ universityData }) => {
	const [isOpenTab1, setIsOpenTab1] = useState(false);
	const [isOpenTab2, setIsOpenTab2] = useState(false);
	const [isOpenTab3, setIsOpenTab3] = useState(false);

	const toggleTab1 = () => setIsOpenTab1(!isOpenTab1);
	const toggleTab2 = () => setIsOpenTab2(!isOpenTab2);
	const toggleTab3 = () => setIsOpenTab3(!isOpenTab3);

	console.log(universityData);

	const getListOfFields = (fieldsString) => {
		// Check if fieldsString is a string and not undefined
		if (typeof fieldsString === "string") {
			return fieldsString.split(", ").map((field, index) => (
				<li key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
					<svg
						className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
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
					<span>{field}</span>
				</li>
			));
		} else {
			// Return an empty array or any other default value
			return []; // or [<li key="none">No fields available</li>]
		}
	};

	return (
		<div id="accordion-open" data-accordion="open">
			<h2 id="accordion-open-heading-1">
				<button
					type="button"
					className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl dark:border-gray-700 dark:text-gray-400 gap-3"
					onClick={toggleTab1}
				>
					<span className="flex items-center text-black">Bachelors Programs</span>
					<svg
						data-accordion-icon
						className="w-3 h-3 rotate-180 shrink-0"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 10 6"
					>
						<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
					</svg>
				</button>
			</h2>
			<div id="accordion-open-body-1" className={`${!isOpenTab1 ? "hidden" : ""}`}>
				<div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
					<ul className="grid grid-cols-4 gap-2 space-y-2 text-left text-gray-500 dark:text-gray-400">
						{getListOfFields(universityData.academic_fields["Bachelor's Degree"])}
					</ul>
				</div>
			</div>
			<h2 id="accordion-open-heading-2">
				<button
					type="button"
					className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
					onClick={toggleTab2}
				>
					<span className="flex items-center text-black">Masters Programs</span>
					<svg
						data-accordion-icon
						className="w-3 h-3 rotate-180 shrink-0"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 10 6"
					>
						<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
					</svg>
				</button>
			</h2>
			<div id="accordion-open-body-2" className={`${!isOpenTab2 ? "hidden" : ""}`}>
				<div className="p-5 border border-b-0 border-gray-200 dark:bg-gray-900 dark:border-gray-700">
					<ul className="grid grid-cols-4 gap-2 space-y-2 text-left text-gray-500 dark:text-gray-400">
						{getListOfFields(universityData.academic_fields["Master's Degree/ M. Phil"])}
					</ul>
				</div>
			</div>
			<h2 id="accordion-open-heading-3">
				<button
					type="button"
					className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
					onClick={toggleTab3}
				>
					<span className="flex items-center text-black">PHD Programs</span>
					<svg
						data-accordion-icon
						className="w-3 h-3 rotate-180 shrink-0"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 10 6"
					>
						<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
					</svg>
				</button>
			</h2>
			<div id="accordion-open-body-3" className={`${!isOpenTab3 ? "hidden" : ""}`}>
				<div className="p-5 border border-t-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
					<ul className="grid grid-cols-4 gap-2 space-y-2 text-left text-gray-500">
						{getListOfFields(universityData.academic_fields["PhD"])}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Accordian;
