import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

interface StudentData {
  studentName: string;
  average: number;
}

interface Props {
  data: StudentData[];
}

const BasicBars: React.FC<Props> = ({ data = [] }) => {
  if(data.length === 0) return null;
  let totalClassAverage = 0;
  data.forEach(st => {
    totalClassAverage += Number(st.average);
  })
  const overallPercentage = totalClassAverage / data.length;
  const xAxisData = ["Class Average"];
  const seriesData = [{ data: [overallPercentage] }];
  const barColors = ['darkred'];

  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: xAxisData }]}
      series={seriesData}
      width={500}
      height={300} 
      colors={barColors}
    />
  );
}

export default BasicBars;
