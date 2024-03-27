import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DegreesPieChart = ({ universityData }) => {
  const [degreeCounts, setDegreeCounts] = useState({ bachelors: 0, masters: 0, phd: 0 });

  useEffect(() => {
    if (universityData.academic_fields) {
      setDegreeCounts({
        bachelors: universityData.academic_fields["Bachelor's Degree"].split(', ').length,
        masters: universityData.academic_fields["Master's Degree/ M. Phil"].split(', ').length,
        phd: universityData.academic_fields["PhD"].split(', ').length,
      });
    }
  }, [universityData]);

  const data = {
    labels: ['Bachelors', 'Masters', 'PhD'],
    datasets: [
      {
        label: 'Degree Distribution',
        data: [degreeCounts.bachelors, degreeCounts.masters, degreeCounts.phd],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ' degrees: ';
            }
            if (context.parsed !== null) {
              label += context.parsed;
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <div className="h-[300px] w-[500px]">
      <Pie data={data} options={options} />
    </div>
  );
};

export default DegreesPieChart;
