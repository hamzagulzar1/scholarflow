export const getProgramCount = (universityData) => {
	return universityData.programs?.length || 0;
};

export const getTop5Programs = (universityData) => {
	return universityData.programs
		?.filter(
			(program) =>
				program.degrees_offered.Bachelor && program.degrees_offered.Master && program.degrees_offered.Doctoral
		)
		.slice(0, 5)
		.map((program) => program.field_of_study)
		.join(", ");
};

export const getDegreeCounts = (universityData) => {
	return {
		bachelors: universityData.academic_fields?.["Bachelor's Degree"]?.split(", ").length || 0,
		masters: universityData.academic_fields?.["Master's Degree/ M. Phil"]?.split(", ").length || 0,
		phd: universityData.academic_fields?.PhD?.split(", ").length || 0,
	};
};

export const getPieData = () => {
	const degreeCounts = getDegreeCounts();

	return {
		labels: ["Bachelors", "Masters", "PhD"],
		datasets: [
			{
				data: [degreeCounts.bachelors, degreeCounts.masters, degreeCounts.phd],
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
				hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
			},
		],
	};
};
